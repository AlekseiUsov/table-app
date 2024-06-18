// react
//RTK
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
// types
import { IRowId, IRowValues } from "../../types/common";
//uniqid
import uniqid from "uniqid";
// mokData
import { mokData } from "./mokData";
// utils
import {
  changeCheckboxesValue,
  changeCompanyWorkers,
  getCompanyWorkers,
} from "../../utils/store";
import { changeItemInputValue } from "../../utils/store/changeItemInput";
import { tableRowsAdapter } from "../../utils/table";

interface IState {
  companyId: string | null;
  companies: Array<IRowId & IRowValues>;
  workers: Array<IRowId & IRowValues> | null;
}

const initialState: IState = {
  companyId: null,
  companies: mokData,
  workers: null,
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    changeCompanyesCheckboxesValue(state, action: PayloadAction<string>) {
      state.companies = changeCheckboxesValue(action.payload, state.companies);
    },
    changeInputsValue(state, action: PayloadAction<{ [k: string]: string }>) {
      const { id, name, newValue } = action.payload;
      if (!state.workers) {
        state.companies = changeItemInputValue(
          current(state.companies),
          id,
          name[0],
          newValue
        );
      } else {
        const newWorkers = changeItemInputValue(
          current(state.workers),
          id,
          name[0],
          newValue
        );
        if (state.companyId) {
          state.companies = changeCompanyWorkers(
            state.companyId,
            newWorkers,
            state.companies
          );
          state.workers = newWorkers;
        }
      }
    },
    changeWorkersCheckboxesValue(state, action: PayloadAction<string>) {
      state.workers =
        state.workers && changeCheckboxesValue(action.payload, state.workers);
    },
    addCompany(state, action: PayloadAction<{ [k: string]: string }>) {
      const newValues = Object.entries(action.payload).map(([key, value]) => ({
        [key]: value,
      }));
      const newCompany: IRowId & IRowValues = {
        id: uniqid(),
        checked: false,
        values: [newValues[0], { workers: [] }, newValues[1]],
      };
      state.companies = [...state.companies, newCompany];
    },
    deleteCompany(state) {
      state.companies = state.companies.filter((company) => !company.checked);
      state.workers = null;
    },
    setWorkers(state) {
      const { id, workers } = getCompanyWorkers(current(state.companies));
      if (workers && workers[0].values) {
        state.workers = workers;
        state.companyId = id;
        current;
      } else {
        state.workers = workers && tableRowsAdapter(workers);
        state.companyId = id;
      }
    },
    deleteWorker(state) {
      const { id } = getCompanyWorkers(current(state.companies));
      state.workers =
        state.workers && state.workers.filter((worker) => !worker.checked);
      if (id && state.workers) {
        state.companies = changeCompanyWorkers(
          id,
          state.workers,
          current(state.companies)
        );
      }
    },
    addWorker(state, action: PayloadAction<{ [k: string]: string }>) {
      const values = Object.entries(action.payload).map(([key, value]) => ({
        [key]: value,
      }));
      const newWorker: IRowId & IRowValues = {
        id: uniqid(),
        checked: false,
        values,
      };
      state.workers = state.workers
        ? [...state.workers, newWorker]
        : [newWorker];
      const { id } = getCompanyWorkers(current(state.companies));
      if (id && state.workers) {
        state.companies = changeCompanyWorkers(
          id,
          state.workers,
          current(state.companies)
        );
      }
    },
  },
});

export default companiesSlice.reducer;

export const {
  changeCompanyesCheckboxesValue,
  changeInputsValue,
  changeWorkersCheckboxesValue,
  setWorkers,
  deleteCompany,
  addCompany,
  deleteWorker,
  addWorker,
} = companiesSlice.actions;
