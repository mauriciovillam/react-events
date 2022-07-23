import * as React from 'react';
import { useState } from 'react';
import { createEvent, emit } from '../dist';

export const CountIncreasedEvent = createEvent<{ count: number }>();

function Counter() {
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    if (count === 10) {
      return;
    }

    setCount(count + 1);
    emit(CountIncreasedEvent, { count: count + 1 });
  };

  return (
    <div>
      You can add up to 10. <br /><br />
      Counter: {count}&nbsp;&nbsp;
      <button type="button" onClick={handleClick}>Increase</button>
    </div>
  );
}

export default Counter;
