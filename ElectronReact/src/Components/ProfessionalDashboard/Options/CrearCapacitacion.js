
import React from "react";
import ProfessionalSidebar from "../ProfessionalSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es'

import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es)
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

function CrearCapacitacion() {
    const cookies = new Cookies()
    const [browserValue, setBrowserValue] = React.useState('');
    const [lastCheckedValue, setLastCheckedValue] = React.useState('');

    const [isSelecting, setIsSelecting] = React.useState(false);

    const [selectedClient, setSelectedClient] = React.useState('');


    const [startDate, setStartDate] = React.useState(new Date());
    const [detalleCapacitacion, setDetalleCapacitacion] = React.useState('');
    const [material, setMaterial] = React.useState('');
    const [clientsList, setClientsList] = React.useState();

    const [clients, setClients] = React.useState("");

    const [hour, setHour] = React.useState('00');
    const [minutes, setMinutes] = React.useState('00');

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

  async function getUsersList(){
      const data ={
          sessionKey: cookies.get("sessionKey"),
          usertype: 3
      }
      const usersList = await axios.post('http://localhost:3001/listUsersByUserType', data)
      setClientsList(usersList.data)
      return;
  }



  React.useEffect(() => {  
    if(!clients && browserValue.length < 1) clientSearch()
    else if(lastCheckedValue !== browserValue) clientSearch()
  });

  async function clientSearch(){
    setLastCheckedValue(browserValue)
    if(!clientsList) await getUsersList()
    if(!clientsList) return;
    const clientListContainer = document.getElementById("clientListContainer")
    


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
                      Sin empresa (cs)
                  </div>

              </div>
          </div>
        )
    }
    setClients(owo)
     

}

  function toggleClientSelector(client=""){
    if(client) {
      setSelectedClient(client)
      setIsSelecting(false)
      return;
    }

    setIsSelecting(true)
  }
  

  async function submit(){

    const sumbitDate = startDate.toLocaleDateString().split("/").join("")

    const sumbitDatetime = `${sumbitDate} ${hour}${minutes}00`

    const data = {
      descripcion: detalleCapacitacion,
      material: material,
      fecha: sumbitDatetime,
      rut_usuario: selectedClient["RUT_USUARIO"],
      sessionKey: cookies.get("sessionKey")
    }

    const hasVoidAttribute = !Object.values(data).every(value => value !== "")
    if(hasVoidAttribute) return;

    await axios.post('http://localhost:3001/crearCapacitacion', data
        ).then(
            Swal.fire({
                title: "<h5 style='color:white'>Exito</h5>",
                html: "<p style='color:white'>Capacitación creada exitosamente</p>",
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
                  <div className="mx-auto pb-8 pt-3">Seleccionar cliente</div>

                  <input onChange={(e) => {setBrowserValue(e.target.value); clientSearch()}} id="clientesSearch" className="mx-2 border rounded-lg h-12 pl-2 text-gray-200 text-xl bg-gray-800 border-gray-900 border-2 focus:border-black focus:outline-none focus:border-3" type="text" placeholder="Buscar"/>

                  <div className="p-2 text-gray-100 select-none overflow-y-auto" style={{minHeight: '300px', maxHeight: '300px'}} id="clientListContainer">
                    {clients}
                </div>
                </div>
            </div>
        </div>


        <div id="viewContent border" className="h-full ml-64">
            <div className="dashboardOptionsBody bg-gray-700 flex flex-col text-gray-200 overflow-y-auto" style={{height: "100vh", maxHeight: "100vh"}}>
                <div className="mx-auto text-3xl mt-2 font-medium mb-20">Crear capacitación</div>

                <div className="mx-auto text-xl">Cliente:</div>
                <div className="mx-auto h-16 bg-gray-600 flex hover:bg-gray-500 rounded-xl border border-gray-400" style={{width: "500px"}}>               
                    {
                      selectedClient ? 
                      <div className="border-gray-600 border-t h-full mx-auto" onClick={() => toggleClientSelector()} style={{width:"98%",
                        display: "grid", gridTemplateColumns: "64px 1.5fr 1fr"}}>
                            <div className="flex m-auto">
                                <img src={selectedClient["IMAGEN"] ? selectedClient["IMAGEN"]: "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"} className="h-12 w-12 object-cover rounded-full" alt=""/>
                            </div>
                            <div className="flex pl-2 mr-auto my-auto flex-col">
                                <div>{selectedClient["NOMBRES"]} {selectedClient["APELLIDOS"]}</div> 
                                <div className="italic text-xs text-gray-200">{selectedClient["RUT_USUARIO"]}</div>
                            </div>
                            <div className="flex m-auto">
                                Sin empresa (cs)
                            </div>
          
                        </div>
                      : 
                        <div className="border-gray-600 h-full mx-auto flex select-none" style={{width:"98%"}}>
                            <div className="m-auto text-xl" onClick={() => toggleClientSelector()}>Seleccionar cliente</div>
                        </div>
                    }
                    
                </div>

                <div className="w-full flex mt-2 flex-col w-full text-xl">
                  <div className="mx-auto">Detalle de capacitación</div>
                  <div className="mx-auto mt-2 text-black"><textarea onChange={(e) => setDetalleCapacitacion(e.target.value)} className="mx-auto w-96 h-36 p-2"></textarea></div>
                </div>
                <div className="w-full flex mt-2 flex-col w-full text-xl">
                  <div className="mx-auto">Material a utilizar</div>
                  <div className="mx-auto mt-2 text-black"><textarea onChange={(e) => setMaterial(e.target.value)} className="mx-auto w-96 h-36 p-2"></textarea></div>
                </div>
                <div className="w-full flex mt-6 w-full text-xl justify-center space-x-2">
                  <div className="">Fecha</div>
                  
                  <div className="flex items-center justify-center text-black">
                    <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
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
                <div className="flex w-full">
                  <div className="mx-auto mt-8 p-2 bg-green-500 hover:bg-green-600 px-10 select-none" onClick={() => submit()}>Crear</div>
                </div>
            </div>
        </div>
    </div>
    
  );
}

export default CrearCapacitacion;
