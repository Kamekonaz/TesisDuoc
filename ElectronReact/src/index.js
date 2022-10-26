import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginView from './Components/LoginView/LoginView';
import AdminSidebar from './Components/AdminDashboard/AdminSidebar';
import ProfessionalSidebar from './Components/ProfessionalDashboard/ProfessionalSidebar';
import AdminProfesionales from './Components/AdminDashboard/Options/AdminProfesionales';
import AdminClientes from './Components/AdminDashboard/Options/AdminClientes';
import EditUser from './Components/AdminDashboard/EditUser';
import CreateUser from './Components/AdminDashboard/CreateUser';
import CrearCapacitacion from './Components/ProfessionalDashboard/Options/CrearCapacitacion';


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
        <LoginView />
      }/>
      <Route path="/professionalDashboard" element={
        <ProfessionalSidebar/>
      } />
      <Route path="/professionalDashboard/dashboardOption0" element={
        <ProfessionalSidebar/>
      } />
      <Route path="/professionalDashboard/dashboardOption1" element={
        <CrearCapacitacion/>
      } />
      <Route path="/professionalDashboard/dashboardOption2" element={
        <ProfessionalSidebar/>
      } />
      <Route path="/professionalDashboard/dashboardOption3" element={
        <ProfessionalSidebar/>
      } />
      <Route path="/professionalDashboard/dashboardOption4" element={
        <ProfessionalSidebar/>
      } />
      <Route path="/professionalDashboard/dashboardOption5" element={
        <ProfessionalSidebar/>
      } />
      <Route path="/professionalDashboard/dashboardOption6" element={
        <ProfessionalSidebar/>
      } />
      <Route path="/professionalDashboard/dashboardOption7" element={
        <ProfessionalSidebar/>
      } />
      <Route path="/professionalDashboard/dashboardOption8" element={
        <ProfessionalSidebar/>
      } />
      <Route path="/adminDashboard" element={
        <AdminSidebar/>
      } />
      <Route path="/adminDashboard/dashboardOption0" element={
        <AdminProfesionales/>
      } />
      <Route path="/adminDashboard/dashboardOption1" element={
        <AdminProfesionales/>
      } />
      <Route path="/adminDashboard/dashboardOption2" element={
        <AdminClientes/>
      } />
      <Route path="/adminDashboard/dashboardOption3" element={
        <AdminSidebar/>
      } />
      <Route path="/adminDashboard/dashboardOption4" element={
        <AdminSidebar/>
      } />
      <Route path="/adminDashboard/dashboardOption5" element={
        <AdminSidebar/>
      } />
      <Route path="/adminDashboard/dashboardOption6" element={
        <AdminSidebar/>
      } />
      <Route path="/adminDashboard/dashboardOption7" element={
        <AdminSidebar/>
      } />
      <Route path="/adminDashboard/dashboardOption8" element={
        <AdminSidebar/>
      } />

      <Route path="/editUser" element={
        <EditUser/>
      } />

      <Route path="/createUser" element={
        <CreateUser/>
      } />
    </Routes>
  </BrowserRouter>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals