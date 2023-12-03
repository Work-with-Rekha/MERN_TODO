import { useEffect, useState } from "react";

import "./App.css";

function App() {
  async function fetchTodos() {
    const response = await fetch("http://localhost:5000/todos");
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return <div></div>;
}

export default App;
