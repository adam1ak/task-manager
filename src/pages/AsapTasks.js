import { FaPlus } from "react-icons/fa";
import SingleCard from "../components/SingleCard";
import { useTasks } from "../TaskContext";

function AsapTasks() {

    const { tasks, changeModalFunction, assingCurrentTask } = useTasks();

    const dateDiffrence = (targetDate) => {
        const today = new Date();
        const target = new Date(targetDate);
        
        const diffInMs = target - today;

        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        return diffInDays;
    }

    const asapTasks = tasks.filter((task) => dateDiffrence(task.date) <= 3 && dateDiffrence(task.date) !== -1);

    return (
        <div className="
        task-input
        w-full px-16 py-8
        flex flex-col items-center
        nunito-sans
        bg-inkstone
        border-graphite rounded-xl
        ">
            {/* Header, title and button */}
            <div className="flex items-center justify-between w-full">
                <div className="relative">
                    <h1 className="text-2xl font-bold">Do These Now!</h1>
                    <div className="w-2/3 mt-1 absolute rounded-2xl border-2 border-green-600" />
                </div>
                <button className="
          p-3
          text-[#6d6c73] text-xl 
          border-graphite rounded-full
          shadow-black shadow-lg
        " onClick={() => { changeModalFunction('Add'); assingCurrentTask(null) }}>
                    <FaPlus />
                </button>
            </div>

            {/* Cards */}
            <div className="cards-conatiner w-full mt-8 overflow-auto scrollbar-hide">
                {/* Flex aligment */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-8 mb-2">
                    {
                        asapTasks.map(task => (
                        <SingleCard key={task.id} task={task}/>
                        ))
                    }
                </div>
            </div>

        </div>
    );
}

export default AsapTasks;
