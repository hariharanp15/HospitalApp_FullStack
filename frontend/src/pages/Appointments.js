import { useEffect, useState } from "react";
import API from "../services/api";

export default function Appointments() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [date, setDate] = useState("");
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    loadPatients();
    loadDoctors();
    fetchAppointments();
  }, []);

  // GET PATIENTS
  const loadPatients = async () => {
    try {
      const res = await API.get("/patients");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // GET DOCTORS
  const loadDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // GET APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // BOOK APPOINTMENT
  const book = async () => {
    try {
      if (!patientId || !doctorId || !date) {
        alert("Please fill all fields ❗");
        return;
      }

      await API.post("/appointments", {
        patient_id: parseInt(patientId),
        doctor_id: parseInt(doctorId),
        date: date,
      });

      alert("Appointment Booked ✅");

      // CLEAR FORM
      setPatientId("");
      setDoctorId("");
      setDate("");

      fetchAppointments();

    } catch (err) {
      console.error(err);
      alert("Error while booking ❌");
    }
  };

  // DELETE APPOINTMENT
  const deleteAppointment = async (id) => {
    try {
      await API.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="container">

      <h2>Appointments</h2>

      {/* FORM */}
      <div className="form">

        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        >
          <option value="">Select Patient</option>

          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        >
          <option value="">Select Doctor</option>

          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.specialization})
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={book}>
          Book Appointment
        </button>

      </div>

      {/* TABLE */}
      <h3>All Appointments</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {appointments.map((a) => (
            <tr key={a.id}>

              <td>{a.id}</td>

              <td>{a.patient_name}</td>

              <td>{a.doctor_name}</td>

              <td>{a.date}</td>

              <td>
                <button
                  onClick={() => deleteAppointment(a.id)}
                >
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