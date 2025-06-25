import SingleCard from "../components/SingleCard";
import AddTaskBtn from "../components/AddTaskBtn";

import { FaPlus } from "react-icons/fa";
import { useTasks } from "../TaskContext";

function ImportantTasks() {

  const { tasks, changeModalFunction, assingCurrentTask } = useTasks();

  const importantTasks = tasks.filter((task) => task.important === true);

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
          <h1 className="text-2xl font-bold">Important Tasks</h1>
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
          <AddTaskBtn/>
          {
            importantTasks.map(task => (
              <SingleCard key={task.id} task={task} />
            ))
          }
        </div>
      </div>

    </div>
  );
}

export default ImportantTasks;
