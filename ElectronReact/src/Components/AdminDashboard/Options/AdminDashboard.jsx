
import React from "react";
import AdminSidebar from "../AdminSidebar";
import Cookies from 'universal-cookie';
import axios from "axios";
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function AdminDashboard() {
    const cookies = new Cookies()
    const [renderBarChart, setRenderBarChart] = React.useState()
    const [gainsChart, setGainsChart] = React.useState()

    async function getPaymentData(){
        const data ={
            sessionKey: cookies.get("appsessionKey")
        }
        const usersList = await axios.post('http://localhost:3001/getClientsWithContract', data)
        const toUseData = usersList.data.filter(user => user["ID_ESTADO_CONTRATO"] !== 3)
        const paidContractCount = toUseData.filter(user  => user["ID_ESTADO_CONTRATO"] === 1).length
        const unpaidContractCount = toUseData.filter(user  => user["ID_ESTADO_CONTRATO"] === 2).length


        //console.log(toUseData)
        const chartData = [
            { name: "Al día", Cantidad: paidContractCount },
            { name: "Pendientes", Cantidad: unpaidContractCount },
        ]

        setRenderBarChart(
            <div className="flex flex-col pt-6 pl-6" style={{width: "fit-content"}}>   
                <div className="bg-black h-10 rounded-t-lg text-white font-bold pt-2 pl-2">Estado de deudas por cliente</div>
                <BarChart width={600} className="bg-white rounded-b-lg shadow-lg" height={300} data={chartData}>
                    <XAxis dataKey="name" stroke="#000" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#000" strokeDasharray="5 5" />
                    <Bar dataKey="Cantidad" fill="#587858" barSize={30} />
                </BarChart>
            </div>
            
        );



    }

    async function getActivitiesList(){
        const data ={
            sessionKey: cookies.get("appsessionKey"),
        }
        const activities = await axios.post('http://localhost:3001/listActivities', data)
        console.log(activities.data)

        
        return;
    }

    async function getDayPaymentData(){
        const data ={
            sessionKey: cookies.get("appsessionKey")
        }
        const usersList = await axios.post('http://localhost:3001/getPayments', data)
        const toUseData = usersList.data.filter(user => isToday(new Date(user["FECHA_PAGO"]))  === true)
        // const paidContractCount = toUseData.filter(user  => user["ID_ESTADO_CONTRATO"] === 1).length
        // const unpaidContractCount = toUseData.filter(user  => user["ID_ESTADO_CONTRATO"] === 2).length

        const montoTotal = toUseData.map(item => item.MONTO).reduce((prev, next) => prev + next)
        const cantidadPagos = toUseData.length
   
        setGainsChart(
            <div className="bg-white ml-6 mt-12 rounded-lg shadow-lg flex pl-2" style={{height: "120px", width: "600px"}}>
                <div className="flex flex-col justify-center mr-auto pl-10">
                    <div className="text-black text-xl">Ganancias del día</div>
                    <div className={`text-3xl flex ${cantidadPagos > 0 ? "text-green-500" : "text-red-500"}`}>
                        <div className="mx-auto">${cantidadPagos > 0 ? montoTotal : 0}</div>
                    </div>
                </div>
                
                <div className="flex flex-col justify-center ml-auto pr-10">
                    <div className="text-black text-xl">Cantidad de pagos</div>
                    <div className={`text-3xl flex ${cantidadPagos > 0 ? "text-green-500" : "text-red-500"}`}>
                        <div className="mx-auto">{cantidadPagos}</div>
                    </div>
                </div>
            </div>

            
        );



    }

    
      
    React.useEffect(()=>{
        getPaymentData()
        getDayPaymentData()
        getActivitiesList()
    },[])
    

    

    return (
        <div style={{height: '100vh'}} >
            <AdminSidebar/>
            <div id="viewContent border" className="h-full ml-64">
                <div className="dashboardOptionsBody bg-gray-700" style={{height: "100vh"}}>
                    <div className="flex flex-col">
                        {renderBarChart}
                        {gainsChart}
                        
                    </div>
                    
                </div>
            </div>
        </div>
        
    );
}

export default AdminDashboard;





function isToday(date) {
    const today = new Date();
  
    if (today.toDateString() === date.toDateString()) {
      return true;
    }
  
    return false;
  }