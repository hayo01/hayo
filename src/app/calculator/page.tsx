'use client';

import React, { useState } from 'react';
import Button from './_components/Button';
import { calculate } from './_utils/calculate';

type CalProps = {
  num1: number;
  num2: number;
  action: string;
};

export default function Calculator() {
  const [calProps, setCalProps] = useState('');
  const OpSymbols = ['+', '-', '/', '*'];

  function preHandleSetCalProps(p: string): boolean {
    let result = false;
    let lastProp = calProps.charAt(calProps.length - 1);

    // Prevents entering 0 at the first
    if ((p === '0' || p === '00') && calProps.length === 0) {
      result = true;
      console.log(`${p} can't come at the first.`);
    }

    // Prevents putting symbols together
    if (OpSymbols.includes(p) && OpSymbols.includes(lastProp)) {
      result = true;
      console.log(
        `${lastProp} : Symbols can't be used next to another symbol.`
      );
    }

    return result;
  }

  function handleSetCalProps(p: string) {
    const preRes = preHandleSetCalProps(p);

    if (!preRes) {
      if (OpSymbols.includes(p) || typeof Number(p) === 'number') {
        setCalProps(prev => prev + p);
      } else {
        console.log(`handleSetCalProps_(ELSE) ---> ${p}, ${calProps}`);
      }
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 p-5 w-80 border rounded-2xl">
        <input
          type="text"
          placeholder="0"
          className="border rounded-md text-end p-1 hover:disabled"
          value={calProps}
          onChange={e => setCalProps(e.target.value)}
        />
        <div className="grid grid-cols-5 gap-3">
          <Button>→</Button>
          <Button onClick={() => handleSetCalProps('7')}>7</Button>
          <Button onClick={() => handleSetCalProps('8')}>8</Button>
          <Button onClick={() => handleSetCalProps('9')}>9</Button>
          <Button onClick={() => handleSetCalProps('/')}>÷</Button>
          <Button onClick={() => setCalProps('')}>AC</Button>
          <Button onClick={() => handleSetCalProps('4')}>4</Button>
          <Button onClick={() => handleSetCalProps('5')}>5</Button>
          <Button onClick={() => handleSetCalProps('6')}>6</Button>
          <Button onClick={() => handleSetCalProps('*')}>×</Button>
          <Button>−/+</Button>
          <Button onClick={() => handleSetCalProps('1')}>1</Button>
          <Button onClick={() => handleSetCalProps('2')}>2</Button>
          <Button onClick={() => handleSetCalProps('3')}>3</Button>
          <Button onClick={() => handleSetCalProps('-')}>−</Button>
          <Button onClick={() => handleSetCalProps('.')}>.</Button>
          <Button onClick={() => handleSetCalProps('0')}>0</Button>
          <Button onClick={() => handleSetCalProps('00')}>00</Button>
          <Button onClick={() => calculate(calProps)}>=</Button>
          <Button onClick={() => handleSetCalProps('+')}>+</Button>
        </div>
      </div>
    </div>
  );
}
