import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!loggedIn ? <Login onLogin={() => setLoggedIn(true)} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={loggedIn ? <Dashboard onLogout={() => setLoggedIn(false)} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
