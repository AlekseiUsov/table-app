// types
import { IRowId, IRowValues } from "../../types/common";

const getRowsValues = <T>(data: IRowId & T) => {
  const result = [];
  for (const [key, value] of Object.entries(data)) {
    if (key !== "id" && key !== "checked") {
      result.push({ [key]: value });
    }
  }
  return result;
};

export const tableRowsAdapter = <T>(
  rows: Array<IRowId & T>
): Array<IRowId & IRowValues> => {
  return rows.map((row) => {
    return {
      id: row.id,
      checked: false,
      values: getRowsValues(row),
    };
  });
};
