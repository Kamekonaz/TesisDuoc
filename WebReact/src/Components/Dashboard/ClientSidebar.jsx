//import './App.css';
import React from "react";
import axios from "axios";
//import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";



function ClientSidebar() {
    const cookies = new Cookies();
    const userData = React.useMemo(()=> loadUserData())
    const paramDashboardOption = window.location.pathname.split("/")[2]
    const [activeDashboardOption, setActiveDashboardOption] = React.useState((paramDashboardOption) ? paramDashboardOption : 0);

    const normalDashboardOptionClass = "flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 select-none dashboardOptions"
    const selectedDashboardOptionClass = "flex items-center p-2 text-base font-normal rounded-lg text-white bg-gray-900 select-none dashboardOptions"

    async function reloadUserData(){
        const data = {
            sessionKey:  cookies.get("sessionKey")
        }
        const userData = (await axios.post('http://localhost:3001/getselfuserdata', data)).data
        localStorage.setItem('userData', JSON.stringify(userData))
    }

    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        return gottenUserData
    }

    React.useEffect(()=>{
        reloadUserData()
    })

    React.useEffect(() => {
        const adminDashboardOptions = document.getElementsByClassName("dashboardOptions")
        if(!paramDashboardOption){
            const urlparams = new URLSearchParams(window.location.search);
            //console.log(urlparams.get("dashboardOption"))
            setActiveDashboardOption(urlparams.get("dashboardOption"))
        }
        for (const dashBoardOption of adminDashboardOptions){
            dashBoardOption.addEventListener("click", (e)=>{
                //e.preventDefault()
                //const dashboardOptionId = dashBoardOption.id
                setActiveDashboardOption(dashBoardOption.id)
            });
        }
    }, []);


  return (
    <div>
        <Header/>
        
        <div className="fixed grid w-64 bg-gray-800" style={{gridTemplateRows: "250px 1fr 60px", height: "100vh"}}>
        
            <div className="flex items-center flex-col border-4 border-gray-900" style={{gridTemplateRows: "20px 1fr 20px"}}>
                <div className="flex w-full mb-2 border-gray-900 bg-gray-900" style={{marginTop: "76px"}}>
                    <span className="text-xl font-medium italic text-gray-200 m-auto">Cliente</span>
                </div>
            
                <div className="flex items-center pl-2.5 mt-4">   
                    <img src={(userData["IMAGEN"]) ? userData["IMAGEN"] : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png" }
                    className="bg-white mr-3 h-16 rounded-full" alt="Flowbite Logo" />
                    <div className="self-center whitespace-nowrap flex flex-col">
                    
                    </div>
                </div>
                <div className="flex w-full">
                    <span className="text-lg font-semibold text-white flex flex-col space-x-2 mx-auto" id="adminNameDiv">
                        <div className="p-2 italic text-gray-200 shadow-2xl rounded-lg">
                            {(userData["NOMBRES"]) ? `${userData["NOMBRES"].split(" ")[0]} ${userData["APELLIDOS"].split(" ")[0]}` : " "}
                            </div>
                    </span>
                </div>
            </div>
            

            <div className="overflow-y-hidden hover:overflow-y-auto flex flex-col space-y-2 mt-2">
            
            
            
                <NavLink to="/dashboard/dashboardOption0" className={activeDashboardOption === "dashboardOption0" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption0">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-sharp fa-solid fa-house"></div>
                    </div>
                    <span className="ml-3">Perfil</span>
                </NavLink>
                <NavLink to="/dashboard/dashboardOption1" className={activeDashboardOption === "dashboardOption1" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption1">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-sharp fa-solid fa-house"></div>
                    </div>
                    <span className="ml-3">Reportar accidente</span>
                </NavLink>
                <NavLink to="/dashboard/dashboardOption2" className={activeDashboardOption === "dashboardOption2" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption2">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-sharp fa-solid fa-house"></div>
                    </div>
                    <span className="ml-3">Solicitar asesoría especial</span>
                </NavLink>
                <NavLink to="/dashboard/dashboardOption3" className={activeDashboardOption === "dashboardOption3" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption3">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-sharp fa-solid fa-house"></div>
                    </div>
                    <span className="ml-3">Contrato</span>
                </NavLink>
                <NavLink to="/dashboard/dashboardOption4" className={activeDashboardOption === "dashboardOption4" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption3">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-sharp fa-solid fa-house"></div>
                    </div>
                    <span className="ml-3">Casos de asesoria</span>
                </NavLink>
                <NavLink to="/dashboard/dashboardOption5" className={activeDashboardOption === "dashboardOption5" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption3">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-sharp fa-solid fa-house"></div>
                    </div>
                    <span className="ml-3">Actividades</span>
                </NavLink>

                <NavLink to="/dashboard/dashboardOption6" className={activeDashboardOption === "dashboardOption6" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption3">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-sharp fa-solid fa-house"></div>
                    </div>
                    <span className="ml-3">Planes de mejora</span>
                </NavLink>

            
            </div>
            <div className="flex text-gray-400 border-t-2 mt-2 border-gray-900">

            </div>
        </div>
        
    </div>
    

  );
}

export default ClientSidebar;
