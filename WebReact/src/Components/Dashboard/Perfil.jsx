













//import './App.css';
import React from "react";
import axios from "axios";
//import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import Header from "../Header/Header";
import { NavLink } from "react-router-dom";
import ClientSidebar from "./ClientSidebar";



function Perfil() {
    const cookies = new Cookies();
    const userData = React.useMemo(()=> loadUserData())

    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        console.log(gottenUserData)
        return gottenUserData
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
                <div className="w-full flex mt-20">
                    <div className="ml-20 border border-black rounded-full border-4 box-content" style={{width: "150px", height: "150px"}}>
                        <img src={(userData["IMAGEN"]) ? userData["IMAGEN"] : "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png" }
                        className="bg-white w-full rounded-full hover:opacity-75" alt="" />
                    </div>

                    {/* <div className="my-auto ml-10">imagen de perfil</div> */}
                </div>
                
            </div>
        </div>
    </div>
    
    </div>
    
  );
}

export default Perfil;
