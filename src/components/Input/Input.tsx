// styles
import styles from "./index.module.scss";
import cn from "classnames";
// react
import { ChangeEvent, FC, useState } from "react";

interface IProps extends Omit<React.HTMLProps<HTMLInputElement>, "size"> {
  id?: string;
  type?: "primary" | "secondary";
  label?: string;
  name: string;
  value: string;
  path?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<IProps> = ({
  type,
  label,
  name,
  value,
  id,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e);
  };
  return (
    <>
      <label className={styles.label}>
        {label}
        <input
          id={id}
          className={cn(styles.input, {
            [styles.primary]: !type,
            [styles.secondary]: !!type,
          })}
          type="text"
          name={name}
          value={inputValue}
          onChange={(e) => handleInputValue(e)}
        />
      </label>
    </>
  );
};
