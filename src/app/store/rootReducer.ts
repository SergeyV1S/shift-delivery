import { authSlice } from "@modules/auth";
import { costCalculationSlice } from "@modules/cost-calculation/store";
import { createOrderSlice } from "@modules/order";
import { userSlice } from "@modules/user";
import { combineSlices } from "@reduxjs/toolkit";

export const rootReducer = combineSlices(
  authSlice,
  costCalculationSlice,
  userSlice,
  createOrderSlice
);
