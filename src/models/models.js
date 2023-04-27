import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  appointments: [
    {
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
      },
      slot: {
        type: String,
      },
    },
  ],
});

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  spec: {
    type: String,
    required: true,
  },
  slots: {
    type: [String],
  },
});

const AppointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  notificationTime: {
    oneDayBefore: String,
    twoHoursBefore: String,
  },
});


export const Users = mongoose.model('User', UserSchema);
export const Doctors = mongoose.model('Doctor', DoctorSchema);
export const Appointments = mongoose.model('Appointment', AppointmentSchema);
