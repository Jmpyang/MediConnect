'use strict';
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    specialty: { type: String, required: true, trim: true },
    bio: { type: String, trim: true }
  },
  { timestamps: true }
);

DoctorSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

DoctorSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    return ret;
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);

