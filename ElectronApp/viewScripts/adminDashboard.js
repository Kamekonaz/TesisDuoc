document.addEventListener('DOMContentLoaded', async () =>{

})

const adminNameDiv = document.getElementById("adminNameDiv");

function getNameAndLastname(names, lastnames){
    return `${names.split(" ")[0]} ${lastnames.split(" ")[0]}`;
}   

window.indexBridge.loadData((event, userData) =>{
    adminNameDiv.innerText = getNameAndLastname(userData["NOMBRES"], userData["APELLIDOS"])
});