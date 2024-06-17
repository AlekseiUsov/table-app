//uniqid
import uniqid from "uniqid";

export const addValuesToObject = <T extends object>(data: Array<T>) => {
  const result = [];
  for (const item of data) {
    for (const key in item) {
      if (Array.isArray(item[key]) && item[key].length) {
        const newValue = item[key].map((el) => ({
          id: uniqid(),
          checked: false,
          ...el,
        }));
        item[key] = newValue as T[typeof key];
      }
    }
    result.push({ id: uniqid(), checked: false, ...item });
  }
  return result;
};
