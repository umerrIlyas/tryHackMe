/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import Button from "../../../components/Button";
import { taskFields } from "../../../constants/index";
import Input from "../../../components/Input";
import axios from "axios";
import { toast } from "react-toastify";

const fields = taskFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.name] = ""));
export default function Modal({ updateRec }) {
  const [taskState, setTaskState] = useState(fieldsState);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setTaskState({ ...taskState, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    createAccount();
  }

  const notify = (mesg) => {
    toast(mesg);
    setShowModal(false);
    updateRec();
  };

  //handle Signup API Integration here
  const auth = JSON.parse(localStorage.getItem("user"));
  const createAccount = async () => {
    await axios
      .post(`http://localhost:5001/api/tasks`, taskState, {
        headers: {
          Authorization: "Bearer " + auth.accessToken,
        },
      })
      .then(function (response) {
        console.log(response);
        notify("Operation successful");
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        setErrorMsg(error.response.data.error.message);
      })
      .finally(function () {});
  };

  const modalHeader = (
    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
      <h3 className="text-3xl font-semibold">Add New Task</h3>
      <div className=" justify-end text-[#666666] text-2xl">
        <span className="cursor-pointer" onClick={() => setShowModal(false)}>
          X
        </span>
      </div>
    </div>
  );
  const modalBody = (
    <div className="w-[90%] h-[30rem] mx-auto py-10">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={taskState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <Button text="Create Task" />
          {/* <span className="text-red-600 pt-2 text-sm">{errorMsg}</span> */}
        </div>
      </form>
    </div>
  );

  const modal = (
    <>
      <button
        className="group relative flex justify-center py-2 px-4 border border-transparent font-bold uppercase  text-sm rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 my-1"
        type="submit"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col lg:w-[48rem] w-full bg-[#f2f2f2] outline-none focus:outline-none">
                {modalHeader}
                {modalBody}
              </div>
            </div>
          </div>
          <div className="opacity-50 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
  return modal;
}
