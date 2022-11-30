
import React from "react";
import ImageResizer from "../../Customscripts/ImageManager"
import AdminSidebar from "./AdminSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'

import { parse } from "postcss";
import InputsValidator from "../../Customscripts/InputsValidator";


// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     NavLink 
//   } from "react-router-dom";

function isNumeric(str) {
    if (typeof str !== "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

function CreateUser() {
    const cookies = new Cookies()
    const urlparams = new URLSearchParams(window.location.search);
    //console.log(urlparams.get("userType"))
    const previousRoute = window.location.origin + "/adminDashboard/" + urlparams.get("dashboardOption")
    const [creationData, setCreationData] = React.useState({
        imagePFP:"", 
        usertype: (urlparams.get("userType") ? urlparams.get("userType") : ""),
        estado:"",
        rut:"",
        username:"",
        contraseña:"",
        checkcontraseña:"",                                                                                
        nombres:"",
        apellidos:"",
        email:"",
        telefono:"",
    });


    async function createUserPost(){
        const creationDataCopy = JSON.parse(JSON.stringify(creationData))
        delete creationDataCopy.imagePFP
        const hasVoidAttribute = !Object.values(creationDataCopy).every(value => value !== "")
        let errors = 0;
        if(hasVoidAttribute) errors+=1
        if(creationData.contraseña !== creationData.checkcontraseña) errors+=1
        
        if (errors > 0) return;

        const data = {
            ...creationData,
            ...{usertype: parseInt(creationData.usertype)},
            ...{estado: parseInt(creationData.estado)},        
            ...{telefono: parseInt(creationData.telefono)},
            sessionKey: cookies.get("appsessionKey")
        }
        delete data.checkcontraseña

       
        await axios.post('http://localhost:3001/createUser', data
        ).then(
            Swal.fire({
                title: "<h5 style='color:white'>Exito</h5>",
                html: "<p style='color:white'>Usuario creado exitosamente</p>",
                icon: 'success',
                background: '#272727',
                showCancelButton: false,
                confirmButtonColor: '#7BCA6F',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = previousRoute
                }
            })
        );
    }


    // async function editUserPost(){
    //     const urlparams = new URLSearchParams(window.location.search);
    //     const userID = urlparams.get("userID")
    //     const data = { 
    //         f_accountID: userID, 
    //         f_image: creationData.imagePFP, 
    //         f_username: creationData.username, 
    //         f_nombres: creationData.nombres, 
    //         f_apellidos: creationData.apellidos, 
    //         f_email: creationData.email, 
    //         f_telefono: parseInt(creationData.telefono), 
    //         f_estado: parseInt(creationData.estado)
    //     }

    //     await axios.post('http://localhost:3001/editUser', data
    //     ).then(
    //         Swal.fire({
    //             title: "<h5 style='color:white'>" + "Exito" + "</h5>",
    //             html: "<p style='color:white'>" + "Cambios realizados exitosamente" + "</p>",
    //             icon: 'success',
    //             background: '#272727',
    //             showCancelButton: false,
    //             confirmButtonColor: '#7BCA6F',
    //             cancelButtonColor: '#d33',
    //             confirmButtonText: 'Aceptar'
    //             }).then((result) => {
    //                 if (result.isConfirmed) {
    //                     window.location.href = previousRoute
    //             }
    //         })
    //     );
    // }

    async function resizeImage(file){
        const image = await ImageResizer.resizeImage(file, 80, 80)
        return image
    }

    function formatRut(rut){
        // XX.XXX.XXX-X

        const newRut = rut.replace(/\./g,'').replace(/-/g, '').trim().toLowerCase();
        if(newRut.length === 0) return setCreationData(creationData=>({...creationData, ...{rut: "" } }))
        if(newRut.length > 9) return;

        const lastDigit = newRut.substr(-1, 1);
        const rutDigit = newRut.substr(0, newRut.length-1)

        if (!isNumeric(rutDigit) && rutDigit.length > 0) return;
        if (!isNumeric(lastDigit) && lastDigit !== "k") return;


        let format = '';
        for (let i = rutDigit.length; i > 0; i--) {
          const e = rutDigit.charAt(i-1);
          format = e.concat(format);
          if ((i+ (newRut.length <= 8 ? 1 : 0)) % 3 === 0){
            format = '.'.concat(format);
          }
        }

        return setCreationData(creationData=>({...creationData, ...{rut: format.concat('-').concat(lastDigit)} }))
      }




    React.useEffect(() => {

        const profilePicture = document.getElementById("ImagePFP");
        const pfpInput = document.getElementById("file")
        pfpInput.addEventListener("change", async (e) =>{
            profilePicture.src = URL.createObjectURL(e.target.files[0]);
            const imageFile = e.target.files[0]
            const resizedImage = await resizeImage(imageFile)
            setCreationData(creationData=>({...creationData,
                ...{imagePFP: resizedImage}
            }))
        })
    }, []);
 
  return (
    <div style={{height: '100vh'}} >
        <AdminSidebar/>
        <div id="viewContent border" className="h-full ml-64">
            
            <div className="grid h-full bg-gray-700 text-white" style={{gridTemplateRows: "64px 1fr 50px"}}>

                <div className="border-b border-gray-800 shadow-lg w-full h-16 grid select-none" style={{gridTemplateColumns: "200px 0.9fr 1fr"}}>
                    <div className="flex ml-4 mr-auto my-auto space-x-2">
                        <i className="m-auto text-gray-200 fa-solid fa-pen-to-square"></i>
                        <div className="italic text-white font-bold">Crear usuario</div>
                    </div>

                    <div className="text-gray-200 font-medium flex mr-auto my-auto space-x-4" id="clientDisplayOptionContainer">

                    </div>
                    <div className="text-gray-200 font-medium flex space-x-3 ml-auto pr-4">
        
                    </div>
                </div>             
                <div className="flex-col mx-auto w-full overflow-y-auto">
                    <div className="flex mt-2">
                        <div className="m-auto profile-pic flex">
                            <label className="-label bg-gray-200 rounded-full" htmlFor="file">
                            <span className="glyphicon glyphicon-camera"></span>
                            </label>
                            <input id="file" type="file"/>
                            <img src={(creationData.imagePFP) ? creationData.imagePFP
                            : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"} 
                            alt="" id="ImagePFP" width="200" />
                        </div>
                    </div>             
                    <div className="flex space-x-4" style={{height:"75vh"}}>
                        <div className="flex flex-col space-y-4 mx-auto mt-12">
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className="my-auto">Tipo de usuario:</div>
                                <select onChange={(e)=>setCreationData(creationData=>({...creationData, ...{usertype: e.target.value} }))} 
                                defaultValue={urlparams.get("userType")} className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2 mr-2" style={{width:"300px"}}>
                                    <option value="">Selecciona un tipo</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Profesional</option>
                                    <option value="3">Cliente</option>
                                </select>
                            </div>
                        
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className="my-auto">Estado:</div>
                                <select onChange={(e)=>setCreationData(creationData=>({...creationData, ...{estado: e.target.value} }))}
                                defaultValue="" className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2 mr-2" style={{width:"300px"}}>
                                    <option value="">Selecciona un estado</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>
                            
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto ${InputsValidator.isRutValid(creationData.rut) ? "text-white" : "text-red-500"}`}>Rut:</div>
                                <input onChange={(e)=>formatRut(e.target.value)} 
                                value={creationData.rut}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto ${InputsValidator.isUsernameValid(creationData.username) ? "text-white" : "text-red-500"}`}>Username:</div>
                                <input onChange={(e)=>setCreationData(creationData=>({...creationData, ...{username: e.target.value} }))} 
                                defaultValue={creationData.username}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto ${InputsValidator.isPasswordValid(creationData.contraseña) ? "text-white" : "text-red-500"}`}>Contraseña:</div>
                                <input onChange={(e)=>setCreationData(creationData=>({...creationData, ...{contraseña: e.target.value} }))} 
                                defaultValue={creationData.contraseña}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="password"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto ${(creationData.contraseña === creationData.checkcontraseña) ? "text-white" : "text-red-500"}`}>Confirmar Contraseña:</div>
                                <input onChange={(e)=>setCreationData(creationData=>({...creationData, ...{checkcontraseña: e.target.value} }))} 
                                defaultValue={creationData.checkcontraseña}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="password"/>
                            </div>

                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto ${InputsValidator.isNameValid(creationData.nombres) ? "text-white" : "text-red-500"}`}>Nombres:</div>
                                <input onChange={(e)=>setCreationData(creationData=>({...creationData, ...{nombres: e.target.value} }))} 
                                defaultValue={creationData.nombres}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto ${InputsValidator.isNameValid(creationData.apellidos) ? "text-white" : "text-red-500"}`}>Apellidos:</div>
                                <input onChange={(e)=>setCreationData(creationData=>({...creationData, ...{apellidos: e.target.value} }))} 
                                defaultValue={creationData.apellidos}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto ${InputsValidator.isEmailValid(creationData.email) ? "text-white" : "text-red-500"}`}>Email:</div>
                                <input  onChange={(e)=>setCreationData(creationData=>({...creationData, ...{email: e.target.value} }))} 
                                defaultValue={creationData.email}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "160px 1fr"}}>
                                <div className={`my-auto ${InputsValidator.isPhoneNumberValid(creationData.telefono) ? "text-white" : "text-red-500"}`}>Telefono:</div>
                                <input onChange={(e)=>setCreationData(creationData=>({...creationData, ...{telefono: e.target.value} }))} 
                                defaultValue={creationData.telefono}
                                id="clientTelefonoInput"  pattern="[0-9]+" className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            
                        </div>

                        {/* <div className="flex flex-col space-y-4 mt-12">
                            <div className="grid" style={{gridTemplateColumns: "150px 1fr"}}>
                                <div className="my-auto">Nombres:</div>
                                <input onChange={(e)=>setCreationData(creationData=>({...creationData, ...{nombres: e.target.value} }))} 
                                defaultValue={creationData.nombres}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "150px 1fr"}}>
                                <div className="my-auto">Apellidos:</div>
                                <input onChange={(e)=>setCreationData(creationData=>({...creationData, ...{apellidos: e.target.value} }))} 
                                defaultValue={creationData.apellidos}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "150px 1fr"}}>
                                <div className="my-auto">Email:</div>
                                <input  onChange={(e)=>setCreationData(creationData=>({...creationData, ...{email: e.target.value} }))} 
                                defaultValue={creationData.email}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                            <div className="grid" style={{gridTemplateColumns: "150px 1fr"}}>
                                <div className="my-auto">Telefono:</div>
                                <input onChange={(e)=>setCreationData(creationData=>({...creationData, ...{telefono: e.target.value} }))} 
                                defaultValue={creationData.telefono}
                                id="clientTelefonoInput" className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                            </div>
                        </div> */}
                    </div>
                        
                </div>
                <div className="grid w-full grid-cols-3 select-none">
                    <div className="flex"><div className="my-auto mr-auto ml-8 px-3 py-1 rounded-lg shadow-lg bg-red-400 text-white font-medium 
                            hover:bg-red-500 transition duration-200" onClick={()=>window.location.href = previousRoute}>Cancelar</div></div>
                    <div className="flex">
                        {/* <!-- <div className="m-auto px-3 py-1 rounded-lg shadow-lg bg-blue-400 text-white font-medium 
                        hover:bg-blue-500 transition duration-200">Cambiar contraseña</div> --> */}
                    </div>
                    <div className="flex"><div className="my-auto ml-auto mr-8 px-3 py-1 rounded-lg shadow-lg bg-green-400 text-white font-medium 
                        hover:bg-green-500 transition duration-200" onClick={()=> createUserPost()}>Aplicar</div></div>
                </div>

                
                
            </div>
        </div>
    </div>
    
  );
}

export default CreateUser;
