import { useState } from 'react';
import Log_Page from './components/Log_Page_Components/Log_Page';
import Movies_Page from './components/Movies_Page_Components/Movies_Page';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={< Log_Page />}></Route>
        <Route path="/movies" element={< Movies_Page />}></Route>
      </Routes>
    </div>
  );
}

export default App;
