//import './App.css';
import React from "react";
import axios from "axios";
//import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import ClientSidebar from "./ClientSidebar";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import { useEffect } from "react";
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }


function ViewActivities() {
    const cookies = new Cookies();
    const [activitiesList, setActivitiesList] = React.useState("");
    const [activitiesDisplay, setActivitiesDisplay] = React.useState();
    const userData = React.useMemo(()=> loadUserData())

    async function getActivitiesList(){
        const data ={
            sessionKey: cookies.get("appsessionKey"),
        }
        const activities = await axios.post('http://localhost:3001/listActivities', data)
        console.log(activities.data)
        setActivitiesList(activities.data)

        
        return;
    }


    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        return gottenUserData
    }

    useEffect(()=>{ 
        getActivitiesList()
        setInterval(()=>{
            getActivitiesList()
        }, 3000)
        
    },[])

    React.useEffect(() => {     
        if(!activitiesList) getActivitiesList()
        if(!activitiesDisplay) filterActivities()
    });


    function filterActivities(){
        if (!activitiesList) return;
        //return
        const displayActivity = []

        let filteredActivitiesList = activitiesList[0]


        for (const activity of filteredActivitiesList){

            const profesional = activitiesList[1].filter((participant) => (participant["ID_ACTIVIDAD"] === activity["ID_ACTIVIDAD"]
            && participant["ID_TIPO"] === 2))[0]

            const cliente = activitiesList[1].filter((participant) => (participant["ID_ACTIVIDAD"] === activity["ID_ACTIVIDAD"]
            && participant["ID_TIPO"] === 3))[0]
            if(profesional && cliente){
          

            if (cliente["RUT_USUARIO"] === userData["RUT_USUARIO"]){

            const activityDate = new Date(activity["FECHA_ACTIVIDAD"])

            displayActivity.push(
                <div className="h-20 bg-gray-700 flex hover:bg-gray-600 rounded-xl" key={activity["ID_ACTIVIDAD"]}>
                    <div className="border-gray-600 border-t h-full mx-auto" style={{width:"98%",
                    display: "grid", gridTemplateColumns: "260px 1.3fr 250px"}}>
                        <div className="flex my-auto space-x-2">
                            <div className="my-auto">Tipo de actividad:</div>
                            <div className={`px-3 py-2 rounded w-28 text-center
                                ${activity["ID_TIPOACTIVIDAD"] === 1 ? "bg-yellow-800" : ""}
                                ${activity["ID_TIPOACTIVIDAD"] === 2 ? "bg-orange-800" : ""}
                                ${activity["ID_TIPOACTIVIDAD"] === 3 ? "bg-red-800" : ""}
                                `}>
                                    {capitalize(activity["NOMBRE"])}
                            </div>
                        </div>
                        <div className="flex pl-2 my-auto flex-col space-y-1">
                            <div className="flex space-x-2">
                                <div className="py-1 bg-blue-500 rounded my-auto w-24 text-center">Profesional:</div>
                                <div className="my-auto border border-gray-900 py-1 px-2 rounded bg-gray-800">{profesional["NOMBRES"]} {profesional["APELLIDOS"]}</div> 
                            </div>
                            <div className="flex space-x-2">
                                <div className="py-1 bg-green-500 rounded my-auto w-24 text-center">Cliente:</div>
                                <div className="my-auto border border-gray-900 py-1 px-2 rounded bg-gray-800">{cliente["NOMBRES"]} {cliente["APELLIDOS"]}</div> 
                            </div>
                            
                            
                        </div>

                        <div className="flex flex-col">
                            <div className="flex space-x-3">
                                <div className="flex m-auto">
                                    Fecha: {activityDate.toLocaleDateString()}
                                </div>
                                <div className="flex m-auto">
                                    Hora: {activityDate.getHours().toString().length === 1 ? "0"+activityDate.getHours(): activityDate.getHours()}:{
                                    activityDate.getMinutes().toString().length === 1 ? "0"+ activityDate.getMinutes(): activityDate.getMinutes()}
                                </div>
                            </div>
                            <div className="flex">
                                <div className={`px-3 py-2 rounded w-28 text-center mx-auto
                                ${activity["ESTADO"] === 0 ? "bg-green-700" : "bg-yellow-700"}
                                `}>{activity["ESTADO"] === 0 ? "Realizado" : "Pendiente"}</div>
                            </div>
                        </div>
                        
                        


                </div>
          </div>
            )

        }
        }

        setActivitiesDisplay(displayActivity)
    }
    }




  return (
    <div className="bg-gray-700 grid" style={{minHeight: "100vh", gridTemplateColumns: "256px 1fr"}}>
        <ClientSidebar/>
        <div className="flex mt-20 bg-gray-700">
        <div className="p-2 text-gray-100 select-none overflow-y-auto w-full" >
                    {activitiesDisplay}
                </div>

        </div>
    </div>
    
  );
}

export default ViewActivities;
