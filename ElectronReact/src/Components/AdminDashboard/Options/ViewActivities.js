
import React from "react";
import AdminSidebar from "../AdminSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'
// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     NavLink 
//   } from "react-router-dom";
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }


function ViewActivities() {
    const cookies = new Cookies()
    const [browserValue, setBrowserValue] = React.useState('');
    const [displayOption, setDisplayOption] = React.useState('1');
    const [activitiesList, setActivitiesList] = React.useState();
    const [lastCheckedActivityType, setLastCheckedActivityType] = React.useState('1');

    const [activitiesDisplay, setActivitiesDisplay] = React.useState('');
    
    const normalDisplayClasses = "px-2 rounded-lg hover:bg-gray-600"
    const selectedDisplayClasses = "px-2 rounded-lg bg-gray-800"


    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }
    
    function filterActivities(){
        if (!activitiesList) return;
        //console.log(activitiesList)
        //return
        const displayActivity = []

        let filteredActivitiesList = activitiesList[0]

        if (displayOption === "2") filteredActivitiesList = filteredActivitiesList.filter((activity) => activity["ID_TIPOACTIVIDAD"] === 1)
        if (displayOption === "3") filteredActivitiesList = filteredActivitiesList.filter((activity) => activity["ID_TIPOACTIVIDAD"] === 2)
        if (displayOption === "4") filteredActivitiesList = filteredActivitiesList.filter((activity) => activity["ID_TIPOACTIVIDAD"] === 3)

        setLastCheckedActivityType(displayOption)
        for (const activity of filteredActivitiesList){

            const profesional = activitiesList[1].filter((participant) => (participant["ID_ACTIVIDAD"] === activity["ID_ACTIVIDAD"]
            && participant["ID_TIPO"] === 2))[0]

            const cliente = activitiesList[1].filter((participant) => (participant["ID_ACTIVIDAD"] === activity["ID_ACTIVIDAD"]
            && participant["ID_TIPO"] === 3))[0]

            console.log(activity)

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
                                    Hora: {activityDate.getHours().length === 1 ?  activityDate.getHours(): "0" + activityDate.getHours()}:{
                                    activityDate.getMinutes().length === 1 ?  activityDate.getMinutes(): "0" + activityDate.getMinutes()}
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

        setActivitiesDisplay(displayActivity)
    }

    async function getActivitiesList(){
        const data ={
            sessionKey: cookies.get("appsessionKey"),
        }
        const activities = await axios.post('http://localhost:3001/listActivities', data)
        setActivitiesList(activities.data)

        
        return;
    }
    React.useEffect(() => {     
        if(!activitiesList) getActivitiesList()
        if(!activitiesDisplay || lastCheckedActivityType !== displayOption) filterActivities()
    });




    

  return (
    <div style={{height: '100vh'}} >
        <AdminSidebar/>
        <div id="viewContent border" className="h-full ml-64">
            <div className="dashboardOptionsBody bg-gray-700" style={{height: "100vh"}}>
                <div className="border-b border-gray-800 shadow-lg w-full h-16 grid select-none" style={{gridTemplateColumns: "200px 1fr"}}>
                    <div className="flex ml-4 mr-auto my-auto space-x-2">
                        <i className="m-auto text-gray-200 fa-solid fa-pen-to-square"></i>
                        <div className="italic text-white font-bold">Actividades</div>
                    </div>

                    <div className="text-gray-200 font-medium flex mr-auto my-auto space-x-4" id="clientDisplayOptionContainer">
                        <div className={(displayOption === "1") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("1")}>Todos</div>
                        <div className={(displayOption === "2") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("2")}>Visitas</div>
                        <div className={(displayOption === "3") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("3")}>Capacitaciones</div>
                        <div className={(displayOption === "4") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("4")}>Asesoria</div>
                    </div>
   
                </div>

                <div className="py-2 w-full flex my-auto px-6 h-8">

                </div>

                <div className="p-2 text-gray-100 select-none overflow-y-auto" >
                    {activitiesDisplay}
                </div>
            </div>
        </div>
    </div>
    
  );
}

export default ViewActivities;
