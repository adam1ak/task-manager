import { FaPlus } from "react-icons/fa";
import SingleCard from "../components/SingleCard";
import { useState } from "react";

function TaskInput() {
  const fakeTasks = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Write the final draft for client approval",
    date: "2023-06-15",
    completed: false
  },
  {
    id: 2,
    title: "Review UI designs",
    description: "Provide feedback on the new dashboard mockups",
    date: "2023-06-12",
    completed: true
  },
  {
    id: 3,
    title: "Team meeting",
    description: "Weekly sync with development team",
    date: "2023-06-10",
    completed: false
  },
  {
    id: 4,
    title: "Update documentation",
    description: "Add new API endpoints to developer docs",
    date: "2023-06-18",
    completed: false
  },
  {
    id: 5,
    title: "Fix login bug",
    description: "Investigate authentication timeout issue",
    date: "2023-06-09",
    completed: true
  }
];
  const [tasks, setTasks] = useState(fakeTasks)


  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleComplete = (id) =>{
    setTasks(tasks.map(task => (
      task.id === id ? {...task, completed : true} : task
    )))
  }

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
          <div className="w-12 mt-1 absolute rounded-2xl border-2 border-green-600"/>
        </div>
        <button className="
          p-3
          text-[#6d6c73] text-xl 
          border-graphite rounded-full
          shadow-black shadow-lg
        ">
          <FaPlus />
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
              ">
            <FaPlus/>
            <p>Add New Task</p>
          </div>
          {
            tasks.map(task => (
              <SingleCard key={task.id} task={task} onComplete={handleComplete} onDelete={handleDelete}/>
            ))
          }
        </div>
      </div>
      
    </div>
  );
}

export default TaskInput;
