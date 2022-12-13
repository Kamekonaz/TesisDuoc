
import React from "react";
import ImageResizer from "../../Customscripts/ImageManager"
import AdminSidebar from "./AdminSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { parse } from "postcss";
import InputsValidator from "../../Customscripts/InputsValidator";






function CrearEmpresa() {
  const [selectedClient, setSelectedClient] = React.useState('');
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [lastCheckedValue, setLastCheckedValue] = React.useState('');
  const [clientsList, setClientsList] = React.useState();
  const [clients, setClients] = React.useState("");
  const [browserValue, setBrowserValue] = React.useState('');
  const [creationData, setCreationData] = React.useState({
    rut:"",
    razon:"",
    telefono:"",
    apodo:"",                                                                                
    direccion:"",
    rut_usuario: ""
  });


  
function toggleClientSelector(client="", justClose=false){
  if(justClose) return setIsSelecting(false)
  if(client !== "") {
    setSelectedClient(client)
    setIsSelecting(false)
    return;
  }

  setIsSelecting(true)
}


  async function clientSearch(){
    setLastCheckedValue(browserValue)
    if(!clientsList) await getUsersList()
    if(!clientsList) return;
    


    let filteredClientsList = clientsList;
  
   

    filteredClientsList = (!isNumeric(browserValue[0])) ?
    clientsList.filter((client) => (client["NOMBRES"].toLowerCase().includes(browserValue) || client["APELLIDOS"].toLowerCase().includes(browserValue))) 
    : clientsList.filter((client) => (client["RUT_USUARIO"].toLowerCase().includes(browserValue)));


    filteredClientsList = filteredClientsList.filter((client)=> !client["NOMBRE_1"]);


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
async function submit(){
  creationData["rut_usuario"] = selectedClient["RUT_USUARIO"]

  await axios.post('http://localhost:3001/creteBussiness', creationData
        ).then(
            Swal.fire({
                title: "<h5 style='color:white'>Exito</h5>",
                html: "<p style='color:white'>Empresa creada exitosamente</p>",
                icon: 'success',
                background: '#272727',
                showCancelButton: false,
                confirmButtonColor: '#7BCA6F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = window.location.origin + "/adminDashboard/dashboardOption2"
                }
            })
        );
}

function formatRut(rut){
  // XX.XXX.XXX-X

  const newRut = rut.replace(/\./g,'').replace(/-/g, '').trim().toLowerCase();
  if(newRut.length === 0) return setCreationData(creationData=>({...creationData, ...{rut: "" } }))
  if(newRut.length > 9) return;

  const lastDigit = newRut.substr(-1, 1);
  const rutDigit = newRut.substr(0, newRut.length-1)

  if (!isNumeric(rutDigit) && rutDigit.length > 0) return;
  if (!isNumeric(lastDigit) && lastDigit !== "k") return;


  let format = '';
  for (let i = rutDigit.length; i > 0; i--) {
    const e = rutDigit.charAt(i-1);
    format = e.concat(format);
    if ((i+ (newRut.length <= 8 ? 1 : 0)) % 3 === 0){
      format = '.'.concat(format);
    }
  }

  return setCreationData(creationData=>({...creationData, ...{rut: format.concat('-').concat(lastDigit)} }))
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

React.useEffect(() => {  
  if(!clients && browserValue.length < 1) clientSearch()
  else if(lastCheckedValue !== browserValue) clientSearch()
});


    const cookies = new Cookies()
    const urlparams = new URLSearchParams(window.location.search);
    const navigate = useNavigate()
    //console.log(urlparams.get("userType"))
    //const previousRoute = window.location.origin + "/adminDashboard/" + urlparams.get("dashboardOption")

 
  return (
    <div style={{height: '100vh'}} >
        <AdminSidebar/>
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
        <div id="viewContent border" className="h-full ml-64">

      
            
            <div className="grid h-full bg-gray-700 text-white" style={{gridTemplateRows: "64px 1fr 50px"}}>

              
    
            <div className="border-b border-gray-800 shadow-lg w-full h-16 grid select-none" style={{gridTemplateColumns: "200px 0.9fr 1fr"}}>
                    <div className="flex ml-4 mr-auto my-auto space-x-2">
                        <i className="m-auto text-gray-200 fa-solid fa-pen-to-square"></i>
                        <div className="italic text-white font-bold">Crear empresa</div>
                    </div>

                    <div className="text-gray-200 font-medium flex mr-auto my-auto space-x-4" id="clientDisplayOptionContainer">

                    </div>
                    <div className="text-gray-200 font-medium flex space-x-3 ml-auto pr-4">
        
                    </div>
                </div>         
                
                <div className={`flex-col mx-auto w-full overflow-y-auto`}>
             
                    <div className="flex space-x-4" style={{height:"75vh"}}>
                        <div className="flex flex-col space-y-4 mx-auto mt-12">

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
                        
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto`}>Rut Empresa:</div>
                                <input 
                                value={creationData.rut}
                                onChange={(e)=>formatRut(e.target.value)}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto`}>Razón social:</div>
                                <input 
                                  onChange={(e)=>setCreationData(creationData=>({...creationData, ...{razon: e.target.value} }))} 
                                  defaultValue={creationData.razon}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto `}>Teléfono:</div>
                                <input 
                                pattern="[0-9]+"
                                onChange={(e)=>setCreationData(creationData=>({...creationData, ...{telefono: e.target.value} }))} 
                                defaultValue={creationData.telefono}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto `}>Apodo:</div>
                                <input 
                                onChange={(e)=>setCreationData(creationData=>({...creationData, ...{apodo: e.target.value} }))} 
                                defaultValue={creationData.apodo}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>

                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto `}>Dirección:</div>
                                <input
                                  onChange={(e)=>setCreationData(creationData=>({...creationData, ...{direccion: e.target.value} }))} 
                                  defaultValue={creationData.direccion}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                     
                            
                        </div>

                    </div>
                        
                </div>
                <div className={` grid w-full grid-cols-3 select-none`}>
                    <div className="flex"><div className="my-auto mr-auto ml-8 px-3 py-1 rounded-lg shadow-lg bg-red-400 text-white font-medium 
                            hover:bg-red-500 transition duration-200" onClick={()=>window.location.href = window.location.origin + "/adminDashboard/dashboardOption2"}>Cancelar</div></div>
                    <div className="flex">
                        {/* <!-- <div className="m-auto px-3 py-1 rounded-lg shadow-lg bg-blue-400 text-white font-medium 
                        hover:bg-blue-500 transition duration-200">Cambiar contraseña</div> --> */}
                    </div>
                    <div className="flex"><div className="my-auto ml-auto mr-8 px-3 py-1 rounded-lg shadow-lg bg-green-400 text-white font-medium 
                        hover:bg-green-500 transition duration-200" onClick={()=> submit()}>Aplicar</div></div>
                </div>

                
                
           

                
            </div>
        </div>
    </div>
    
  );
}

export default CrearEmpresa;





function isNumeric(str) {
  if (typeof str !== "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

