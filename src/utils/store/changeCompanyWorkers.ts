// types
import { IRowId, IRowValues } from "../../types/common";

const replaceWorkers = (
  items: Array<{
    [x: string]: string | number | Array<IRowId & IRowValues>;
  }>,
  newWorkers: Array<IRowId & IRowValues>
) => {
  const result = [];
  for (const item of items) {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];
    const current = { [key]: Array.isArray(value) ? newWorkers : value };
    result.push(current);
  }
  return result;
};

export const changeCompanyWorkers = (
  id: string,
  newWorkers: Array<IRowId & IRowValues>,
  companies: Array<IRowId & IRowValues>
) => {
  return companies.map((company) =>
    company.id === id
      ? {
          id: company.id,
          checked: company.checked,
          values: replaceWorkers(company.values, newWorkers),
        }
      : company
  );
};
