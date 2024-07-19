import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["Account"],
    }),
    getReservations: builder.query({
      query: () => ({
        url: "reservations",
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["Reservations"],
    }),
    deleteReservations: builder.mutation({
      query: (reservationId) => ({
        url: `reservations/${reservationId}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["Reservations"],
    }),
  }),
});

const accountSlice = createSlice({
  name: "account",
  initialState: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getAccount.matchFulfilled,
      (state, { payload }) => {
        return JSON.parse(payload);
      }
    );
    builder.addMatcher(
      api.endpoints.getReservations.matchFulfilled,
      (state, { payload }) => {
        return JSON.parse(payload);
      }
    );
    builder.addMatcher(
      api.endpoints.deleteReservations.matchFulfilled,
      (state, { payload }) => {
        return JSON.parse(payload);
      }
    );
  },
});

export default accountSlice.reducer;
export const {
  useGetAccountQuery,
  useGetReservationsQuery,
  useDeleteReservationsMutation,
} = accountApi;