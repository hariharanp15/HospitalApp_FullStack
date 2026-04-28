import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
  <a href="/">Login</a>
  <a href="/patients">Patients</a>
  <a href="/doctors">Doctors</a>
  <a href="/appointments">Appointments</a>
</div>
  );
}