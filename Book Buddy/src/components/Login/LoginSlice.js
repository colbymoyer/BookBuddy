import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
      invalidateTags: ["User"],
    }),
  }),
});

const storeToken = (state, { payload }) => {
  window.sessionStorage.setItem("Token", payload.token)
};

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});

export default loginSlice.reducer;
export const { useLoginMutation } = loginApi;