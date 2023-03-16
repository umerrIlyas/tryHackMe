import { useState } from "react";
import { signupFields } from "../../../constants/index";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.name] = ""));

export default function Signup() {
  const navigate = useNavigate();
  const [signupState, setSignupState] = useState(fieldsState);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };
  const notify = (mesg) => {
    toast(mesg);
    navigate("/");
  };

  const createAccount = async () => {
    const finalPayload = {
      name: signupState.username,
      email: signupState.email,
      password: signupState.password,
    };

    await axios
      .post(`http://localhost:5001/api/auth/register`, finalPayload)
      .then(function (response) {
        console.log(response.data);
        notify(response.data.message);
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        setErrorMsg(error.response.data.error.message);
      })
      .finally(function () {});
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <Button text="Signup" />
        <span className="text-red-600 pt-2 text-sm">{errorMsg}</span>
      </div>
    </form>
  );
}
