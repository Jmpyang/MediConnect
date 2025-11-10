'use strict';
const Appointment = require('../models/appointment');

async function listAppointments(filter = {}) {
  return Appointment.find(filter).populate('patient').populate('doctor').sort({ scheduledAt: -1 });
}

async function getAppointmentById(id) {
  return Appointment.findById(id).populate('patient').populate('doctor');
}

async function createAppointment(data) {
  const appt = new Appointment(data);
  return appt.save();
}

async function updateAppointment(id, updates) {
  return Appointment.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteAppointment(id) {
  return Appointment.findByIdAndDelete(id);
}

module.exports = {
  listAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};

