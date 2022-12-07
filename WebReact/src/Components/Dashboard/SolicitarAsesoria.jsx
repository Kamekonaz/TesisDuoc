













//import './App.css';
import React from "react";
import axios from "axios";
//import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";
import ClientSidebar from "./ClientSidebar";
import Swal from 'sweetalert2';



function SolicitarAsesoria() {
    const cookies = new Cookies();
    const userData = React.useMemo(()=> loadUserData())
    const [motivo, setMotivo] = React.useState("");

    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        console.log(gottenUserData)
        return gottenUserData
    }

    async function enviar(){
        const data = {
            rut_usuario: userData["RUT_USUARIO"],
            motivo: motivo
        }
        await axios.post('http://localhost:3001/solicitarAsesoria', data
        ).then(
            Swal.fire({
                title: "<h5 style='color:white'>Exito</h5>",
                html: "<p style='color:white'>Solicitud realizada exitosamente</p>",
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

    React.useMemo(()=>{
        loadUserData()
    }, [])

  return (
    <div>
        <div className="bg-gray-700 grid" style={{minHeight: "100vh", gridTemplateColumns: "256px 1fr"}}>
        <ClientSidebar/>
        <div>
            <div className="mt-20 flex flex-col text-gray-200">
                <div className="w-full flex flex-col mt-20">
                    <div className="mx-auto mt-20 text-4xl">¿Necesitas de una asesoría especial?</div>
                    <div className="mx-auto mt-2 text-2xl">Dinos el motivo y nos encargamos</div>
                    <div className="w-full flex">
                        <div className="mx-auto w-full flex space-x-2 items-center justify-center mt-20" style={{minWidth: "400px", maxWidth: "700px"}}>
                            <div style={{minWidth: "80px"}}>Motivo:</div>
                            <input onChange={(e) => setMotivo(e.target.value)} placeholder="Ejemplo: Fiscalización del servicio" className="bg-gray-200 text-black pl-2 h-8 w-full"/>
                        </div>
                    </div> 
                    <div className="flex mt-20">
                        <div onClick={() => enviar()} className="px-4 py-2 bg-green-500 mx-auto rounded select-none text-white hover:bg-green-600">Solicitar</div>    
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    
    </div>
    
  );
}

export default SolicitarAsesoria;
