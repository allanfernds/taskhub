import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Usuário não encontrado");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send("Senha incorreta");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
    expiresIn: "1h",
  });
  res.json({ token });
});

export default router;
