'use strict';
const { validationResult } = require('express-validator');
const patientService = require('../services/patientService');
const { hashPassword } = require('../utils/auth');

async function index(_req, res, next) {
  try {
    const patients = await patientService.listPatients();
    res.json(patients);
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { password, ...rest } = req.body;
    const passwordHash = await hashPassword(password);
    const patient = await patientService.createPatient({ ...rest, passwordHash });
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const updates = { ...req.body };
    if (updates.password) delete updates.password; // disallow password change here
    const patient = await patientService.updatePatient(req.params.id, updates);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    const deleted = await patientService.deletePatient(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Patient not found' });
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

