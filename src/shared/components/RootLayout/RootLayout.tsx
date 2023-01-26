import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function RootLayout({ children }: Props) {
  return <div className="w-screen min-h-screen h-full flex flex-col pt-24 bg-[#F9F9F9] text-[#202020]">{children}</div>;
}

export default RootLayout;
