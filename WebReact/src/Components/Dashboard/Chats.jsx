













//import './App.css';
import React from "react";
import axios from "axios";
//import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";
import ClientSidebar from "./ClientSidebar";
import {useNavigate} from 'react-router-dom'



function Chats() {
    const cookies = new Cookies();
    const params = new URLSearchParams(window.location.search);
    const userData = React.useMemo(()=> loadUserData())
    const [chats, setChats] = React.useState("")
    const [messageInput, setMessageInput] = React.useState("");
    const navigate = useNavigate()
    // const [currentChatRoom, setCurrentChatRoom] = React.useState(params.get("room"))

    const handleKeyDown = (elem, e) => {
        if (e.key === 'Enter') {
          const value = e.target.value
          if (value.length > 0){
            sendAMessage(value)
            setMessageInput("")
          } 
        }
      };

      async function sendAMessage(message){
            // sendMessage

            const data = {
                rut_usuario: userData["RUT_USUARIO"],
                id_sala: params.get("room"),
                mensaje: message
            }
    
            const result = await axios.post('http://localhost:3001/sendMessage', data)
            console.log("message sent")
            loadChats()
            setTimeout(() => {
                const chatBody = document.getElementById("chatbody")
                chatBody.scrollTo(0, chatBody.scrollHeight)
            }, 150);
      }

    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        // console.log(gottenUserData)
        return gottenUserData
    }

    async function openChat(id_chat){
        window.location.href = window.location.origin + "/chat" + "?room="+id_chat
    }

    function filter_chat_room(rooms_data){
        
        const result = rooms_data.filter((room) => room["ID_SALA"] === parseInt(params.get("room")))
        return result
    }


    async function loadChats(){
        
        const data = {
            sessionKey: cookies.get("sessionKey")
        }

        const result = await axios.post('http://localhost:3001/list_chats', data)
        const chat_room_messages = filter_chat_room(result.data)
        // console.log(chat_room_messages)
        setChats(chat_room_messages)
        setTimeout(() => {
            const chatBody = document.getElementById("chatbody")
            chatBody.scrollTo(0, chatBody.scrollHeight)
        }, 150);
    }

    React.useEffect(()=>{
        loadUserData()
        loadChats()
        setTimeout(() => {
            const chatBody = document.getElementById("chatbody")
            chatBody.scrollTo(0, chatBody.scrollHeight)
        }, 150);
        setInterval(()=>{
            loadChats()
        },5000)
    },[])

  return (
    <div>
        <div className="bg-gray-700 grid" style={{minHeight: "100vh", gridTemplateColumns: "256px 1fr"}}>
        <ClientSidebar/>
        <div>
            <div className="grid text-gray-200" style={{height: "100vh", maxHeight: "100vh", gridTemplateRows: "80px 80px 1fr 100px"}}>
                <div></div>
                <div className="flex bg-gray-800">
                    <div onClick={()=> navigate("/dashboard/dashboardOption4") }
                        className="ml-3 my-auto rounded-lg bg-blue-500 hover:bg-blue-600 select-none px-3 py-1">Volver</div>

                    <div className="my-auto ml-6 font-bold italic">
                        Asunto: {chats ? chats[0]["ASUNTO"] : ""}
                    </div>
                    <div className="my-auto ml-6 font-bold italic">
                        Accidente ID: {chats ? "00"+chats[0]["ID_ACCIDENTE"] : ""}
                    </div>
                </div>
                <div className="overflow-y-auto" id="chatbody">
                    <div className="flex flex-col-reverse justify-end">
                        {  chats !== "" ?
                        chats.map((client, i) =>
                            client["ID_MENSAJE"] && client["ID_SALA"] === parseInt(params.get("room")) ? 
                            <div key={client["ID_MENSAJE"]} 
                            
                            className="bg-gray-700 flex flex-col rounded-xl mt-2" style={{minHeight: "60px"}}>
                                <div className="border-gray-600 border-t h-full mx-auto" style={{width: "98%",
                                display: "grid", gridTemplateColumns: "64px 1fr"}}>
                                    <div className="flex m-auto">
                                        <img src={client["IMAGEN_1"] ? client["IMAGEN_1"]
                : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"} className="h-12 w-12 object-cover rounded-full bg-white"/>
                                    </div>
                                    <div className="pl-2 mr-auto grid" style={{gridTemplateRows:"25px 1fr"}}>
                                        <div className="flex mr-auto space-x-6">
                                            <div className="font-bold">{client["NOMBRES_1"]} {client["APELLIDOS_1"]}</div>
                                            <div className="text-gray-300 italic text-sm my-auto">{new Date(client["FECHA"]).toLocaleString()}</div>
                                        </div> 

                                        <div className="text-sm text-gray-200 break-all" >{client["MENSAJE"]}</div>
                                    </div>
            
            
        

                                </div>

                                
                            </div> 
                            :""
                        ):""}
                </div>
                </div>
                

                <div className="flex px-16">
                    <input type="text" value={messageInput} onChange={(e)=> setMessageInput(e.target.value)} onKeyDown={(e)=>handleKeyDown(this, e)} placeholder="Envia un mensaje" className="m-auto border rounded-lg h-12 w-full pl-2 text-gray-200 text-xl bg-gray-800 border-gray-900 border-2 focus:border-black focus:outline-none focus:border-3" />
                </div>
            </div>
        </div>
    </div>
    
    </div>
    
  );
}

export default Chats;
