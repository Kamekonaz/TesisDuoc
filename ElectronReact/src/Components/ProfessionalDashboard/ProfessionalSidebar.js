//import './App.css';
import axios from "axios";
import React from "react";
// import axios from "axios";
import Cookies from 'universal-cookie';
// const LOGIN_URL = "http://localhost:3001/login"
import {useNavigate} from 'react-router-dom'
// const EXPECTED_USERS = [1]
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink 
  } from "react-router-dom";




function ProfessionalSidebar() {
    const cookies = new Cookies();
    const [isSessionValid, setIsSessionValid] = React.useState(true);
    // if(isSessionValid === false) window.location.href = window.location.origin
    const navigate = useNavigate()
    if(isSessionValid === false) window.location.href = window.origin
    if(window.location.pathname === "/professionalDashboard") navigate("dashboardOption0")
    const paramDashboardOption = window.location.pathname.split("/")[2]
    const [activeDashboardOption, setActiveDashboardOption] = React.useState((paramDashboardOption) ? paramDashboardOption : 0);
    const userData = React.useMemo(()=> loadUserData())

    

    const normalDashboardOptionClass = "flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 select-none dashboardOptions"
    const selectedDashboardOptionClass = "flex items-center p-2 text-base font-normal rounded-lg text-white bg-gray-900 select-none dashboardOptions"

    async function handleIsSessionValid(){
        const sessionKey = cookies.get("appsessionKey")
        if(!sessionKey) return setIsSessionValid(false)
        try {
            const data = {
                sessionKey: sessionKey,
                expectedUserTypes: [2]
            }
            const isValid = (await axios.post('http://localhost:3001/isSessionValid', data)).data
            return setIsSessionValid(isValid.valid)
        } catch (error) {
            return setIsSessionValid(false)
        }
        
    }
    async function reloadUserData(){
        const data = {
            sessionKey:  cookies.get("appsessionKey")
        }
        const userData = (await axios.post('http://localhost:3001/getselfuserdata', data)).data
        localStorage.setItem('appuserData', JSON.stringify(userData))
    }

    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('appuserData'))
        return gottenUserData
    }

    React.useEffect(()=>{
        handleIsSessionValid()
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

        <div className="fixed grid w-64 bg-gray-800" style={{gridTemplateRows: "150px 1fr 60px", height: "100vh"}}>
            <div className="flex items-center flex-col border-4 border-gray-900" style={{gridTemplateRows: "20px 1fr 20px"}}>
                <div className="flex w-full mb-2 border-gray-900 bg-gray-900">
                    <span className="text-xl font-medium italic text-gray-200 m-auto">Profesional</span>
                </div>
            
                <div className="flex items-center pl-2.5">   
                    <img src={(userData["IMAGEN"]) ? userData["IMAGEN"] : "https://www.theeducationabroad.com/admin-frame/gallery-img/admin.png" }
                    className="mr-3 h-16 rounded-full" alt="Flowbite Logo" />
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
            
            
            
                <NavLink to="/professionalDashboard/dashboardOption0" className={activeDashboardOption === "dashboardOption0" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption0">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-sharp fa-solid fa-house"></div>
                    </div>
                    <span className="ml-3">Dashboard</span>
                </NavLink>
                <NavLink to="/professionalDashboard/dashboardOption1" className={activeDashboardOption === "dashboardOption1" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption1">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-solid fa-user"></div>
                    </div>
                    <span className="ml-3">Crear capacitación</span>
                </NavLink>
                <NavLink to="/professionalDashboard/dashboardOption2" className={activeDashboardOption === "dashboardOption2" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption2">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-solid fa-user"></div>
                    </div>
                    <span className="ml-3">Planificar visita</span>
                </NavLink>
                <NavLink to="/professionalDashboard/dashboardOption3" className={activeDashboardOption === "dashboardOption3" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption3">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-solid fa-money-bill"></div>
                    </div>
                    <span className="ml-3">Revisar cliente</span>
                </NavLink>
                <NavLink to="/professionalDashboard/dashboardOption4" className={activeDashboardOption === "dashboardOption4" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption4">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-solid fa-circle-info"></div>
                    </div>
                    <span className="ml-3">Crear caso de asesoría</span>
                </NavLink>
                <NavLink to="/professionalDashboard/dashboardOption5" className={activeDashboardOption === "dashboardOption5" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption5">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-solid fa-layer-group"></div>
                    </div>
                    <span className="ml-3">Ingresar actividad de mejora</span>
                </NavLink>
                <NavLink to="/professionalDashboard/dashboardOption6" className={activeDashboardOption === "dashboardOption6" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption6">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-solid fa-clock"></div>
                    </div>
                    <span className="ml-3">Ingresar asesoria</span>
                </NavLink>
                <NavLink to="/professionalDashboard/dashboardOption7" className={activeDashboardOption === "dashboardOption7" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption7">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-solid fa-chart-simple"></div>
                    </div>
                    <span className="ml-3">Crear checklist</span>
                </NavLink>
                <NavLink to="/professionalDashboard/dashboardOption8" className={activeDashboardOption === "dashboardOption8" ? selectedDashboardOptionClass : normalDashboardOptionClass} id="dashboardOption8">
                    <div className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white">
                        <div className="fa-solid fa-chart-simple"></div>
                    </div>
                    <span className="ml-3">Responder checklist</span>
                </NavLink>
            
            </div>
            <div className="flex text-gray-400 border-t-2 mt-2 border-gray-900">
                <div className="flex w-full items-left pl-4 space-x-6">
                    {/* <i className="hover:text-white text-2xl my-auto fa-solid fa-gear"
                    onClick={()=> window.location.href = window.location.origin + '/editUser/?userID='+userData["ID_CUENTA"]}></i> */}
                    <i className="hover:text-white text-2xl my-auto fa-solid fa-arrow-up-right-from-square" 
                    onClick={()=> {cookies.remove("sessionKey"); window.location.href = window.origin}}></i>
                </div>
                
            </div>
        </div>

  );
}

export default ProfessionalSidebar;
