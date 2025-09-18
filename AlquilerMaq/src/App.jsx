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

import MainScreen from "./components/dashboar/Mainscren";
import NotFound from "./components/dashboar/NotFound";
import AdminPanel from "./components/dashboar/AdminPanel";

function App() {
  const ProtectedRoute = ({ isSignedIn }) => {
    if (!isSignedIn) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  };
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
          <Route element={<ProtectedRoute isSignedIn={loggedIn} />}>
            <Route
              path="/main"
              element={
                <MainScreen
                  user={user}
                  setUser={setUser}
                  logOut={handleLogOut}
                />
              }
            />
            {user?.role === "sysadmin" && (
              <Route
                path="/panel-de-control"
                element={<AdminPanel user={user} />}
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
