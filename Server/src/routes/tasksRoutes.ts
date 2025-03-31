import { Router } from "express";
import {
  createTask,
  readTasks,
  updateTasks,
  deleteTasks,
} from "../controllers/tasksController";

const router = Router();

router.post("/new-task", createTask);

router.get("/tasks", readTasks);

router.put("/edit-task/:id", updateTasks);

router.delete("/delete-task/:id", deleteTasks);

export default router;
