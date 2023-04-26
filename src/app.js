import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.port || 3000;

app.get('/', (req, res) => {
    res.send('Hello, this is a simple Medical API used to create appointments!');
});

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});