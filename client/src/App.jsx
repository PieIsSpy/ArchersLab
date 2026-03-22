import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "./context/UserContext.jsx";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import { initSession } from "./features/auth/services/authService.js";
import { LoadingSpinner } from "./components/shared";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const onSessionData = (data) => {
    if (!data.isAuth) {
      setUser(null);
      setIsAuth(false);
      setAdmin(false);
      return;
    }
    setUser(data.user);
    setAdmin(data.user?.isAdmin || false);
    setIsAuth(true);
  };

  useEffect(() => {
    setLoading(true);
    initSession()
      .then(onSessionData)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner fullscreen />;

  return (
    <UserContext.Provider value={{ currentUser: user, setUser, setIsAuth, setAdmin, isAdmin, loading }}>
      <AppRoutes
        isAuth={isAuth}
        isAdmin={isAdmin}
        setIsAuth={setIsAuth}
        setAdmin={setAdmin}
        setUser={setUser}
      />
    </UserContext.Provider>
  );
}
