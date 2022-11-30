
import React from "react";
import ImageResizer from "../../Customscripts/ImageManager"
import AdminSidebar from "./AdminSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { parse } from "postcss";
import InputsValidator from "../../Customscripts/InputsValidator";



function isNumeric(str) {
    if (typeof str !== "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

function CrearEmpresa() {
    const cookies = new Cookies()
    const urlparams = new URLSearchParams(window.location.search);
    const navigate = useNavigate()
    //console.log(urlparams.get("userType"))
    //const previousRoute = window.location.origin + "/adminDashboard/" + urlparams.get("dashboardOption")

 
  return (
    <div style={{height: '100vh'}} >
        <AdminSidebar/>
        <div id="viewContent border" className="h-full ml-64">
            
            <div className="grid h-full bg-gray-700 text-white" style={{gridTemplateRows: "64px 1fr 50px"}}>
    


                
            </div>
        </div>
    </div>
    
  );
}

export default CrearEmpresa;
