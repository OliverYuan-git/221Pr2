import React, { useState } from "react";
import Board from "./components/Board";
import TaskTable from "./components/TaskTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((task, i) => i !== index));
    toast.success("Task was deleted successfully");
  };

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    toast.success("Task was added successfully");
  };

  const updateTask = (index, newTask) => {
    setTasks((prevTasks) => prevTasks.map((task, i) => (i === index ? newTask : task)));
    toast.success("Task was updated successfully");
  };

  return (
    <div className="app-container">
      <Board tasks={tasks} addTask={addTask} />
      <TaskTable tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable={false}
        theme="colored"
      />
    </div>
  );
}

export default App;
