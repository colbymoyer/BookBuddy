import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "books",
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["Book"],
    }),
  }),
});

const bookSlice = createSlice({
  name: "books",
  initialState: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getBooks.matchFulfilled,
      (state, { payload }) => {
        return JSON.parse(payload);
      }
    );
  },
});

export default bookSlice.reducer;
export const { useGetBooksQuery } = bookApi;