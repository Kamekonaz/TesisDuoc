//import './App.css';
import React from "react";
import axios from "axios";
//import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import ClientSidebar from "./ClientSidebar";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import { useEffect } from "react";



function Contrato() {
    const cookies = new Cookies();
    const [contractData, setContractData] = React.useState("");

    React.useEffect(()=>{
        const payForm = document.getElementById('pay-form')
        if (payForm){
            
            payForm.addEventListener('submit', async (e) => {
                e.preventDefault();
        
                const totalAmount = contractData["debt"]
        
                const makers = [
                    {
                        type: "TRANSBANK",
                        code: "597055555536",
                        amount: totalAmount
                    }
                ]
        
                const obj = {
                    makers: makers, 
                    totalAmount: totalAmount,
                    userID: loadUserData()["ID_CUENTA"]
                }
                await axios.post(`http://localhost:3001/pagar`, obj).then((response) => {
                    window.location.href = response.data.data;
                });
            })
        }
        
    },[])

    function loadUserData(){
        const gottenUserData = JSON.parse(localStorage.getItem('userData'))
        return gottenUserData
    }

    async function loadContractData(){
        const data = {
            sessionKey: cookies.get("sessionKey")
        }

        const result = await axios.post('http://localhost:3001/self_contract_info', data)
        console.log(result.data)
        setContractData(result.data)
    }

    React.useMemo(()=>{
        loadContractData()
    }, [])

  return (
    <div className="bg-gray-700 grid" style={{minHeight: "100vh", gridTemplateColumns: "256px 1fr"}}>
        <ClientSidebar/>
        <div className="flex mt-20 bg-gray-100">
            <div className="flex mx-auto mt-20 bg-white rounded-lg shadow-lg border-gray-900" style={{width: "500px", height:"300px"}}>
                {
                    !contractData ?  "" :
                    
                        !(contractData["status"] == 0) ?
                    <div className="flex my-auto mx-auto">
                        <img className="my-auto" style={{width:"60px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/600px-Light_green_check.svg.png" alt="" />
                        <div className="my-auto">Contrato al día</div>
                    </div>
                        :
                    <div className="flex flex-col w-full h-full">
                        <div className="flex mx-auto mt-8">
                            <img className="my-auto" style={{width:"60px"}} src="https://cdn-icons-png.flaticon.com/512/6897/6897039.png" alt="" />
                            <div className="my-auto">Pago de contrato pendiente por ${contractData["debt"]}</div>
                        </div>
                        <form id="pay-form" className="flex">
                            <div className="hidden">
                                <input type="number" defaultValue={contractData["debt"]} min="10" id="totalAmount" placeholder="Monto a pagar" name="totalAmount"/>
                                <div className="flex flex-row mt-2">
                                    <button id="pay-button"
                                        className="mx-auto p-4 bg-orange-300 rounded border border-grey-200 shadow-md hover:bg-orange-500 ">PAGAR?
                                    </button>
                                </div>
                            </div>

                            <button className="mx-auto mt-8 bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-sm select-none" id="pay-button">Pagar</button>
                        </form>

                        <div className="mt-auto ml-auto p-4">
                            Fecha de expiración: {new Date(contractData["contract_info"]["FECHA_TERMINO"]).toLocaleDateString()}
                        </div>
                    </div>
                }
                
            </div>
        </div>
    </div>
    
  );
}

export default Contrato;
