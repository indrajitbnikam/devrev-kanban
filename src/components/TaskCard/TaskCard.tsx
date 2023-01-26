import React from 'react';
import { TaskCardData } from '../../types/Task';
import TaskTypeChip from '../TaskTypeChip';

type Props = {
  data: TaskCardData;
};

function TaskCard({ data: { name, type } }: Props) {
  return (
    <div className="bg-white shadow p-8 flex flex-col rounded-[14px] gap-4 max-w-full">
      <div className="flex justify-between ">
        <TaskTypeChip type={type} />
      </div>
      <p className="font-medium text-lg text-left">{name}</p>
    </div>
  );
}

export default TaskCard;
