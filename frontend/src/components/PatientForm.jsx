import { useEffect, useState } from "react";

function PatientForm({ onSubmit, selectedPatient, clearSelected }) {
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    email: "",
    glucose: "",
    haemoglobin: "",
    cholesterol: "",
  });

  useEffect(() => {
    if (selectedPatient) {
      setFormData({
        full_name: selectedPatient.full_name,
        date_of_birth: selectedPatient.date_of_birth,
        email: selectedPatient.email,
        glucose: selectedPatient.glucose,
        haemoglobin: selectedPatient.haemoglobin,
        cholesterol: selectedPatient.cholesterol,
      });
    }
  }, [selectedPatient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (new Date(formData.date_of_birth) > new Date()) {
      alert("Date of birth cannot be a future date.");
      return false;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (
      isNaN(formData.glucose) ||
      isNaN(formData.haemoglobin) ||
      isNaN(formData.cholesterol)
    ) {
      alert("Blood test values must be numeric.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      ...formData,
      glucose: Number(formData.glucose),
      haemoglobin: Number(formData.haemoglobin),
      cholesterol: Number(formData.cholesterol),
    });

    setFormData({
      full_name: "",
      date_of_birth: "",
      email: "",
      glucose: "",
      haemoglobin: "",
      cholesterol: "",
    });
  };

  return (
    <section className="form-card">
      <h3>{selectedPatient ? "Update Patient Record" : "Add Patient Record"}</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Glucose</label>
            <input
              type="number"
              name="glucose"
              value={formData.glucose}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Haemoglobin</label>
            <input
              type="number"
              step="0.1"
              name="haemoglobin"
              value={formData.haemoglobin}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Cholesterol</label>
            <input
              type="number"
              name="cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="button-row">
          <button type="submit" className="primary-btn">
            {selectedPatient ? "Update Record" : "Save Record"}
          </button>

          {selectedPatient && (
            <button type="button" className="secondary-btn" onClick={clearSelected}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default PatientForm;