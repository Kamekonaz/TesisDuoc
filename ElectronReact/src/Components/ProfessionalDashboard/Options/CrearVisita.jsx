
import React from "react";
import ProfessionalSidebar from "../ProfessionalSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'


import {es} from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import "react-datepicker/dist/react-datepicker.css";
// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     NavLink 
//   } from "react-router-dom";

function isNumeric(str) {
  if (typeof str !== "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function CrearVisita() {
    const cookies = new Cookies()
    const [browserValue, setBrowserValue] = React.useState('');
    const [lastCheckedValue, setLastCheckedValue] = React.useState('');
    const [value, setValue] = React.useState(new Date());

    const [isSelecting, setIsSelecting] = React.useState(false);

    const [selectedClient, setSelectedClient] = React.useState('');


    const [startDate, setStartDate] = React.useState(new Date());
    const [clientsList, setClientsList] = React.useState();

    const [clients, setClients] = React.useState("");

    const [hour, setHour] = React.useState('00');
    const [minutes, setMinutes] = React.useState('00');


    const [checklists, setChecklists] = React.useState()

    function handleSetHour(value){
        if (!isNumeric(value) && value.length !== 0) return;
        if (value.length > 2) return;

        setHour(value)
    }

    function handleSetMinutes(value){
      if (!isNumeric(value) && value.length !== 0) return;
      if (value.length > 2) return;

      setMinutes(value)
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


    let owo = []
    for (const checklist of final_array){
        owo.push(
          <div className="h-16 bg-gray-700 flex hover:bg-gray-600 rounded-xl" key={checklist["ID"]}
          onClick={() => {toggleChecklistSelector(checklist)}}>
              <div className="border-gray-600 border-t h-full mx-auto" style={{width:"98%",
              display: "grid", gridTemplateColumns: "64px 1.3fr 1fr"}}>
                  <div className="flex m-auto">
                      <div>(Id {checklist["ID"]})</div>
                  </div>
                  <div className="flex pl-2 mr-auto my-auto flex-col">
                      <div>{checklist["content"][0]["TITULO"]}</div> 
                  </div>
                  <div className="flex m-auto">
                      {checklist["content"].length} Opciones
                  </div>

              </div>
          </div>
        )
    }
    setChecklists(owo)
  }

  async function getUsersList(){
      const data ={
          sessionKey: cookies.get("appsessionKey"),
          usertype: 3
      }
      const usersList = await axios.post('http://localhost:3001/listUsersByUserType', data)
      setClientsList(usersList.data)
      return;
  }
  React.useEffect(()=>{
    getChecklists()
  },[])


  React.useEffect(() => {  
    if(!clients && browserValue.length < 1) clientSearch()
    else if(lastCheckedValue !== browserValue) clientSearch()
  });

  async function clientSearch(){
    setLastCheckedValue(browserValue)
    if(!clientsList) await getUsersList()
    if(!clientsList) return;
    


    let filteredClientsList = clientsList;


    filteredClientsList = (!isNumeric(browserValue[0])) ?
    clientsList.filter((client) => (client["NOMBRES"].toLowerCase().includes(browserValue) || client["APELLIDOS"].toLowerCase().includes(browserValue))) 
    : clientsList.filter((client) => (client["RUT_USUARIO"].toLowerCase().includes(browserValue)));


    let owo = []
    for (const client of filteredClientsList){
        const imageSRC = (client["IMAGEN"]) ? client["IMAGEN"]
         : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png";
        owo.push(
          <div className="h-16 bg-gray-700 flex hover:bg-gray-600 rounded-xl" key={client["ID_CUENTA"]}
          onClick={() => {toggleClientSelector(client)}}>
              <div className="border-gray-600 border-t h-full mx-auto" style={{width:"98%",
              display: "grid", gridTemplateColumns: "64px 1.3fr 1fr"}}>
                  <div className="flex m-auto">
                      <img src={imageSRC} className="h-12 w-12 object-cover rounded-full" alt=""/>
                  </div>
                  <div className="flex pl-2 mr-auto my-auto flex-col">
                      <div>{client["NOMBRES"]} {client["APELLIDOS"]}</div> 
                      <div className="italic text-xs text-gray-200">{client["RUT_USUARIO"]}</div>
                  </div>
                  <div className="flex m-auto">
                      {client["NOMBRE_1"]}
                  </div>

              </div>
          </div>
        )
    }
    setClients(owo)
     

}
const [isChecklisting, setIsChecklisting] = React.useState(false)
const [selectedChecklist, setSelectedChecklist] = React.useState("")
function toggleChecklistSelector(checklist="", justClose=false){
  if(justClose) return setIsChecklisting(false)
  if(checklist !== "") {
    setSelectedChecklist(checklist)
    setIsChecklisting(false)
    return;
  }

  setIsChecklisting(true)
}

function toggleClientSelector(client="", justClose=false){
  if(justClose) return setIsSelecting(false)
  if(client !== "") {
    setSelectedClient(client)
    setIsSelecting(false)
    return;
  }

  setIsSelecting(true)
}
  

  async function submit(){


    const sumbitDate = value.toLocaleDateString().split("/").join("")

    const sumbitDatetime = `${sumbitDate} ${hour}${minutes}00`
    const gottenUserData = JSON.parse(localStorage.getItem('appuserData'))

    const data = {
      fecha: sumbitDatetime,
      rut_usuario: selectedClient["RUT_USUARIO"] ? selectedClient["RUT_USUARIO"] : "",
      rut_profesional: gottenUserData["RUT_USUARIO"]? gottenUserData["RUT_USUARIO"] : "",
      sessionKey: cookies.get("appsessionKey"),
      id_checklist: selectedChecklist["ID"]
    }

    console.log(data)

    const hasVoidAttribute = !Object.values(data).every(value => value !== "")
    if(hasVoidAttribute) return;


    await axios.post('http://localhost:3001/crearVisita', data
        ).then(
            Swal.fire({
                title: "<h5 style='color:white'>Exito</h5>",
                html: "<p style='color:white'>Capacitaci??n creada exitosamente</p>",
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
    <div style={{height: '100vh', maxWidth: '100vw'}} >
        <ProfessionalSidebar/>
        <div className={`h-full absolute z-10 w-full ${isSelecting ? "": "hidden"}`} id="clientSelector">
            <div className="ml-64 h-full flex" style={{background: 'rgba(0, 0, 0, 0.9)'}}>

                <div className="m-auto bg-gray-700 flex flex-col text-white text-xl rounded-xl" style={{width: '600px'}}>
                <div className="py-5 pt-3 flex items-center">
                      <div className="pl-8 mx-auto">Seleccionar cliente</div>
                      <div onClick={() => toggleClientSelector("", true)} className="mr-8 border px-2 rounded-lg pb-1 font-bold hover:bg-gray-800 select-none">x</div>
                  </div>

                  <input onChange={(e) => {setBrowserValue(e.target.value); clientSearch()}} id="clientesSearch" className="mx-2 border rounded-lg h-12 pl-2 text-gray-200 text-xl bg-gray-800 border-gray-900 border-2 focus:border-black focus:outline-none focus:border-3" type="text" placeholder="Buscar"/>

                  <div className="p-2 text-gray-100 select-none overflow-y-auto" style={{minHeight: '300px', maxHeight: '300px'}} id="clientListContainer">
                    {clients}
                </div>
                </div>
            </div>
        </div>

        <div className={`h-full absolute z-10 w-full ${isChecklisting ? "": "hidden"}`} id="clientSelector">
            <div className="ml-64 h-full flex" style={{background: 'rgba(0, 0, 0, 0.9)'}}>

                <div className="m-auto bg-gray-700 flex flex-col text-white text-xl rounded-xl" style={{width: '600px'}}>
                <div className="py-5 pt-3 flex items-center">
                      <div className="pl-8 mx-auto">Seleccionar checklist</div>
                      <div onClick={() => toggleChecklistSelector("", true)} className="mr-8 border px-2 rounded-lg pb-1 font-bold hover:bg-gray-800 select-none">x</div>
                  </div>

                  <div className="p-2 text-gray-100 select-none overflow-y-auto" style={{minHeight: '300px', maxHeight: '300px'}} id="checklistContainer">
                    {checklists}
                </div>
                </div>
            </div>
        </div>


        <div id="viewContent border" className="h-full ml-64">
            <div className="dashboardOptionsBody bg-gray-700 flex flex-col text-gray-200 overflow-y-auto" style={{height: "100vh", maxHeight: "100vh"}}>
                <div className="mx-auto text-3xl mt-2 font-medium mb-20">Planificar Visita</div>


                <div className="grid" style={{gridTemplateColumns: "600px 1fr"}}>
                  <div className="flex flex-col" style={{width: "600px"}}>
                    <div className="mx-auto text-xl">Cliente:</div>
                    <div className="mx-auto h-16 bg-gray-600 flex hover:bg-gray-500 rounded-xl border border-gray-400 select-none" onClick={() => toggleClientSelector()} style={{width: "500px"}}>               
                        {
                          selectedClient ? 
                          <div className="border-gray-600 border-t h-full mx-auto" style={{width:"98%",
                            display: "grid", gridTemplateColumns: "64px 1.5fr 1fr"}}>
                                <div className="flex m-auto">
                                    <img src={selectedClient["IMAGEN"] ? selectedClient["IMAGEN"]: "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"} className="h-12 w-12 object-cover rounded-full" alt=""/>
                                </div>
                                <div className="flex pl-2 mr-auto my-auto flex-col">
                                    <div>{selectedClient["NOMBRES"]} {selectedClient["APELLIDOS"]}</div> 
                                    <div className="italic text-xs text-gray-200">{selectedClient["RUT_USUARIO"]}</div>
                                </div>
                                <div className="flex m-auto">
                                  {selectedClient["NOMBRE_1"]}
                                </div>
              
                            </div>
                          : 
                            <div className="border-gray-600 h-full mx-auto flex select-none" style={{width:"98%"}}>
                                <div className="m-auto text-xl" onClick={() => toggleClientSelector()}>Seleccionar cliente</div>
                            </div>
                        }
                        
                    </div>



                    <div className="flex flex-col mt-20">
                      <div className="mx-auto text-xl">Checklist:</div>
                      <div className="mx-auto h-16 bg-gray-600 flex hover:bg-gray-500 rounded-xl border border-gray-400 select-none" onClick={()=> toggleChecklistSelector()} style={{width: "500px"}}>               
                        {
                          selectedChecklist ? 
                              <div className="border-gray-600 border-t h-full mx-auto" style={{width:"98%",
                                display: "grid", gridTemplateColumns: "64px 1.5fr 1fr"}}>
                                    <div className="flex m-auto">
                                      <div>(Id {selectedChecklist["ID"]})</div>                                    
                                    </div>
                                    <div className="flex pl-2 mr-auto my-auto flex-col">
                                      <div>{selectedChecklist["content"][0]["TITULO"]}</div> 
                                    </div>
                                    <div className="flex m-auto">
                                      {selectedChecklist["content"].length} Opciones
                                    </div>
                  
                                </div>
                              : 
                                <div className="border-gray-600 h-full mx-auto flex select-none" style={{width:"98%"}}>
                                    <div className="m-auto text-xl">Seleccionar checklist</div>
                                </div>
                            }
                        </div>
                  </div>


                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="w-full flex mt-6 w-full text-xl justify-center space-x-2">
                      <div className="">Fecha</div>
                      
                      <div className="flex items-center justify-center text-black">
                       <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                        <DatePicker
                          className="text-white"
                          label="Seleccionar fecha"
                          inputFormat="dd-MM-yyyy"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} sx={{
                            '.MuiInputBase-colorPrimary': {backgroundColor: "white"},
                            '.MuiInputLabel-animated': {marginTop: "5px"},
                            '.MuiInputLabel-focused': {display: ""},
                            //'.MuiInputLabel-animated': {backgroundColor: ""}
                        }}/>}
                        />
                    </LocalizationProvider>
                      </div>
                    </div>
                    <div className="w-full flex mt-6 w-full text-xl justify-center space-x-2">
                      <div className="">Hora</div>
                      
                      <div className="flex items-center justify-center text-black">
                        <div><input value={hour} onChange={(e) => handleSetHour(e.target.value)} className="w-10 pl-1" type="text"></input></div>
                        <div className="w-2 text-white text-xl font-bold pl-2 pr-3">:</div>
                        <div><input value={minutes} onChange={(e) => handleSetMinutes(e.target.value)} className="w-10 pl-1" type="text"></input></div>
                      </div>
                    </div>
                </div>

                </div>
                
                
               
               
                
                <div className="flex w-full h-full">
                  <div className="mt-auto ml-auto p-2 mb-10 mr-10 bg-green-500 hover:bg-green-600 px-10 select-none" onClick={() => submit()}>Crear</div>
                </div>
            </div>
        </div>
    </div>
    
  );
}

export default CrearVisita;
