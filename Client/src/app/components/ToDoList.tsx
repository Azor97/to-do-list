"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";


interface ITask {
  id: number;
  task_item: string;
}

const ToDoList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

const fetchTasks = () => {
  axios.get("http://localhost:5000/tasks")
      .then(response => {
        console.log(response.data); 
        setTasks(response.data.tasks); 
      })
      .catch(error => {
        console.error("Erro ao buscar as tarefas:", error);
      });
}

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      
      <table className="table">
        <thead>
          <tr className="bg-base-200 w-full">
            <th className="uppercase">Tarefas</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => <Task key={task.id} task={task} onTaskUpdate={fetchTasks} />)
          ) : (
            <tr>
              <td colSpan={2} className="text-center">Nenhuma tarefa encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
