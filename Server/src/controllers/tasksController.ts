import { Request, Response } from "express";
import sql from "../supabase/database";

export const createTask = async (req: Request, res: Response) => {
  const { task_item } = req.body;

  if (!task_item) {
    res.status(400).json({
      error: "Campo obrigatório!",
    });
    return;
  }

  try {
    const data =
      await sql`INSERT INTO tb_tasks (task_item) values (${task_item})`;

    res.status(201).json({
      message: "Tarefa adicionada!",
      data,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const readTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await sql`SELECT id, task_item FROM tb_tasks`;

    res.status(201).json({
      message: "Sucess",
      tasks,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTasks = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { task_item } = req.body;

  try {
    const edit =
      await sql`UPDATE tb_tasks SET task_item = ${task_item} WHERE id = ${id}`;
    res.status(200).json({
      message: "Sucess",
      edit,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTasks = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const itemDelete = await sql`DELETE FROM tb_tasks WHERE id = ${id}`;
    res.status(200).json({
      message: "Sucess",
      itemDelete,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
