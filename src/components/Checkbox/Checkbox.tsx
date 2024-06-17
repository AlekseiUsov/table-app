import styles from "./index.module.scss";
import { FC, ChangeEvent } from "react";

interface IProps {
  text?: string;
  id?: string;
  checked?: boolean;
  onChangeCheckbox?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<IProps> = ({
  text,
  checked,
  id,
  onChangeCheckbox,
}) => {
  return (
    <>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={checked}
          id={id}
          onChange={onChangeCheckbox}
        />
        <span>{text ? text : null}</span>
      </label>
    </>
  );
};
