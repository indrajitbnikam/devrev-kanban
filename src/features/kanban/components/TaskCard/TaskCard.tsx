import { TaskCardData } from '../../types/Task';
import TaskTypeChip from '../TaskTypeChip';
import { Draggable } from '@hello-pangea/dnd';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';

type Props = {
  data: TaskCardData;
  index: number;
  onDelete: (id: string) => void;
};

function TaskCard({ data: { id, name, type }, index, onDelete }: Props) {
  const handleOnDelete = useCallback(() => {
    onDelete(id);
  }, [onDelete]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`bg-white overflow-[inherit] shadow p-8 flex flex-col rounded-[14px] gap-4 max-w-full group ${
            snapshot.isDragging ? 'ring-2' : ''
          }`}
        >
          <div className="flex justify-between ">
            <TaskTypeChip type={type} />
            <XMarkIcon
              className="h-5 w-5 text-[#d3d3d3] group-hover:text-[#202020] cursor-pointer"
              onClick={handleOnDelete}
            />
          </div>
          <p className="font-medium text-lg text-left">{name}</p>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
