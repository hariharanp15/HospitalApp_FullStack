import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Doctors from "./pages/Doctor";
import Patients from "./pages/Patient";
import Appointments from "./pages/Appointments";
import Upload from "./pages/upload";
import Navbar from "./components/Navbar";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <h1>Hospital DashBoard</h1>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;