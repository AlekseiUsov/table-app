// types
import { IRowId, IRowValues } from "../../types/common";

export const getCompanyWorkers = (companies: Array<IRowId & IRowValues>) => {
  const checkedCompanies = companies.filter((company) => company.checked);

  if (checkedCompanies.length === 1) {
    const values = checkedCompanies[0].values;
    const companyId = checkedCompanies[0].id;
    for (const value of values) {
      const current = Object.values(value)[0];
      if (Array.isArray(current)) {
        return { id: companyId, workers: current };
      }
    }
  }
  return { id: null, workers: null };
};
