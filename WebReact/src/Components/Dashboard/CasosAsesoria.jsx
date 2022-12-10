













//import './App.css';
import React from "react";
import axios from "axios";
//import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";
import ClientSidebar from "./ClientSidebar";
import {useNavigate} from 'react-router-dom';



function CasosAsesoria() {
    const cookies = new Cookies();
    const userData = React.useMemo(()=> loadUserData())
    const [chats, setChats] = React.useState("")
    const navigate = useNavigate()

    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        console.log(gottenUserData)
        return gottenUserData
    }

    async function openChat(id_chat){
        navigate("/dashboard/dashboardOption4/chat" + "?room="+id_chat)
    }

    function filter_chat_rooms(rooms_data){

        const uniques = []
        const results = []
        for(const room_data of rooms_data){
            if(!uniques.includes(room_data["ID_SALA"])){
                uniques.push(room_data["ID_SALA"])
                results.push(room_data)
            } 
        }

        return results;
    }


    async function loadChats(){
        
        const data = {
            sessionKey: cookies.get("sessionKey")
        }

        const result = await axios.post('http://localhost:3001/list_chats', data)
        const unique_chat_rooms = filter_chat_rooms(result.data)
        setChats(unique_chat_rooms)
    }

    React.useMemo(()=>{
        loadUserData()
        loadChats()
    }, [])

  return (
    <div>
        <div className="bg-gray-700 grid" style={{minHeight: "100vh", gridTemplateColumns: "256px 1fr"}}>
        <ClientSidebar/>
        <div>
            <div className="mt-20 flex flex-col text-gray-200">

            <div className="flex flex-col overflow-y-auto mt-20" style={{maxHeight: "100vh"}}>
                    {  chats !== "" ?
                    chats.map((client, i) =>
                        <div key={client["ID_SALA"]} 
                        
                        className="bg-gray-700 flex flex-col hover:bg-gray-600 rounded-xl">
                            <div className="h-16 border-gray-600 border-t h-full mx-auto" style={{width: "98%",
                            display: "grid", gridTemplateColumns: "64px 350px 200px 210px 125px 150px 1fr"}}>
                                <div className="flex m-auto">
                                    <img src={client["IMAGEN"] ? client["IMAGEN"]
             : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"} className="h-12 w-12 object-cover rounded-full"/>
                                </div>
                                <div className="flex pl-2 mr-auto my-auto flex-col">
                                    <div>{client["NOMBRES"]} {client["APELLIDOS"]}</div> 
                                    <div className="italic text-xs text-gray-200">{client["RUT_USUARIO_1"]}</div>
                                </div>
          
        
            
                                <div className="flex flex-col justify-center items-start">
                                    <div className="font-bold">Empresa:</div>
                                    <div className={client["NOMBRE"] ? "" : "text-red-500"}>
                                        {client["NOMBRE"] ? client["NOMBRE"] : "Sin empresa"}
                                    </div>    
                                </div>

                                <div className="flex my-auto font-bold">
                                    Asunto: {client["ASUNTO"]}
                                </div>

                                <div className="flex my-auto font-bold">
                                    Id: 00{client["ID_SALA"]}
                                </div>

                                <div className="flex">
                                    <div onClick={(e) => {e.stopPropagation(); openChat(client["ID_SALA"])}}
                                    className=" bg-orange-700 hover:bg-orange-800 select-none m-auto rounded-lg text-center py-1"  
                                    style={{width: "115px"}}> 
                                        Ver chat
                                    </div>
                                    
                                    
                                </div>

                            </div>

                            
                        </div> 
                    ):""}
                </div>
                {/* <div className="w-full flex mt-20">
                    <div className="ml-20 border border-black rounded-full border-4 box-content" style={{width: "150px", height: "150px"}}>
                        <img src={(userData["IMAGEN"]) ? userData["IMAGEN"] : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png" }
                        className="bg-white w-full rounded-full hover:opacity-75" alt="" />
                    </div>

                    
                </div> */}
                
            </div>
        </div>
    </div>
    
    </div>
    
  );
}

export default CasosAsesoria;
