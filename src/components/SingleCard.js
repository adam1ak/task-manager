import { useTasks } from "../TaskContext";
import { FaEdit, FaTrash } from "react-icons/fa";

function SingleCard({ task }) {

    const { toggleCompleted, changeModalFunction, assingCurrentTask, deleteTask } = useTasks();

    const formattedDate = task.date ? new Date(task.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }) : 'No date';

    return (
        <div className="
            flex flex-col flex-grow justify-between
            min-w-64 max-w-80 h-64 
            py-6 px-4
            nunito-sans
            bg-[#323232]
            border-2 border-[#3F3F3F]
            rounded-3xl
        ">
            <div className="card-content">
                <p className="card-title text-xl font-medium">{task.title}</p>
                <p className="card-description text-wrap text-sm font-medium mt-0.5">{task.description}</p>
            </div>

            <div className="card-footer">
                <p className="card-date mb-2">{formattedDate}</p>
                <div className="card-actions flex justify-between">
                    <button
                        onClick={() => toggleCompleted(task.id)}
                        className={`
                            ${task.completed ? "cursor-default bg-green-700" : "cursor-pointer bg-red-700"}
                            rounded-full px-5 py-1.5
                        `}
                        disabled={task.completed}
                        >
                        {task.completed ? "Complete" : "Incomplete"}
                    </button>
                    <div className="flex gap-5">
                        <button onClick={() => {changeModalFunction("Edit"); assingCurrentTask(task)}}><FaEdit className="text-2xl text-[#BABDCE]" /></button>
                        <button onClick={() => deleteTask(task.id)}><FaTrash className="text-2xl text-[#BABDCE]" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SingleCard;