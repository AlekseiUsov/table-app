//styles
import styles from "./index.module.scss";
import cn from "classnames";
// react
import { ChangeEvent, FC, MouseEvent } from "react";
// routing
import { Link, useLocation } from "react-router-dom";
// components
import { Checkbox } from "../Checkbox/Checkbox.tsx";
import { Button } from "../Button/Button.tsx";
import { EditIcon } from "../../assets/icons";
// variables
import { all } from "../../variables/variables.ts";
// types
import { IRowId, IRowValues } from "../../types/common.ts";

interface IProps {
  title?: string;
  data: Array<IRowId & IRowValues>;
  onChangeCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
  deleteItem?: (event: MouseEvent<HTMLButtonElement>) => void;
  columns: string[];
  description?: string;
  buttonText?: string;
  editLink?: string;
  addLink?: string;
  optionalButton?: {
    path: string;
    text: string;
    children: Array<IRowId & IRowValues> | null;
  };
}

export const Table: FC<IProps> = ({
  title,
  data,
  onChangeCheckbox,
  deleteItem,
  columns,
  description,
  buttonText,
  editLink,
  addLink,
  optionalButton,
}) => {
  const location = useLocation();
  const selectedAll = data.every((el) => el.checked);
  // TODO сделать чтобы если содержимое даты больше колонок, то данные для колонок обрезались

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">
                <Checkbox
                  text={"Выделить все".replace(/ /g, "\u00A0")}
                  id={all}
                  checked={selectedAll}
                  onChangeCheckbox={(e) => onChangeCheckbox(e)}
                />
              </th>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, checked, values }) => (
              <tr
                key={id}
                className={cn({
                  [styles.selected]: !!checked,
                })}
              >
                <td scope="row">
                  <Checkbox
                    id={id}
                    checked={checked}
                    onChangeCheckbox={(e) => onChangeCheckbox(e)}
                  />
                </td>
                {values.map((row, index) => {
                  for (const key in row) {
                    return (
                      // Todo подумать над другими вариантами реализации
                      <td key={key} id={key}>
                        {Array.isArray(row[key]) ? (
                          row[key].length
                        ) : (
                          <Link
                            to={editLink ?? "/edit"}
                            className={styles.icon}
                            state={{
                              background: location,
                              name: [key],
                              field: [columns[index]],
                              id,
                            }}
                          >
                            {row[key]} {EditIcon}
                          </Link>
                        )}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {description && <span className={styles.description}>{description}</span>}
      <div className={styles.inner}>
        <Button onClick={deleteItem} text={`Удалить ${buttonText}`} />
        <Link
          to={addLink ?? "/"}
          state={{
            background: location,
          }}
        >
          <Button text={`Добавить ${buttonText}`} />
        </Link>
        {optionalButton &&
          optionalButton.children &&
          !optionalButton.children.length && (
            <Link
              to={optionalButton.path ?? "/"}
              state={{
                background: location,
              }}
            >
              <Button text={`Добавить ${optionalButton.text}`} />
            </Link>
          )}
      </div>
    </div>
  );
};
