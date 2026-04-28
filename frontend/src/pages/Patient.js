import { useEffect, useState } from "react";
import API from "../services/api";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    API.get("/patients").then((res) => setPatients(res.data));
  };

  const addPatient = async () => {
    await API.post("/patients", {
      name,
      email,
    });

    setName("");
    setEmail("");

    fetchPatients();
  };

  const deletePatient = async (id) => {
    await API.delete(`/patients/${id}`);
    fetchPatients();
  };

  return (
    <div className="container">
      <h2>Patients</h2>

      <div className="form">
        <input
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Patient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={addPatient}>Add Patient</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.email}</td>

              <td>
                <button onClick={() => deletePatient(p.id)}>
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