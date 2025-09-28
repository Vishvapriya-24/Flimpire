import { useState } from 'react';
import Log_Page from './components/Log_Page_Components/Log_Page';
import Welcome from './components/Movies_Page_Components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import { HomePage } from './components/Movies_Page_Components/HomePage';
import Contact from './components/Movies_Page_Components/Contact';
import ProfilePage from './components/Movies_Page_Components/ProfilePage';
import Settings from './components/Movies_Page_Components/NavigationsPage/SettingsPages/Settings';
import NotificationsSettings from './components/Movies_Page_Components/NavigationsPage/SettingsPages/NotificationsSettings';

function App() {
  return (
      <Routes>
        <Route path="/" element={< Log_Page />}></Route>
        <Route path="/movies" element={< Welcome />}>
          <Route index element={<HomePage />}/>
          <Route path='contact' element={<Contact />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='settings' element={<Settings />}> 
              <Route index element={<NotificationsSettings />} ></Route>
          </Route>
        </Route>
      </Routes>
  );
}

export default App;