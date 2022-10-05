const usernameInput = document.getElementById("guro_username");
const passwordInput = document.getElementById("password");

document.addEventListener('DOMContentLoaded', async () =>{
})


window.indexBridge.loginCache((event, data) =>{
    console.log("wena")
    usernameInput.value = data.cacheUsername;
    passwordInput.value = "default";
});


let loging_in = false

const loginButton = document.getElementById("login_button");
const loginError = document.getElementById("login_error");



const normalBorderClass = "border-gray-300";
const errorBorderClass = "border-red-500";

loginButton.addEventListener("click", async (e) =>{ 
    document.activeElement.blur();
    if (loging_in == true) return;
    const username = usernameInput.value;
    const password = passwordInput.value;

    if(!username || !password){
        return show_login_error("Campos incompletos")
    }
    loging_in = true;
    window.indexBridge.send("login-clicked", { inputUsername: username, inputPassword: password} )

    // loginError.innerText = "Credenciales Incorrectas"
    // toggleBorders(true)
});


window.indexBridge.login((event, data) =>{
    loging_in = false;
    if(!data){
        return show_login_error("Credenciales incorrectas")
    }
    else{
        if (data[0]["ID_TIPO"] == 1){
            location.href = "adminDashboard.html"
        }
        else if (data[0]["ID_TIPO"] == 2){
            return show_login_error("Usuario en desarrollo")
        }
        else{
            return show_login_error("Credenciales incorrectas")
        }
    }
});

window.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      loginButton.click();
    }
  });

usernameInput.addEventListener("focus", ()=>{
    toggleBorders(false)
})
passwordInput.addEventListener("focus", ()=>{
    toggleBorders(false)
})

function show_login_error(errorText){
    loginError.innerText = errorText;
    toggleBorders(true)
    return;
}

function toggleBorders(isError){
    if (isError){
        usernameInput.classList.remove(normalBorderClass)
        passwordInput.classList.remove(normalBorderClass)
        usernameInput.classList.add(errorBorderClass)
        passwordInput.classList.add(errorBorderClass)
    }
    else{
        usernameInput.classList.remove(errorBorderClass)
        passwordInput.classList.remove(errorBorderClass)
        usernameInput.classList.add(normalBorderClass)
        passwordInput.classList.add(normalBorderClass)
    }
}


toggleBorders(false)