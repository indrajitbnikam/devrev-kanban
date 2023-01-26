import { TaskLaneData } from '../../../types/Task';
import TaskCard from '../../TaskCard';
import { Droppable } from '@hello-pangea/dnd';
import { useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

type Props = {
  data: TaskLaneData;
  onLaneDelete: (laneId: string) => void;
  onTaskDelete: (laneId: string, taskId: string) => void;
};

function TaskLane({ data: { id, name, cards }, onLaneDelete, onTaskDelete }: Props) {
  const handleLaneDelete = useCallback(() => {
    onLaneDelete(id);
  }, [onLaneDelete]);

  const handleTaskDelete = useCallback(
    (taskId: string) => {
      onTaskDelete(id, taskId);
    },
    [onTaskDelete],
  );

  const renderCards = () => {
    if (cards.length === 0) {
      return <p className="text-center py-4">No tasks!</p>;
    }

    return cards.map((card, index) => <TaskCard key={card.id} data={card} index={index} onDelete={handleTaskDelete} />);
  };

  return (
    <div className="w-[339px] min-w-[339px] flex flex-col">
      <div className="flex justify-between px-6 mb-10 group">
        <p className="text-xl font-medium text-left">{`${name} (${cards.length})`}</p>
        <XMarkIcon
          className="h-5 w-5 text-[#202020] hidden group-hover:inline-block cursor-pointer"
          onClick={handleLaneDelete}
        />
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-4 py-2 rounded-lg min-h-min overflow-y-auto ${
              snapshot.isDraggingOver ? 'ring-1 ring-gray-300' : ''
            }`}
          >
            {renderCards()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskLane;
