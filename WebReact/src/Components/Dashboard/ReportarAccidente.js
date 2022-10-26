//import './App.css';
import React from "react";
import axios from "axios";
//import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import ClientSidebar from "./ClientSidebar";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'



function ReportarAccidente() {
    const cookies = new Cookies();
    const [asunto, setAsunto] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");

    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        return gottenUserData
    }

    async function postAccident(){
        const userData = loadUserData();
        console.log(userData)
        console.log(asunto, descripcion)
        const data = {
            rut_usuario: userData["RUT_USUARIO"], 
            descripcion: descripcion, 
            asunto: asunto,
            sessionKey: cookies.get("sessionKey")
        }

        await axios.post('http://localhost:3001/report_accident', data).then(
            Swal.fire({
                title: "<h5 style='color:white'>Exito</h5>",
                html: "<p style='color:white'>Accidente reportado exitosamente</p>",
                icon: 'success',
                background: '#272727',
                showCancelButton: false,
                confirmButtonColor: '#7BCA6F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = window.location.origin + "/dashboard/dashboardOption1"
                }
            })
        );
    }

  return (
    <div className="bg-gray-700 grid" style={{minHeight: "100vh", gridTemplateColumns: "256px 1fr"}}>
        <ClientSidebar/>
        <div>
            <div className="mt-20 flex flex-col text-gray-200">
                <div className="mx-auto mt-20 text-4xl">¿Tuviste un accidente?</div>
                <div className="mx-auto mt-2 text-2xl">Cuentanos mas</div>
                <div className="w-full flex">
                    <div className="mx-auto w-full flex space-x-2 items-center justify-center mt-10" style={{minWidth: "400px", maxWidth: "700px"}}>
                        <div style={{minWidth: "80px"}}>Asunto:</div>
                        <input onChange={(e) => setAsunto(e.target.value)} placeholder="Ejemplo: Caida del servicio" className="bg-gray-200 text-black pl-2 h-8 w-full"/>
                    </div>
                </div> 
                <div className="w-full flex">
                    <textarea onChange={(e) => setDescripcion(e.target.value)} className="mx-auto w-full mt-10 h-72 bg-gray-200 text-black p-2" placeholder="Describe tu accidente..." style={{minWidth: "400px", maxWidth: "700px"}}></textarea>
                </div>    
                <div className="flex mt-4">
                    <div onClick={() => postAccident()} className="px-4 py-2 bg-green-500 mx-auto rounded select-none text-white hover:bg-green-600">Reportar accidente</div>    
                </div>
                
            </div>
        </div>
    </div>
    
  );
}

export default ReportarAccidente;
