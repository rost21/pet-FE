import * as React from 'react';

export const formattingByNewLine = (string: string | null) => {
  if (!string) return null;
  return string.split('\n').map((text, index) => (
    <p key={index}>{text}</p>
  ));
};