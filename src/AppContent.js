import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskInput from "./pages/TaskInput";
import Menu from "./pages/Menu";
import { useTasks } from "./TaskContext";
import { IoMenu } from "react-icons/io5";
import ModalContent from "./components/ModalContent";

function AppContent({ isNavBar, showNavBar }) {
  const { modalFunction } = useTasks(); 

  return (
    <Router>
        <div className='
        bg-midnight text-white h-dvh
        flex gap-4
        py-8 px-4
        '>
        {modalFunction !== null && (
            <ModalContent modalFunction={modalFunction}/>
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
        </Routes>
        </div>
    </Router>
  );
}

export default AppContent;