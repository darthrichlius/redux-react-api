import { createAction } from "@reduxjs/toolkit";
import type {
  ApiRequestActionPayload,
  ApiResponseFailedActionPayload,
  ApiResponseSuccessActionPayload,
} from "@store/middleware/api.middleware";

export const apiRequestBegan =
  createAction<ApiRequestActionPayload>("api/requestBegan");
export const apiRequestSuccess =
  createAction<ApiResponseSuccessActionPayload>("api/requestSuccess");
export const apiRequestFailed =
  createAction<ApiResponseFailedActionPayload>("api/requestFailed");
