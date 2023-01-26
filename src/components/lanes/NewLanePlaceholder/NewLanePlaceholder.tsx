import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import CreateLane from '../../modals/CreateLane';

function NewLanePlaceholder() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreateLane = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-[339px] min-w-[339px] flex flex-col">
      <p className="text-xl px-6 mb-10 font-medium text-left">Create new lane...</p>
      <div
        className="bg-white shadow-md p-4 my-2 w-full grid place-items-center rounded-[14px] max-w-full group cursor-pointer"
        onClick={handleCreateLane}
      >
        <PlusIcon className="text-[#888888] group-hover:text-[#202020] h-6 w-6" />
      </div>
      {isOpen && <CreateLane onClose={handleClose} />}
    </div>
  );
}

export default NewLanePlaceholder;
