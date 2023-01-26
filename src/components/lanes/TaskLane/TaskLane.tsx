import { TaskLaneData } from '../../../types/Task';
import TaskCard from '../../TaskCard';

type Props = {
  data: TaskLaneData;
};

function TaskLane({ data: { name, cards } }: Props) {
  const renderCards = () => {
    if (cards.length === 0) {
      return <p className="text-center py-4">No tasks!</p>;
    }

    return cards.map((card) => <TaskCard key={card.id} data={card} />);
  };

  return (
    <div className="w-[339px] min-w-[339px] flex flex-col">
      <div className="flex justify-between px-6 mb-10">
        <p className="text-xl font-medium text-left">{`${name} (${cards.length})`}</p>
      </div>
      <div className="flex flex-col gap-4 py-2 min-h-min overflow-y-auto">{renderCards()}</div>
    </div>
  );
}

export default TaskLane;
