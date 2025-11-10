'use strict';
const { validationResult } = require('express-validator');
const apptService = require('../services/appointmentService');

async function index(req, res, next) {
  try {
    const filter = {};
    if (req.query.patient) filter.patient = req.query.patient;
    if (req.query.doctor) filter.doctor = req.query.doctor;
    if (req.query.status) filter.status = req.query.status;
    const appts = await apptService.listAppointments(filter);
    res.json(appts);
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const appt = await apptService.getAppointmentById(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appt);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const appt = await apptService.createAppointment(req.body);
    res.status(201).json(appt);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const appt = await apptService.updateAppointment(req.params.id, req.body);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appt);
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    const deleted = await apptService.deleteAppointment(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Appointment not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};

