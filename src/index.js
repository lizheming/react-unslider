import React, {useEffect, useState, useCallback, useRef} from 'react';
import cls from 'classnames';

import usePauseFunction from './helper';
import Navs from './Navs';

import './style.css';

function useActiveIndex(Slides, {onChange}) {
  const defaultIndex = Slides.findIndex(slide => slide.defaultActive === true);
  const activeIndex = Slides.findIndex(slide => slide.active === true);
  let index = 0;
  if(activeIndex !== -1) {
    index = activeIndex;
  } else if(defaultIndex !== -1) {
    index = defaultIndex;
  }

  const [idx, setIdx] = useState(index);
  return [idx, function(index) {
    if(index >= Slides.length) {
      index = 0;
    } else if(index < 0) {
      index = Slides.length - 1;
    }

    typeof onChange === 'function' && onChange(index);
    if(activeIndex !== -1) {
      const activeIndex = Slides.findIndex(slide => slide.active === true);
      setIdx(activeIndex);
    } else {
      setIdx(index);
    }
  }];
}

export default function Unslider(props) {
  const Slides = props.children.filter(child => child.type === Unslider.Item);

  const wrapRef = useRef(null);
  const animateRef = useRef(null);
  const [activeIndex, setActiveIndex] = useActiveIndex(Slides, props);
  const prev = useCallback(() => setActive(activeIndex - 1), [activeIndex]);
  const next = useCallback(() => setActive(activeIndex + 1), [activeIndex]);
  const [autonext, {play, pause}] = usePauseFunction(next, false);
  const offset = (props.infinite ? activeIndex + 1 : activeIndex) * -100;

  function setActive(nextIndex) {
    if (!Element.prototype.animate) {
      return setActiveIndex(nextIndex);
    }

    if(animateRef.current && animateRef.current.playState !== 'finished') {
      return;
    }

    const nextOffset = (props.infinite ? nextIndex + 1 : nextIndex) * -100;
    animateRef.current = wrapRef.current.animate({
      marginLeft: [offset + '%', nextOffset + '%']
    }, {duration: props.speed, delay: 0, easing: props.easing});
    animateRef.current.onfinish = () => setActiveIndex(nextIndex);
  }

  useEffect(() => {
    if(typeof props.onChange === 'function') {
      props.onChange(activeIndex);
    }
  }, []);

  useEffect(() => {
    if(!props.autoplay) {
      return;
    }

    const id = setInterval(autonext, props.delay);
    return () => clearInterval(id);
  }, [activeIndex, autonext]);

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
  }, [activeIndex]);

  if(!Slides.length) {
    return null;
  }

  const boxSize = {width: props.width, height: props.height};
  const wrapHorizontalStyle = {
    width: (props.infinite ? Slides.length + 2 : Slides.length) + '00%',
    marginLeft: offset + '%'
  };
  const wrapVerticalStyle = {
    height: (props.infinite ? Slides.length + 2 : Slides.length) + '00%',
    marginTop: offset + '%'
  };
  return (
    <div 
      className={cls('unslider-container', props.className)} 
      style={boxSize}
      onMouseEnter={() => props.autoplay && pause()}
      onMouseLeave={() => props.autoplay && play()}  
    >
      <div 
        className={cls('unslider-wrap', `unslider-${props.animation}`)}
        ref={wrapRef}
        style={props.animation === 'vertical' ? wrapVerticalStyle : wrapHorizontalStyle}
      >
        {!props.infinite ? null : React.cloneElement(Slides[Slides.length - 1], {style: boxSize})}
        {React.Children.map(Slides, slide => 
          React.cloneElement(slide, {style: boxSize})
        )}
        {!props.infinite ? null : React.cloneElement(Slides[0], {style: boxSize})}
      </div>

      {!props.nav ? null : (
        <Navs>
          {Slides.map((slide, idx) => (
            <Navs.Item 
              key={idx} 
              active={idx === activeIndex}
              onClick={() => setActive(idx)}
            >{slide.props.label}</Navs.Item>
          ))}
        </Navs>
      )}

      {!props.arrow ? null : (
        <div className="unslider-arrows">
          {!props.infinite && activeIndex === 0 ? null : (
            <div className="unslider-arrow prev" onClick={prev}></div>
          )}
          {!props.infinite && activeIndex === Slides.length - 1 ? null : (
            <div className="unslider-arrow next" onClick={next}></div>
          )}
        </div>
      )}
    </div>
  );
}

Unslider.Item = function(props) {
  return (
    <div className="unslider-items" {...props} />
  );
}

Unslider.defaultProps = {
  width: 300,
  height: 189,
  autoplay: false,
  loop: true,
  delay: 3000,
  speed: 750,
  easing: 'linear', // [.42, 0, .58, 1],
  keys: {
    prev: 37,
    next: 39
  },
  nav: true,
  arrow: true,
  animation: 'horizontal',
  onChange(index) {
    console.log(index);
  }
}