import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Unslider from '../src';

function App() {
  return (
    <Unslider 
      width={300} 
      height={189} 
      autoplay={true} 
      delay={3000}
      loop={true}
      speed={700}
      nav={false}
      arrow={true}
      animation="horizontal"
    >
      {new Array(10).fill(0).map((_, index) => (
        <Unslider.Item key={index}>
          Slider {index+1}
        </Unslider.Item>
      ))}
    </Unslider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
