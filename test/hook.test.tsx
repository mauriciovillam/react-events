import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';
import { createEvent, useListener, emit } from '../src';

describe('hook', () => {
  it('registers event in document', async () => {
    let count = 0;
    const TestEvent = createEvent('test');
    function Dummy() {
      useListener(() => {
        count += 1;
      }, [TestEvent]);
      return null;
    }

    render(<Dummy />);

    expect(count).toBe(0);
    document.dispatchEvent(new Event('test'));
    expect(count).toBe(1);
  });

  it('unregisters events on unmount', async () => {
    let count = 0;
    const TestEvent = createEvent();
    function Dummy() {
      useListener(() => {
        count += 1;
      }, [TestEvent]);
      return null;
    }

    emit(TestEvent);
    expect(count).toBe(0);

    const { unmount } = render(
      <Dummy />,
    );

    emit(TestEvent);
    expect(count).toBe(1);

    unmount();

    emit(TestEvent);
    expect(count).toBe(1);
  });

  it('is in sync with component state', async () => {
    const TestEvent = createEvent();
    function Dummy() {
      const [count, setCount] = useState(0);
      useListener(() => {
        setCount(count + 1);
      }, [TestEvent]);

      // eslint-disable-next-line jsx-a11y/aria-role
      return <div role="container">{count}</div>;
    }

    render(<Dummy />);

    await waitFor(() => {
      expect(screen.getByRole('container')).toHaveTextContent('0');
    });

    await waitFor(() => {
      emit(TestEvent);
      expect(screen.getByRole('container')).toHaveTextContent('1');
    });
  });

  it('is in sync with component state with functional updates', async () => {
    const TestEvent = createEvent();
    function Dummy() {
      const [count, setCount] = useState(0);
      useListener(() => {
        setCount((value) => value + 1);
      }, [TestEvent]);

      // eslint-disable-next-line jsx-a11y/aria-role
      return <div role="container">{count}</div>;
    }

    render(<Dummy />);

    await waitFor(() => {
      expect(screen.getByRole('container')).toHaveTextContent('0');
    });

    await waitFor(() => {
      emit(TestEvent);
      expect(screen.getByRole('container')).toHaveTextContent('1');
    });
  });
});
