import { useState } from 'react';
import Log_Page from './components/Log_Page_Components/Log_Page';
import Welcome from './components/Movies_Page_Components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {  Routes, Route } from 'react-router-dom';
import { HomePage } from './components/Movies_Page_Components/HomePage';
import Contact from './components/Movies_Page_Components/Contact';
import ProfilePage from './components/Movies_Page_Components/ProfilePage';
function App() {
  const [count, setCount] = useState(0);

  return (
      <Routes>
        <Route path="/" element={< Log_Page />}></Route>
        <Route path="/movies" element={< Welcome />}>
          <Route index element={<HomePage />}/>
          <Route path='contact' element={<Contact />} />
          <Route path='profile' element={<ProfilePage />} />
        </Route>
      </Routes>
  );
}

export default App;
