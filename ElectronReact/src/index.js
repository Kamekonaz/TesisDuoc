import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginView from './Components/LoginView/LoginView';
import AdminSidebar from './Components/AdminDashboard/AdminSidebar';
import AdminProfesionales from './Components/AdminDashboard/Options/AdminProfesionales';
import AdminClientes from './Components/AdminDashboard/Options/AdminClientes';
import EditUser from './Components/AdminDashboard/EditUser';
import CreateUser from './Components/AdminDashboard/CreateUser';
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
      <Route path="/adminDashboard" element={
        <AdminProfesionales/>
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
        <AdminProfesionales/>
      } />
      <Route path="/adminDashboard/dashboardOption4" element={
        <AdminProfesionales/>
      } />
      <Route path="/adminDashboard/dashboardOption5" element={
        <AdminProfesionales/>
      } />
      <Route path="/adminDashboard/dashboardOption6" element={
        <AdminProfesionales/>
      } />
      <Route path="/adminDashboard/dashboardOption7" element={
        <AdminProfesionales/>
      } />
      <Route path="/adminDashboard/dashboardOption8" element={
        <AdminProfesionales/>
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
