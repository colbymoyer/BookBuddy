import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./RegisterSlice";

export default function Register() {
  const [registerUser] = useRegisterMutation();
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
      success = await registerUser(form).unwrap();
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
        <label>First Name</label>
        <input
          type="text"
          name="firstname"
          placeholder="Enter First Name"
          onChange={updateForm}
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastname"
          placeholder="Enter Last Name"
          onChange={updateForm}
        />
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter E-Mail"
          onChange={updateForm}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={updateForm}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
}