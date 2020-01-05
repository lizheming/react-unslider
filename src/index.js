import React, {useEffect, useState} from 'react';
import cls from 'classnames';

import Navs from './Navs';

import './style.css';

function animation(dur) {
  var start = Date.now();
  return function(cb) {
    function frameAnimation() {
      var now = Date.now();
      var percent = Math.min( (now - start)/dur, 1);
      cb(percent);
      if(percent < 1) requestAnimationFrame(frameAnimation);
    }
    requestAnimationFrame(frameAnimation);
  };
}	

function useSlider({active, max, infinite, speed}) {
  const [index, setIndex] = useState(active);
  const [offset, setOffset] = useState(() => getOffset(active));

  function getOffset(index) {
    if(!infinite) {
      return (-100 * index);
    }
    return (-100 * (index + 1));
  }
  function navigator(nextIndex) {
    // const delta = nextOffset - offset;
    const delta = -100;
    animation(speed)(p => setOffset(getOffset(index) + p*delta));
    if(nextIndex === max) {
      nextIndex = 0;
    }
    if(nextIndex === -1) {
      nextIndex = max - 1;
    }
    setIndex(nextIndex);
    setOffset(getOffset(nextIndex));
  }

  return {
    index, 
    offset,
    navigator,
    prev() {
      navigator(index - 1);
    },
    next() {
      navigator(index + 1);
    }
  };
}
export default function Unslider(props) {
  const Slides = props.children.filter(child => child.type === Unslider.Item);

  const {index, offset, prev, next} = useSlider({
    active: 0, 
    max: Slides.length,
    infinite: props.infinite,
    speed: props.speed
  });

  useEffect(() => {
    if(!props.autoplay) {
      return;
    }

    const id = setInterval(next, props.delay);
    return () => clearInterval(id);
  }, [index, offset]);


  useEffect(() => {
    function handler(e) {
      for(const key in props.keys) {
        if(e.which !== props.keys[key]) {
          continue;
        }

        if(key === 'prev') prev();
        if(key === 'next') next();
      }
    }
    document.addEventListener('keyup', handler);
    return () => document.removeEventListener('keyup', handler);
  }, [index]);

  if(!Slides.length) {
    return null;
  }

  // const navs = Slides.map((slide, index) => 
  //   ({
  //     key: index, 
  //     acitve: slide.props.active,
  //     label: slide.props.label || (index + 1)
  //   })
  // );
  // if(navs.findIndex(nav => nav.active) === -1) {
  //   navs[0].active = true;
  // }

  const boxSize = {width: props.width, height: props.height};
  return (
    <div className={cls('unslider', props.className)} style={boxSize}>
      <div 
        className={cls('unslider-wrap', `unslider-${props.animation}`)}
        style={{
          width: (props.infinite ? Slides.length + 2 : Slides.length) + '00%',
          marginLeft: offset + '%'
        }}  
      >
        {!props.infinite ? null : React.cloneElement(Slides[Slides.length - 1], {style: boxSize})}
        {React.Children.map(Slides, slide => 
          React.cloneElement(slide, {style: boxSize})
        )}
        {!props.infinite ? null : React.cloneElement(Slides[0], {style: boxSize})}
      </div>

      {/* <Navs className="unslider-nav">
        {navs.map(nav => 
          <Navs.Item 
            active={nav.active}
            key={nav.index} 
            dataKey={nav.index}
            onClick={() => {
              //TODO
              //setActiveIndex
              //animate slide
            }}  
          >
            {nav.label}
          </Navs.Item>  
        )}
      </Navs> */}
      {/* <Arrows className={_('arrows')}>
        <Arrows.Prev onClick={() => {}}/>
        <Arrows.Next onClick={() => {}}/>
      </Arrows> */}
    </div>
    
  );
}

Unslider.Item = function(props) {
  return (
    <div className="unslider-items" {...props} />
  );
}

Unslider.defaultProps = {
  prefixCls: 'unslider',
  width: 300,
  height: 189,
  autoplay: false,
  loop: true,
  delay: 3000,
  speed: 750,
  easing: 'swing', // [.42, 0, .58, 1],
  keys: {
    prev: 37,
    next: 39
  },
  nav: true,
  animation: 'horizontal',
  animateHeight: false,
  swipe: true,
  swipeThreshold: 0.2
}


// import PropTypes from 'prop-types';

// const UnsliderPropTypes = {
//   prefixCls: PropTypes.string,
//   //  Should the slider move on its own or only when
//   //  you interact with the nav/arrows?
//   //  Only accepts boolean true/false.
//   autoplay: PropTypes.bool,
  
//   // play slide from start again if it's end
//   loop: PropTypes.bool,

//   //  3 second delay between slides moving, pass
//   //  as a number in milliseconds.
//   delay: PropTypes.number,
  
//   //  Animation speed in millseconds
//   speed: PropTypes.number,

//   //  An easing string to use. If you're using Velocity, use a
//   //  Velocity string otherwise you can use jQuery/jQ UI options.
//   easing: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

//   //  Does it support keyboard arrows?
//   //  Can pass either true or false -
//   //  or an object with the keycodes, like so:
//   //  {
//   //   prev: 37,
//   //   next: 39
//   // }
//   //  You can call any internal method name
//   //  before the keycode and it'll be called.
//   keys: PropTypes.object({
//     prev: PropTypes.number,
//     next: PropTypes.number
//   }),

//   //  Do you want to generate clickable navigation
//   //  to skip to each slide? Accepts boolean true/false or
//   //  a callback function per item to generate.
//   nav: PropTypes.bool,

//   //  How should Unslider animate?
//   //  It can do one of the following types:
//   //  "fade": each slide fades in to each other
//   //  "horizontal": each slide moves from left to right
//   //  "vertical": each slide moves from top to bottom
//   animation: PropTypes.oneOf(['horizontal', 'vertical', 'fade']),

//   //  Do you want to animate the heights of each slide as
//   //  it moves
//   anmateHeight: PropTypes.bool,

//   //  Have swipe support?
//   //  You can set this here with a boolean and always use
//   //  initSwipe/destroySwipe later on.
//   swipe: PropTypes.bool,

//   // Swipe threshold -
//   // lower float for enabling short swipe
//   swipeThreshold: PropTypes.number
// };