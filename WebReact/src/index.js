import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header/Header.js';
import LoginView from './Components/LoginView.js';
import Home from './Components/Home/Home.js';
import ClientSidebar from './Components/Dashboard/ClientSidebar.js';
import ReportarAccidente from './Components/Dashboard/ReportarAccidente.js';

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
      <Route path="/dashboard" element={
        <ClientSidebar />
      }/>
      <Route path="/dashboard/dashboardOption0" element={
        <ClientSidebar />
      }/>
      <Route path="/dashboard/dashboardOption1" element={
        <ReportarAccidente />
      }/>
      <Route path="/dashboard/dashboardOption2" element={
        <ClientSidebar />
      }/>
      <Route path="/dashboard/dashboardOption3" element={
        <ClientSidebar />
      }/>
      
    </Routes>
  </BrowserRouter>,
);


