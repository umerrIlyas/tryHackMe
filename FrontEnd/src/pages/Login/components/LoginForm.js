import { useState } from "react";
import { loginFields } from "../../../constants/index";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fields = loginFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.name] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.name]: e.target.value });
  };
  const notify = (mesg) => {
    toast(mesg);
    navigate("/Home");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post(`http://localhost:5001/api/auth/login`, loginState)
      .then(function (response) {
        const result = response.data;
        const { tasks, ...rest } = result;
        localStorage.setItem("user", JSON.stringify(rest));
        notify("Login successful");
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        setErrorMsg(error.response.data.error.message);
      })
      .finally(function () {});
  }
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <div>
        <Button action="submit" text="Login" />
        <span className="text-red-600 pt-2 text-sm">{errorMsg}</span>
      </div>
    </form>
  );
}
