export interface IRowId {
  id: string;
  checked: boolean;
}

export interface IRowValues {
  values: Array<{
    [x: string]: string | number | Array<IRowId & IRowValues>;
  }>;
}
