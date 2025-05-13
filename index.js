import express from "express";
import patientsRouter from "./routes/patients.js";
import patientRouter from "./routes/patient.js";

// Create an instance of the app
const app = express();
const port = 3000;

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Patients API!");
});

// Patients route
app.use("/", patientsRouter);

// Patient route
app.use("/", patientRouter);

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server started on port ${port}!`);
});
