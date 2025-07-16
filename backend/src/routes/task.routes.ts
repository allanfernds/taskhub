import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import Task from "../models/Task";

const router = Router();

router.get("/", async (req: any, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Erro ao buscar tarefas");
  }
});

router.post("/", async (req: any, res) => {
  try {
    const { title, completed } = req.body;
    const task = await Task.create({
      title,
      completed,
      userId: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).send("Erro ao criar tarefa");
  }
});

router.delete("/:id", authMiddleware, async (req: any, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.json(task);
  } catch (err) {
    console.error("Erro ao completar tarefa:", err);
    res.status(500).send("Erro ao atualizar tarefa");
  }
});

export default router;
