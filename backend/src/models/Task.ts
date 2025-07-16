import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
