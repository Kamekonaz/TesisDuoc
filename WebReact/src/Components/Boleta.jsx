import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'
import "./Boleta.css"


function Boleta() {
    const urlparams = new URLSearchParams(window.location.search);
    const [boletaData, setBoletaData] = React.useState()
    const [returnUrl, setReturnURL] = React.useState(urlparams.get("returnUrl"));
    const navigate = useNavigate();


    function handleReturn(){
        returnUrl ? window.location.href = returnUrl : navigate("/dashboard/dashboardOption3")
    }

    async function loadBoleta(){
        const id_pago = urlparams.get("id_pago");

        const data = {
            id_pago: id_pago
        }
        
        const result = await axios.post("http://localhost:3001/getBoletaDetails", data) 
        setBoletaData(result.data)
        console.log(result.data)

    } 
    React.useEffect(()=>{
        loadBoleta()
    },[])



    return (
        <div className="Boleta">
            <div className="titulo">No mas Accidentes</div>

                <div className="rectangulo "> 
                    <div className="rutboleta"> R.U.T: 77.893.888-4  </div>
                    <div className="boletelectronica"> BOLETA  ELECTRONICA </div>
                    <div className="numeroboleta">N°00{boletaData ? boletaData[0]["ID_PAGO"] : ""}</div>
                </div> 

                <div className="s-i-i">
                    <div>BOLETA DE NO MAS ACCIDENTES</div>
                    <div>Fecha de Emision :     {boletaData ? new Date(boletaData[0]["FECHA_PAGO"]).toLocaleDateString() : ""}</div>
                </div>
                
                <div className="empresa text-center text-white">INFORMACION DE CLIENTE</div>
                {/* <div className="tituloempresa">  No mas Accidentes </div> */}
                <div className="Datoempresa">

                    <div className="datoboleta">
                        <div className="titulodato">Rut</div>
                        <div>{boletaData ? boletaData[0]["RUT_USUARIO"] : ""}</div>
                    </div>

                    <div className="datoboleta">
                        <div className="titulodato">Nombres</div>
                        <div>{boletaData ? boletaData[0]["NOMBRES"] : ""}</div>
                    </div>  
                    
                    <div className="datoboleta">
                        <div className="titulodato">Apellidos</div>
                        <div>{boletaData ? boletaData[0]["APELLIDOS"] : ""}</div>
                    </div> 

                    <div className="datoboleta">
                        <div className="titulodato">Telefono</div>
                        <div>{boletaData ? boletaData[0]["TELEFONO"] : ""}</div>
                    </div>  
                    <div className="datoboleta">
                        <div className="titulodato">Correo</div>
                        <div>{boletaData ? boletaData[0]["EMAIL"] : ""}</div>        
                    </div>
                </div>
                <div className="empresa2"> INFORMACION DE EMPRESA </div>
                <div className="rectangulo2">
                    <div className="flex flex-col justify-center"> 
                        <div className="datoboleta2">
                            <div className="titulodato2">Empresa</div>
                            <div>{boletaData ? boletaData[0]["RAZON_SOCIAL"] : ""}</div>
                            
                        </div>
                        <div className="datoboleta2">
                            <div className="titulodato2">Rut</div>
                            <div>{boletaData ? boletaData[0]["RUT_EMPRESA"] : ""}</div>
                            
                        </div>
                        <div className="datoboleta2">
                            <div className="titulodato2">Calle</div>
                            <div>{boletaData ? boletaData[0]["CALLE"] : ""}</div>
                            
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="datoboleta2">
                            <div className="titulodato2">Comuna</div>
                            <div>{boletaData ? boletaData[0]["COMUNA"] : ""}</div>
                        </div>
                        <div className="datoboleta2">
                            <div className="titulodato2">Provincia</div>
                            <div>{boletaData ? boletaData[0]["PROVINCIA"] : ""}</div>
                        </div>
                        <div className="datoboleta2">
                            <div className="titulodato2">Region</div>
                            <div>{boletaData ? boletaData[0]["REGION"] : ""}</div>
                        </div>
                    </div>

                </div>
                <div className="empresa3"> Detalle de Pagos    </div>
                <div className="rectangulo3" >
                    <div className="cabeceras bg-green-100 font-bold">
                        <div className="columnacabeceras">Nombre servicio</div>
                        <div className="columnacabeceras">Costo fijo</div>
                        <div className="columnacabeceras">Cantidad extra</div>
                        <div className="columnacabeceras">Costo extra</div>
                        <div className="columnacabeceras">Total</div>
                    </div>

                    <div className="filas">
                        <div className="columnafila">{boletaData ? boletaData[0]["NOMBRE_SERVICIO"] : ""}</div>
                        <div className="columnafila">${boletaData ? boletaData[0]["COSTE_SERVICIO"] : ""}</div>
                        <div className="columnafila">{boletaData ? boletaData[0]["CANTIDAD_EXTRA"] : ""}</div>
                        <div className="columnafila">${boletaData ? boletaData[0]["COSTE_EXTRA"] : ""}</div>
                        <div className="columnafila">${boletaData ? boletaData[0]["COSTE_TOTAL"] : ""}</div>
                        
                    </div>


                    <div className="filas">
                        <div className="columnafila">{boletaData ? boletaData[1]["NOMBRE_SERVICIO"] : ""}</div>
                        <div className="columnafila">${boletaData ? boletaData[1]["COSTE_SERVICIO"] : ""}</div>
                        <div className="columnafila">{boletaData ? boletaData[1]["CANTIDAD_EXTRA"] : ""}</div>
                        <div className="columnafila">${boletaData ? boletaData[1]["COSTE_EXTRA"] : ""}</div>
                        <div className="columnafila">${boletaData ? boletaData[1]["COSTE_TOTAL"] : ""}</div>
                        
                    </div>


                    <div className="filas">
                        <div className="columnafila">{boletaData ? boletaData[2]["NOMBRE_SERVICIO"] : ""}</div>
                        <div className="columnafila">${boletaData ? boletaData[2]["COSTE_SERVICIO"] : ""}</div>
                        <div className="columnafila">{boletaData ? boletaData[2]["CANTIDAD_EXTRA"] : ""}</div>
                        <div className="columnafila">${boletaData ? boletaData[2]["COSTE_EXTRA"] : ""}</div>
                        <div className="columnafila">${boletaData ? boletaData[2]["COSTE_TOTAL"] : ""}</div>
                        
                    </div>


                </div>
    
            <div className="contenedormonto">
                <div>
                    <div className="imagen-1"></div>
                </div>
                <div className="flex justify-center items-center px-20"> 

                    <div className="rectangulo5 px-24">

                        <div className="filas2">Total
                            <div className="signos"></div>
                            <div className="montopago">${boletaData ? boletaData[0]["COSTE_TOTAL"]+boletaData[1 ]["COSTE_TOTAL"]+boletaData[2]["COSTE_TOTAL"] : ""}</div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex pl-36 pt-8">
                <div onClick={()=> handleReturn()} className="mr-auto select-none bg-green-500 hover:bg-green-600 px-4 py-2 text-white font-bold rounded-sm">Volver</div>
            </div>
            
            


            
        </div>
    );
}

export default Boleta;
