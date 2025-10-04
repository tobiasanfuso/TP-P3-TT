import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/auth/login/Login";

import MainScreen from "./components/dashboar/mainscren/Mainscren";
import NotFound from "./components/dashboar/notFound/NotFound";
import AdminPanel from "./components/dashboar/adminPanel/AdminPanel";
import UserRegister from "./components/auth/userRegister/UserRegister";
import MainLayout from "./components/layout/mainLayout/MainLayout";
import MyRequests from "./components/myRequests/MyRequests";
import HistoryRequests from "./components/historyRequests/HistoryRequests";
function App() {
  const ProtectedRoute = ({ isSignedIn }) => {
    if (!isSignedIn) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  };
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  console.log("----USER");
  console.log(user);
  const handleLogIn = () => {
    setLoggedIn(true);
  };
  const handleLogOut = () => {
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<Login onLogin={handleLogIn} setUser={setUser} />}
          />
          <Route path="/register" element={<UserRegister />} />
          <Route element={<ProtectedRoute isSignedIn={loggedIn} />}>
            <Route
              path="/main"
              element={
                <MainLayout user={user} setUser={setUser} logOut={handleLogOut}>
                  <MainScreen user={user} />
                </MainLayout>
              }
            />
            <Route
              path="/mis-solicitudes"
              element={
                <MainLayout user={user} setUser={setUser} logOut={handleLogOut}>
                  <MyRequests />
                </MainLayout>
              }
            />

            <Route
              path="/historial-solicitudes"
              element={
                <MainLayout user={user} setUser={setUser} logOut={handleLogOut}>
                  <HistoryRequests />
                </MainLayout>
              }
            />
            {(user?.role === "sysadmin" || user?.role === "admin") && (
              <Route
                path="/panel-de-control"
                element={
                  <MainLayout
                    user={user}
                    setUser={setUser}
                    logOut={handleLogOut}
                  >
                    <AdminPanel user={user} />
                  </MainLayout>
                }
              />
            )}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
