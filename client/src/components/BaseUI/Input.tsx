import { ChangeEventHandler, useRef, useState } from "react";

type InputProps = {
  label?: string;
  id: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  hintStr?: string;
  type?: "text" | "number";
  className?: string;
  hideLabel?: boolean;
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
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState("");
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setValue(e.target.value);
  const inputEl = useRef<HTMLInputElement>(null);
  const handleClickField = () => inputEl.current?.focus();
  return (
    <div className={`input-field ${className}`}>
      <label htmlFor={id} className={hideLabel ? "hidden" : ""}>
        {label}
      </label>
      <div
        className={`field ${isFocused ? "focused" : ""} ${
          isError ? "error" : ""
        }`}
        onClick={handleClickField}
      >
        {prefix && <span className="prefix">{prefix}</span>}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          onChange={handleInputChange}
          value={value}
          ref={inputEl}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {suffix && <span className="suffix">{suffix}</span>}
      </div>
      {hintStr && <div className={`hint ${isError && "error"}`}>{hintStr}</div>}
    </div>
  );
};

export default Input;
