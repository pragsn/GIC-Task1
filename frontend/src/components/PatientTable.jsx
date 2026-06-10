function PatientTable({ patients, onEdit, onDelete }) {
  return (
    <section className="table-card">
      <h3>Patient Records</h3>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Date of Birth</th>
              <th>Email Address</th>
              <th>Glucose</th>
              <th>Haemoglobin</th>
              <th>Cholesterol</th>
              <th>AI Remarks</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-msg">
                  No patient records available.
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.full_name}</td>
                  <td>{patient.date_of_birth}</td>
                  <td>{patient.email}</td>
                  <td>{patient.glucose}</td>
                  <td>{patient.haemoglobin}</td>
                  <td>{patient.cholesterol}</td>

                  <td>
                    <span className="remarks-pill" title={patient.remarks}>
                      {patient.remarks}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-icon edit-action"
                        onClick={() => onEdit(patient)}
                        title="Edit Record"
                      >
                        ✏️
                      </button>

                      <button
                        className="action-icon delete-action"
                        onClick={() => onDelete(patient.id)}
                        title="Delete Record"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PatientTable;