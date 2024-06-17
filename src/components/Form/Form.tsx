// styles
import styles from "./index.module.scss";
// react
import { ChangeEvent, FC, FormEvent, useState } from "react";
// components
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

interface IProps {
  fields: string[];
  labels: string[];
  buttonText: string;
  sendForm: (event: FormEvent<HTMLFormElement>) => void;
  setPageValue: (values: { [k: string]: string }) => void;
}

export const Form: FC<IProps> = ({
  fields,
  labels,
  buttonText,
  sendForm,
  setPageValue,
}) => {
  const defaultValue = Object.fromEntries(fields.map((key) => [key, ""]));
  const [formValues, setFormValues] = useState(defaultValue);

  const handleFormValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setPageValue({ ...formValues, [name]: value });
  };

  return (
    <form className={styles.form} onSubmit={sendForm}>
      {fields.map((el, index) => (
        <Input
          key={index}
          label={labels[index]}
          name={el}
          value={formValues[el]}
          onChange={(e) => handleFormValues(e)}
        />
      ))}
      <Button className={styles.button} text={buttonText} />
    </form>
  );
};
