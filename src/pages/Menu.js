import "../styles/Menu.css"
import { NavLink } from "react-router-dom";
import ProfilePicture from "../utils/pfp.jpg"
import { FaArrowLeft, FaRightFromBracket, FaHouse, FaCheck, FaListCheck, FaStopwatch } from "react-icons/fa6";
import { useEffect, useState } from "react";


function Menu({isVisible, showNavBar}) {



    return (
        <nav
            className={`
            ${isVisible ? 'flex' : 'hidden'}
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
            relative
            `}>
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
                <h1>Maclinz<br />Maclinz</h1>
            </div>
            <ul className="flex flex-col w-full mt-2">
                <li><FaHouse className="text-xl" />All Tasks</li>
                <li><FaListCheck className="text-xl" />Important</li>
                <li><FaCheck className="text-xl" />Completed</li>
                <li><FaStopwatch className="text-xl" />Do It Now</li>
            </ul>
            <button className="flex items-center pl-8 self-start text-lg gap-4">
                <FaRightFromBracket className="text-xl" />Sign out
            </button>
        </nav>
    );
}

export default Menu;
