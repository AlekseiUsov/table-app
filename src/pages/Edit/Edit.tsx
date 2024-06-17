// react
import { FC, FormEvent, useCallback, useState } from "react";
// routing
import { useLocation, useNavigate } from "react-router-dom";
// store
import { useAppDispatch } from "../../store/store";
// components
import { Form } from "../../components/Form/Form";
import { Modal } from "../../components/Modal/Modal";
// actions
import { changeInputsValue } from "../../store/reducers/companiesReducer";

export const Edit: FC = () => {
  const [value, setValue] = useState<{ [k: string]: string }>({});

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { name, id, field } = location.state;

  const sendForm = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      navigate("/");
      dispatch(
        changeInputsValue({
          id,
          name,
          newValue: Object.values(value)[0],
        })
      );
    },
    [navigate, dispatch, name, id, value]
  );

  return (
    <Modal>
      <Form
        buttonText="Изменить"
        setPageValue={setValue}
        fields={name}
        labels={field}
        sendForm={sendForm}
      />
    </Modal>
  );
};
