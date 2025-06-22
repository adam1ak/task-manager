import "../styles/Menu.css"
import { NavLink } from "react-router-dom";
import ProfilePicture from "../utils/pfp.jpg"

import { useTasks } from "../TaskContext";

import { FaArrowLeft, FaRightFromBracket, FaHouse, FaCheck, FaListCheck, FaStopwatch } from "react-icons/fa6";
import { getAuth, signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Menu({ isVisible, showNavBar }) {

    const { userInfo } = useTasks();

    const auth = getAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("xddd")
            toast.success("Logged out")
            navigate("/auth-form", { replace: true })
        }).catch((error) => {
            console.log(error, 'signOut error')
        });
    }

    return (
        <nav
            className={`
            ${isVisible ? 'flex absolute top-8 bottom-8' : 'hidden relative'}
            nunito-sans
            bg-inkstone
            border-graphite
            rounded-lg
            py-8
            sm:flex flex-col
            justify-between
            text-neutral-400
            items-center
            w-full
            max-w-52
            `}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
            />
            <button
                onClick={showNavBar}
                className="
                sm:hidden
                group
                absolute z-10 top-12 right-0 translate-x-12
                h-12 w-12
                bg-inkstone border-2 border-[#282828] border-l-0">
                <FaArrowLeft className="text-xl transition ease-in-out delay-150 ml-3 group-hover:rotate-180" />
            </button>
            <div
                className='flex items-center gap-4'>
                <img
                    className="max-w-16 rounded-full"
                    src={ProfilePicture}
                    alt="Person avatar" />
                <h1>{userInfo ? userInfo.name : ""}</h1>
            </div>
            <ul className="flex flex-col w-full mt-2">
                <NavLink to="/all-tasks"><li><FaHouse className="text-xl" />All Tasks</li></NavLink>
                <NavLink to="/important-tasks"><li><FaListCheck className="text-xl" />Important</li></NavLink>
                <NavLink to="/completed-tasks"><li><FaCheck className="text-xl" />Completed</li></NavLink>
                <NavLink to="/asap-tasks"><li><FaStopwatch className="text-xl" />Do It Now</li></NavLink>
            </ul>
            <button
                className="flex items-center pl-8 py-3 w-full self-start text-lg gap-4"
                onClick={handleSignOut}>
                <FaRightFromBracket className="text-xl" />Sign out
            </button>
        </nav>
    );
}

export default Menu;
