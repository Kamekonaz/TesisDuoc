import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';
import guro_icon from '../../guro_icon.png';
import { NavLink, Link } from "react-router-dom";

function Header() {
    const cookies = new Cookies();


    const userData = React.useMemo(()=> loadUserData())
    const [isSessionValid, setIsSessionValid] = React.useState(false);
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);

    //if(isSessionValid === false) window.location.href = window.origin

    //console.log(isSessionValid)
    async function handleIsSessionValid(){
        const sessionKey = cookies.get("sessionKey")
        if(!sessionKey) return setIsSessionValid(false)
        try {
            const data = {
                sessionKey: sessionKey,
                expectedUserTypes: [3]
            }
            const isValid = (await axios.post('http://localhost:3001/isSessionValid', data)).data
            //console.log(isValid.valid ? isValid.valid : false)
            return setIsSessionValid(isValid.valid ? isValid.valid : false)
        } catch (error) {
            return setIsSessionValid(false)
        }
    }

    React.useEffect(()=>{
        handleIsSessionValid();
        reloadUserData()
    })
    async function reloadUserData(){
        if(!cookies.get("sessionKey") || !isSessionValid) return;
        const data = {
            sessionKey:  cookies.get("sessionKey")
        }
        const userData = (await axios.post('http://localhost:3001/getselfuserdata', data)).data
        if(!userData) return setIsSessionValid(false)
        localStorage.setItem('userData', JSON.stringify(userData))
    }

    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        return gottenUserData
    }

    return (
        <div className="Header">
        <header className="flex items-center h-20 px-6 w-full sm:px-10 bg-gray-800 fixed z-50">
            <div className="mr-8 cursor-pointer" >
                <a href="/">
                    <img src={guro_icon} alt="" width="65px"/>
                </a>
            </div>
         
            {
                isSessionValid ?
                <div className="flex w-full bg-gray-800 h-full">
                    <div className="my-auto relative w-full max-w-md sm:-ml-2 hidden md:flex ">
                        <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                        <input type="text" role="search" placeholder="Buscar..." className="text-gray-200 bg-gray-900 py-2 pl-10 pr-4 w-full focus:border-black focus:outline-none border-4 border-transparent placeholder-gray-400 rounded-lg" />
                    </div>
                        
                        <div className="flex flex-shrink-0 items-center ml-auto select-none">
                            <div onClick={()=>setShowProfileMenu(!showProfileMenu)}
                            className="relative inline-flex items-center p-2 hover:bg-gray-700 focus:bg-gray-100 rounded-lg">
                                <span className="sr-only">User Menu</span>
                                <div className="hidden md:flex md:flex-col md:items-end md:leading-tight" >
                                <span className="font-semibold"></span>
                                <span className="text-sm font-bold text-gray-200">{`${userData["NOMBRES"].split(" ")[0]} ${userData["APELLIDOS"].split(" ")[0]}`}</span>
                                </div>
                                <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                                <img src={(userData["IMAGEN"]) ? userData["IMAGEN"] : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"} alt="user profile photo" className="h-full w-full object-cover"/>
                                </span>
                                <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" 
                                className={`hidden sm:block h-6 w-6 text-gray-300 ${(showProfileMenu) ? "" : "rotate-90"} transition duration-200`}>
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg> 
                            </div>

                                <div className={`text-gray-200 absolute top-20 bg-gray-700 border border-gray-500 rounded-md p-2 w-56  ${showProfileMenu ? "opacity-100 -z-40": "opacity-0 -translate-y-36 -z-40"} transition duration-200`}>
                                    <NavLink to="/dashboard"><div  className="p-2 rounded-md hover:bg-gray-600 cursor-pointer">Mi perfil</div></NavLink>
                                    <div className="p-2 hover:bg-gray-600 rounded-md cursor-pointer">Chats</div>
                                    <div className="p-2 hover:bg-gray-600 rounded-md cursor-pointer">Actividades</div>
                                </div>
                            
                            
                            <div className="border-l pl-3 ml-3 space-x-1 flex">
                                <button className="relative p-2 text-gray-200 hover:bg-gray-600 hover:text-gray-100 rounded-full">
                                <span className="sr-only">Notifications</span>
                                <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
                                <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                </button>
                                <div onClick={()=> {cookies.remove("sessionKey"); window.location.href = window.origin}}>
                                    <button className="relative p-2 text-gray-200 hover:bg-gray-600 hover:text-gray-100 rounded-full">
                                    <span className="sr-only">Log out</span>
                                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                <div className="flex flex-shrink-0 items-center ml-auto">
                    <div className="border-l pl-3 ml-3 space-x-1">
                        <a href="/login">
                            <button className="relative p-2 bg-green-600 rounded-md text-white hover:bg-green-700 focus:bg-green-800" style={{width: "70px"}}>
                            Login
                            </button>
                        </a>
                    </div>
                </div>
            }
      
            
            
            
        </header>
        </div>
    );
}

export default Header;
