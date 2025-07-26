import React from 'react';
import llama from '../assets/llama.png';

export default function Llama({ width = 51, height = 35 }) {
  return (
    <img
      src={llama}
      alt="ln"
      width={width}
      height={height}
      style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)' }}
    />
  );
}
