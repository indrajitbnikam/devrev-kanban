import Button from '../../../../shared/components/Button';
import NewLanePlaceholder from '../../components/lanes/NewLanePlaceholder';
import TaskLane from '../../components/lanes/TaskLane';
import CreateTask from '../../components/modals/CreateTask';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { deleteLane, deleteTask, moveTask, selectLanes } from '../../slices/kanbanSlice';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';

function KanbanPage() {
  const [isOpen, setIsOpen] = useState(false);

  const lanes = useAppSelector(selectLanes);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenCreateModal = () => {
    setIsOpen(true);
  };

  const handleLaneDelete = useCallback((laneId: string) => {
    dispatch(
      deleteLane({
        laneId,
      }),
    );
  }, []);

  const handleTaskDelete = useCallback((laneId: string, taskId: string) => {
    dispatch(
      deleteTask({
        laneId,
        taskId,
      }),
    );
  }, []);

  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const { destination, source, draggableId } = result;

      if (!destination) {
        return;
      }

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }

      dispatch(
        moveTask({
          sourceLaneId: source.droppableId,
          destinationLaneId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        }),
      );
    },
    [lanes],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full flex flex-col flex-1 basis-auto gap-6">
        {lanes.length > 0 && (
          <div className="flex px-10 justify-end">
            <Button name="New Task" onClick={handleOpenCreateModal} />
          </div>
        )}
        <div className="flex flex-1 px-10 gap-4 overflow-x-auto overflow-y-hidden">
          {lanes.map((lane) => (
            <TaskLane key={lane.id} data={lane} onLaneDelete={handleLaneDelete} onTaskDelete={handleTaskDelete} />
          ))}
          <NewLanePlaceholder />
        </div>
        {isOpen && <CreateTask onClose={handleCloseModal} />}
      </div>
    </DragDropContext>
  );
}

export default KanbanPage;
