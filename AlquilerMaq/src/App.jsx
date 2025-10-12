import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/auth/login/Login";

import MainScreen from "./components/dashboar/mainscren/Mainscren";
import NotFound from "./components/dashboar/notFound/NotFound";
import AdminPanel from "./components/dashboar/adminPanel/AdminPanel";
import UserRegister from "./components/auth/userRegister/UserRegister";
import MainLayout from "./components/layout/mainLayout/MainLayout";
import MyRequests from "./components/myRequests/MyRequests";
import HistoryRequests from "./components/historyRequests/HistoryRequests";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { useContext } from "react";
import { AuthenticationContext } from "./components/service/auth/auth.context";
function App() {
  const { user } = useContext(AuthenticationContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/main" replace /> : <Login />}
          />
          <Route path="/register" element={<UserRegister />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/main"
              element={
                <MainLayout>
                  <MainScreen />
                </MainLayout>
              }
            />
            <Route
              path="/mis-solicitudes"
              element={
                <MainLayout>
                  <MyRequests />
                </MainLayout>
              }
            />

            <Route
              path="/historial-solicitudes"
              element={
                <MainLayout>
                  <HistoryRequests />
                </MainLayout>
              }
            />
            {(user?.role === "sysadmin" || user?.role === "admin") && (
              <Route
                path="/panel-de-control"
                element={
                  <MainLayout>
                    <AdminPanel />
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
