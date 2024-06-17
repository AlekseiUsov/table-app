//RKT
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector as selectorHook,
} from "react-redux";

// slices
import { companiesSlice } from "./reducers/companiesReducer";

export const store = configureStore({
  reducer: { companies: companiesSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
