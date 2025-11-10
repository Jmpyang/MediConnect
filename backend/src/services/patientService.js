'use strict';
const Patient = require('../models/patient');

async function listPatients() {
  return Patient.find().sort({ createdAt: -1 });
}

async function getPatientById(id) {
  return Patient.findById(id);
}

async function getPatientByEmail(email) {
  return Patient.findOne({ email });
}

async function createPatient(data) {
  const patient = new Patient(data);
  return patient.save();
}

async function updatePatient(id, updates) {
  return Patient.findByIdAndUpdate(id, updates, { new: true });
}

async function deletePatient(id) {
  return Patient.findByIdAndDelete(id);
}

module.exports = {
  listPatients,
  getPatientById,
  getPatientByEmail,
  createPatient,
  updatePatient,
  deletePatient
};

