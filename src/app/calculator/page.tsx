'use client';

import React, { useState } from 'react';
import Button from './_components/Button';
import { calculate } from './_utils/calculate';

export default function Calculator() {
  const [calProps, setCalProps] = useState('');
  const OpSymbols = ['+', '-', '/', '*'];

  function preHandleSetCalProps(p: string): boolean {
    let result = false;
    let lastProp = calProps.charAt(calProps.length - 1);

    // Prevents entering 00 at the first or the next of symbols
    if (p === '00' && (calProps.length === 0 || OpSymbols.includes(lastProp))) {
      result = true;
      setCalProps(prev => prev + '0');
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

  function handleCalculate(calProps: string) {
    const calRes = calculate(calProps);

    setCalProps(calRes);
  }

  function deleteProps() {
    setCalProps(calProps.slice(0, calProps.length - 1));
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 p-5 w-80 border rounded-2xl">
        <input
          type="text"
          placeholder="0"
          className="border rounded-md text-end p-1 hover:disabled text-black"
          value={calProps}
          onChange={e => setCalProps(e.target.value)}
        />
        <div className="grid grid-cols-5 gap-3">
          <Button onClick={() => deleteProps()}>→</Button>
          <Button onClick={() => handleSetCalProps('7')}>7</Button>
          <Button onClick={() => handleSetCalProps('8')}>8</Button>
          <Button onClick={() => handleSetCalProps('9')}>9</Button>
          <Button onClick={() => handleSetCalProps('/')}>÷</Button>
          <div className="grid grid-rows-subgrid row-span-2 border rounded-md">
            <Button onClick={() => setCalProps('')} style="border-0">
              AC
            </Button>
          </div>
          <Button onClick={() => handleSetCalProps('4')}>4</Button>
          <Button onClick={() => handleSetCalProps('5')}>5</Button>
          <Button onClick={() => handleSetCalProps('6')}>6</Button>
          <Button onClick={() => handleSetCalProps('*')}>×</Button>
          <Button onClick={() => handleSetCalProps('1')}>1</Button>
          <Button onClick={() => handleSetCalProps('2')}>2</Button>
          <Button onClick={() => handleSetCalProps('3')}>3</Button>
          <Button onClick={() => handleSetCalProps('-')}>−</Button>
          <Button onClick={() => handleSetCalProps('.')}>.</Button>
          <Button onClick={() => handleSetCalProps('0')}>0</Button>
          <Button onClick={() => handleSetCalProps('00')}>00</Button>
          <Button onClick={() => handleCalculate(calProps)}>=</Button>
          <Button onClick={() => handleSetCalProps('+')}>+</Button>
        </div>
      </div>
    </div>
  );
}
