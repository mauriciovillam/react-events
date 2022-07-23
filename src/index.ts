import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

type EffectCallback<Data = any, Event = CustomEvent> = (data: Data, event?: Event) => void;
type DependencyList = CustomEvent[];

function createEvent<Data = any>(type?: string) {
  return new CustomEvent<Data>(type || uuidv4());
}

function emit<Event extends CustomEvent, List extends Event | Event[]>(
  events: List,
  data?: List extends CustomEvent
      ? List['detail']
      : List extends Array<any>
          ? List[number]['detail']
          : unknown,
) {
  const collection = (Array.isArray(events) ? events : [events]) as Event[];
  const eventsWithDetail = typeof data !== 'undefined'
    ? collection.map((event) => new CustomEvent(event.type, { detail: data as any }))
    : collection;

  eventsWithDetail.forEach((event) => document.dispatchEvent(event));
}

function useListener<List extends DependencyList>(
  callback: EffectCallback<List[number]['detail'], List[number]>,
  deps: List,
) {
  useEffect(() => {
    const events = [...deps];
    const listener = (event: List[number] | Event) => {
      callback((event as CustomEvent).detail, event as CustomEvent);
    };

    events.forEach((event) => document.addEventListener(event.type, listener, false));

    return () => {
      events.forEach((event) => document.removeEventListener(event.type, listener, false));
    };
  }, []);
}

export { useListener, createEvent, emit };
