import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTasks } from "./TaskContext";
import { IoMenu } from "react-icons/io5";
import TaskInput from "./pages/CreateTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import ModalContent from "./components/ModalContent";
import Menu from "./pages/Menu";
import AsapTasks from "./pages/AsapTasks";


function AppContent({ isNavBar, showNavBar }) {
  const { modalFunction, currentTask } = useTasks(); 

  return (
    <Router>
        <div className='
        bg-midnight text-white h-dvh
        flex gap-4
        py-8 px-4
        '>
        {modalFunction !== null && (
            <ModalContent modalFunction={modalFunction} task={currentTask}/>
        )}
        {!isNavBar && (
            <button
            onClick={showNavBar}
            className='
                sm:hidden
                absolute 
                z-10 top-0 left-0 translate-y-16
                h-14 w-10
                rounded-r-xl
                bg-inkstone border-2 border-[#282828] border-l-0
            '>
            <IoMenu className="text-2xl ml-2 text-neutral-400" />
            </button>
        )}
        <Menu isVisible={isNavBar} showNavBar={showNavBar} />
        <Routes>
            <Route path="/" element={<TaskInput />} />
            <Route path="/important-tasks" element={<ImportantTasks/>}/>
            <Route path="/completed-tasks" element={<CompletedTasks/>}/>
            <Route path="/asap-tasks" element={<AsapTasks/>}/>
        </Routes>
        </div>
    </Router>
  );
}

export default AppContent;