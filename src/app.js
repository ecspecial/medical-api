import express from "express";
import mongoose from "mongoose";
import { UserModel, DoctorModel } from "./models/models.js";

const app = express();
const PORT = process.env.port || 3000;

mongoose.connect('mongodb+srv://testing:KAuoRdRk3u5ZLFCe@medapi.iqw3a70.mongodb.net/MedApi?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
  })
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.get('/', (req, res) => {
    res.send('Hello, this is a simple Medical API used to create appointments!');
});

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});