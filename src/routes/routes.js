import express from "express";
import { Users, Doctors } from "../models/models.js";

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
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.post('/doctors', async (req, res) => {
  try {
    const { name, spec, slots } = req.body;

    const existingDoctor = await Doctors.findOne({ id });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    const newDoctor = new Doctors({ name, spec, slots });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;
