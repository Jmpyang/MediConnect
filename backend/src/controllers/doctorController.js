'use strict';
const { validationResult } = require('express-validator');
const doctorService = require('../services/doctorService');
const { hashPassword } = require('../utils/auth');

async function index(_req, res, next) {
  try {
    const doctors = await doctorService.listDoctors();
    res.json(doctors);
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
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
    const doctor = await doctorService.createDoctor({ ...rest, passwordHash });
    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const updates = { ...req.body };
    if (updates.password) delete updates.password;
    const doctor = await doctorService.updateDoctor(req.params.id, updates);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    const deleted = await doctorService.deleteDoctor(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Doctor not found' });
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

