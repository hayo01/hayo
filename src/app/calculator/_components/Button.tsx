import React, { MouseEventHandler } from 'react';

interface BtnProps {
  style?: string;
  children: string;
  onClick?: MouseEventHandler;
}

// Calculator Button
export default function Button(p: BtnProps) {
  return (
    <button
      className={`${p.style} flex justify-center content-center border rounded-md p-1.5 text-base font-bold hover:scale-125 hover:text-[#0a1d0b] hover:bg-[#5ee8b3]`}
      onClick={p.onClick}
    >
      {p.children}
    </button>
  );
}
