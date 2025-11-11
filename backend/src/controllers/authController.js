'use strict';
const { body, validationResult } = require('express-validator');
const { hashPassword, comparePassword, signToken } = require('../utils/auth');
const patientService = require('../services/patientService');
const doctorService = require('../services/doctorService');

const registerValidation = [
  body('firstName').isString().trim().notEmpty(),
  body('lastName').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('gender').optional().isIn(['male', 'female', 'other'])
];

async function registerPatient(req, res, next) {
  try {
    await Promise.all(registerValidation.map((v) => v.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const exists = await patientService.getPatientByEmail(req.body.email);
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const passwordHash = await hashPassword(req.body.password);
    const patient = await patientService.createPatient({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone || '',
      gender: req.body.gender || 'other',
      passwordHash
    });

    const token = signToken({ sub: patient.id, role: 'patient' });
    res.status(201).json({ user: patient, token });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    await body('email').isEmail().run(req);
    await body('password').isString().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const email = req.body.email;
    const password = req.body.password;

    // Try patient first, then doctor
    let user = await patientService.getPatientByEmail(email);
    let role = 'patient';
    if (!user) {
      user = await doctorService.getDoctorByEmail(email);
      role = 'doctor';
    }
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken({ sub: user.id, role });
    res.json({ user, token, role });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registerPatient,
  login
};

