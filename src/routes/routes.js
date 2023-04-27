import express from "express";
import { Users, Doctors } from "../models/models.js";
import generateTimeSlots from "../services/timestamp.js";

const router = express.Router();

router.get('/users', async (req, res) => {
  Users.find()
  .then((users) => {
      res.status(201).json(users);
  })
  .catch((error) => {
      res.status(500).send('Error ' + error);
  })
});

router.post('/users', async (req, res) => {
  try {
    const { phone, name, appointments } = req.body;

    const existingUser = await Users.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new Users({  phone, name, appointments });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message || err });
  }
});

router.get('/doctors', async (req, res) => {
  Doctors.find()
  .then((doctors) => {
      res.status(201).json(doctors);
  })
  .catch((error) => {
      res.status(500).send('Error ' + error);
  })
});

router.post('/doctors', async (req, res) => {
  try {
    const { name, spec } = req.body;

    const existingDoctor = await Doctors.findOne({ name });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }
    
    const slots = generateTimeSlots(9, 17);
    const newDoctor = new Doctors({ name, spec, slots });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message || err });
  }
});

router.post('/appointments', async (req, res) => {
  const { user_id, doctor_id, slot } = req.body;

  try {
    // Check if the user and doctor exist
    const user = await Users.findById(user_id);
    const doctor = await Doctors.findById(doctor_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if the slot is available for the doctor
    const slotAvailable = doctor.slots.includes(slot);
    if (!slotAvailable) {
      return res.status(400).json({ message: 'Slot not available' });
    }

    // Update the doctor's slots by removing the booked slot
    doctor.slots = doctor.slots.filter(s => s !== slot);
    await doctor.save();

    // Update the user's appointments with the new appointment information
    user.appointments.push({ doctor: doctor_id, slot });
    await user.save();

    const appointmentDate = new Date(slot);
    const oneDayBefore = new Date(appointmentDate.getTime() - (24 * 60 * 60 * 1000)).toISOString();
    const twoHoursBefore = new Date(appointmentDate.getTime() - (2 * 60 * 60 * 1000)).toISOString();

    const newAppointment = new Appointment({
      user: user_id,
      doctor: doctor_id,
      appointmentTime: slot,
      notificationTime: {
        oneDayBefore,
        twoHoursBefore,
      },
    });

    await newAppointment.save();
    res.status(200).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message || err });
  }
});

export default router;
