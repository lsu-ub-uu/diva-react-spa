import React from 'react';
import './button.css';

interface ButtonProps {
  label: string;
}

function Button(props: ButtonProps): JSX.Element {
  return <button type='button'>{props.label}</button>;
}

export default Button;
