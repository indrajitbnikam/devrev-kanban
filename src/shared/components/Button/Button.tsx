import React from 'react';

type Props = {
  name: string;
  onClick: () => void;
};

function Button({ name, onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className="py-2 px-3 rounded-lg bg-[#0091FF] text-white self-end">
      {name}
    </button>
  );
}

export default Button;
