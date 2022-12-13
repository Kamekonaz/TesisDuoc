













//import './App.css';
import React from "react";
import axios from "axios";
//import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";
import ClientSidebar from "./ClientSidebar";
import Test from "./Test";

import Swal from "sweetalert2";



function Perfil() {
    const cookies = new Cookies();
    const userData = React.useMemo(()=> loadUserData())
    const [isEditingImage, setIsEditingImage] = React.useState(false)
    const [isClient, setIsClient] = React.useState(false)
    const [editData, setEditData] = React.useState({
        imagePFP:"", 
        username:"",
        nombres:"",
        apellidos:"",
        email:"",
        telefono:"",
        estado:"",
    });
    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        console.log(gottenUserData)
        return gottenUserData
    }

    async function editUserPost(){
        const userID = userData["ID_CUENTA"]
        const data = { 
            f_accountID: userID, 
            f_image: editData.imagePFP, 
            f_username: editData.username, 
            f_nombres: editData.nombres, 
            f_apellidos: editData.apellidos, 
            f_email: editData.email, 
            f_telefono: parseInt(editData.telefono), 
            f_estado: parseInt(editData.estado)
        }

        await axios.post('http://localhost:3001/editUser', data
        ).then(
            Swal.fire({
                title: "<h5 style='color:white'>" + "Exito" + "</h5>",
                html: "<p style='color:white'>" + "Cambios realizados exitosamente" + "</p>",
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
    function passFinalImage(image){
        setEditData(editData=>({...editData,
            ...{imagePFP: image}
        }))
        setIsEditingImage(false)
      }

      function pfpInputChange(e){
        const profilePicture = document.getElementById("ImagePFP");
        profilePicture.src = URL.createObjectURL(e.target.files[0]);
        setEditData(editData=>({...editData,
            ...{imagePFP: profilePicture.src}
        }))
            setIsEditingImage(true)
            e.target.value = null;
        }
    React.useEffect(() => {
        if(editData["estado"] === "") getUserData()
        
        // MySwal.fire({
        //     title: "<h5 style='color:white'>" + "Exito" + "</h5>",
        //     html: "<p style='color:white'>" + "Cambios realizados exitosamente" + "</p>",
        //     icon: 'success',
        //     background: '#272727',
        //     showCancelButton: false,
        //     confirmButtonColor: '#7BCA6F',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Aceptar'
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             console.log("Uwu")
        //     }
        // })
        
    });
    async function getUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        const userRutDisplay = document.getElementById("userRutDisplay")
        const userID = gottenUserData["ID_CUENTA"]
        const data ={
            accountID: userID,
            sessionKey: cookies.get("sessionKey")
        }
        const result = (await axios.post('http://localhost:3001/getwholeuserdata', data)).data
        
        if(result["ID_TIPO"] === 3) setIsClient(true)
        userRutDisplay.innerHTML = "Rut: "+result["RUT_USUARIO"]

        setEditData({
            imagePFP: result["IMAGEN"], 
            username: result["USERNAME"],
            nombres: result["NOMBRES"],
            apellidos: result["APELLIDOS"],
            email: result["EMAIL"],
            telefono: result["TELEFONO"],
            estado: result["ESTADO"],
        })
        
    }

    React.useEffect(()=>{
        loadUserData()
    }, [])

  return (
    <div>
        <div style={{height: '100vh'}}>
        <ClientSidebar/>
        <div className="h-full ml-64">
        <div className={`grid h-full ${isEditingImage ? "bg-gray-800" : "bg-gray-700"} text-white`} style={{gridTemplateRows: "1fr 100px"}}>
                <div className={`flex flex-col ${isEditingImage ? "hidden" : ""}`} >
                    <div className="w-full h-36 grid mt-20" style={{gridTemplateColumns: "150px 1fr"}}>
                        <div className="ml-12 m-auto profile-pic flex">
                            <label className="-label bg-gray-200 rounded-full" htmlFor="file">
                            <span className="glyphicon glyphicon-camera"></span>
                            </label>
                            <input id="file" type="file"  onChange={(e)=> pfpInputChange(e)} />
                            <img src={(editData.imagePFP) ? editData.imagePFP
                            : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"} 
                            alt="" id="ImagePFP" width="200" />
                        </div>

                        <div className="flex flex-col">
                            <div className="text-gray-300 italic mt-12 text-xl" id="userRutDisplay">Rut: </div>
                            <div className="flex space-x-2">
                                <div className="my-auto">Username:</div>
                                <input onChange={(e)=>setEditData(editData=>({...editData, ...{username: e.target.value} }))} 
                                defaultValue={editData.username}
                                className="pl-2 font-medium border border-gray-900 bg-gray-800 h-8 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"150px"}} type="text"/>
                            </div>
                        </div>                     
                    </div>
                      
                    
                    <div className="grid" style={{gridTemplateColumns:"1.4fr 1fr"}}>
                            <div className="flex flex-col space-y-4 ml-12 mt-12">
                                <div className="grid" style={{gridTemplateColumns: "120px 1fr"}}>
                                    <div className="my-auto">Nombres:</div>
                                    <input onChange={(e)=>setEditData(editData=>({...editData, ...{nombres: e.target.value} }))} 
                                    defaultValue={editData.nombres}
                                    className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                                </div>
                                <div className="grid" style={{gridTemplateColumns: "120px 1fr"}}>
                                    <div className="my-auto">Apellidos:</div>
                                    <input onChange={(e)=>setEditData(editData=>({...editData, ...{apellidos: e.target.value} }))} 
                                    defaultValue={editData.apellidos}
                                    className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                                </div>
                                <div className="grid" style={{gridTemplateColumns: "120px 1fr"}}>
                                    <div className="my-auto">Email:</div>
                                    <input  onChange={(e)=>setEditData(editData=>({...editData, ...{email: e.target.value} }))} 
                                    defaultValue={editData.email}
                                    className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                                </div>
                                <div className="grid" style={{gridTemplateColumns: "120px 1fr"}}>
                                    <div className="my-auto">Telefono:</div>
                                    <input onChange={(e)=>setEditData(editData=>({...editData, ...{telefono: e.target.value} }))} 
                                    defaultValue={editData.telefono}
                                    id="clientTelefonoInput" className="pl-2 font-medium border border-gray-900 bg-gray-800 h-10 rounded-lg shadow-lg focus:outline-0 focus:border-black focus:border-2" style={{width:"300px"}} type="text"/>
                                </div>
                            </div>
   

                            
                    </div>
                    
                </div>

                {
                    isEditingImage ? 
                        <Test  passFinalImage={passFinalImage} imagen={editData["imagePFP"]} setIsEditingImage={setIsEditingImage}/>
                        :
                        ""
                    }    
                
                <div className="grid w-full grid-cols-3 select-none">
                    <div className="flex"><div className="my-auto mr-auto ml-8 px-3 py-1 rounded-lg shadow-lg bg-red-400 text-white font-medium 
                            hover:bg-red-500 transition duration-200" onClick={()=>window.location.reload()}>Cancelar</div></div>
                    <div className="flex">
                        {/* <!-- <div className="m-auto px-3 py-1 rounded-lg shadow-lg bg-blue-400 text-white font-medium 
                        hover:bg-blue-500 transition duration-200">Cambiar contraseña</div> --> */}
                    </div>
                    <div className="flex"><div className="my-auto ml-auto mr-8 px-3 py-1 rounded-lg shadow-lg bg-green-400 text-white font-medium 
                        hover:bg-green-500 transition duration-200"onClick={()=>editUserPost()}>Aplicar</div></div>
                </div>
                
            </div>
        </div>
    </div>
    
    </div>
    
  );
}

export default Perfil;
