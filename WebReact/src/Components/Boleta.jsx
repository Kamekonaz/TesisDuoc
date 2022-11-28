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
                <div className="Datoempresa">
                    <div className="datoboleta">

                        <div className="titulodato">Direccion</div>
                        <div>Ahumada 879</div>

                    </div>
                    <div className="datoboleta">

                    <div className="titulodato">Comuna</div>
                        <div>Santiago</div>
                    </div>  <div className="datoboleta">

                    <div className="titulodato">Ciudad</div>
                        <div>Santiago</div>
                    </div>  <div className="datoboleta">

                    <div className="titulodato">Telefono</div>
                    <div>224534527</div>

</div>

                </div>
                
        </div>
    );
}

export default Boleta;
