
import React from "react";
import ProfessionalSidebar from "../ProfessionalSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'

// function getBase64(file) {
//     var reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       console.log(reader.result);
//     };
//     reader.onerror = function (error) {
//       console.log('Error: ', error);
//     };
//  }




 async function getBase64(file) {
    var reader = new FileReader();
    var resultBase64 = ""
    reader.onloadend = function() {
      resultBase64 = reader.result
    }
    const dataURL = reader.readAsDataURL(file);
     return await new Promise(function (resolve, reject) {
      const interval = setInterval(()=>{
        if(resultBase64 != "")  {
          resolve(resultBase64)
          clearInterval(interval)
        }
      }, 50)
        
      });
  }

 function isNumeric(str) {
    if (typeof str !== "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }
  
  

 

function AsesoriaEspecial() {
    const cookies = new Cookies()
    const [solicitudesAsesoria, setSolicitudesAsesoria] = React.useState("");
    const [displayOption, setDisplayOption] = React.useState("")
    const [chats, setChats] = React.useState("")
    const navigate = useNavigate()

    async function loadChats(){
        
        const data = {
    
        }
    
        const result = await axios.post('http://localhost:3001/list_chats', data)
        const unique_chat_rooms = filter_chat_rooms(result.data)

        setChats(unique_chat_rooms)

        
    }

    async function openChat(id_chat){
        navigate("/professionalDashboard/dashboardOption4/chat" + "?room="+id_chat)
    }

    function filter_chat_rooms(rooms_data){

        const uniques = []
        const results = []
        for(const room_data of rooms_data){
            if(!uniques.includes(room_data["ID_SALA"])){
                uniques.push(room_data["ID_SALA"])
                results.push(room_data)
            } 
        }

        return results;
    }
    

    const normalDisplayClasses = "px-2 rounded-lg hover:bg-gray-600"
    const selectedDisplayClasses = "px-2 rounded-lg bg-gray-800"

    async function loadPlanes(){
        //console.log("BRO WUATAFAFC")
        const result = await axios.post("http://localhost:3001/getSolicitudesAsesoria", {})
        setSolicitudesAsesoria(result.data)
        console.log(result.data)
    }


    async function responderSolicitud(id_solicitud, respuesta){
        const data = {
            id_solicitud: id_solicitud,
            resolucion: respuesta
        }

        await axios.post("http://localhost:3001/editarSolicitudAsesoria", data)
        loadPlanes()
  }



    React.useEffect(()=>{
        loadPlanes()
        loadChats()
        setDisplayOption("1")
    },[])
  
  
    
    

  return (
    <div style={{height: '100vh', maxWidth: '100vw'}} >
        <ProfessionalSidebar/>
       
        <div id="viewContent border" className="h-full ml-64">
            <div className="dashboardOptionsBody bg-gray-700 flex flex-col text-gray-200 overflow-y-auto" style={{height: "100vh", maxHeight: "100vh"}}>


                <div className="border-b border-gray-800 shadow-lg w-full h-16 grid select-none" style={{gridTemplateColumns: "220px 1fr"}}>
                    <div className="flex ml-4 mr-auto my-auto space-x-2">
                        <i className="m-auto text-gray-200 fa-solid fa-pen-to-square"></i>
                        <div className="italic text-white font-bold">Crear caso de asesoria</div>
                    </div>

                    <div className="text-gray-200 font-medium flex mr-auto my-auto space-x-4" id="clientDisplayOptionContainer">
                        <div className={(displayOption === "1") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("1")}>Solicitudes</div>
                        <div className={(displayOption === "2") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("2")}>Casos</div>
                    </div>
   
                </div>

                {/* <div className="py-2 w-full flex my-auto px-6 h-8">

                </div> */}
               
                <div className="flex flex-col overflow-y-auto mt-20" style={{maxHeight: "100vh"}}>
                    {
                        displayOption === "1" ? 
                            solicitudesAsesoria !== "" ?
                        solicitudesAsesoria.map((client, i) =>
                            <div key={client["ID_SOLICITUD"]} 
                            
                            className="bg-gray-700 flex flex-col hover:bg-gray-600 rounded-xl">
                                <div className="h-16 border-gray-600 border-t h-full mx-auto" style={{width: "98%",
                                display: "grid", gridTemplateColumns: "64px 350px 200px 210px 125px 1fr 220px"}}>
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
                                        Creacion: {new Date(client["FECHA_EMISION"]).toLocaleString()}
                                    </div>

                                    <div className="flex my-auto font-bold">
                                        Id: 00{client["ID_SOLICITUD"]}
                                    </div>

                                    <div className="flex flex-col pr-6">
                        
                                        
                                        <div className="my-auto bg-gray-800 py-1 px-2 border-gray-900 border rounded-lg">Motivo: {client["MOTIVO"]}</div>
                                    </div>


                                    
                                        {
                                            client["RESOLUCION"] === null ?
                                            <div className="flex space-x-2">
                                                <div onClick={(e) => {e.stopPropagation(); responderSolicitud(client["ID_SOLICITUD"], "1")}}
                                                className=" bg-green-500 hover:bg-green-600 select-none m-auto rounded-lg text-center py-1" style={{width: "205px"}}> 
                                                Aceptar
                                                </div>

                                                <div onClick={(e) => {e.stopPropagation(); responderSolicitud(client["ID_SOLICITUD"], "0")}}
                                                className=" bg-red-500 hover:bg-red-600 select-none m-auto rounded-lg text-center py-1" style={{width: "205px"}}> 
                                                Rechazar
                                                </div>
                                            </div>
                                            :
                                            client["RESOLUCION"] === "1" ?
                                            <div className="flex space-x-2">
                                                <div onClick={(e) => {e.stopPropagation();}}
                                                    className=" bg-green-800 select-none m-auto rounded-lg text-center py-1" style={{width: "205px"}}> 
                                                    Solicitud aceptada
                                                </div>

                                            </div>
                                            :
                                            <div className="flex space-x-2">
                                                <div onClick={(e) => {e.stopPropagation();}}
                                                    className=" bg-red-800 select-none m-auto rounded-lg text-center py-1" style={{width: "205px"}}> 
                                                    Solicitud rechazada
                                                </div>

                                            </div>
                                        }
                                        
                                    
                                </div>

                                
                            </div> 
                        ):""

                    : displayOption === "2" ? 
                    chats !== "" ?
                    chats.map((client, i) =>
                        <div key={client["ID_SALA"]} 
                        
                        className="bg-gray-700 flex flex-col hover:bg-gray-600 rounded-xl">
                            <div className="h-16 border-gray-600 border-t h-full mx-auto" style={{width: "98%",
                            display: "grid", gridTemplateColumns: "64px 350px 200px 210px 125px 150px 1fr"}}>
                                <div className="flex m-auto">
                                    <img src={client["IMAGEN"] ? client["IMAGEN"]
             : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"} className="h-12 w-12 object-cover rounded-full"/>
                                </div>
                                <div className="flex pl-2 mr-auto my-auto flex-col">
                                    <div>{client["NOMBRES"]} {client["APELLIDOS"]}</div> 
                                    <div className="italic text-xs text-gray-200">{client["RUT_USUARIO_1"]}</div>
                                </div>
          
        
            
                                <div className="flex flex-col justify-center items-start">
                                    <div className="font-bold">Empresa:</div>
                                    <div className={client["NOMBRE"] ? "" : "text-red-500"}>
                                        {client["NOMBRE"] ? client["NOMBRE"] : "Sin empresa"}
                                    </div>    
                                </div>

                                <div className="flex my-auto font-bold">
                                    Asunto: {client["ASUNTO"]}
                                </div>

                                <div className="flex my-auto font-bold">
                                    Id: 00{client["ID_SALA"]}
                                </div>

                                <div className="flex">
                                    <div onClick={(e) => {e.stopPropagation(); openChat(client["ID_SALA"])}}
                                    className=" bg-orange-700 hover:bg-orange-800 select-none m-auto rounded-lg text-center py-1"  
                                    style={{width: "115px"}}> 
                                        Ver chat
                                    </div>
                                    
                                    
                                </div>

                            </div>

                            
                        </div> 
                    ):""

                       :""
                    }
                    
                </div>
   
            </div>
        </div>
    </div>
    
  );
}

export default AsesoriaEspecial;
