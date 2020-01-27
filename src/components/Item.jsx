import React, {useRef, useEffect} from 'react';

const isMobile = () => 'ontouchstart' in document.documentElement;
const START_EVENT = isMobile() ? 'touchstart' : 'mousedown';
const MOVE_EVENT = isMobile() ? 'touchmove' : 'mousemove';
const END_EVENT = isMobile() ? ['touchend', 'touchcancel'] : ['mouseup'];

export default function Item(props) {
  const sliderRef = useRef(null);

  useEffect(() => {
    if(!sliderRef.current) {
      return;
    }

    const el = sliderRef.current;
    let start;
    let delta;
    let startTime;

    function onMouseDown(e) {
      if(!isMobile()) {
        start = {x: e.pageX, y: e.pageY};
      } else {
        if(!e.touches.length) {
          return;
        }
  
        const {pageX, pageY} = e.touches[0];
        start = {x: pageX, y: pageY};
      }
      
      startTime = Date.now();
      window.addEventListener(MOVE_EVENT, onMouseMove);
      END_EVENT.forEach(evt => window.addEventListener(evt, onMouseUp));
    }

    function onMouseMove(e) {
      e.preventDefault();

      if(!isMobile()) {
        delta = {horizontal: e.pageX - start.x, vertical: e.pageY - start.y};
      } else {
        if(!e.touches.length) {
          return;
        }

        const {pageX, pageY} = e.touches[0];
        delta = {horizontal: pageX - start.x, vertical: pageY - start.y};
      }
      props.onOffsetChange(delta);
    }

    function onMouseUp() {
      let status = {};
      if(!delta) {
        return;
      }

      const deltaTime = Date.now() - startTime;
      const vx = delta.horizontal / deltaTime * 1000;
      const vy = delta.vertical / deltaTime * 1000;
      if(delta.horizontal > props.style.width/2 || vx > 100) {
        status.horizontal = 1;
      } else if(delta.horizontal < -props.style.width/2 || vx < -100) {
        status.horizontal = -1;
      } else {
        status.horizontal = 0;
      }

      if(delta.vertical > props.style.height/2 || vx > 100) {
        status.vertical = 1;
      } else if (delta.vertical < -props.style.height/2 || vy < -100) {
        status.vertical = -1;
      } else {
        status.vertical = 0;
      }
 
      props.onChange(status);

      status = undefined;
      delta = undefined;
      window.removeEventListener(MOVE_EVENT, onMouseMove);
      END_EVENT.forEach(evt => window.removeEventListener(evt, onMouseUp));
    }

    el.addEventListener(START_EVENT, onMouseDown);
    return () => {
      el.removeEventListener(START_EVENT, onMouseDown);
      window.removeEventListener(MOVE_EVENT, onMouseMove);
      END_EVENT.forEach(evt => window.removeEventListener(evt, onMouseUp));
    };
  }, []);
  
  return (
    <div 
      className="unslider-items" 
      {...props} 
      ref={sliderRef}
    />
  );
}