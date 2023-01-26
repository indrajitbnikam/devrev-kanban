import { TaskType } from '../../types/Task';

type Props = {
  type: TaskType;
};

// Should have used Map for Type-Color mapping, but this is necessary for tailwind to work.
// i.e. it cannot understand dynamically build classes
const getBgColor = (type: TaskType): string => {
  switch (type) {
    case 'BUG':
      return 'bg-[#E02020]';
    case 'FEATURE':
      return 'bg-[#0091FF]';
    case 'REQUEST':
      return 'bg-[#44D7B6]';

    default:
      return 'bg-[#0F0F0F]';
  }
};

const getTextColor = (type: TaskType): string => {
  switch (type) {
    case 'BUG':
      return 'text-[#E02020]';
    case 'FEATURE':
      return 'text-[#0091FF]';
    case 'REQUEST':
      return 'text-[#44D7B6]';

    default:
      return 'text-[#0F0F0F]';
  }
};

function TaskTypeChip({ type }: Props) {
  return (
    <div className="flex gap-3 items-center">
      <div className={`rounded-full h-[10px] w-[10px] ${getBgColor(type)}`} />
      <p className={`text-sm font-medium text-left ${getTextColor(type)}`}>{type}</p>
    </div>
  );
}

export default TaskTypeChip;
