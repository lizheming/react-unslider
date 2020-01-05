import React from 'react';
import cls from 'classnames';

export default function Navs(props) {
  return (
    <nav className={props.className}>
      <ol>{props.children}</ol>
    </nav>
  )
}

Navs.Item = function(props) {
  props.className = cls(props.className, {
    active: props.active
  });
  
  return (
    <li {...props}/>
  );
}