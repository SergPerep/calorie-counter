import { ChangeEventHandler, useRef, useState } from "react";

type InputProps = {
  label?: string;
  id: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  hintStr?: string;
  value: string | number;
  type?: "text" | "number";
  className?: string;
  hideLabel?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isValid?: boolean;
};

const Input = ({
  label = "Label",
  id,
  prefix = "",
  suffix = "",
  placeholder = "Placeholder",
  hintStr = "",
  type = "text",
  className = "",
  hideLabel = false,
  value,
  onChange,
  isDisabled = false,
  isValid = true,
}: InputProps) => {
  const checkValue = (value: string | number) => {
    if (typeof value === "number") {
      if (isNaN(value)) return "";
    }
    return value;
  };

  value = checkValue(value);

  const [isFocused, setIsFocused] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const handleClickField = () => inputEl.current?.focus();
  return (
    <div className={`input-field ${className}`}>
      <label htmlFor={id} className={hideLabel ? "hidden" : ""}>
        {label}
      </label>
      <div
        className={`field ${isFocused ? "focused" : ""} ${
          isValid ? "" : "error"
        }`}
        onClick={handleClickField}
      >
        {prefix && <span className="prefix">{prefix}</span>}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          ref={inputEl}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isDisabled}
        />
        {suffix && <span className="suffix">{suffix}</span>}
      </div>
      {hintStr && (
        <div className={`hint ${!isValid && "error"}`}>{hintStr}</div>
      )}
    </div>
  );
};

export default Input;
