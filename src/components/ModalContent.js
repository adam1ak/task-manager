import { useTasks } from "../TaskContext";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";

function ModalContent({
    task,
    modalFunction }) {

  const { changeModalFunction } = useTasks();

    const [completedTask, setCompletedTask] = useState(false);
    const [importantTask, setImportantTask] = useState(false);
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")

   const [mouseDownTarget, setMouseDownTarget] = useState(null);

    const handleMouseDown = (e) => {
        setMouseDownTarget(e.currentTarget);
    }

    const handleMouseUp = (e) => {
        if (mouseDownTarget === e.currentTarget) {
            changeModalFunction(null)
        }
        setMouseDownTarget(null);
    }

    const handleCompletedChange = () => { setCompletedTask(prev => !prev) }
    const handleImportantChange = () => { setImportantTask(prev => !prev) }

    useEffect(() => {
        if (modalFunction === "edit" && task) {
            setCompletedTask(task.completed || false);
            setImportantTask(task.important || false);
            setTaskTitle(task.title || "");
            setTaskDescription(task.description || "");
        } else {
            setCompletedTask(false);
            setImportantTask(false);
            setTaskTitle("");
            setTaskDescription("");
        }
    }, []);

    const stopPropagation = (e) => e.stopPropagation();

    return (
        <div className="
            editing-modal
            absolute z-10
            flex items-center justify-center
            top-0 left-0 h-full w-full
            bg-black/30
        "
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className="
                py-6 px-4
                nunito-sans
                bg-[#212121] rounded-xl
                flex flex-col
            "
            onClick={(e) => stopPropagation(e)}
            onMouseDown={(e) => {
                stopPropagation(e);
                setMouseDownTarget(null); 
            }}>
                <div className="flex-container flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-medium">{modalFunction} a Task</h2>
                    <p>x</p>
                </div>
                <InputField
                    id={"titleInput"}
                    label={"Title"}
                    type={"text"}
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder={"e.g Go to the gym"} />
                <InputField
                    id={"descriptionInput"}
                    label={"Description"}
                    type={"textarea"}
                    placeholder={"e.g Go to the gym"}
                    styling={"h-[120px]"} />

                <label htmlFor="dateInput" className="mb-2 text-lg">Date</label>
                <p className="
                                w-80
                                p-3 mb-6
                                bg-[#131313]
                                text-gray-300
                                rounded-lg
                            ">
                    dd/mm/yyyy
                </p>
                <CheckBox
                    id="completedTask"
                    label="Toggle Completed"
                    checked={completedTask}
                    handleChange={handleCompletedChange} />
                <CheckBox
                    id="importantTask"
                    label="Toggle Important"
                    checked={importantTask}
                    handleChange={handleImportantChange} />
                <button
                    className="
                        self-end
                        flex items-center gap-3
                        bg-blue-500
                        py-2 px-6
                        text-lg font-medium
                        rounded-xl
                    "
                >
                    {modalFunction === "Edit" ? <FaEdit /> : <FaPlus />}{modalFunction} Task
                </button>
            </div>
        </div>
    )
}

function InputField({ id, type, value, onChange, label, placeholder, styling }) {

    const components = {
        textarea: 'textarea',
        text: 'input'
    }

    const Tag = components[type] || 'input';

    return (
        <>
            <label htmlFor={id} className="mb-2 text-lg">{label}</label>
            <Tag
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={type === "textarea" ? "120" : "25"}
                className={`
                            ${styling}
                            w-80
                            p-3 mb-6
                            bg-[#131313]
                            placeholder-gray-300
                            rounded-lg
                            resize-none outline-none
                            border-2 border-transparent
                            overflow-hidden
                            focus:shadow-xl
                            transition-all ease-in
                        `} />
        </>
    )
}

function CheckBox({ id, label, checked, handleChange }) {
    return (
        <span
            className="
                w-full
                flex items-center justify-between
                text-gray-300 font-medium
                mb-6
            ">
            <label htmlFor={id}>{label}</label>
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={() => handleChange()}
                    className="absolute opacity-0 h-0 w-0 peer"
                />
                <span
                    onClick={() => handleChange()}
                    className="
                    relative
                    block
                    w-5 h-5
                    bg-[#131313]
                    border-2 border-gray-600
                    rounded
                    group-hover:border-green-600
                    transition-colors
                    peer-checked:border-green-600
                    peer-checked:after:block
                    after:content-['']
                    after:absolute
                    after:hidden
                    after:left-1/2 after:top-1/2
                    after:-translate-x-1/2 after:-translate-y-1/2
                    after:w-2 after:h-2
                    after:bg-green-600
                    after:rounded-sm
                "/>
            </div>
        </span>
    )
}

export default ModalContent;