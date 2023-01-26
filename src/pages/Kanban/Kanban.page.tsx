import Button from '../../components/Button';
import NewLanePlaceholder from '../../components/lanes/NewLanePlaceholder';
import TaskLane from '../../components/lanes/TaskLane';
import CreateTask from '../../components/modals/CreateTask';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectLanes } from './kanbanSlice';

function KanbanPage() {
  const [isOpen, setIsOpen] = useState(false);
  const lanes = useAppSelector(selectLanes);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenCreateModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col flex-1 basis-auto gap-6 overflow-hidden">
      {lanes.length > 0 && (
        <div className="flex justify-end">
          <Button name="New Task" onClick={handleOpenCreateModal} />
        </div>
      )}
      <div className="min-w-full flex flex-1 overflow-x-auto gap-4">
        {lanes.map((lane) => (
          <TaskLane key={lane.id} data={lane} />
        ))}
        <NewLanePlaceholder />
      </div>
      {isOpen && <CreateTask onClose={handleCloseModal} />}
    </div>
  );
}

export default KanbanPage;
