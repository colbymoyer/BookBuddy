import { Link } from "react-router-dom";

function Navigations() {
  return (
    <>
      <nav className="navbar">
        <Link to="/books">Books</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Log In</Link>
        <Link to="/account">Account</Link>
      </nav>
    </>
  );
}

export default Navigations;