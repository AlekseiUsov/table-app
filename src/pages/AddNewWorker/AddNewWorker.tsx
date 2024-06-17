// react
import { FC, FormEvent, useState } from "react";
// store
import { useAppDispatch } from "../../store/store";
// routing
import { useNavigate } from "react-router-dom";
// components
import { Form } from "../../components/Form/Form";
import { Modal } from "../../components/Modal/Modal";
// actions
import { addWorker } from "../../store/reducers/companiesReducer";

export const AddNewWorker: FC = () => {
  const [workers, setWorkers] = useState<{ [k: string]: string }>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sendForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate("/");
    dispatch(addWorker(workers));
  };

  return (
    <Modal>
      <Form
        buttonText="Добавить"
        setPageValue={setWorkers}
        fields={["surname", "name", "post"]}
        labels={["Фамилия", "Имя", "Должность"]}
        sendForm={sendForm}
      />
    </Modal>
  );
};
