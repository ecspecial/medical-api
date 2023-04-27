import express from "express";
import { UserModel, DoctorModel } from "../models/models";

const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    const { phone, name, appointments } = req.body;

    const existingUser = await UserModel.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new UserModel({  phone, name, appointments });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.post('/doctors', async (req, res) => {
  try {
    const { name, spec, slots } = req.body;

    const existingDoctor = await DoctorModel.findOne({ id });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    const newDoctor = new DoctorModel({ name, spec, slots });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;
