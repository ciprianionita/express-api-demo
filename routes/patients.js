import express from "express";
import bodyParser from "body-parser";
import db from "../database/database.js";
import validation from "../utils/validation.js";

// Create a new router instance and use the body-parser middleware
const router = express.Router();
router.use(bodyParser.json());

// List all patients data
router.get("/patients", (req, res) => {
    // SQL query to select all data from patients table
    const sql = "SELECT * FROM patients";

    // Array to store the data
    let data = [];

    try {
        db.all(sql, [], (err, rows) => {
            // Check for errors
            if (err) {
                throw err;
            }

            // Loop through each row and push the data into the array
            rows.forEach((row) => {
                data.push({
                    id: row.id,
                    name: row.name,
                    surname: row.surname,
                    cnp: row.cnp,
                });
            });

            // Send the data as a JSON response
            res.status(200).json(data);
        });
    } catch (err) {
        console.log(err.message);
        // If there is an error, send a 500 status code and an error message
        res.status(500).json({
            message: "Error retrieving patients data",
        });
    }
});

// Add a new patient data
router.post("/patients", (req, res) => {
    // Get the new patient data from the request body
    const newPatientData = req.body;

    // Validate the new patient data
    validation(res, newPatientData);

    // Check if the response has already been sent and return if it has
    if (res.headersSent) {
        return;
    }

    // SQL query to insert new patient data into the patients table
    const sql = `INSERT INTO patients (name, surname, cnp) VALUES (?, ?, ?)`;

    // Variable to store the ID of the newly inserted row
    let newID;

    try {
        // Execute the SQL query to insert the new patient data
        db.run(
            sql,
            [newPatientData.name, newPatientData.surname, newPatientData.cnp],
            function (err) {
                // Check for errors
                if (err) {
                    throw err;
                }

                // Get the ID of the newly inserted row
                newID = this.lastID;

                // Send a success response
                res.status(201).json({
                    message: "Patient added successfully",
                });
            }
        );
    } catch (err) {
        console.log(err.message);
        // If there is an error, send a 500 status code and an error message
        res.status(500).json({
            message: "Error adding patient data",
        });
    }
});

export default router;
