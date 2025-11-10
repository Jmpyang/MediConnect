'use strict';
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    scheduledAt: { type: Date, required: true },
    reason: { type: String, trim: true },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

AppointmentSchema.index({ doctor: 1, scheduledAt: 1 });
AppointmentSchema.index({ patient: 1, scheduledAt: 1 });

module.exports = mongoose.model('Appointment', AppointmentSchema);

