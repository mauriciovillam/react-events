import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Counter from './counter';
import Alert from './alert';

function App() {
  return (
    <>
      <Counter />
      <Alert />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
