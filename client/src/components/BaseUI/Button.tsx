const Button = ({
  type = "default",
  children,
  isDisabled = false,
}: {
  type?: "default" | "secondary";
  isDisabled?: boolean;
  children: any;
}) => {
  return (
    <button className={`button ${type}`} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
