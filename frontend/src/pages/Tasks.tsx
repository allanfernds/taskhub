import { useEffect, useState } from "react";
import api from "../services/api";

type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    await api.post("/tasks", { title: newTask, completed: false });
    setNewTask("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Minhas Tarefas</h2>
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
