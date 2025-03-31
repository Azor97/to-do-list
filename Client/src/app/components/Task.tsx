"use client";

import { FaEdit } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation"

interface ITask{
    id: number;
    task_item: string;
}

interface ITaskProps {
    task: ITask;
    onTaskUpdate: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Task: React.FC<ITaskProps> = ({task}) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.task_item);
    const handleEditTask: FormEventHandler<HTMLFormElement> = async (e) => {      
         e.preventDefault();  
        await axios.put(`${API_BASE_URL}/edit-task/${task.id}`,{task_item: taskToEdit})
        .then(() => {
            setOpenModalEdit(false);
            router.refresh();
        })
        .catch(error =>{
            console.error("Erro ao editar tarefa:", error)
            setTaskToEdit('')
        })
}
   
const handleDeleteTask = async () => {
    await axios.delete(`${API_BASE_URL}/delete-task/${task.id}`).then(() => {
        setOpenModalDeleted(false);
        router.refresh();
    })
    .catch(error =>{
        console.error("Erro ao excluir tarefas:", error)
        setTaskToEdit('')
    })
}
  return (
    <tr key={task.id}>
    <td className="w-full">{task.task_item}</td>
    <td className="flex gap-5">
    <FaEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={20}/>
    <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleEditTask}>
                <h3 className="font-bold text-lg">Editar tarefa</h3>
                <div className="modal-action">
                <input value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} type="text" placeholder="Digite aqui sua terefa" className="input input-primary w-full" />
                <button type="submit" className="btn">Enviar</button>
                </div>
            </form>
        </Modal>
    <IoTrashBinSharp onClick={() => setOpenModalDeleted(true)} cursor="pointer"  className="text-red-500" size={20}/>
    <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
           <h3 className="text-lg">Você tem certeza que deseja deletar essa tarefa?</h3>
           <div className="modal-action">
            <button onClick={handleDeleteTask} className="btn btn-success">Sim</button>
           </div>
        </Modal>
    </td>
    </tr>
  )
}

export default Task