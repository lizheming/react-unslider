import React from 'react';
import cls from 'classnames';

import {calcOffsetByActive} from './helper';
import Navs from './components/Navs';
import Arrows from './components/Arrows';
import Item from './components/Item';

import './style.css';

export default class Unslider extends React.Component {
  static Item = Item;
  static defaultProps = {
    width: 300,
    height: 189,
    spaceBetween: 0,
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

  state = this.getInitialState()
  getInitialState(props = this.props) {
    const Slides = props.children.filter(child => child.type === Unslider.Item);
    
    const defaultIndex = Slides.findIndex(slide => slide.props.defaultActive === true);
    const activeIndex = Slides.findIndex(slide => slide.props.active === true);
    let index = 0;
    if(activeIndex !== -1) {
      index = activeIndex;
    } else if(defaultIndex !== -1) {
      index = defaultIndex;
    }

    return {Slides, activeIndex: index, dragOffset: 0};
  }

  componentDidMount() {
    const {onChange, autoplay, delay} = this.props;
    const {activeIndex} = this.state;
    if(typeof onChange === 'function') {
      onChange(activeIndex);
    }
    
    if(autoplay) {
      this.playAuto();
    }
  }
  
  componentWillUnmount() {
    if(this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  pauseAuto() {
    if(this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  playAuto() {
    if(this.intervalId) {
      return;
    }

    const {delay} = this.props;
    this.intervalId = setInterval(() => {
      const {activeIndex} = this.state;
      this.setActiveIndex(activeIndex + 1);
    }, delay);
  }

  setActiveIndex(nextIndex) {
    const {Slides, activeIndex, dragOffset} = this.state;
    if(activeIndex === nextIndex && dragOffset === 0) {
      return;
    }

    const {loop, animation, speed, easing, onChange} = this.props;
    let nextActiveIndex = nextIndex
    if(loop) {
      if(nextIndex < 0) {
        nextActiveIndex = Slides.length - 1;
      } else if(nextIndex >= Slides.length) {
        nextActiveIndex = 0;
      }
    } else {
      nextActiveIndex = Math.max(0, Math.min(nextActiveIndex, Slides.length - 1));
    }

    if(!Element.prototype.animate || !this.wrap) {
      this.setState({activeIndex: nextActiveIndex, dragOffset: 0}, () => {
        if(typeof onChange === 'function') {
          onChange(this.state.activeIndex);
        }
      });
    }

    if(this.animate && this.animate.playState !== 'finished') {
      return;
    }

    const startOffset = calcOffsetByActive(activeIndex, Slides.length, this.props) + dragOffset;
    const endOffset = calcOffsetByActive(nextIndex, Slides.length, this.props);
    
    this.animate = this.wrap.animate({
      [animation !== 'vertical' ? 'marginLeft' : 'marginTop']: [
        startOffset + 'px',
        endOffset + 'px'
      ]
    }, {duration: speed, delay: 0, easing});
    this.animate.onfinish = () => {
      this.animate = undefined;
      this.setState({activeIndex: nextActiveIndex, dragOffset: 0}, () => {
        if(typeof onChange === 'function') {
          onChange(this.state.activeIndex);
        }
      });
    };
  }

  render() {
    const {Slides, activeIndex, dragOffset} = this.state;
    const {className, autoplay, animation, width, height, nav, arrow, loop, keys, spaceBetween} = this.props;


    const offset = calcOffsetByActive(activeIndex, Slides.length, this.props);
    const wrapStyle = {
      [animation !== 'vertical' ? 'width' : 'height']: (loop ? Slides.length + 2 : Slides.length) * (width + spaceBetween),
      [animation !== 'vertical' ? 'marginLeft' : 'marginTop']: offset + dragOffset
    };

    const renderSlides = [...Slides];
    if(loop) {
      renderSlides.push(React.cloneElement(Slides[0], {key: 'first-clone'}));
      renderSlides.unshift(React.cloneElement(Slides[Slides.length - 1], {key: 'last-clone'}));
    }
    return (
      <div 
        className={cls('unslider-container', className)} 
        style={{width, height}}
        onMouseEnter={() => autoplay && this.pauseAuto()}
        onMouseLeave={() => autoplay && this.playAuto()}  
      >
        <div 
          className={cls('unslider-wrap', `unslider-${animation}`)}
          ref={dom => this.wrap = dom}
          style={wrapStyle}
        >
          {React.Children.map(renderSlides, slide => 
            React.cloneElement(slide, {
              style: {
                width, height,
                [animation === 'vertical' ? 'marginBottom' : 'marginRight']: spaceBetween
              },
              onOffsetChange: delta => {
                const {horizontal, vertical} = delta;
                const {animation} = this.props;
                this.setState({dragOffset: animation !== 'vertical' ? horizontal : vertical});
              },
              onChange: status => {
                const {horizontal, vertical} = status;
                const {activeIndex} = this.state;
                const {animation} = this.props;
                switch(animation !== 'vertical' ? horizontal : vertical) {
                  case 1: 
                    return this.setActiveIndex(activeIndex - 1);
                  case -1:
                    return this.setActiveIndex(activeIndex + 1);
                  case 0:
                  default:
                    return this.setActiveIndex(activeIndex);
                }
              }
            })  
          )}
        </div>

        {!nav ? null : (
          <Navs>
            {Slides.map((slide, idx) => (
              <Navs.Item 
                key={idx} 
                active={idx === activeIndex}
                onClick={() => this.setActiveIndex(idx)}
              >{slide.props.label}</Navs.Item>
            ))}
          </Navs>
        )}

        {!arrow ? null : (
          <Arrows>
            <Arrows.Prev 
              active={loop || activeIndex !== 0}
              hotkey={keys && keys.prev} 
              onClick={() => this.setActiveIndex(activeIndex - 1)} 
            />
            <Arrows.Next 
              active={loop || activeIndex !== Slides.length - 1}
              hotkey={keys && keys.next}
              onClick={() => this.setActiveIndex(activeIndex + 1)}
            />
          </Arrows>
        )}
      </div>
    );
  }
}