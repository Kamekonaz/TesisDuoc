document.addEventListener('DOMContentLoaded', async () =>{
    changeDashboardOption("0")
})
var sessionKey;
var activeDashboardOption = "0";

var cachedUsers;
var cachedImage;


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

async function editUser(userID){
    cachedImage = undefined;
    for(const view of dashboardOptionsBody[activeDashboardOption].children) view.classList.add("hidden");
    dashboardOptionsBody[activeDashboardOption].querySelector(".editView").classList.remove("hidden");


    const userData = cachedUsers.find((user) => user["ID_CUENTA"] == userID)

    const imageSRC = (userData["IMAGEN"]) ? userData["IMAGEN"]
         : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png";
    
    document.getElementById("clientPFP").src = imageSRC
    document.getElementById("clientUserID").setAttribute("userID", userID)
    document.getElementById("clientRutDisplay").innerText = `Rut: ${userData["RUT_USUARIO"]}`
    document.getElementById("clientUsernameInput").value = userData["USERNAME"]
    document.getElementById("clientNombresInput").value = userData["NOMBRES"]
    document.getElementById("clientApellidosInput").value = userData["APELLIDOS"]
    document.getElementById("clientEmailInput").value = userData["EMAIL"]
    document.getElementById("clientTelefonoInput").value = userData["TELEFONO"]
    document.getElementById("clientStatus").innerHTML = (userData["ESTADO"] == "1") ? inputActiveUserHTML : inputDisabledUserHTML
    
    
}

function leaveEditUser(){
    dashboardOptionFunctions(activeDashboardOption)
    resetMainView(activeDashboardOption)
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
        const imageSRC = (client["IMAGEN"]) ? client["IMAGEN"]
         : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png";

        usersHTML+=`
        <div class="h-16 bg-gray-700 flex hover:bg-gray-600 rounded-xl" onclick="editUser(${client["ID_CUENTA"]})">
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
        const imageSRC = (profesional["IMAGEN"]) ? profesional["IMAGEN"]
         : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png";
        usersHTML+=`
        <div class="h-16 bg-gray-700 flex hover:bg-gray-600 rounded-xl" onclick="editUser(${profesional["ID_CUENTA"]})">
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

            cachedUsers = profesionalesList

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

            cachedUsers = clientsList

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


  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  
  }


  function resize(file, max_width, max_height, imageEncoding){
    var fileLoader = new FileReader(),
    canvas = document.createElement('canvas'),
    context = null,
    imageObj = new Image(),
    blob = null;            

    //create a hidden canvas object we can use to create the new resized image data
    canvas.id     = "hiddenCanvas";
    canvas.width  = max_width;
    canvas.height = max_height;
    canvas.style.visibility   = "hidden";   
    document.body.appendChild(canvas);  

    //get the context to use 
    context = canvas.getContext('2d');  

    // check for an image then
    //trigger the file loader to get the data from the image         
    if (file.type.match('image.*')) {
        fileLoader.readAsDataURL(file);
    } else {
        alert('File is not an image');
    }

    // setup the file loader onload function
    // once the file loader has the data it passes it to the 
    // image object which, once the image has loaded, 
    // triggers the images onload function
    fileLoader.onload = function() {
        var data = this.result; 
        imageObj.src = data;
    };

    fileLoader.onabort = function() {
        alert("The upload was aborted.");
    };

    fileLoader.onerror = function() {
        alert("An error occured while reading the file.");
    };  


    // set up the images onload function which clears the hidden canvas context, 
    // draws the new image then gets the blob data from it
    imageObj.onload = async function() {  

        // Check for empty images
        if(this.width == 0 || this.height == 0){
            alert('Image is empty');
        } else {                

            context.clearRect(0,0,max_width,max_height);
            drawImageProp(context, imageObj, 0, 0, 80, 80)
            
            //context.drawImage(imageObj, 0, 0, this.width, this.height, 0, 0, max_width, max_height);


            //dataURItoBlob function available here:
            // http://stackoverflow.com/questions/12168909/blob-from-dataurl
            // add ')' at the end of this function SO dont allow to update it without a 6 character edit

            const imageDataURL = canvas.toDataURL(imageEncoding)
            cachedImage = imageDataURL;

            //console.log(imageDataURL)
            
                    // const profesionalesList = (await axios({
                    //         method: 'post',
                    //         url: 'http://localhost:3001/updateImage',
                    //         data: {
                    //             accountID: userID,
                    //             blobImage: imageDataURL
                    //         }
                    //     })).data;
                    // console.log(profesionalesList)

        }       
    };

    imageObj.onabort = function() {
        alert("Image load was aborted.");
    };

    imageObj.onerror = function() {
        alert("An error occured while loading image.");
    };

}

function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

if (arguments.length === 2) {
x = y = 0;
w = ctx.canvas.width;
h = ctx.canvas.height;
}

// default offset is center
offsetX = typeof offsetX === "number" ? offsetX : 0.5;
offsetY = typeof offsetY === "number" ? offsetY : 0.5;

// keep bounds [0.0, 1.0]
if (offsetX < 0) offsetX = 0;
if (offsetY < 0) offsetY = 0;
if (offsetX > 1) offsetX = 1;
if (offsetY > 1) offsetY = 1;

var iw = img.width,
ih = img.height,
r = Math.min(w / iw, h / ih),
nw = iw * r,   // new prop. width
nh = ih * r,   // new prop. height
cx, cy, cw, ch, ar = 1;

// decide which gap to fill    
if (nw < w) ar = w / nw;                             
if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
nw *= ar;
nh *= ar;

// calc source rectangle
cw = iw / (nw / w);
ch = ih / (nh / h);

cx = (iw - cw) * offsetX;
cy = (ih - ch) * offsetY;

// make sure source rectangle is valid
if (cx < 0) cx = 0;
if (cy < 0) cy = 0;
if (cw > iw) cw = iw;
if (ch > ih) ch = ih;

// fill image in dest. rectangle
ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}


var inputActiveUserHTML = `
    <div class="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700" status="1">
        Activo
    </div>  
    `;
var inputDisabledUserHTML = `
<div class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700" status="0">
    Inactivo
</div>  
`;