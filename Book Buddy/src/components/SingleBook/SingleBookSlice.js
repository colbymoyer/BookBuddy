import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSingleBook: builder.query({
      query: (bookId) => ({
        url: `books/${bookId}`,
        method: "GET",
        responseHandler: (response) => response.text(),
      }),
      providesTags: ["Book"],
    }),
    updateAvailability: builder.mutation({
      query: ({ bookId, available }) => ({
        url: `books/${bookId}`,
        method: "PATCH",
        body: { available },
      }),
    }),
  }),
});

const singleBookSlice = createSlice({
  name: "book",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.getSingleBook.matchFulfilled,
        (state, { payload }) => {
          return JSON.parse(payload);
        }
      )
      .addMatcher(
        api.endpoints.updateAvailability.matchFulfilled,
        (state, { payload }) => {
          return JSON.parse(payload);
        }
      );
  },
});

export default singleBookSlice.reducer;
export const { useGetSingleBookQuery, useUpdateAvailabilityMutation } = bookApi;