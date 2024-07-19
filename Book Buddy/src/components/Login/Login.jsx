import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./LoginSlice";

export default function Login() {
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const updateForm = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      let success = false;
      success = await loginUser(form).unwrap();
      if (success) {
        navigate("/books");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="loginForm" onSubmit={submit}>
        <label>E-Mail Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter E-mail Address"
          onChange={updateForm}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={updateForm}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}