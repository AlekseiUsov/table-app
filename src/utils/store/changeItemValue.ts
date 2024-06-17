import { IRowId, IRowValues } from "../../types/common";

export const changeItemValue = (
  values: Array<{
    [x: string]: string | number | Array<IRowId & IRowValues>;
  }>,
  name: string,
  newValue: string
) => {
  const result: Array<{
    [x: string]: string | number | Array<IRowId & IRowValues>;
  }> = [];
  for (const value of values) {
    const k = Object.keys(value)[0];
    const v = Object.values(value)[0];
    if (k === name) {
      result.push({ [k]: newValue });
    } else {
      result.push({ [k]: v });
    }
  }
  return result;
};
