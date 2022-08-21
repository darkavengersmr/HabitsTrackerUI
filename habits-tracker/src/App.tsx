import { Routes, Route } from "react-router-dom";
import HabitsPage from "./pages/habits-list-page";
import ProfilePage from "./pages/profile-page";
import HabitDetailPage from "./pages/habit-detail-page";
import HabitsCatalogPage from "./pages/catalog-page";
import ReportsPage from "./pages/reports-page";

function App() {
  return (<>
    <Routes>
        <Route path="/" element={<HabitsPage />} />
        <Route path="habit/:id" element={<HabitDetailPage />} />
        <Route path="catalog" element={<HabitsCatalogPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="profile" element={<ProfilePage />} />
    </Routes>
  </>    
  );
}

export default App;
