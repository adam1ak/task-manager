import { FaPlus } from "react-icons/fa";
import { useTasks } from "../TaskContext";

function AddTaskBtn() {

    const { changeModalFunction, assingCurrentTask, } = useTasks();

    return (
        <div className="
            w-full max-w-72 h-64 
            flex items-center flex-grow justify-center gap-2
            text-lg font-medium
            bg-inkstone
            border-2 border-[#282828] rounded-3xl border-dashed
            cursor-pointer
            hover:bg-[#2C2D33] hover:border-0
            transition-all duration-300
        "
            onClick={() => { changeModalFunction('Add'); assingCurrentTask(null) }}>
            <FaPlus />
            <p>Add New Task</p>
        </div>
    )

}
export default AddTaskBtn;