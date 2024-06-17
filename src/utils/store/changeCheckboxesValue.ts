// types
import { IRowId, IRowValues } from "../../types/common";
// variables
import { all } from "../../variables/variables";

export const changeCheckboxesValue = (
  key: string,
  rows: Array<IRowId & IRowValues>
) => {
  const selectedAll = rows.every((el) => el.checked);
  if (key === all && !selectedAll) {
    return rows.map((row) => ({
      ...row,
      checked: true,
    }));
  }
  if (key === all && selectedAll) {
    return rows.map((row) => ({
      ...row,
      checked: false,
    }));
  }
  if (key !== all && selectedAll) {
    return rows.map((row) =>
      row.id === key ? { ...row, checked: !row.checked } : { ...row }
    );
  } else {
    return rows.map((row) =>
      row.id === key ? { ...row, checked: !row.checked } : row
    );
  }
};
