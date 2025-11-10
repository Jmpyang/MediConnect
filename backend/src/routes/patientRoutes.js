'use strict';
const router = require('express').Router();
const { body } = require('express-validator');
const patientController = require('../controllers/patientController');
const { requireAuth } = require('../utils/auth');

const createValidation = [
  body('firstName').isString().trim().notEmpty(),
  body('lastName').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
];

router.get('/', requireAuth, patientController.index);
router.get('/:id', requireAuth, patientController.show);
router.post('/', createValidation, patientController.create);
router.put('/:id', requireAuth, patientController.update);
router.delete('/:id', requireAuth, patientController.destroy);

module.exports = router;

