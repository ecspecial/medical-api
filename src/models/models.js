import mongoose from "mongoose";


const appointmentValidator = (appointments) => {
  if (appointments.length === 0) {
    return true;
  }

  return appointments.every((appointment) => {
    return (
      appointment.hasOwnProperty("time") &&
      appointment.hasOwnProperty("doctorName")
    );
  });
};

const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  appointments: {
    type: [
      {
        time: String,
        doctorName: String,
      },
    ],
    validate: [appointmentValidator, "Appointments must have time and doctorName"],
  },
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
  slots: [String],
});

// Data format example

// const newUserData = {
//     phone: '+7 926 578 85 14',
//     name: 'Василий',
//   };
  
//   const newDoctorData = {
//     name: 'Анатолий',
//     spec: 'Терапевт',
//     slots: ['date_time', 'date_time'],
//   };

export const Users = mongoose.model('User', UserSchema);
export const Doctors = mongoose.model('Doctor', DoctorSchema);