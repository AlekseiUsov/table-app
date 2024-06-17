// react
import { FC, FormEvent, useCallback, useState } from "react";
// routing
import { useNavigate } from "react-router-dom";
// store
import { useAppDispatch } from "../../store/store";
// components
import { Form } from "../../components/Form/Form";
import { Modal } from "../../components/Modal/Modal";
// actions
import { addCompany } from "../../store/reducers/companiesReducer";

export const AddNewCompany: FC = () => {
  const [companies, setCompanies] = useState<{ [k: string]: string }>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sendForm = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      navigate("/");
      dispatch(addCompany(companies));
    },
    [navigate, dispatch, companies]
  );

  return (
    <Modal>
      <Form
        buttonText="Добавить"
        setPageValue={setCompanies}
        fields={["name", "adress"]}
        labels={["Название компании", "Адрес"]}
        sendForm={sendForm}
      />
    </Modal>
  );
};
