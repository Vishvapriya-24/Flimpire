import React, { useState, useEffect, createContext } from "react";
import Log_Page from "./components/Log_Page_Components/Log_Page";
import Welcome from "./components/Movies_Page_Components/Welcome";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage  from "./components/Movies_Page_Components/HomePage";
import Contact from "./components/Movies_Page_Components/Contact";
import ProfilePage from "./components/Movies_Page_Components/ProfilePage";
import Settings from "./components/Movies_Page_Components/NavigationsPage/SettingsPages/Settings";
import {
  NotificationsSettings,
  AccountsSettings,
  MailSettings,
  GeneralSettings,
  CalendarSettings,
  PeopleSettings,
  CopilotSettings,
} from "./components/Movies_Page_Components/NavigationsPage/SettingsPages/SettingsPages";
import Carousel from "./components/Movies_Page_Components/Carousel";
import Movies from "./components/Movies_Page_Components/Movies";
import MovieDetails from "./components/Movies_Page_Components/MovieDetails";
import Series from "./components/Series_Page_Components/Series";
import SeriesDetails from "./components/Series_Page_Components/SeriesDetails";
import { MoviePage } from "./components/Movies_Page_Components/MoviePage";

// ✅ Create context outside of component
export const MyContext = createContext();

function App() {
  return (
    // ✅ Wrap everything in the Provider
  
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/home" element={<Welcome />}>
          <Route path="movies" element={<MoviePage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="series" element={<Series />} />
          <Route path="series/seriesDetails" element={<SeriesDetails />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="movies/movieDetails" element={<MovieDetails />} />

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
