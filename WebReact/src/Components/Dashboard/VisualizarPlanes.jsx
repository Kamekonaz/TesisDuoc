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

  

function VisualizarPlanes() {
    const cookies = new Cookies();
   
    const userData = React.useMemo(()=> loadUserData())

    const [mejoraPlanes, setMejoraPlanes] = React.useState("");
    const [toShowPDF, setToShowPDF] = React.useState("")

    async function loadPlanes(){
        //console.log("BRO WUATAFAFC")
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        const result = await axios.post("http://localhost:3001/getPlanes", {})
        let final_result = result.data.filter((client) => client["RUT_USUARIO"] === gottenUserData["RUT_USUARIO"])
        final_result = result.data.filter((client) => client["ESTADO"] === "1")
        setMejoraPlanes(final_result)
        console.log(final_result)
        return;
    }

  

    React.useEffect(()=>{
        loadPlanes().then(
            setInterval(()=>{
                loadPlanes()
            },3000)
        )
       
        
    },[])


    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        return gottenUserData
    }







  return (
    <div className="bg-gray-700 grid" style={{minHeight: "100vh", gridTemplateColumns: "256px 1fr"}}>
        <ClientSidebar/>
        <div className="flex mt-20 bg-gray-700 flex flex-col text-gray-200 overflow-y-auto" >



                <div className="border-b border-gray-800 shadow-lg w-full h-16 grid select-none" style={{gridTemplateColumns: "220px 1fr"}}>
                    <div className="flex ml-4 mr-auto my-auto space-x-2">
                        <i className="m-auto text-gray-200 fa-solid fa-pen-to-square"></i>
                        <div className="italic text-white font-bold">Planes de mejora</div>
                    </div>

                    <div className="text-gray-200 font-medium flex mr-auto my-auto space-x-4" id="clientDisplayOptionContainer">
                        {/* <div className={(displayOption === "1") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("1")}>Todos</div>
                        <div className={(displayOption === "2") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("2")}>Visitas</div>
                        <div className={(displayOption === "3") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("3")}>Capacitaciones</div>
                        <div className={(displayOption === "4") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("4")}>Asesoria</div> */}
                    </div>
   
                </div>
                <div className="flex flex-col overflow-y-auto mt-20" style={{maxHeight: "100vh"}}>
                    {  mejoraPlanes !== "" ?
                    mejoraPlanes.map((client, i) =>
                        
                        <div key={client["ID_PLAN"]} 
                        
                        className="bg-gray-700 flex flex-col hover:bg-gray-600 rounded-xl">
                            {
                                toShowPDF === client["ID_PLAN"]  ?
                                <div className="absolute top-20 flex flex-col">
                                    <div className="flex bg-black w-full">
                                        <div onClick={()=> setToShowPDF("")}
                                        className="ml-auto mr-4 bg-red-700 hover:bg-red-800 select-none rounded-lg text-center py-2 px-4 my-3">Cerrar</div>
                                    </div>
                                    <embed className="" style={{minWidth: "500px", width:"70vw", height:"80vh"}} src={`${client["PDF"]}`} />
                                </div>
                                    
                                    : ""
                            }
                            <div className="h-16 border-gray-600 border-t h-full mx-auto" style={{width: "98%",
                            display: "grid", gridTemplateColumns: "64px 350px 200px 210px 125px 150px 1fr"}}>
                                <div className="flex m-auto">
                                    <img src={client["IMAGEN"] ? client["IMAGEN"]
             : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"} className="h-12 w-12 object-cover rounded-full"/>
                                </div>
                                <div className="flex pl-2 mr-auto my-auto flex-col">
                                    <div>{client["NOMBRES"]} {client["APELLIDOS"]}</div> 
                                    <div className="italic text-xs text-gray-200">{client["RUT_USUARIO"]}</div>
                                </div>
          
        
            
                                <div className="flex flex-col justify-center items-start">
                                    <div className="font-bold">Empresa:</div>
                                    <div className={client["NOMBRE"] ? "" : "text-red-500"}>
                                        {client["NOMBRE"] ? client["NOMBRE"] : "Sin empresa"}
                                    </div>    
                                </div>

                                <div className="flex my-auto font-bold">
                                    Creacion: {new Date(client["FECHA_CREACION"]).toLocaleString()}
                                </div>

                                <div className="flex my-auto font-bold">
                                    Id: 00{client["ID_PLAN"]}
                                </div>

                                <div className="flex">
                                    <div onClick={(e) => {e.stopPropagation(); setToShowPDF(client["ID_PLAN"])}}
                                    className=" bg-orange-700 hover:bg-orange-800 select-none m-auto rounded-lg text-center py-1"  
                                    style={{width: "115px"}}> 
                                        Ver plan
                                    </div>
                                    
                                    
                                </div>


                                
                            </div>

                            
                        </div> 
                    ):""}
                </div>
   
            </div>
    </div>
    
  );
}

export default VisualizarPlanes;
