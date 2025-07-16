import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTasks(response.data);
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/tasks",
      { title: newTask, completed: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTasks([...tasks, response.data]);
    setNewTask("");
  };

  const completeTask = async (taskId: string) => {
    const token = localStorage.getItem("token");
    const response = await api.patch(
      `/tasks/${taskId}`,
      { completed: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
  };

  const deleteTask = async (taskId: string) => {
    const token = localStorage.getItem("token");
    await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Minhas Tarefas</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>

        <form onSubmit={createTask} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
        </form>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <span
                className={task.completed ? "line-through text-gray-500" : ""}
              >
                {task.title}
              </span>

              <div className="flex gap-2">
                {!task.completed && (
                  <button
                    onClick={() => completeTask(task._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Completar
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
