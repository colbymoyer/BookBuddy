import bookLogo from "./assets/books.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./components/Account/Account";
import Books from "./components/Books/Books";
import Login from "./components/Login/Login";
import Navigations from "./components/Navigations";
import Register from "./components/Register/Register";
import SingleBook from "./components/SingleBook/SingleBook";

export default function App() {
  return (
    <>
      <h1 className="library">
        <img id="logo-image" src={bookLogo} />Colby's Library App</h1>
      <BrowserRouter>
        <Navigations />
          <Routes>
            <Route path="/account" element={<Account />} />
            <Route path="/" element={<Books />} />
            <Route path="/books" element={<Books />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books/:bookId" element={<SingleBook />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}