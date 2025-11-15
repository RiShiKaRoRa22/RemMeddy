import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/signUp';
import Dashboard from './pages/Dashboard';
import Logs from './pages/Logs';

function RequireAuth({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path='/logs' element={<RequireAuth><Logs /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}
