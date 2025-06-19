import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useTasks } from "./TaskContext";
import { IoMenu } from "react-icons/io5";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import ModalContent from "./components/ModalContent";
import Menu from "./pages/Menu";
import AsapTasks from "./pages/AsapTasks";
import AuthForm from "./pages/AuthForm";
import NotFound from "./pages/NotFound";



function AppContent({ isNavBar, showNavBar }) {
    const { modalFunction, currentTask } = useTasks();
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const location = useLocation();

    useEffect(() => {
        setIsMenuVisible(location.pathname === "/auth-form" || location.pathname === "/404")
    }, [location.pathname]);

    return (
        <div className='
        bg-midnight text-white h-dvh
        flex gap-4
        py-8 px-4
        '>
            {modalFunction !== null && (
                <ModalContent modalFunction={modalFunction} task={currentTask} />
            )}
            {!isNavBar && !isMenuVisible && (
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
            {isMenuVisible === false && <Menu isVisible={isNavBar} showNavBar={showNavBar} />}
            <Routes>
                <Route path="/all-tasks" element={<AllTasks />} />
                <Route path="/important-tasks" element={<ImportantTasks />} />
                <Route path="/completed-tasks" element={<CompletedTasks />} />
                <Route path="/asap-tasks" element={<AsapTasks />} />
                <Route path="/auth-form" element={<AuthForm />} />
                <Route path="/404" element={<NotFound />}/>

                <Route path="/" element={<Navigate to="/auth-form" replace/>}/>
                <Route path="/*" element={<Navigate to="/404" replace/>} />
            </Routes>
        </div>
    );
}

export default AppContent;