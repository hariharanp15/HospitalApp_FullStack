import { useEffect, useState } from "react";
import API from "../services/api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    API.get("/doctors").then((res) => setDoctors(res.data));
  };

  const addDoctor = async () => {
    await API.post("/doctors", {
      name,
      email,
      specialization,
    });

    setName("");
    setEmail("");
    setSpecialization("");

    fetchDoctors();
  };

  const deleteDoctor = async (id) => {
    await API.delete(`/doctors/${id}`);
    fetchDoctors();
  };

  return (
    <div className="container">
      <h2>Doctors</h2>

      <div className="form">
        <input
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Doctor Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />

        <button onClick={addDoctor}>Add Doctor</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.specialization}</td>

              <td>
                <button onClick={() => deleteDoctor(d.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}