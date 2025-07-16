import { useEffect, useState } from "react";
import api from "../services/api";
import { isTokenExpired, logout } from "../services/auth";

type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Sessão expirada. Faça login novamente.");
        logout();
      }
    }
  };

  const createTask = async () => {
    await api.post("/tasks", { title: newTask, completed: false });
    setNewTask("");
    fetchTasks();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      alert("Token inválido ou expirado");
      logout();
      return;
    }

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Minhas Tarefas</h2>
      <button onClick={logout}>Sair</button>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={createTask}>Criar</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} {task.completed ? "✔️" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
