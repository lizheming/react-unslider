import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Unslider from '../src';

function App() {
  return (
    <Unslider>
    Hello World
    </Unslider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
