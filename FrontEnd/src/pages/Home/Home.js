import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../../components/Table";
import Modal from "./components/Modal";

export default function Home() {
  const auth = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [taskData, setTasksData] = useState([]);
  const notify = (mesg) => {
    toast(mesg);
  };

  async function deleteRecord(d) {
    await axios
      .delete(`http://localhost:5001/api/${d}/tasks`, {
        headers: {
          Authorization: "Bearer " + auth.accessToken,
        },
      })
      .then(function (response) {
        console.log(response);
        notify("Operation successful");
        getTasks();
      })
      .catch(function (error) {
        console.log(error.response.data.error);
      })
      .finally(function () {});
  }

  async function getTasks() {
    await axios
      .get(`http://localhost:5001/api/tasks`, {
        headers: {
          Authorization: "Bearer " + auth.accessToken,
        },
      })
      .then(function (response) {
        const result = response.data;
        setTasksData(result || []);
      })
      .catch(function (error) {
        console.log(error.response.data.error);
      })
      .finally(function () {});
  }
  useEffect(() => {
    getTasks();
  }, []);

  function Logout() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <div>
      <div className="flex items-center justify-between px-4">
        <span
          className="text-lg font-bold text-black cursor-pointer"
          onClick={Logout}
        >
          {auth.name} Log out
        </span>
        <Modal updateRec={getTasks} />
      </div>
      <Table tableData={taskData} delRec={deleteRecord} />
    </div>
  );
}
