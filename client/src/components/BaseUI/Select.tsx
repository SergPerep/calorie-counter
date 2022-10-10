import { ChangeEventHandler, useRef } from "react";
type SelectPops = {
  label: string;
  id: string;
  options: {
    name: string;
    value: string;
  }[];
  placeholder?: string;
  isRequired?: boolean;
  suffix?: string;
  className?: string;
  selectedValue: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

const Select = ({
  label = "Select",
  id,
  options = [],
  placeholder = "",
  isRequired = false,
  suffix = "",
  className = "",
  selectedValue,
  onChange = () => {},
}: SelectPops) => {
  const selectEl = useRef<HTMLSelectElement>(null);

  const handleFieldClick = () => {
    if (selectEl.current) selectEl.current.focus();
  };
  return (
    <div className={`select-field ${className}`}>
      <label htmlFor={id}>{label}</label>
      <div className="field" onClick={handleFieldClick}>
        <select
          id={id}
          ref={selectEl}
          required={isRequired}
          value={selectedValue}
          onChange={onChange}
          className={!selectedValue ? "placeholder-is-visible" : ""}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <div className="appendix">
          {suffix && <span className="suffix">{suffix}</span>}
          <div className="arrow-icon">
            <span className="material-symbols-outlined solid-icon">
              arrow_drop_down
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
