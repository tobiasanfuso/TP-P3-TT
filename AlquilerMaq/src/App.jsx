import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FormLogin from './components/auth/FormLogin'
import FormRegister from './components/auth/FormRegister';
import MainScreen from './components/dashboard/MainSceen'
import NotFound from './components/dashboard/NotFound';
import AdminPanel from './components/dashboard/AdminPanel';



function App() {
  const ProtectedRoute = ({ isSignedIn }) => {
    if (!isSignedIn) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  }
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogIn = () => {
    setLoggedIn(true);
  }
  const handleLogOut = () => {
    setLoggedIn(false);
    setUser(null);
  }
  

  return (
    <div className="App">
      <BrowserRouter>

      <Routes>
  <Route path="/" element={<Navigate to="/login" />} />
  <Route path="/login" element={<FormLogin onLogin={handleLogIn} setUser={setUser} />} />
  <Route path="/register" element={<FormRegister />} />
  <Route element={<ProtectedRoute isSignedIn={loggedIn} />}>
    <Route path="/main" element={<MainScreen user={user} setUser={setUser} logOut={handleLogOut} />} />
    {user?.role === "sysadmin" && (
    <Route path="/panel-de-control" element={<AdminPanel user={user} />} />
    )}
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>

      </BrowserRouter>
    </div>
  );
}

export default App

