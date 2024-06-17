// styles
import styles from "./index.module.scss";
import cn from "classnames";
// react
import { ChangeEvent } from "react";
// components
import { Table } from "../../components/Table/Table";
// store
import { useAppSelector, useAppDispatch } from "../../store/store";
import { companiesSelector } from "../../store/selectors/selectors";
// actions
import {
  changeCompanyesCheckboxesValue,
  changeWorkersCheckboxesValue,
  deleteCompany,
  deleteWorker,
  setWorkers,
} from "../../store/reducers/companiesReducer";
// utils
import { getWorkersCount } from "../../utils/table";

export const Main = () => {
  const { companies, workers } = useAppSelector(companiesSelector);
  const dispatch = useAppDispatch();

  const setCompany = (e: ChangeEvent) => {
    dispatch(changeCompanyesCheckboxesValue(e.target.id));
    dispatch(setWorkers());
  };

  const selectedOne = companies.filter((el) => el.checked);
  const description =
    selectedOne.length === 1 ? getWorkersCount(workers?.length) : undefined;

  return (
    <div
      className={cn({
        [styles.wrapper]: !workers,
        [styles.hasWorkers]: !!workers && workers.length > 0,
      })}
    >
      <Table
        title="Список компаний"
        data={companies}
        onChangeCheckbox={(e: ChangeEvent) => setCompany(e)}
        columns={["Название компании", "Кол-во сотрудников", "Адрес"]}
        description={description}
        deleteItem={() => dispatch(deleteCompany())}
        buttonText="компанию"
        addLink="/newcompany"
        optionalButton={{
          path: "/newworker",
          text: "сотрудника",
          children: workers,
        }}
      />
      {workers && workers.length > 0 && (
        <Table
          title="Список сотрудников"
          data={workers}
          onChangeCheckbox={(e: ChangeEvent) =>
            dispatch(changeWorkersCheckboxesValue(e.target.id))
          }
          columns={["Фамилия", "Имя", "Должность"]}
          buttonText="сотрудника"
          deleteItem={() => dispatch(deleteWorker())}
          addLink="/newworker"
        />
      )}
      {!workers && null}
    </div>
  );
};
