// types
import { IRowId, IRowValues } from "../../types/common";
// utils
import { changeItemValue } from "./changeItemValue";

export const changeItemInputValue = (
  items: Array<IRowId & IRowValues>,
  id: string,
  name: string,
  newValue: string
) => {
  const result: Array<IRowId & IRowValues> = [];
  for (const item of items) {
    if (item.id === id) {
      const cur = {
        ...item,
        values: changeItemValue(item.values, name, newValue),
      };
      result.push(cur);
    } else {
      result.push(item);
    }
  }
  return result;
};
