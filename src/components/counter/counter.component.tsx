import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../hooks/index.hook';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from '../../store/modules/counter/count.slice';
import { CounterRow, CountValue, Button, TextBox, AsyncButton } from './counter.style';

export default function Counter(): JSX.Element {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <CounterRow>
        <Button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          -
        </Button>
        <CountValue role="document">{count}</CountValue>
        <Button aria-label="Increment value" onClick={() => dispatch(increment())}>
          +
        </Button>
      </CounterRow>
      <CounterRow>
        <TextBox
          role="textbox"
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <Button onClick={() => dispatch(incrementByAmount(incrementValue))}>Add Amount</Button>
        <AsyncButton onClick={() => dispatch(incrementAsync(incrementValue))}>Add Async</AsyncButton>
        <Button onClick={() => dispatch(incrementIfOdd(incrementValue))}>Add If Odd</Button>
      </CounterRow>
    </div>
  );
}
