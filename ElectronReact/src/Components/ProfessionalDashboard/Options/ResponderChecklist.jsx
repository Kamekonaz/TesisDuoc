
import React from "react";
import ProfessionalSidebar from "../ProfessionalSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import { maxWidth } from "@mui/system";


function ResponderChecklist() {
    const cookies = new Cookies();
    const [displayOptions, setDisplayOptions] = React.useState([])
    const [changes, setChanges] = React.useState([])


    async function changeCheckbox(checkbox_id, estado){
        const newEstado = estado === "0" ? "1" : "0"
        const data = {
            id_checkbox: checkbox_id,
            estado: newEstado
        }
        const response = await axios.post("http://localhost:3001/editCheckbox", data)
        getChecklists()
    }
  
    async function getChecklists(){
        const data = {}
        const response = await axios.post("http://localhost:3001/getChecklists", data)
        const checklists = response.data


        const uniqueIDs = []
        const final_array = []
        let current_id
        let last_data = {
            ID: "",
            content: []
        }
       

        for(const checklist of checklists){
            if (!uniqueIDs.includes(checklist["ID_CHECKLIST"])) uniqueIDs.push(checklist["ID_CHECKLIST"])
        }


        for(const checklist of checklists){
            //console.log("checkeando", checklist)
            if(!current_id){
                current_id = checklist["ID_CHECKLIST"]
            }    
            if(current_id !== checklist["ID_CHECKLIST"]){
                final_array.push(last_data)
                current_id = checklist["ID_CHECKLIST"]                 
                last_data = {
                    ID: "",
                    content: []
                }
            }
            
            if(checklist["ID_CHECKLIST"]){
                last_data["ID"] = current_id
                last_data["content"].push(checklist)
            }
            
            
        }
        if (last_data["ID"]) final_array.push(last_data)
         


        // console.log("final_array")
        console.log(final_array)


        const bruh = []
        for (const checklist of final_array){
            bruh.push(
                <div className="border mt-6 bg-gray-800" key={checklist["ID"]}>
                    <div className="text-white font-bold border-b">Checklist (Id {checklist["ID"]}) {checklist["content"][0]["TITULO"]}</div>
                    <div className="flex flex-col mt-3">
                        {
                            checklist["content"].map(function(object, i){
                                return <div key={i} className="grid text-white border mt-2" style={{gridTemplateColumns:"30px 1fr 100px"}}> 
                                    <div className="pl-2">{i+1}</div>
                                    <div>{object["DESCRIPCION"]}</div>
                                    <div onClick={() => changeCheckbox(object["ID_CHECKBOX"], object["ESTADO"])} className={`text-center select-none ${object["ESTADO"] === "0"? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}>{object["ESTADO"] === "0" ? "Pendiente" : "Hecho"}</div>
                                </div>;
                            })
                        }
                        
                    </div>
                </div>
            )
        }


        setDisplayOptions(bruh)
        
    }

  React.useEffect(()=>{
    getChecklists()
  },[])

  async function guardar(){
    //console.log(title, "titleee")
    const data = {
      sessionKey: cookies.get("appsessionKey"),
      options: displayOptions
    }
    //console.log(data)
    await axios.post("http://localhost:3001/makeChecklist",data).then(
      Swal.fire({
          title: "<h5 style='color:white'>Exito</h5>",
          html: "<p style='color:white'>Checklist creado exitosamente</p>",
          icon: 'success',
          background: '#272727',
          showCancelButton: false,
          confirmButtonColor: '#7BCA6F',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
          }).then((result) => {
              if (result.isConfirmed) {
                  window.location.reload()
          }
      })
  );
    
  }



  

  return (
    <div style={{height: '100vh'}} >
        <ProfessionalSidebar/>
        <div id="viewContent border" className="h-full ml-64">
            <div className="dashboardOptionsBody bg-gray-700 flex flex-col pt-6 pl-6" style={{height: "100vh"}}>
                <div className="flex flex-col overflow-y-auto" style={{maxWidth: "500px", maxHeight: "80vh"}}>
                    {displayOptions}
                </div>
                
            </div>
        </div>
    </div>
    
  );
}

export default ResponderChecklist;
