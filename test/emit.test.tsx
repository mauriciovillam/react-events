import * as React from 'react';
import { render } from '@testing-library/react';
import { useEffect } from 'react';
import { createEvent, emit } from '../src';

describe('hook', () => {
  it('emits event in document', async () => {
    let count = 0;
    const TestEvent = createEvent('test');
    function Dummy() {
      useEffect(() => {
        const listener = () => {
          count += 1;
        };

        document.addEventListener('test', listener, false);

        return () => {
          document.removeEventListener('test', listener, false);
        };
      }, []);
      return null;
    }

    render(<Dummy />);

    expect(count).toBe(0);
    emit(TestEvent);
    expect(count).toBe(1);
  });

  it('emits event with data in document', async () => {
    let count = 0;
    const TestEvent = createEvent('test');
    function Dummy() {
      useEffect(() => {
        const listener = (event: Event | CustomEvent) => {
          count += (event as CustomEvent).detail.count;
        };

        document.addEventListener('test', listener, false);

        return () => {
          document.removeEventListener('test', listener, false);
        };
      }, []);
      return null;
    }

    render(<Dummy />);

    expect(count).toBe(0);
    emit(TestEvent, { count: 3 });
    expect(count).toBe(3);
  });
});
