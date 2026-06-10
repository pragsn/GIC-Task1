import { useEffect, useState } from "react";
import PatientForm from "./components/PatientForm";
import PatientTable from "./components/PatientTable";

import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "./api";

function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [search, setSearch] = useState("");

  const loadPatients = async () => {
    const response = await getPatients();
    setPatients(response.data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleSubmit = async (patientData) => {
    if (selectedPatient) {
      await updatePatient(selectedPatient.id, patientData);
      setSelectedPatient(null);
    } else {
      await createPatient(patientData);
    }

    loadPatients();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await deletePatient(id);
      loadPatients();
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.full_name.toLowerCase().includes(search.toLowerCase()) ||
    patient.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-bg">
      <nav className="navbar">
        <div className="container">
          <h2>Health Prediction Application</h2>
        </div>
      </nav>

      <main className="container main-section">
        

        <PatientForm
          onSubmit={handleSubmit}
          selectedPatient={selectedPatient}
          clearSelected={() => setSelectedPatient(null)}
        />

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by full name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <PatientTable
          patients={filteredPatients}
          onEdit={setSelectedPatient}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;