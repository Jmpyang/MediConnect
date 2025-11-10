'use strict';
const router = require('express').Router();
const { body } = require('express-validator');
const appointmentController = require('../controllers/appointmentController');
const { requireAuth } = require('../utils/auth');

const createValidation = [
  body('patient').isString().notEmpty(),
  body('doctor').isString().notEmpty(),
  body('scheduledAt').isISO8601().toDate()
];

router.get('/', requireAuth, appointmentController.index);
router.get('/:id', requireAuth, appointmentController.show);
router.post('/', requireAuth, createValidation, appointmentController.create);
router.put('/:id', requireAuth, appointmentController.update);
router.delete('/:id', requireAuth, appointmentController.destroy);

module.exports = router;

