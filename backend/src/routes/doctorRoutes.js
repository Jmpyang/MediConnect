'use strict';
const router = require('express').Router();
const { body } = require('express-validator');
const doctorController = require('../controllers/doctorController');
const { requireAuth } = require('../utils/auth');

const createValidation = [
  body('firstName').isString().trim().notEmpty(),
  body('lastName').isString().trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('specialty').isString().trim().notEmpty(),
  body('password').isLength({ min: 6 })
];

router.get('/', requireAuth, doctorController.index);
router.get('/:id', requireAuth, doctorController.show);
router.post('/', createValidation, doctorController.create);
router.put('/:id', requireAuth, doctorController.update);
router.delete('/:id', requireAuth, doctorController.destroy);

module.exports = router;

