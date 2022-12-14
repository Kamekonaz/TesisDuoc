import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header/Header.jsx';
import LoginView from './Components/LoginView.jsx';
import Home from './Components/Home/Home.jsx';
import ClientSidebar from './Components/Dashboard/ClientSidebar.jsx';
import ReportarAccidente from './Components/Dashboard/ReportarAccidente.jsx';
import Perfil from './Components/Dashboard/Perfil.jsx';
import Contrato from './Components/Dashboard/Contrato.jsx';
import Boleta from './Components/Boleta.jsx';
import SolicitarAsesoria from './Components/Dashboard/SolicitarAsesoria.jsx';
import CasosAsesoria from './Components/Dashboard/CasosAsesoria.jsx';
import Chats from './Components/Dashboard/Chats.jsx';
import ViewActivities from './Components/Dashboard/ViewActividades.jsx';
import Test from './Components/Header/Test.jsx';
import VisualizarPlanes from './Components/Dashboard/VisualizarPlanes.jsx';

import './index.css';
import {
  BrowserRouter,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={
        <Home/>
      }/>
      <Route path="/login" element={
        <LoginView />
      }/>
      <Route path="/boleta" element={
        <Boleta />
      }/>
      <Route path="/dashboard" element={
        <ClientSidebar />
      }/>
      <Route path="/dashboard/dashboardOption0" element={
        <Perfil />
      }/>
      <Route path="/dashboard/dashboardOption1" element={
        <ReportarAccidente />
      }/>
      <Route path="/dashboard/dashboardOption2" element={
        <SolicitarAsesoria />
      }/>
      <Route path="/dashboard/dashboardOption3" element={
        <Contrato />
      }/>
      <Route path="/dashboard/dashboardOption4" element={
        <CasosAsesoria />
      }/>
      <Route path="/dashboard/dashboardOption5" element={
        <ViewActivities />
      }/>
      <Route path="/dashboard/dashboardOption6" element={
        <VisualizarPlanes />
      }/>


    <Route path="/dashboard/dashboardOption4/chat" element={
        <Chats />
      }/>
      

      <Route path="/test" element={
        <Test />
      }/>
      
    </Routes>
  </BrowserRouter>,
);


