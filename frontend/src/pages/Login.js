import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [role, setRole] = useState("patient");

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [spec, setSpec] = useState("");

  const register = async () => {
    if (role === "patient") {
      await API.post("/patients", {
        name: name,
        id: id,
      });
    } else {
      await API.post("/doctors", {
        name: name,
        id: id,
        specialization: spec,
      });
    }

    alert("Stored in DB ✅");
  };

  return (
    <div>
      <h2>Login / Register</h2>

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="ID" onChange={(e) => setId(e.target.value)} />

      {role === "doctor" && (
        <input
          placeholder="Specialization"
          onChange={(e) => setSpec(e.target.value)}
        />
      )}

      <button onClick={register}>Submit</button>
    </div>
  );
}