import React, { useState } from 'react';
import { Button, Container } from './styles';

export default function Tabs({ selected, setSelected, buttons, className }) {
  const filtered = buttons.filter(({ hidden }) => !hidden);
  const { length } = filtered;

  const [barPosition, setBarPosition] = useState(0);

  return (
    <Container className={className} length={length} barPosition={barPosition}>
      {buttons.map((btn, index) => (
        <Button
          hidden={btn.hidden}
          selected={selected === index + 1}
          type="button"
          onClick={() => {
            setSelected(index + 1);
            setBarPosition(filtered.findIndex((b) => b === btn));
          }}
        >
          {btn.title}
        </Button>
      ))}
    </Container>
  );
}
