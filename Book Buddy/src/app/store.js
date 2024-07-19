import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import bookReducer from "../components/Books/BooksSlice";
import registerReducer from "../components/Register/RegisterSlice";
import loginReducer from "../components/Login/LoginSlice"
import accountReducer from "../components/Account/AccountSlice"
import singleBookReducer from "../components/SingleBook/SingleBookSlice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    book: bookReducer,
    register: registerReducer,
    login: loginReducer,
    account: accountReducer,
    singleBook: singleBookReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});