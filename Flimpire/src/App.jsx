import { useState } from 'react';
import Log_Page from './components/Log_Page_Components/Log_Page';
import Welcome from './components/Movies_Page_Components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/Movies_Page_Components/HomePage';
import Contact from './components/Movies_Page_Components/Contact';
import ProfilePage from './components/Movies_Page_Components/ProfilePage';
import Settings from './components/Movies_Page_Components/NavigationsPage/SettingsPages/Settings';
import { NotificationsSettings, AccountsSettings,MailSettings,GeneralSettings,CalendarSettings,PeopleSettings,CopilotSettings } from './components/Movies_Page_Components/NavigationsPage/SettingsPages/SettingsPages';

function App() {
  return (
    <Routes>
      <Route path="/" element={< Log_Page />}></Route>
      <Route path="/movies" element={< Welcome />}>
        <Route index element={<HomePage />} />
        <Route path='contact' element={<Contact />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path="settings" element={<Settings />}>
          <Route index element={<NotificationsSettings />} />
          <Route path="account" element={<AccountsSettings />} />
          <Route path="general" element={<GeneralSettings />} />
          <Route path="mail" element={<MailSettings />} />
          <Route path="calendar" element={<CalendarSettings />} />
          <Route path="people" element={<PeopleSettings />} />
          <Route path="copilot" element={<CopilotSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;