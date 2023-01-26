import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';
import { TaskCardData, TaskLaneData } from '../../types/Task';

type KanbanState = {
  lanes: TaskLaneData[];
};

const initialState: KanbanState = {
  lanes: [],
};

export const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    createLane: (state, action: PayloadAction<TaskLaneData>) => {
      state.lanes.push(action.payload);
    },
    createTask: (state, action: PayloadAction<{ laneId: string; taskData: TaskCardData }>) => {
      const lane = state.lanes.find((lane) => lane.id === action.payload.laneId);
      lane?.cards.push(action.payload.taskData);
    },
    deleteLane: (state, action: PayloadAction<{ laneId: string }>) => {
      state.lanes = state.lanes.filter((lane) => lane.id !== action.payload.laneId);
    },
    deleteTask: (state, action: PayloadAction<{ laneId: string; taskId: string }>) => {
      const lane = state.lanes.find((lane) => lane.id === action.payload.laneId) as TaskLaneData;

      lane.cards = lane.cards.filter((card) => card.id !== action.payload.taskId);
    },
    moveTask: (
      state,
      action: PayloadAction<{
        sourceLaneId: string;
        destinationLaneId: string;
        taskId: string;
        sourceIndex: number;
        destinationIndex: number;
      }>,
    ) => {
      const { sourceLaneId, sourceIndex, destinationLaneId, destinationIndex, taskId } = action.payload;

      const sourceLane = state.lanes.find((lane) => lane.id === sourceLaneId) as TaskLaneData;

      if (sourceLaneId === destinationLaneId) {
        // same lane order change

        const taskToMove = sourceLane.cards[sourceIndex];
        sourceLane.cards[sourceIndex] = sourceLane.cards[destinationIndex];
        sourceLane.cards[destinationIndex] = taskToMove;
        return;
      }

      const taskToMove = sourceLane.cards[sourceIndex];
      // remove from old lane
      sourceLane.cards.splice(sourceIndex, 1);
      // add to new lane
      const destinationLane = state.lanes.find((lane) => lane.id === destinationLaneId) as TaskLaneData;
      destinationLane.cards.splice(destinationIndex, 0, taskToMove);
    },
  },
});

export const { createLane, createTask, deleteLane, deleteTask, moveTask } = kanbanSlice.actions;

export const selectLanes = (state: RootState) => state.kanban.lanes;

export default kanbanSlice.reducer;
