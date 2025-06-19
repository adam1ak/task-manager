import { FaPlus } from "react-icons/fa";
import SingleCard from "../components/SingleCard";
import { useTasks } from "../TaskContext";

function AllTasks() {

  const { tasks, changeModalFunction, assingCurrentTask } = useTasks();

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
          <h1 className="text-2xl font-bold">All Tasks</h1>
          <div className="w-2/3 mt-1 absolute rounded-2xl border-2 border-green-600"/>
        </div>
        <button className="
          p-3
          text-[#6d6c73] text-xl 
          border-graphite rounded-full
          shadow-black shadow-lg
        " onClick={() => {changeModalFunction('Add'); assingCurrentTask(null)}}>
          <FaPlus/>
        </button>
      </div>

      {/* Cards */}
      <div className="cards-conatiner w-full mt-8 overflow-auto scrollbar-hide">
        {/* Flex aligment */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-8 mb-2">
          {/* Add Task Card */}
          <div className="
              min-w-64 max-w-80 h-64 
              flex items-center flex-grow justify-center gap-2
              text-lg font-medium
              bg-inkstone
              border-2 border-[#282828] rounded-3xl border-dashed
              cursor-pointer
              hover:bg-[#2C2D33] hover:border-0
              transition-all duration-300
              "
              onClick={() => {changeModalFunction('Add'); assingCurrentTask(null)}}>
            <FaPlus/>
            <p>Add New Task</p>
          </div>
          {
            tasks.map(task => (
              <SingleCard key={task.id} task={task}/>
            ))
          }
        </div>
      </div>
      
    </div>
  );
}

export default AllTasks;
