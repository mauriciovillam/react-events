import { validate as validateUUID } from 'uuid';
import { createEvent } from '../src';

describe('create event', () => {
  it('returns a CustomEvent', async () => {
    const TestEvent = createEvent();

    expect(TestEvent).toBeInstanceOf(CustomEvent);
  });

  it('generates a random ID', async () => {
    const TestEvent = createEvent();

    expect(validateUUID(TestEvent.type)).toBe(true);
  });

  it('assigns specific ID', async () => {
    const TestEvent = createEvent('test');

    expect(TestEvent.type).toBe('test');
  });
});
