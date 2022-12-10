
import React from "react";
import ProfessionalSidebar from "../ProfessionalSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'


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
  


function CrearPlan() {
    const cookies = new Cookies()
    const [isSelecting, setIsSelecting] = React.useState(false);
    const [selectedClient, setSelectedClient] = React.useState('');
    const [clientsList, setClientsList] = React.useState();
    const [browserValue, setBrowserValue] = React.useState('');
    const [lastCheckedValue, setLastCheckedValue] = React.useState('');
    const [clients, setClients] = React.useState("");
    const [base64pdf, setBase64pdf] = React.useState("")

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
  
    function toggleClientSelector(client="", justClose=false){
      if(justClose) return setIsSelecting(false)
      if(client !== "") {
        setSelectedClient(client)
        setIsSelecting(false)
        return;
      }
  
      setIsSelecting(true)
    }
    
   
    async function loadPDF(e){
        const pdf = await getBase64(e.target.files[0])
        setBase64pdf(pdf)
    }

    async function guardar(){
        const data ={
            rut_usuario: selectedClient["RUT_USUARIO"],
            base64pdf: base64pdf
        }
        await axios.post('http://localhost:3001/crearPlanMejora', data
        ).then(
            Swal.fire({
                title: "<h5 style='color:white'>Exito</h5>",
                html: "<p style='color:white'>Plan de mejora creado exitosamente</p>",
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


        <div id="viewContent border" className="h-full ml-64">
            <div className="dashboardOptionsBody bg-gray-700 flex flex-col text-gray-200 overflow-y-auto" style={{height: "100vh", maxHeight: "100vh"}}>
                <div className="mx-auto text-3xl mt-2 font-medium mb-20">Registrar plan de mejora</div>

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

                <div className="flex justify-center">
                    <input type="file" accept=".pdf" onChange={(e) => loadPDF(e)} />
                </div>


                <div className="flex w-full">
                  <div className="mx-auto mt-8 p-2 bg-green-500 hover:bg-green-600 px-10 select-none" onClick={() => guardar()}>Crear</div>
                </div>


   
            </div>
        </div>
    </div>
    
  );
}

export default CrearPlan;
