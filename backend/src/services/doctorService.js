'use strict';
const Doctor = require('../models/doctor');

async function listDoctors() {
  return Doctor.find().sort({ createdAt: -1 });
}

async function getDoctorById(id) {
  return Doctor.findById(id);
}

async function getDoctorByEmail(email) {
  return Doctor.findOne({ email });
}

async function createDoctor(data) {
  const doctor = new Doctor(data);
  return doctor.save();
}

async function updateDoctor(id, updates) {
  return Doctor.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteDoctor(id) {
  return Doctor.findByIdAndDelete(id);
}

module.exports = {
  listDoctors,
  getDoctorById,
  getDoctorByEmail,
  createDoctor,
  updateDoctor,
  deleteDoctor
};

