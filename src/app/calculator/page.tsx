'use client';

import React, { useState } from 'react';
import Button from './_components/Button';
import { calculate } from './_utils/calculate';
import Link from 'next/link';
import Arrow from '@images/arrow.svg';
import Image from 'next/image';

interface PreRes {
  isRes: boolean;
  preProps: string;
}

export default function Calculator() {
  const [calProps, setCalProps] = useState('');
  const [lastSymbol, setLastSymbol] = useState('');
  const OpSymbols = ['+', '-', '/', '*'];

  function preHandleSetCalProps(p: string): PreRes {
    let result = { isRes: false, preProps: p };
    let lastProp = calProps.charAt(calProps.length - 1);

    // Prevents entering 00 at the first or the next of symbols
    if (p === '00' && (calProps.length === 0 || OpSymbols.includes(lastProp))) {
      result.preProps = '0';
    }

    // Prevents putting symbols together
    if (OpSymbols.includes(p) && OpSymbols.includes(lastProp)) {
      result.isRes = true;
      console.log(
        `${lastProp} : Symbols can't be used next to another symbol.`
      );
    }

    return result;
  }

  // Controls saving entered data
  function handleSetCalProps(p: string) {
    const preRes = preHandleSetCalProps(p);
    // 3 variables to check last Number
    const lastNumIdx = calProps.lastIndexOf(lastSymbol);
    const tempCalProps = calProps + preRes.preProps;
    const lastNum = tempCalProps.slice(lastNumIdx + 1);

    if (!preRes.isRes) {
      // 1) Prevents putting meaningless multiple zero
      if (Number(preRes.preProps) === 0) {
        // 1-1) First num === 0
        if (calProps.length === 1) {
          setCalProps('0');
        } else if (lastSymbol === '' ? false : Number(lastNum) === 0) {
          setCalProps(tempCalProps.slice(0, lastNumIdx + 1) + '0');
        } else {
          setCalProps(prev => prev + preRes.preProps);
        }

        // 2) Saves an entered symbol
      } else if (OpSymbols.includes(preRes.preProps)) {
        console.log('no.2 saving');
        setCalProps(prev => prev + preRes.preProps);
        setLastSymbol(preRes.preProps); // save the last symbol

        // 3) Saves an entered number
      } else if (
        typeof Number(preRes.preProps) === 'number' &&
        preRes.preProps !== '.'
      ) {
        // 3-1) Prevents putting meaningless zero at the frist digit
        setCalProps(prev => {
          const newData =
            prev === '0' ? preRes.preProps : prev + preRes.preProps;
          return newData;
        });

        // 4) Entered data === '.'
      } else {
        // 4-1) Limits the number of decimals('.') to one
        if (calProps.length > 0 && !calProps.includes('.')) {
          setCalProps(prev => prev + preRes.preProps);
        } else {
          return;
        }
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
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="fixed flex top-0 mt-8 hover:scale-110">
        <Image width={25} height={25} src={Arrow} alt="arrow" />
        <Link href={'/'} className="font-extrabold text-xl ml-2">
          Back to Home
        </Link>
      </div>

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
          <div
            onClick={() => setCalProps('')}
            className="grid grid-rows-subgrid row-span-2 border rounded-md hover:scale-125 hover:text-[#0a1d0b] hover:bg-[#5ee8b3]"
          >
            <p className="flex justify-center items-center text-base font-bold">
              AC
            </p>
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
