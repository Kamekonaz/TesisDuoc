
import React from "react";
import ProfessionalSidebar from "../ProfessionalSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2';


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
  

 

function VisualizarPlan() {
    const cookies = new Cookies()
    const [mejoraPlanes, setMejoraPlanes] = React.useState("");
    const [toShowPDF, setToShowPDF] = React.useState("")

    async function loadPlanes(){
        //console.log("BRO WUATAFAFC")
        const result = await axios.post("http://localhost:3001/getPlanes", {})
        setMejoraPlanes(result.data)
        console.log(result.data)
    }

    async function changePlanStatus(id, status){
        const data ={
             id_plan:id,
             estado:status === "0" ? "1" : "0"
        }
        //console.log(data)
         const result = await axios.post("http://localhost:3001/editPlan", data)
         loadPlanes()
       }

    React.useEffect(()=>{
        loadPlanes()
    },[])
  
  
    
    

  return (
    <div style={{height: '100vh', maxWidth: '100vw'}} >
        <ProfessionalSidebar/>
       
        <div id="viewContent border" className="h-full ml-64">
            <div className="dashboardOptionsBody bg-gray-700 flex flex-col text-gray-200 overflow-y-auto" style={{height: "100vh", maxHeight: "100vh"}}>



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
                                <div className="absolute top-0 flex flex-col">
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


                                <div className="flex">
                                    <div onClick={(e) => {e.stopPropagation(); changePlanStatus(client["ID_PLAN"], client["ESTADO"])}}
                                    className={`${client["ESTADO"] === "0" ? " bg-green-500 hover:bg-green-600" : " bg-red-500 hover:bg-red-600"} 
                                    select-none m-auto rounded-lg text-center py-1`} style={{width: "115px"}}> 
                                        {client["ESTADO"] === "0" ? "Aprobar plan" : " Desaprobar"}
                                    </div>
                                </div>
                            </div>

                            
                        </div> 
                    ):""}
                </div>
   
            </div>
        </div>
    </div>
    
  );
}

export default VisualizarPlan;
