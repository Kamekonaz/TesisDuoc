document.addEventListener('DOMContentLoaded', async () =>{
    changeDashboardOption("0")
})
var sessionKey;
var activeDashboardOption = "0";


// SEPARAR VISTAS PRINCIPALES EN SUBVISTAS QUE PUEDAN SER INTERCAMBIADAS

const adminNameDiv = document.getElementById("adminNameDiv");
const dashBoardOptions = document.getElementsByClassName("dashboardOptions");
const dashboardOptionsBody = document.getElementsByClassName("dashboardOptionsBody");


function getNameAndLastname(names, lastnames){
    return  {
        nombre: names.split(" ")[0],
        apellido: lastnames.split(" ")[0]
    };
}   

function getNameAndLastnameOneLine(names, lastnames){
    return `${names.split(" ")[0]} ${lastnames.split(" ")[0]}`
}   

function changeDashboardOption(optionID){
    hideAllDashboards()
    removeAllDashboardsBG("bg-gray-900", "hover:bg-gray-1000")
    dashBoardOptions[optionID].classList.add("bg-gray-900");
    dashBoardOptions[optionID].classList.remove("hover:bg-gray-700");
    dashboardOptionsBody[optionID].classList.remove("hidden");  
    
    resetMainView(activeDashboardOption)
    activeDashboardOption = optionID
    dashboardOptionFunctions(optionID)
}

window.indexBridge.loadData((event, userData) =>{
    const full_name_splitted = getNameAndLastname(userData["NOMBRES"], userData["APELLIDOS"]);
    sessionKey = userData["sessionKey"]
    adminNameDiv.children[0].innerHTML = full_name_splitted["nombre"] + " " +full_name_splitted["apellido"];
    // adminNameDiv.children[1].innerHTML = full_name_splitted["apellido"];
});


for (const dashBoardOption of dashBoardOptions){
    const dashBoardOptionId = dashBoardOption.id.slice("dashboardOption".length, dashBoardOption.id.length)


    dashBoardOption.addEventListener("click", (e)=>{
        changeDashboardOption(dashBoardOptionId)
    });
    
    
}


const clientListContainer = document.getElementById("clientListContainer");
const clientesSearch = document.getElementById("clientesSearch");
const clientsDisplayOptions = document.getElementsByClassName("clientsDisplayOption");
const clientsDisplayOptionContainer = document.getElementById("clientsDisplayOptionContainer");

var dashboardInterval;
var last_option = "1";
last_browser_value = "";

function resetVariables(){
    clearInterval(dashboardInterval);

    // Hacer que last option y last browser value almacenen en el propio buscador
    // last_option = "1";
    // last_browser_value = "";
}

function resetMainView(dashboardOptionBody){
    for(const view of dashboardOptionsBody[dashboardOptionBody].children) view.classList.add("hidden");
    const mainView = dashboardOptionsBody[dashboardOptionBody].querySelector(".mainView")
    if (mainView) mainView.classList.remove("hidden");
}

function editUser(userID){
    for(const view of dashboardOptionsBody[activeDashboardOption].children) view.classList.add("hidden");
    dashboardOptionsBody[activeDashboardOption].querySelector(".editView").classList.remove("hidden");

    console.log(userID) // MOSTRAR DATOS DE USUARIO
}

function clientSearch(filterValue, clientsList, firstLoad){
    const displayOption = clientsDisplayOptionContainer.querySelector(".active").getAttribute("option");
    const optionChanged = !(displayOption == last_option)
    if(!firstLoad && !optionChanged){
        if(last_browser_value == filterValue || filterValue == undefined ) return;
    }

    last_option = displayOption

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

    let filteredClientList = clientsList;


    filteredClientList = (!isNumeric(filterValue[0])) ?
    clientsList.filter((client) => (client["NOMBRES"].toLowerCase().includes(filterValue) || client["APELLIDOS"].toLowerCase().includes(filterValue))) 
    : clientsList.filter((client) => (client["RUT_USUARIO"].toLowerCase().includes(filterValue)));

    
    // if (displayOption == "1") // Todos

    if (displayOption == "2") // Activos
        filteredClientList = filteredClientList.filter((client) => client["ESTADO"] == "1");
    if (displayOption == "3") // Inactivos
        filteredClientList = filteredClientList.filter((client) => client["ESTADO"] == "0");
    if (displayOption == "4") // Empresas
        filteredClientList = filteredClientList.filter((client) => client == false);

    let usersHTML = ""
    for (const client of filteredClientList){
        usersHTML+=`
        <div class="h-16 bg-gray-700 flex hover:bg-gray-600 rounded-xl" onclick="editUser(${client["ID_CUENTA"]})">
            <div class="border-gray-600 border-t h-full mx-auto" style="width:98%;
            display: grid; grid-template-columns: 64px 1.3fr 1fr 0.5fr 0.5fr;">
                <div class="flex m-auto">
                    <img src="https://randomuser.me/api/portraits/men/68.jpg" class="h-12 w-12 object-cover rounded-full">
                </div>
                <div class="flex pl-2 mr-auto my-auto flex-col">
                    <div>${client["NOMBRES"]} ${client["APELLIDOS"]}</div> 
                    <div class="italic text-xs text-gray-200">${client["RUT_USUARIO"]}</div>
                </div>
                <div class="flex m-auto">
                    Sin empresa (cs)
                </div>
                <div class="flex m-auto font-medium">
                    ${(client["ESTADO"] == "1") ? activeUserHTML : disabledUserHTML} 
                </div>
                <div class="flex my-auto ml-auto pr-4 space-x-4" onclick="event.stopPropagation()">
                    <div class="userEdit h-8 w-8 bg-gray-800 rounded-full flex text-gray-300 hover:text-gray-100"><i class="m-auto fa-solid fa-user-pen"></i></div>
                    <div class="userMessage h-8 w-8 bg-gray-800 rounded-full flex text-gray-300 hover:text-gray-100"><i class="m-auto fa-solid fa-comment"></i></div>
                </div>
            </div>
        </div>
        `
    }

    clientListContainer.innerHTML = usersHTML

    tippy('.userEdit', {
        content: 'Editar',
    });

    tippy('.userMessage', {
        content: 'Mensaje',
    });

    last_browser_value = filterValue;
}

const profesionalListContainer = document.getElementById("profesionalListContainer");
const profesionalesSearch = document.getElementById("profesionalesSearch");
const profesionalsDisplayOptions = document.getElementsByClassName("profesionalsDisplayOption");
const profesionalDisplayOptionContainer = document.getElementById("profesionalDisplayOptionContainer");


async function profesionalSearch(filterValue, profesionalsList, firstLoad){
    const displayOption = profesionalDisplayOptionContainer.querySelector(".active").getAttribute("option");
    const optionChanged = !(displayOption == last_option)
    if(!firstLoad && !optionChanged){
        if(last_browser_value == filterValue || filterValue == undefined ) return;
    }

    last_option = displayOption

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


    filteredProfesionalsList = (!isNumeric(filterValue[0])) ?
    profesionalsList.filter((profesional) => (profesional["NOMBRES"].toLowerCase().includes(filterValue) || profesional["APELLIDOS"].toLowerCase().includes(filterValue))) 
    : profesionalsList.filter((profesional) => (profesional["RUT_USUARIO"].toLowerCase().includes(filterValue)));

    
    // if (displayOption == "1") // Todos

    if (displayOption == "2") // Activos
        filteredProfesionalsList = filteredProfesionalsList.filter((profesional) => profesional["ESTADO"] == "1");
    if (displayOption == "3") // Inactivos
        filteredProfesionalsList = filteredProfesionalsList.filter((profesional) => profesional["ESTADO"] == "0");

    let usersHTML = ""
    for (const profesional of filteredProfesionalsList){
        usersHTML+=`
        <div class="h-16 bg-gray-700 flex hover:bg-gray-600 rounded-xl" onclick="editUser(${profesional["ID_CUENTA"]})">
            <div class="border-gray-600 border-t h-full mx-auto" style="width:98%;
            display: grid; grid-template-columns: 64px 1.3fr 1.5fr 0.5fr;">
                <div class="flex m-auto">
                    <img  src="https://randomuser.me/api/portraits/men/68.jpg" class="h-12 w-12 object-cover rounded-full">
                </div>
                <div class="flex pl-2 mr-auto my-auto flex-col">
                    <div>${profesional["NOMBRES"]} ${profesional["APELLIDOS"]}</div> 
                    <div class="italic text-xs text-gray-200">${profesional["RUT_USUARIO"]}</div>
                </div>
                <div class="flex m-auto font-medium">
                    ${(profesional["ESTADO"] == "1") ? activeUserHTML : disabledUserHTML} 
                </div>
                <div class="flex my-auto ml-auto pr-4 space-x-4" onclick="event.stopPropagation()">
                    <div class="userEdit h-8 w-8 bg-gray-800 rounded-full flex text-gray-300 hover:text-gray-100"><i class="m-auto fa-solid fa-user-pen"></i></div>
                    <div class="userMessage h-8 w-8 bg-gray-800 rounded-full flex text-gray-300 hover:text-gray-100"><i class="m-auto fa-solid fa-comment"></i></div>
                </div>
            </div>
        </div>
        `
    }

    profesionalListContainer.innerHTML = usersHTML;

    tippy('.userEdit', {
        content: 'Editar',
    });

    tippy('.userMessage', {
        content: 'Mensaje',
    });

    last_browser_value = filterValue;
}


function toggleClientsDisplay(elem){
    for (const clientDisplayOptions of clientsDisplayOptions) {
            clientDisplayOptions.classList.remove("active");
            clientDisplayOptions.classList.add("hover:bg-gray-600");
            clientDisplayOptions.classList.remove("bg-gray-800");
        }
    elem.classList.add("bg-gray-800");
    elem.classList.remove("hover:bg-gray-600");
    elem.classList.add("active");
}

function toggleProfesionalsDisplay(elem){
    for (const profesionalsDisplayOption of profesionalsDisplayOptions) {
            profesionalsDisplayOption.classList.remove("active");
            profesionalsDisplayOption.classList.add("hover:bg-gray-600");
            profesionalsDisplayOption.classList.remove("bg-gray-800");
        }
    elem.classList.add("bg-gray-800");
    elem.classList.remove("hover:bg-gray-600");
    elem.classList.add("active");
}


async function dashboardOptionFunctions(optionID){
    clearInterval(dashboardInterval);
    resetVariables()

    switch (optionID) {
        // "Dashboard"
        case "0":
           
            break;
        // "Profesionales"
        case "1":
            const profesionalesList = (await axios({
                method: 'post',
                url: 'http://localhost:3001/listUsersByUserType',
                data: {
                    sessionKey: sessionKey,
                    usertype: 2
                }
            })).data;

            console.log(profesionalesList)

            profesionalSearch(profesionalesSearch.value.toLowerCase(), profesionalesList, true)

            dashboardInterval = setInterval(() => {
                profesionalSearch(profesionalesSearch.value.toLowerCase(), profesionalesList, false)
            }, 100);

            break;
        // "Clientes"
        case "2":
            const clientsList = (await axios({
                method: 'post',
                url: 'http://localhost:3001/listUsersByUserType',
                data: {
                    sessionKey: sessionKey,
                    usertype: 3
                }
            })).data;

            console.log(clientsList)

            clientSearch(clientesSearch.value.toLowerCase(), clientsList, true)

            dashboardInterval = setInterval(() => {
                clientSearch(clientesSearch.value.toLowerCase(), clientsList, false)
            }, 100);

            break;
        // "Controlar Pagos"
        case "3":
            
            break;
        // "Calcular Accidentabilidad"
        case "4":
            
            break;
        // "Visualizar Actividades"
        case "5":
            
            break;
        // "Notificar Atrasos"
        case "6":
            
            break;
        // "Generar reporte cliente"
        case "7":
            
            break;
        // "Generar reporte global"
        case "8":
            
            break;
        
    
    }
}


function hideAllDashboards(){
    for(const dashboardOptionBody of dashboardOptionsBody){
        dashboardOptionBody.classList.add("hidden")
    }
}

function removeAllDashboardsBG(bg, hoverBG){
    for(const dashboardOption of dashBoardOptions){
        dashboardOption.classList.remove(bg)
        dashboardOption.classList.remove(hoverBG)
        dashboardOption.classList.add("hover:bg-gray-700")
    }
}



function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }
