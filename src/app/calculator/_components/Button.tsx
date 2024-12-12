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
      className={`${p.style} flex justify-center content-center border rounded-full p-1.5 `}
      onClick={p.onClick}
    >
      {p.children}
    </button>
  );
}
