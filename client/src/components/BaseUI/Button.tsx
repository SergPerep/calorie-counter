import { MouseEventHandler } from "react";

const Button = ({
  type = "default",
  onClick = () => {},
  children,
  isDisabled = false,
}: {
  type?: "default" | "secondary";
  isDisabled?: boolean;
  children: any;
  onClick?: MouseEventHandler;
}) => {
  return (
    <button
      className={`button ${type}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
