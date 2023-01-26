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
  },
});

export const { createLane, createTask } = kanbanSlice.actions;

export const selectLanes = (state: RootState) => state.kanban.lanes;

export default kanbanSlice.reducer;
