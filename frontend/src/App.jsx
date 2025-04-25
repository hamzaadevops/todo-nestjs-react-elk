import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API || "http://localhost:3000";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API}/tasks`);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!title.trim()) return; // Prevent adding empty tasks
    try {
      const response = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) throw new Error("Failed to add task");
      setTitle("");
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      if (!task) throw new Error("Task not found");
      const response = await fetch(`${API}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!response.ok) throw new Error("Failed to toggle task");
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete task");
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "2rem auto" }}>
      <h2>Todo List</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          placeholder="New task…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button onClick={addTask} style={{ padding: "0.5rem 1rem" }}>
          Add
        </button>
      </div>

      <ul style={{ padding: 0 }}>
        {tasks.map((t) => (
          <li
            key={t._id}
            style={{
              listStyle: "none",
              margin: "0.5rem 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t._id)}
            />
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                marginLeft: 8,
                flex: 1,
              }}
            >
              {t.title}
            </span>
            <button
              onClick={() => deleteTask(t._id)}
              style={{
                marginLeft: 16,
                background: "red",
                color: "white",
                border: "none",
                padding: "0.25rem 0.5rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}