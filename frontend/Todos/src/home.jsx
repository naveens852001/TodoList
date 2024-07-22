import React, { useEffect, useState } from "react";
import Create from "./create";
import "./todo.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BsCircleFill,
  BsFillCCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [todos, settodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://todolist-mip9.onrender.com/get")
      .then((result) => settodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handlecheck = (id, currentState) => {
    axios
      .put(`https://todolist-mip9.onrender.com/update/${id}`, { done: !currentState })
     
      .then((result) => {
        settodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, done: !currentState } : todo
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`https://todolist-mip9.onrender.com/delete/${id}`)
        .then(result => {
            // Update the state without reloading the page
            settodos(todos.filter(todo => todo._id !== id));
        })
        .catch(err => console.log(err));
};
  return (
    <div className="todo-box">
      <h2 className="todos-heading  ">Listify</h2>

      <Create />
      {todos.length === 0 ? (
        <div>
          {" "}
          <h2 className="no-record ">No record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task-list" key={todo._id}>
            <div
              className="checkbox"
              onClick={() => handlecheck(todo._id, todo.done)}
            >
              {todo.done ? (
                <BsFillCheckCircleFill className="icon " />
              ) : (
                <BsCircleFill className="icon" />
              )}

              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
              {/* <p className='icon' ><FontAwesomeIcon icon={faTrash} /></p> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
