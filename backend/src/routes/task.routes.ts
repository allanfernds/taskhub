import { Router } from "express";
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

export default router;
