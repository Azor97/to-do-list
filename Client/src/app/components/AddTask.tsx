'use client';

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [taskValue, setNewTask] = useState<string>('');
    
    const handleAddTask: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        axios.post(`${API_BASE_URL}/new-task`, {task_item: taskValue})
          .then(() => {
            setNewTask('');
            setModalOpen(false);
            router.refresh();
          })
          .catch(error => {
            console.error("Erro ao adicionar tarefa:", error);
          });
    }

  return (
    <div>
        <button onClick={()=>setModalOpen(true)} className="btn btn-primary w-full uppercase"> Adicionar nova tarefa <AiOutlinePlus className="" size={18}/>
        </button>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <form onSubmit={handleAddTask}>
                <h3 className="font-bold text-lg">Adicionar nova tarefa</h3>
                <div className="modal-action">
                <input value={taskValue} onChange={e => setNewTask(e.target.value)} type="text" placeholder="Digite aqui sua terefa" className="input input-primary w-full" />
                <button type="submit" className="btn">Enviar</button>
                </div>
            </form>
        </Modal>
    </div>
  )
}

export default AddTask