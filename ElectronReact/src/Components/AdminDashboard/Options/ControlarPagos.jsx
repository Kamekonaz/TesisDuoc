
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

let hola = 0;
let extra_info = ""

function ControlarPagos() {
    const cookies = new Cookies()
    const [browserValue, setBrowserValue] = React.useState('');
    const [displayOption, setDisplayOption] = React.useState('1');
    const [clientsList, setClientsList] = React.useState();
    const [pagosList, setPagosList] = React.useState();
    const [displayClients, setDisplayClients] = React.useState('')



  
    const normalDisplayClasses = "px-2 rounded-lg hover:bg-gray-600"
    const selectedDisplayClasses = "px-2 rounded-lg bg-gray-800"


    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }
    

    async function getUsersList(){
        const data ={
            sessionKey: cookies.get("appsessionKey")
        }
        const usersList = await axios.post('http://localhost:3001/getClientsWithContract', data)
        console.log(usersList.data)
        setClientsList(usersList.data)
        return;
    }

    async function getPagosList(){
        const data ={
            sessionKey: cookies.get("appsessionKey")
        }
        const usersList = await axios.post('http://localhost:3001/getPayments', data)
        console.log(usersList.data)
        setPagosList(usersList.data)
        return;
    }

    function getTipoRecibo(tipo_recibo){
        const tipos = {
            VD: "Venta Débito",
            VN: "Venta Normal",
            VC: "Venta en cuotas",
            SI: "3 cuotas sin interés",
            S2: "2 cuotas sin interés",
            NC: "N Cuotas sin interés",
            VP: "Venta Prepago",
        }

        return tipos[tipo_recibo]
        
    }

    React.useEffect(()=>{
        setInterval(()=>{
            getUsersList()
        },100000)

        setInterval(()=>{
            getPagosList()
        },7300)
        //console.log("ola")
        
    }, [])

    React.useEffect(() => {  
        if(displayOption === "4") pagosSearch()
        else clientSearch()
        
    }, [clientsList, browserValue, displayOption, pagosList]);

    async function changePaymentStatus(rut_usuario, status){
        const newStatus = status === 1 ? 2 : 1
        const data = {
            sessionKey: cookies.get("appsessionKey"),
            rut_usuario: rut_usuario,
            newStatus: newStatus
        }
        await axios.post('http://localhost:3001/changeContractStatus', data)
        getUsersList()

    }


    async function pagosSearch(){
        if(!pagosList) await getPagosList()
        if(!pagosList) return;
        
        const activeUserHTML = 
            <div className="px-2 rounded-lg bg-green-600">
                Activo
            </div> ;

        const disabledUserHTML = 
            <div className="px-2 rounded-lg bg-red-600">
                Inactivo
            </div> ;

    
        let filteredClientsList = pagosList;
    
    
        filteredClientsList = (!isNumeric(browserValue[0])) ?
        pagosList.filter((client) => (client["NOMBRES"].toLowerCase().includes(browserValue) || client["APELLIDOS"].toLowerCase().includes(browserValue))) 
        : pagosList.filter((client) => (client["RUT_USUARIO"].toLowerCase().includes(browserValue)));
    
    
    
        let usersHTML = []
        for (const client of filteredClientsList){
            const imageSRC = (client["IMAGEN"]) ? client["IMAGEN"]
             : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png";
            usersHTML.push(
                <div key={client["ID_PAGO"]} className="h-16 bg-gray-700 flex hover:bg-gray-600 rounded-xl">
                    <div className="border-gray-600 border-t h-full mx-auto" style={{width: "98%",
                    display: "grid", gridTemplateColumns: "64px 250px 200px 210px 175px 270px 1fr"}}>
                        <div className="flex m-auto">
                            <img src={imageSRC} className="h-12 w-12 object-cover rounded-full"/>
                        </div>
                        <div className="flex pl-2 mr-auto my-auto flex-col">
                            <div>{client["NOMBRES"]} {client["APELLIDOS"]}</div> 
                            <div className="italic text-xs text-gray-200">{client["RUT_USUARIO"]}</div>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <div className="font-bold">Empresa:</div>
                            <div className={client["NOMBRE_1"] ? "" : "text-red-500"}>
                                {client["NOMBRE_1"] ? client["NOMBRE_1"] : "Sin empresa"}
                            </div>    
                        </div>
    
                        <div className="flex">
                            <div className="ml-6 border p-2 my-auto rounded-lg bg-gray-800 font-bold" style={{minWidth: "170px"}}>Monto: 
                                ${client["MONTO"]}
                            </div>

                        </div>

                        <div className="flex">
                            <div className="m-auto border p-2 my-auto rounded-lg bg-gray-800 font-bold" style={{minWidth: "150px"}}>
                                    {getTipoRecibo(client["TIPO_RECIBO"])}
                            </div>
                        </div>

                        <div className="flex my-auto font-bold">
                               Fecha y hora: {new Date(client["FECHA_PAGO"]).toLocaleString()}
                        </div>

                        <div 
                        className={`bg-orange-700 hover:bg-orange-800 select-none m-auto rounded-lg text-center py-1`} style={{width: "115px"}}> 
                            Ver boleta
                        </div>

                    </div>
                </div> 
            )


        }

        setDisplayClients(usersHTML)
    
         

    }

    async function loadDetailByRut(rut){
        extra_info = ""
        const data = {
            sessionKey: cookies.get("appsessionKey"),
            rut_usuario: rut
        }
        const result = await axios.post('http://localhost:3001/getDetailByRut', data)
        extra_info = result.data[0]
        console.log(extra_info)
    }

    function toggleClientExtraInfo(clientID, rut){
        if (hola !== clientID) loadDetailByRut(rut)
        hola = (hola === clientID) ? 0 : clientID
        clientSearch()
        // setClientExtraInfo(clientID)
        // console.log(clientExtraInfo)
        //clientSearch()
    }
  
    async function clientSearch(){
        if(!clientsList) await getUsersList()
        if(!clientsList) return;
        
        const activeUserHTML = 
            <div className="px-2 rounded-lg bg-green-600">
                Activo
            </div> ;

        const disabledUserHTML = 
            <div className="px-2 rounded-lg bg-red-600">
                Inactivo
            </div> ;

    
        let filteredClientsList = clientsList;
    
    
        filteredClientsList = (!isNumeric(browserValue[0])) ?
        clientsList.filter((client) => (client["NOMBRES"].toLowerCase().includes(browserValue) || client["APELLIDOS"].toLowerCase().includes(browserValue))) 
        : clientsList.filter((client) => (client["RUT_USUARIO"].toLowerCase().includes(browserValue)));
    
        
        // if (displayOption == "1") // Todos
    
        if (displayOption === "2") // Activos
            filteredClientsList = filteredClientsList.filter((client) => client["ID_ESTADO_CONTRATO"] === 1);
        if (displayOption === "3") // Inactivos
            filteredClientsList = filteredClientsList.filter((client) => client["ID_ESTADO_CONTRATO"] === 2);
    
        let usersHTML = []
        for (const client of filteredClientsList){
            const imageSRC = (client["IMAGEN"]) ? client["IMAGEN"]
             : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png";
            usersHTML.push(
                <div key={client["ID_CUENTA"]} onClick={() => toggleClientExtraInfo(client["ID_CUENTA"], client["RUT_USUARIO"])}
                className="bg-gray-700 flex flex-col hover:bg-gray-600 rounded-xl">
                    <div className="h-16 border-gray-600 border-t h-full mx-auto" style={{width: "98%",
                    display: "grid", gridTemplateColumns: "64px 350px 200px 210px 125px 150px 1fr"}}>
                        <div className="flex m-auto">
                            <img src={imageSRC} className="h-12 w-12 object-cover rounded-full"/>
                        </div>
                        <div className="flex pl-2 mr-auto my-auto flex-col">
                            <div>{client["NOMBRES"]} {client["APELLIDOS"]}</div> 
                            <div className="italic text-xs text-gray-200">{client["RUT_USUARIO"]}</div>
                        </div>
  
                        <div className="flex flex-col justify-center items-start">
                            <div className="font-bold">Empresa:</div>
                            <div className={client["NOMBRE_1"] ? "" : "text-red-500"}>
                                {client["NOMBRE_1"] ? client["NOMBRE_1"] : "Sin empresa"}
                            </div>    
                        </div>

    
                        <div className="flex">
                            <div className="ml-6 border p-2 my-auto rounded-lg bg-gray-800 font-bold" style={{minWidth: "170px"}}>Contrato: 
                                {client["ID_ESTADO_CONTRATO"] === 1 ? " Al día" : " Pendiente"}
                            </div>

                        </div>

                        <div className="flex">
                            <div className="m-auto border p-2 my-auto rounded-lg bg-gray-800 font-bold" style={{minWidth: "100px"}}>
                                    $ {client["DEUDA"]}
                            </div>
                        </div>

                        <div className="flex my-auto font-bold">
                               Hasta: {new Date(client["FECHA_TERMINO"]).toLocaleString().split(",")[0]}
                        </div>

                        <div className="flex">
                                <div onClick={(e) => {e.stopPropagation(); changePaymentStatus(client["ID_CONTRATO"], client["ID_ESTADO_CONTRATO"])}}
                                className={`${client["ID_ESTADO_CONTRATO"] === 1 ? " bg-green-500 hover:bg-green-600" : " bg-red-500 hover:bg-red-600"} 
                                select-none m-auto rounded-lg text-center py-1`} style={{width: "115px"}}> 
                                    {client["ID_ESTADO_CONTRATO"] === 1 ? "Emitir cobro" : " Cancelar cobro"}
                                </div>
                        </div>

                    </div>

                    {
                        hola === client["ID_CUENTA"] ?
                        <div className="h-24 px-6 grid" style={{gridTemplateColumns: "1fr 1fr 1fr"}}>
                            <div className="flex flex-col justify-center">
                                <div className="flex space-x-2">
                                    <div className="font-bold">Modificaciones a checklist de visita:</div>
                                    <div>{extra_info ? extra_info["MODIFICACIONES_VISITA"] : "Cargando..."}</div>
                                </div>

                                <div className="flex space-x-2">
                                    <div className="font-bold">Cantidad de capacitaciones:</div>
                                    <div>{extra_info ? extra_info["CAPACITACIONES"] : "Cargando..."}</div>
                                </div>
                                
                                <div className="flex space-x-2">
                                    <div className="font-bold">Cantidad de asesorias:</div>
                                    <div>{extra_info ? extra_info["ASESORIAS"] : "Cargando..."}</div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className="flex space-x-2">
                                    <div className="font-bold">Coste base visitas:</div>
                                    <div>{extra_info ? "$"+extra_info["COSTE_VISITA"] : "Cargando..."}</div>
                                </div>

                                <div className="flex space-x-2">
                                    <div className="font-bold">Coste base capacitaciones:</div>
                                    <div>{extra_info ? "$"+extra_info["COSTE_CAPACITACION"] : "Cargando..."}</div>
                                </div>
                                
                                <div className="flex space-x-2">
                                    <div className="font-bold">Coste base asesorias:</div>
                                    <div>{extra_info ? "$"+extra_info["COSTE_ASESORIA"] : "Cargando..."}</div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className="flex space-x-2">
                                    <div className="font-bold">Coste extra visitas:</div>
                                    <div>{extra_info ? "$"+(extra_info["COSTE_EXTRA_VISITA"]*extra_info["MODIFICACIONES_VISITA"]) : "Cargando..."}</div>
                                </div>

                                <div className="flex space-x-2">
                                    <div className="font-bold">Coste extra capacitaciones:</div>
                                    <div>{extra_info ? "$"+(extra_info["COSTE_EXTRA_CAPACITACION"]*extra_info["CAPACITACIONES"]) : "Cargando..."}</div>
                                </div>
                                
                                <div className="flex space-x-2">
                                    <div className="font-bold">Coste extra asesorias:</div>
                                    <div>{extra_info ? "$"+(extra_info["COSTE_EXTRA_ASESORIA"]*extra_info["ASESORIAS"]) : "Cargando..."}</div>
                                </div>
                            </div>
                           
                            
                        </div>
                            :
                        ""
                    }
                    
                </div> 
            )


        }

        setDisplayClients(usersHTML)
    
         

    }

    


    

  return (
    <div style={{height: '100vh'}} >
        <AdminSidebar/>
        <div id="viewContent border" className="h-full ml-64">
            <div className="dashboardOptionsBody bg-gray-700" style={{height: "100vh"}}>
                <div className="border-b border-gray-800 shadow-lg w-full h-16 grid select-none" style={{gridTemplateColumns: "200px 0.9fr 1fr"}}>
                    <div className="flex ml-4 mr-auto my-auto space-x-2">
                        <i className="m-auto text-gray-200 fa-solid fa-pen-to-square"></i>
                        <div className="italic text-white font-bold">Clientes</div>
                    </div>

                    <div className="text-gray-200 font-medium flex mr-auto my-auto space-x-4" id="clientDisplayOptionContainer">
                        <div className={(displayOption === "1") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("1")}>Clientes</div>
                        <div className={(displayOption === "2") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("2")}>Al día</div>
                        <div className={(displayOption === "3") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("3")}>Pendientes</div>
                        <div className={(displayOption === "4") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("4")}>Pagos</div>
                    </div>
                    <div className="text-gray-200 font-medium flex space-x-3 ml-auto pr-4">

                    </div>      
                </div>

                <div className="py-2 w-full flex my-auto px-6">
                    <input onChange={(e) => setBrowserValue(e.target.value)} id="clientesSearch" className="border rounded-lg h-12 w-full pl-2 text-gray-200 text-xl bg-gray-800 border-gray-900 border-2 focus:border-black focus:outline-none focus:border-3" type="text" placeholder="Buscar"/>
                </div>

                <div className="p-2 text-gray-100 select-none overflow-y-auto" id="clientListContainer">
                    {displayClients}
                </div>
            </div>
        </div>
    </div>
    
  );
}

export default ControlarPagos;
