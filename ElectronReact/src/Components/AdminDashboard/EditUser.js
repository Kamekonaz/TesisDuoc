
import React from "react";
import ImageResizer from "../../Customscripts/ImageManager"
import AdminSidebar from "./AdminSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     NavLink 
//   } from "react-router-dom";

function EditUser() {
    const cookies = new Cookies()
    const urlparams = new URLSearchParams(window.location.search);
    //console.log(urlparams.get("dashboardOption"))
    const previousRoute = window.location.origin + "/adminDashboard/" + (urlparams.get("dashboardOption") ? urlparams.get("dashboardOption") : "")
    const [editData, setEditData] = React.useState({
        imagePFP:"", 
        username:"",
        nombres:"",
        apellidos:"",
        email:"",
        telefono:"",
        estado:"",
    });

    async function getUserData(){
        const userRutDisplay = document.getElementById("userRutDisplay")
        const userID = urlparams.get("userID")
        const data ={
            accountID: userID,
            sessionKey: cookies.get("sessionKey")
        }
        const userData = (await axios.post('http://localhost:3001/getwholeuserdata', data)).data
        userRutDisplay.innerHTML = "Rut: "+userData["RUT_USUARIO"]

        setEditData({
            imagePFP: userData["IMAGEN"], 
            username: userData["USERNAME"],
            nombres: userData["NOMBRES"],
            apellidos: userData["APELLIDOS"],
            email: userData["EMAIL"],
            telefono: userData["TELEFONO"],
            estado: userData["ESTADO"],
        })
        
    }

    async function editUserPost(){
        const urlparams = new URLSearchParams(window.location.search);
        const userID = urlparams.get("userID")
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
                        window.location.href = previousRoute
                }
            })
        );
    }

    async function resizeImage(file){
        const image = await ImageResizer.resizeImage(file, 80, 80)
        return image
    }

    React.useEffect(() => {
        getUserData()
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
        const profilePicture = document.getElementById("ImagePFP");
        const pfpInput = document.getElementById("file")
        pfpInput.addEventListener("change", async (e) =>{
            profilePicture.src = URL.createObjectURL(e.target.files[0]);
            const imageFile = e.target.files[0]
            const resizedImage = await resizeImage(imageFile)
            setEditData(editData=>({...editData,
                ...{imagePFP: resizedImage}
            }))
        })
    }, []);
 
  return (
    <div style={{height: '100vh'}} >
        <AdminSidebar/>
        <div id="viewContent border" className="h-full ml-64">
            <div className="grid h-full bg-gray-700 text-white" style={{gridTemplateRows: "1fr 100px"}}>
                <div className="flex flex-col" >
                    <div className="w-full h-36 grid" style={{gridTemplateColumns: "150px 1fr"}}>
                        <div className="ml-12 m-auto profile-pic flex">
                            <label className="-label bg-gray-200 rounded-full" htmlFor="file">
                            <span className="glyphicon glyphicon-camera"></span>
                            </label>
                            <input id="file" type="file"  />
                            <img src={(editData.imagePFP) ? editData.imagePFP
                            : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"} 
                            alt="" id="ImagePFP" width="200" />
                        </div>

                        <div className="flex flex-col">
                            <div className="text-gray-300 italic mt-12 text-xl" id="userRutDisplay">Rut: 11.111.111-1</div>
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
                        <div className="flex flex-col mt-12 space-y-4">
                            <div className="mx-auto">Estado</div>
                            <div className="mx-auto select-none"  onClick={(e)=>{setEditData(editData=>({...editData, ...{estado: (editData.estado === "1") ? "0" : "1"} }))}} > 
                                <div className={`px-4 py-2 rounded-lg ${(editData.estado === "1") ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}>
                                    {(editData.estado === "1") ? "Activo" : "Inactivo"}
                                </div> 
                            </div> 
                            <div className="mx-auto text-sm">Click para cambiar</div>
                        </div>
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
                        hover:bg-green-500 transition duration-200"onClick={()=>editUserPost()}>Aplicar</div></div>
                </div>
                
            </div>
        </div>
    </div>
    
  );
}

export default EditUser;
