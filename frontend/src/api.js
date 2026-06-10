import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getPatients = () => {
  return axios.get(`${API_URL}/patients`);
};

export const createPatient = (patient) => {
  return axios.post(`${API_URL}/patients`, patient);
};

export const updatePatient = (id, patient) => {
  return axios.put(`${API_URL}/patients/${id}`, patient);
};

export const deletePatient = (id) => {
  return axios.delete(`${API_URL}/patients/${id}`);
};