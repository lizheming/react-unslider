import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Unslider from '../src';

const BuildComp = (props = {}) => (
  <Unslider {...props} width={730} height={410}>
    {[0,1,2,3,4,5,6,7,8,9].map((_, index) => (
      <Unslider.Item key={index} label={index+1}>
        Slider {index+1}
      </Unslider.Item>
    ))}
  </Unslider>
);

function ControlledComp(props) {
  const [idx, setIdx] = useState(1);
  return (
    <>
      <p>
        <label>Change Active Slider Index: </label>
        <input value={idx} onChange={e => setIdx(e.target.value)} />
      </p>
      <Unslider 
        {...props} 
        width={730} 
        height={410} 
        value={idx-1} 
        onChange={idx => setIdx(idx+1)}
      >
        {[0,1,2,3,4,5,6,7,8,9].map((_, index) => (
          <Unslider.Item 
            key={index} 
            label={index+1} 
          >
            Slider {index+1}
          </Unslider.Item>
        ))}
      </Unslider>
    </>
  );
}

const Examples = [
  {
    name: 'Default Setup',
    comp: <BuildComp />
  },
  {
    name: 'Navigation',
    comp: <BuildComp arrow />
  },
  {
    name: 'Pagination',
    comp: <BuildComp nav />
  },
  {
    name: 'Autoplay',
    comp: <BuildComp nav autoplay />
  },
  {
    name: 'Loop Mode / Infinite Loop',
    comp: <BuildComp nav arrow autoplay loop />
  },
  {
    name: 'Vertical Slider',
    comp: <BuildComp animation="vertical" />
  },
  {
    name: 'Space Between Slides',
    comp: <BuildComp spaceBetween={30} nav />
  },
  {
    name: 'Multiple Slides Per View',
    comp: <BuildComp spaceBetween={30} slidePerView={3} nav />
  },
  {
    name: 'Centered Slides',
    comp: <BuildComp spaceBetween={30} slidePerView={1.5} nav={true} loop={true} />
  },
  {
    name: 'Controlled Component',
    comp: <ControlledComp nav loop/>
  }
];

function App() {
  return Examples.map(({name, comp}, k) => (
    <div key={k}>
      <h3>{name}</h3>
      {comp}
    </div>
  ));
}

ReactDOM.render(<App />, document.getElementById('app'));
