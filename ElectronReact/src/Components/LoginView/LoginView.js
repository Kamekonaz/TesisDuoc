//import './App.css';
import React from "react";
import axios from "axios";
//import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import guro_icon from './guro_icon.png'
const LOGIN_URL = "http://localhost:3001/login"
const EXPECTED_USERS = [1, 2]




function LoginView() {
  const cookies = new Cookies();
  const [isDarkMode, setIsDarkMode] = React.useState(cookies.get("isDarkMode"))
  const [hasLoginError, setHasLoginError] = React.useState(0);
  
    async function login(){
      const usernameInput = document.getElementById("guro_username")
      const passwordInput = document.getElementById("password")

        const loginData = {
          username: usernameInput.value,
          password: passwordInput.value,
          keySession: cookies.get("appsessionKey"),
          expectedUserTypes: EXPECTED_USERS
        }

        try {
        const result = await axios.post(LOGIN_URL, loginData)
          
        const resultData = result.data
        if(resultData["apiError"] === true) return show_login_error("Error con el servidor") // Error con el servidor 
        if(resultData["loginSuccesful"] === true){
          if(resultData["wasSessionValid"] === false) cookies.set('appsessionKey', resultData["sessionKey"], { path: '/', expires: new Date(Date.now()+25920000) });
          // Login exitoso
          if(resultData["idTipo"] === 1){
              const data = {
                  sessionKey:  cookies.get("appsessionKey")
              }
              const userData = (await axios.post('http://localhost:3001/getselfuserdata', data)).data
              localStorage.setItem('appuserData', JSON.stringify(userData))
              window.location.href = window.location.origin + "/adminDashboard/dashboardOption0"
          
          } 
          if(resultData["idTipo"] === 2) {
            const data = {
                sessionKey:  cookies.get("appsessionKey")
            }
            const userData = (await axios.post('http://localhost:3001/getselfuserdata', data)).data
            localStorage.setItem('appuserData', JSON.stringify(userData))
            window.location.href = window.location.origin + "/professionalDashboard/dashboardOption0"
          }
        }
        else{
          // Error datos incorrectos
          return show_login_error("Credenciales incorrectas")
        }
        } catch (error) {
          // Error algo sali?? mal
          console.log(error)
          return show_login_error("Error con el servidor")
        }
    }

    function show_login_error(errorText){
      const loginError = document.getElementById("login_error");
      loginError.innerText = errorText;
      toggleBorders(true)
    }

    React.useEffect(()=>{
      window.addEventListener("keydown", (e)=>{
        if(e.key === "Enter") login()
      })
    },[])

    
    const normalBorderClass = "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none";
    const errorBorderClass = "border-red-500 form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none";

    const toggleBorders = (isError) =>{
      setHasLoginError(isError)
    }

  return (
    <div className="LoginView">
      <section className="h-screen">
    <div className={`px-6 h-full ${isDarkMode ? "text-gray-800" : "text-white"}`}>
      <div
        className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
      >
        <div
          className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
        >
 
          <img
            src={guro_icon}
            className="w-full m-auto"
            alt="Sample"
            style={{maxWidth:"50%"}}
          />
        </div>
        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <form>
            <div className="grid grid-rows-2">
              <div id="login_error" className="text-red-500 text-xl font-normal mt-6"></div>
              <div className="mb-6">
                <input
                  type="text"
                  onClick={() => toggleBorders(false)}
                  className={hasLoginError ? errorBorderClass : normalBorderClass}
                  id="guro_username"
                  placeholder="Usuario"
                />
              </div>
            </div>

            <div className="mb-6">
              <input
                type="password"
                onClick={() => toggleBorders(false)}
                className={hasLoginError ? errorBorderClass : normalBorderClass}                
                id="password"
                placeholder="Contrase??a"
              />
            </div>
  
            <div className="text-center lg:text-left">
              <button
                type="button"
                id="login_button"
                onClick={login}
                className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Iniciar sesi??n
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      </section>
    </div>
  );
}

export default LoginView;
