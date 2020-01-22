import React, {useEffect} from 'react';
import cls from 'classnames';

function ArrowGenerator(actionName, defaultHotKey) {
  return function({hotkey = defaultHotKey, active, onClick}) {
    useEffect(() => {
      function handler(e) {
        if(e.which !== hotkey) {
          return;
        }
        onClick(e);
      }
      document.addEventListener('keyup', handler);
      return () => document.removeEventListener('keyup', handler);
    }, [onClick]);
    
    return (
      <div 
        className={cls('unslider-arrow', actionName, {disabled: !active})} 
        onClick={onClick} 
      />
    );
  }
}

export default function Arrow(props) {
  return (
    <div className="unslider-arrows">{props.children}</div>
  );
}

Arrow.Prev = ArrowGenerator('prev', 37);
Arrow.Next = ArrowGenerator('next', 39);
