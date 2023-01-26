import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <div className="w-screen h-screen max-h-screen flex flex-col p-24 pb-0 bg-[#F9F9F9] text-[#202020]">{children}</div>
  );
}

export default RootLayout;
