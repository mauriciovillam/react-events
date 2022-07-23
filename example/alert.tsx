import * as React from 'react';
import { useState } from 'react';
import { useListener } from '../dist';
import { CountIncreasedEvent } from './counter';

function Alert() {
  const [alert, setAlert] = useState<string>();

  useListener(({ count }) => {
    if (count === 5) {
      setAlert('You are about to reach the threshold. Chill down with the clicks!');
    } else if (count === 10) {
      setAlert('Oops, you have reached the limit.');
    }
  }, [CountIncreasedEvent]);

  return <p color="red">{alert}</p>;
}

export default Alert;
