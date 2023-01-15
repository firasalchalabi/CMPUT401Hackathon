import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";

import TodoList from "./components/TodoList"
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  const userId = 4;
  const tripId = 1;

  useEffect(() => {
    axios.get(`/api/users/${userId}/trips/${tripId}`)
      .then((res) => {
        setTodos(res.data)
      }).catch(() => {
        alert("Something went wrong");
      })
  }, [])

  return (
    <div>
      <Navbar bg="light" style={{ marginBottom: "20px" }}>
        <Container>
          <Navbar.Brand href="#">
            Trip Planning App
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <h3>Things to do before trip</h3>
        <TodoForm todos={todos} setTodos={setTodos} />
        <h3>things to do in trip</h3>
        <TodoForm todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </Container>
    </div>
  );
}

export default App;