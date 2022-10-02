document.addEventListener('DOMContentLoaded', async () =>{
    
})


const adminNameDiv = document.getElementById("adminNameDiv");
const dashBoardOptions = document.getElementsByClassName("dashboardOptions");
const dashboardOptionsBody = document.getElementsByClassName("dashboardOptionsBody");


function getNameAndLastname(names, lastnames){
    return `${names.split(" ")[0]} ${lastnames.split(" ")[0]}`;
}   

window.indexBridge.loadData((event, userData) =>{
    adminNameDiv.innerText = getNameAndLastname(userData["NOMBRES"], userData["APELLIDOS"])
});


for (const dashBoardOption of dashBoardOptions){
    const dashBoardOptionId = dashBoardOption.id.slice("dashboardOption".length, dashBoardOption.id.length)


    dashBoardOption.addEventListener("click", (e)=>{
        hideAllDashboards()
        removeAllDashboardsBG("bg-gray-900", "hover:bg-gray-1000")
        dashBoardOptions[dashBoardOptionId].classList.add("bg-gray-900");
        dashBoardOptions[dashBoardOptionId].classList.remove("hover:bg-gray-700");
        dashboardOptionsBody[dashBoardOptionId].classList.remove("hidden");    
    });
    // switch (dashBoardOptionId) {
    //     // "Dashboard"
    //     case 0:
           
    //         break;
    //     // "Profesionales"
    //     case 1:
            
    //         break;
    //     // "Clientes"
    //     case 2:
            
    //         break;
    //     // "Controlar Pagos"
    //     case 3:
            
    //         break;
    //     // "Calcular Accidentabilidad"
    //     case 4:
            
    //         break;
    //     // "Visualizar Actividades"
    //     case 5:
            
    //         break;
    //     // "Notificar Atrasos"
    //     case 6:
            
    //         break;
    //     // "Generar reporte cliente"
    //     case 7:
            
    //         break;
    //     // "Generar reporte global"
    //     case 8:
            
    //         break;
        
    
    // }
    
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

