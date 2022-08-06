import { Routes, Route } from "react-router-dom";
import HabbitsPage from "./pages/habbits";
import ProfilePage from "./pages/profile";

function App() {
  return (<>
    <Routes>
        <Route path="/" element={<HabbitsPage />} />
        <Route path="profile" element={<ProfilePage />} />
    </Routes>
  </>    
  );
}

export default App;
