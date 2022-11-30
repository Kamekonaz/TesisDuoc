import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';
import "./Boleta.css"


function Boleta() {


    return (
        <div className="Boleta">
            <div className="titulo">No mas Accidentes</div>

                <div className="rectangulo "> 
                    <div className="rutboleta"> R.U.T: 77.893.888-4  </div>
                    <div className="boletelectronica"> BOLETA  ELECTRONICA </div>
                    <div className="numeroboleta">N°1745</div>
                </div> 

                <div className="s-i-i">
                    <div>S.I.I DIRECCION REGIONAL SANTIAGO CENTRO  </div>
                    <div>Fecha de Emision      28-11-2022</div>
                </div>
                
                <div className="empresa"></div>
                <div className="tituloempresa">  No mas Accidentes </div>
                <div className="Datoempresa">

                    <div className="datoboleta">
                        <div className="titulodato">Direccion</div>
                        <div>Ahumada 879</div>
                    </div>

                    <div className="datoboleta">
                        <div className="titulodato">Comuna</div>
                        <div>Santiago</div>
                    </div>  
                    
                    <div className="datoboleta">
                        <div className="titulodato">Ciudad</div>
                        <div>Santiago</div>
                    </div> 

                    <div className="datoboleta">
                        <div className="titulodato">Telefono</div>
                        <div>224534527</div>
                    </div>  
                    <div className="datoboleta">
                        <div className="titulodato">Correo</div>
                        <div>Max.Aranguiz@gmail.com</div>        
                    </div>
                </div>
                <div className="empresa2"> INFORMACION DEL CLIENTE </div>
                <div className="rectangulo2" >
                    <div> 
                        <div className="datoboleta2">
                            <div className="titulodato2">Empresa</div>
                            <div>EMPRESA SADEX  </div>
                            
                        </div>
                        <div className="datoboleta2">
                            <div className="titulodato2">RUT</div>
                            <div>76.255.139-8 </div>
                            
                        </div>
                        <div className="datoboleta2">
                            <div className="titulodato2">Correo</div>
                            <div>Mic@Sadex.com</div>
                            
                        </div>
                    </div>
                    <div>
                        <div className="datoboleta2">
                            <div className="titulodato2">Direccion</div>
                            <div>AV.Manquehue sur 31  </div>
                        </div>
                        <div className="datoboleta2">
                            <div className="titulodato2">Comuna</div>
                            <div> Las Condes</div>
                        </div>
                        <div className="datoboleta2">
                            <div className="titulodato2">Ciudad</div>
                            <div> Santiago</div>
                        </div>
                    </div>

                </div>
                <div className="empresa3"> Detalle de Pagos    </div>
                <div className="rectangulo3" >
                    <div className="cabeceras">
                        <div className="columnacabeceras">Fecha</div>
                        <div className="columnacabeceras">Monto</div>
                        <div className="columnacabeceras">Medio de Pago</div>
                        <div className="columnacabeceras">Interes</div>
                        <div className="columnacabeceras">Dcto</div>
                    </div>

                    <div className="filas">
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        
                    </div>
                    <div className="filas">
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        
                    </div>
                    <div className="filas">
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        
                    </div>
                    <div className="filas">
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        <div className="columnafila"> </div>
                        
                    </div>

                </div>
    
            <div className="contenedormonto">
                <div>
                    <div className="imagen-1"></div>
                </div>
                <div className="flex justify-center items-center"> 

                    <div className="rectangulo5">
                    <div className="cabeceras2"></div>
                    <div className="filas2">Monto Intereses 
                        <div className="signos">$</div>
                    <div className="montopago">15.000</div>
                    </div>
                    <div className="filas2">Monto Pagado 
                        <div className="signos">$</div>
                        <div className="montopago">50.000</div>
                    </div>

                    </div>
                </div>
            </div>
            


            
        </div>
    );
}

export default Boleta;
