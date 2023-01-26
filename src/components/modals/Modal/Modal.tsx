import { Dialog } from '@headlessui/react';
import { ReactNode, useCallback, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

type Props = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

function Modal({ children, title, onClose }: Props) {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="relative mx-auto max-w-xl w-[800px] p-6 rounded-[14px] bg-white">
          <div className="flex justify-between items-center mb-3">
            <Dialog.Title className="text-xl">{title}</Dialog.Title>
            <XMarkIcon className="text-[#888888] hover:text-[#202020] h-6 w-6 cursor-pointer" onClick={onClose} />
          </div>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default Modal;
