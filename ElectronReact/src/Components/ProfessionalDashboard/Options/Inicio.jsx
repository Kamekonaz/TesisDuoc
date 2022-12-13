













//import './App.css';
import React from "react";
import axios from "axios";
//import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import ProfessionalSidebar from "../ProfessionalSidebar";
import {useNavigate} from 'react-router-dom'



function Inicio() {
    const cookies = new Cookies();

    const navigate = useNavigate()

    async function getActivitiesList(){
        const data ={
            sessionKey: cookies.get("appsessionKey"),
        }
        const activities = await axios.post('http://localhost:3001/listActivities', data)
        console.log("bruh")
        console.log(activities.data)
        //setActivitiesList(activities.data)

        
        //return;
    }

    React.useEffect(()=>{
        getActivitiesList()
    },[])

  return (
    <div style={{height: '100vh', maxWidth: '100vw'}} >

        <ProfessionalSidebar/>
        <div id="viewContent border" className="h-full ml-64">
            <div className="dashboardOptionsBody bg-gray-700 flex flex-col pt-6 pl-6" style={{fontSize: "92px" ,height: "100vh"}}>
                <div className="mx-auto text-white">Bienvenid@ a GURO</div> 
            </div>
        </div>
    </div>
    

    
  );
}

export default Inicio;
