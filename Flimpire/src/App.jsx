import { useState } from 'react';
import Log_Page from './components/Log_Page';
import HomePage from './components/HomePage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
        <Routes>
          <Route path="/" element={<Log_Page />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
        </Routes>
    </div>
  );
}

export default App;
