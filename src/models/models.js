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
      time: {
        type: String,
        required: true,
      },
      doctorName: {
        type: String,
        required: true,
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

export const UserModel = mongoose.model('User', UserSchema);
export const DoctorModel = mongoose.model('Doctor', DoctorSchema);