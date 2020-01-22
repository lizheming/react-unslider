# React-Unslider

react-unslider is a simple and modern mobile touch without dependencies slider component for React.


## Installation

```bash
npm install react-unslider --save-dev
```

## Usage

### basic usage 

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Unslider from 'react-unslider';

ReactDOM.render(
  <Unslider
    arrow
    nav
    loop
    autoplay
  >
    <Unslider.Item label="1">Slider 1</Unslider.Item>
    <Unslider.Item label="2">Slider 2</Unslider.Item>
    <Unslider.Item label="3">Slider 3</Unslider.Item>
  </Unslider>
);
```

## API

### <Unslider/> props

| name       | type  | required | default | description |
|------------|-------|--------- |---------|-------------|
| width      |number | √        |         |Slider box's width |
| height     |number | √        |         |Slider box's height | 
|spaceBetween|number |          |0        |Distance between slides in px. |
|slidePerView|number |          |1        |Number of slides per view (slides visible at the same time on slider's container).|
|autoplay    |boolean|          |false    |boolean true to enable autoplay|
|loop        |boolean|          |false    |Set to true to enable continuous loop mode|
|delay       |number |          |3000     |Delay between transitions (in ms) when autoplay enabled.|
|speed       |number |          |300      |Duration of transition between slides (in ms)|
|easing      |string |          |linear   |transition [timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function) |
|nav         |boolean|          |false    |set true to enable pagination nav|
|arrow       |boolean|          |false    |set true to enable arrow handle|
|keys        |object |          |`{prev:37,next:39}`| set hotkey for prev action and next action |
|animation   |string |          |horizontal|set 'vertical' to make slider transtion vertically|
|defaultValue|number |          |0        |set initial show slider number|
|value       |nuber  |          |         |set show slider number|
|onChange    |function|         |         |trigger when slider number change |

### <Unslider.Item /> props

| name       | type  | required | default | description |
|------------|-------|--------- |---------|-------------|
|label       |string\|React Component| | |label for every slider, you can use it when you want to custom pagination.|

## Example
run npm start and open http://localhost:9000

online example: http://lizheming.github.io/react-unslider

## License
rect-unslider is released under the MIT license.