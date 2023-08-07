interface ControlledSelectFieldProps {
  name: string;
}

export const ControlledSelectField = (props: ControlledSelectFieldProps) => {
  return <div>{props.name}</div>;
};
