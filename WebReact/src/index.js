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
        <ClientSidebar />
      }/>
      <Route path="/dashboard/dashboardOption3" element={
        <Contrato />
      }/>
      
    </Routes>
  </BrowserRouter>,
);


