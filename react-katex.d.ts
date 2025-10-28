declare module 'react-katex' {
  import React from 'react';

  export interface InlineMathProps {
    math: string;
    children?: React.ReactNode;
  }

  export interface BlockMathProps {
    math: string;
    children?: React.ReactNode;
  }

  export const InlineMath: React.FC<InlineMathProps>;
  export const BlockMath: React.FC<BlockMathProps>;
}
