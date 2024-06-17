// styles
import cn from "classnames";
import styles from "./index.module.scss";
// react
import { FC, PropsWithChildren } from "react";

interface IProps
  extends PropsWithChildren<Omit<React.HTMLProps<HTMLButtonElement>, "size">> {
  text: string;
  className?: string;
}

export const Button: FC<IProps> = ({ text, onClick, className }) => (
  <button
    className={cn(styles.btn, className ? ` ${className}` : null)}
    onClick={onClick}
  >
    {text}
  </button>
);
