import './button.css';

interface ButtonProps {
  label: string;
}

export const Button = (props: ButtonProps): JSX.Element => {
  return <button type='button'>{props.label}</button>;
};
