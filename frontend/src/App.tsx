import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">
          Bem-vindo ao TaskHub
        </h1>
        <p className="text-gray-700 mb-8">
          Gerencie suas tarefas de forma simples e eficiente.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition"
          >
            Entrar
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded transition"
          >
            Criar Conta
          </button>
        </div>
      </div>
    </div>
  );
}
