import { useTasks } from "../TaskContext";
import { useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker'
import { FaEdit, FaPlus } from "react-icons/fa";
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DatePickerForm.css'

function ModalContent({
    task,
    modalFunction }) {

    const { changeModalFunction, addTask, editTask } = useTasks();

    const defaultValues = {
        id: Date.now(),
        title: '',
        description: '',
        date: Date(),
        timestamp: 0,
        important: false,
        completed: false
    }

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        formState: { errors, isValid }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all'
    });

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

    useEffect(() => {
        if (modalFunction === "Edit" && task) {
            reset(task)
        } else {
            reset(defaultValues)
        }
    }, [task, reset])

    const onSubmit = (data) => {
        try{
            const dateObject = new Date(data.date);

            if(isNaN(dateObject.getTime())){
                throw new Error(`Invalid date format: ${data.date}`)
            }

            const taskData = {
                ...data,
                date: dateObject.toLocaleDateString(),
                timestamp: dateObject.getTime(),
                id: modalFunction === "Edit" ? task.id : Date.now()
            }

            if(modalFunction === "Edit"){
                editTask(task.id, taskData)
            } else {
                addTask(taskData)
            }

            reset(defaultValues)
            changeModalFunction(null)

        } catch (error) {
            console.log("Failed to add new task", error)
        }
    }

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
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col">

                    <InputField
                        id={"titleInput"}
                        label={"Title"}
                        type={"text"}
                        placeholder={"e.g Go to the gym"}
                        register={register("title", {
                            required: "Title is required",
                            minLength: {
                                value: 3,
                                message: "Tittle must be at least 3 characters"
                            },
                            maxLength: {
                                value: 25,
                                message: "Tittle cannot exceed 25 characters"
                            },
                            validate: (value) => value.trim() !== "" || "Title cannot be empty"
                        })}
                        error={errors.title}
                        value={watch("title")} />
                    <InputField
                        id={"descriptionInput"}
                        label={"Description"}
                        type={"textarea"}
                        placeholder={"e.g Go to the gym"}
                        styling={"h-[120px]"}
                        register={register("description", {
                            maxLength: {
                                value: 120,
                                message: "Description cannot exceed 120 characters"
                            },
                        })}
                        error={errors.description}
                        value={watch("description")} />

                    <label htmlFor="dateInput" className="mb-2 text-lg">Date</label>
                    <div className="
                                    w-80
                                    p-3 mb-6
                                    bg-[#131313]
                                    text-gray-300
                                    rounded-lg
                                ">
                        <Controller
                            control={control}
                            name='date'
                            rules={{ required: "Task date is required" }}
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText="Select date"
                                    onChange={(date) => field.onChange(date)}
                                    className="custom-datepicker-input"
                                    selected={field.value}
                                    minDate={new Date()}
                                    dateFormat="yyyy/MM/dd" />
                            )} />
                        {errors.date && <p className="text-red-600 text-sm mb-4">{errors.date.message}</p>}
                    </div>
                    <CheckBox
                        id="completedTask"
                        label="Toggle Completed"
                        register={register("completed")}
                        checked={watch("completed")} />
                    <CheckBox
                        id="importantTask"
                        label="Toggle Important"
                        register={register("important")}
                        checked={watch("important")} />
                    <button
                        type="submit"
                        className="
                            self-end
                            flex items-center gap-3
                            bg-blue-500
                            py-2 px-6
                            text-lg font-medium
                            rounded-xl
                            disabled:bg-blue-500/40
                        "
                        disabled={!isValid}
                    >
                        {modalFunction === "Edit" ? <FaEdit /> : <FaPlus />}{modalFunction} Task
                    </button>

                </form>
            </div>
        </div>
    )
}


function InputField({ id, type, register, label, placeholder, styling, error, value }) {

    const components = {
        textarea: 'textarea',
        text: 'input'
    }

    const Tag = components[type] || 'input';
    const maxLength = type === "textarea" ? "125" : "30";

    return (
        <>
            <label htmlFor={id} className="mb-2 text-lg">{label}</label>
            {value?.length >= maxLength * 0.35 && (
                <span className={`
                    text-xs 
                    mb-1
                    ${value?.length >= maxLength ? 'text-red-600' :
                        value?.length > maxLength * 0.65 ? 'text-yellow-500' :
                            'text-gray-400'}
                    transition-all ease-in delay-75
                `}>
                    {value.length}/{maxLength}
                </span>
            )
            }
            <Tag
                {...register}
                placeholder={placeholder}
                maxLength={maxLength}
                className={`
                            ${styling}
                            w-80
                            p-3 mb-6
                            bg-[#131313]
                            placeholder-gray-300
                            rounded-lg
                            resize-none outline-none
                            border-2 ${error ? "border-600" : "border-transparent"}
                            overflow-hidden
                            focus:shadow-xl
                            transition-all ease-in
                        `} />
            {error && <p className="text-red-600 textt-sm mb-4">{error.message}</p>}
        </>
    )
}

function CheckBox({ id, label, register, checked }) {
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
                    {...register}
                    checked={checked}
                    className="absolute opacity-0 h-0 w-0 peer"
                />
                <label
                    htmlFor={id}
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
                    cursor-pointer
                "/>
            </div>
        </span>
    )
}

export default ModalContent;