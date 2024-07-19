import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/",
    prepareHeaders: (headers) => {
      const sessionToken = window.sessionStorage.getItem("Token");
      if (sessionToken) {
        headers.set("Authorization", `Bearer ${sessionToken}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Book"],
  endpoints: () => ({}),
});