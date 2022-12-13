
import React from "react";
import AdminSidebar from "../AdminSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'

function AdminProfesionales() {
    const cookies = new Cookies()
    const [browserValue, setBrowserValue] = React.useState('');
    const [displayOption, setDisplayOption] = React.useState('1');
    const [profesionalsList, setProfesionalsList] = React.useState();
  
    const normalDisplayClasses = "px-2 rounded-lg hover:bg-gray-600"
    const selectedDisplayClasses = "px-2 rounded-lg bg-gray-800"

    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }
    
    async function getUsersList(){
        const data ={
            sessionKey: cookies.get("appsessionKey"),
            usertype: 2
        }
        
        const usersList = await axios.post('http://localhost:3001/listUsersByUserType', data)
        setProfesionalsList(usersList.data)
        return;
    }
    React.useEffect(() => {  
        profesionalSearch()
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
                                    sessionKey: cookies.get("appsessionKey")
                                }
                                await axios.post('http://localhost:3001/deleteUser', data)
                                getUsersList()
                        }
                    })
                })
            }
        }
    })

    async function profesionalSearch(){
        if(!profesionalsList) await getUsersList()
        if(!profesionalsList) return;
        const profesionalListContainer = document.getElementById("profesionalListContainer")
        
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
    
        let filteredProfesionalsList = profesionalsList;
    
    
        filteredProfesionalsList = (!isNumeric(browserValue[0])) ?
        profesionalsList.filter((profesional) => (profesional["NOMBRES"].toLowerCase().includes(browserValue) || profesional["APELLIDOS"].toLowerCase().includes(browserValue))) 
        : profesionalsList.filter((profesional) => (profesional["RUT_USUARIO"].toLowerCase().includes(browserValue)));
    
        
        // if (displayOption == "1") // Todos
    
        if (displayOption === "2") // Activos
            filteredProfesionalsList = filteredProfesionalsList.filter((profesional) => profesional["ESTADO"] === "1");
        if (displayOption === "3") // Inactivos
            filteredProfesionalsList = filteredProfesionalsList.filter((profesional) => profesional["ESTADO"] === "0");
    
        let usersHTML = ""
        for (const profesional of filteredProfesionalsList){
            const imageSRC = (profesional["IMAGEN"]) ? profesional["IMAGEN"]
             : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png";
            usersHTML+=`
            <div class="h-16 bg-gray-700 flex hover:bg-gray-600 rounded-xl"
            onclick="window.location.href = window.location.origin + '/editUser/?userID=${profesional["ID_CUENTA"]}&dashboardOption=${window.location.pathname.split("/")[2]}'">
                <div class="border-gray-600 border-t h-full mx-auto" style="width:98%;
                display: grid; grid-template-columns: 64px 1.3fr 1.5fr 0.5fr;">
                    <div class="flex m-auto">
                        <img  src="${imageSRC}" class="h-12 w-12 object-cover rounded-full">
                    </div>
                    <div class="flex pl-2 mr-auto my-auto flex-col">
                        <div>${profesional["NOMBRES"]} ${profesional["APELLIDOS"]}</div> 
                        <div class="italic text-xs text-gray-200">${profesional["RUT_USUARIO"]}</div>
                    </div>
                    <div class="flex m-auto font-medium">
                        ${(profesional["ESTADO"] === "1") ? activeUserHTML : disabledUserHTML} 
                    </div>
                </div>
            </div>
            
            `
        }
    
        profesionalListContainer.innerHTML = usersHTML;

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
                        <div className="italic text-white font-bold">Profesionales</div>
                    </div>

                    <div className="text-gray-200 font-medium flex mr-auto my-auto space-x-4" id="profesionalDisplayOptionContainer">
                        <div className={(displayOption === "1") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("1")}>Todos</div>
                        <div className={(displayOption === "2") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("2")}>Activos</div>
                        <div className={(displayOption === "3") ? selectedDisplayClasses : normalDisplayClasses} onClick={()=>setDisplayOption("3")}>Inactivos</div>
                    </div>
                    <div className="text-gray-200 font-medium flex space-x-3 ml-auto pr-4">
                        <div className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 my-auto"
                        onClick={()=>window.location.href = `${window.location.origin}/createUser/?userType=2&dashboardOption=${window.location.pathname.split("/")[2]}`}
                        >Añadir Profesional</div>
                    </div>
                </div>

                <div className="py-2 w-full flex my-auto px-6">
                    <input onChange={(e) => setBrowserValue(e.target.value)} id="profesionalesSearch" className="border rounded-lg h-12 w-full pl-2 text-gray-200 text-xl bg-gray-800 border-gray-900 border-2 focus:border-black focus:outline-none focus:border-3" type="text" placeholder="Buscar"/>
                </div>

                <div className="p-2 text-gray-100 select-none overflow-y-auto" id="profesionalListContainer">

                </div>
            </div>
        </div>
    </div>
    
  );
}

export default AdminProfesionales;
