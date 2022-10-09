import { Routes, Route, useNavigate } from "react-router-dom";
import HabitsPage from "./pages/habits-list-page";
import ProfilePage from "./pages/profile-page";
import HabitDetailPage from "./pages/habit-detail-page";
import HabitsCatalogPage from "./pages/catalog-page";
import ReportsPage from "./pages/reports-page";
import { useEffect } from "react";
import user from "./store/user";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

function App() {

  const navigate = useNavigate();

  useEffect(()=>{
    if (user.data.token && user.data.isLogIn) {
      if (!user.getUserInfo()) {
        navigate('/login')        
      }
    } else {
      navigate('/login')      
    }
  }, [])

  return (<>
    <Routes>
        <Route path="/" element={<HabitsPage />} />
        <Route path="habit/:id" element={<HabitDetailPage />} />
        <Route path="catalog" element={<HabitsCatalogPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
    </Routes>
  </>    
  );
}

export default App;
