# React Events

Sometimes you want to trigger actions or handle events across components
without dealing with prop drilling, context, or using any state manager (e.g Redux).

This library allows you to dispatch and consume custom events easily. 
This leverages JavaScript's document event listeners and the [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) interface.

Everything is fully-typed. That means you will be able to pass a payload to the 
events and consume it safely. The payload type will be automatically inferred.

## Installation

```bash
$ npm i react-events
$ yarn add react-events
```

## Usage

This library provides three main functions:

```js
function createEvent(type);
function emit(event, data);
function useListener(callback, deps);
```

As an example, we can use them the following way:

```ts
// First, we create an event instance
const ClickedOpenModalEvent = createEvent<{ title: string }>();

// Second, we trigger it
function Component() {
    const handleButtonClick = () => {
        emit(ClickedOpenModalEvent, { title: "My Modal Title" });
    }
    
    // ...
}

// Lastly, we consume it
function Modal() {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState("");
    
    useListener(({ title }) => {
        setTitle(title);
        setVisible(true);
    }, [ClickedOpenModalEvent]);
    
    // ...
}
```

## Testing

```bash
$ yarn test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
