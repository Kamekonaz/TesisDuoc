
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

function AdminClientes() {
    const cookies = new Cookies()
    const [browserValue, setBrowserValue] = React.useState('');
    const [displayOption, setDisplayOption] = React.useState('1');
    const [clientsList, setClientsList] = React.useState();
  
    const normalDisplayClasses = "px-2 rounded-lg hover:bg-gray-600"
    const selectedDisplayClasses = "px-2 rounded-lg bg-gray-800"


    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
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
        clientSearch()
    });

    React.useEffect(()=>{
        const usersDelete = document.querySelectorAll(".userDelete")
        for(const userDelete of usersDelete){
            if(userDelete){
                userDelete.addEventListener("click", (e) =>{
                    const userID = userDelete.getAttribute("userID")
                    Swal.fire({
                        title: "<h5 style='color:white'>" + "¿Seguro que deseas eliminar?" + "</h5>",
                        html: `<div class="flex flex-col"><p style='color:white'>Borrar usuarios puede causar errores si han interactuado mucho con el sistema</p>
                           <p class="text-red-500">La empresa vinculada a este usuario también será borrada</p> </div>`,
                        icon: 'warning',
                        background: '#272727',
                        showCancelButton: false,
                        showDenyButton: true,
                        confirmButtonColor: '#7BCA6F',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Aceptar',
                        denyButtonText: `Cancelar`,
                        reverseButtons: true
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                const data = {
                                    accountID: userID,
                                    sessionKey: cookies.get("sessionKey")
                                }
                                await axios.post('http://localhost:3001/deleteUser', data)
                                getUsersList()
                        }
                    })
                })
            }
        }
    })

    async function clientSearch(){
        if(!clientsList) await getUsersList()
        if(!clientsList) return;
        const clientListContainer = document.getElementById("clientListContainer")
        
        const activeUserHTML = `
            <div class="px-2 rounded-lg bg-green-600">
                Activo
            </div>  
        `;
        const disabledUserHTML = `
            <div class="px-2 rounded-lg bg-red-600">
                Inactivo
            </div>  
        `;
    
        let filteredClientsList = clientsList;
    
    
        filteredClientsList = (!isNumeric(browserValue[0])) ?
        clientsList.filter((client) => (client["NOMBRES"].toLowerCase().includes(browserValue) || client["APELLIDOS"].toLowerCase().includes(browserValue))) 
        : clientsList.filter((client) => (client["RUT_USUARIO"].toLowerCase().includes(browserValue)));
    
        
        // if (displayOption == "1") // Todos
    
        if (displayOption === "2") // Activos
            filteredClientsList = filteredClientsList.filter((client) => client["ESTADO"] === "1");
        if (displayOption === "3") // Inactivos
            filteredClientsList = filteredClientsList.filter((client) => client["ESTADO"] === "0");
    
        let usersHTML = ""
        for (const client of filteredClientsList){
            const imageSRC = (client["IMAGEN"]) ? client["IMAGEN"]
             : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png";
            usersHTML+=`
            <div class="h-16 bg-gray-700 flex hover:bg-gray-600 rounded-xl" 
            onclick="window.location.href = window.location.origin + '/editUser/?userID=${client["ID_CUENTA"]}&dashboardOption=${window.location.pathname.split("/")[2]}'">
                <div class="border-gray-600 border-t h-full mx-auto" style="width:98%;
                display: grid; grid-template-columns: 64px 1.3fr 1fr 0.5fr 0.5fr;">
                    <div class="flex m-auto">
                        <img src="${imageSRC}" class="h-12 w-12 object-cover rounded-full">
                    </div>
                    <div class="flex pl-2 mr-auto my-auto flex-col">
                        <div>${client["NOMBRES"]} ${client["APELLIDOS"]}</div> 
                        <div class="italic text-xs text-gray-200">${client["RUT_USUARIO"]}</div>
                    </div>
                    <div class="flex m-auto">
                        Sin empresa (cs)
                    </div>
                    <div class="flex m-auto font-medium">
                        ${(client["ESTADO"] === "1") ? activeUserHTML : disabledUserHTML} 
                    </div>
                    <div class="flex my-auto ml-auto pr-4 space-x-4" onclick="event.stopPropagation()">
                        <div class="userEdit h-8 w-8 bg-gray-800 rounded-full flex text-gray-300 hover:text-gray-100"><i class="m-auto fa-solid fa-user-pen"></i></div>
                        <div class="userMessage h-8 w-8 bg-gray-800 rounded-full flex text-gray-300 hover:text-gray-100"><i class="m-auto fa-solid fa-comment"></i></div>
                        <div userID="${client["ID_CUENTA"]}" class="userDelete h-8 w-8 bg-gray-800 rounded-full flex text-gray-300 hover:text-gray-100"><i class="m-auto fa-solid fa-eraser"></i></div>
                    </div>
                </div>
            </div>
            
            `
        }
    
        clientListContainer.innerHTML = usersHTML;
        window["loadTippies"]()
         

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
                        <div className={(displayOption === "1") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("1")}>Todos</div>
                        <div className={(displayOption === "2") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("2")}>Activos</div>
                        <div className={(displayOption === "3") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("3")}>Inactivos</div>
                    </div>
                    <div className="text-gray-200 font-medium flex space-x-3 ml-auto pr-4">
                        <div className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 my-auto"
                        onClick={()=>window.location.href = `${window.location.origin}/createUser/?userType=3&dashboardOption=${window.location.pathname.split("/")[2]}`}
                        >Añadir cliente</div>

                        <div className="px-3 py-1 rounded-lg bg-orange-700 hover:bg-orange-800 my-auto">Añadir Empresa</div>
                    </div>      
                </div>

                <div className="py-2 w-full flex my-auto px-6">
                    <input onChange={(e) => setBrowserValue(e.target.value)} id="clientesSearch" className="border rounded-lg h-12 w-full pl-2 text-gray-200 text-xl bg-gray-800 border-gray-900 border-2 focus:border-black focus:outline-none focus:border-3" type="text" placeholder="Buscar"/>
                </div>

                <div className="p-2 text-gray-100 select-none overflow-y-auto" id="clientListContainer">

                </div>
            </div>
        </div>
    </div>
    
  );
}

export default AdminClientes;
