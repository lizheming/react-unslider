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
      loop={false}
      speed={700}
      nav={true}
      arrow={true}
      animation="horizontal"
      spaceBetween={30}
    >
      {new Array(10).fill(0).map((_, index) => (
        <Unslider.Item key={index} label={index+1}>
          Slider {index+1}
        </Unslider.Item>
      ))}
    </Unslider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
