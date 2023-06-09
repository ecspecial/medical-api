import express from "express";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import { checkAppointments } from "./services/notificationService.js";

// Initializing express application and setting the port
const app = express();
const PORT = process.env.port || 3000;

// Connecting to MongoDB database
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

// Parsing incoming JSON data
app.use(express.json());

// Setting up router for the API endpoints
app.use("/api", router);

// Schedule the task to check appointments every minute
const checkAppointmentsInterval = 60 * 1000;
setInterval(checkAppointments, checkAppointmentsInterval);

// Send default response
app.get('/', (req, res) => {
    res.send('Hello, this is a simple Medical API used to create appointments!');
});

// Listen on server PORT
app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});