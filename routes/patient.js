import express from "express";
import bodyParser from "body-parser";
import db from "../database/database.js";
import validation from "../utils/validation.js";

// Create a new router instance and use the body-parser middleware
const router = express.Router();
router.use(bodyParser.json());

// Update a patient by ID
router.put("/patient/:id", (req, res) => {
    // Get the patient ID from the URL
    const id = parseInt(req.params.id);

    // Get the new data from the request body
    const updatedPatient = req.body;

    // Validate the new patient data
    validation(res, updatedPatient);

    // Check if the response has already been sent and return if it has
    if (res.headersSent) {
        return;
    }

    // SQL query to update patient data in the patients table
    const sql = `UPDATE patients SET name = ?, surname = ?, cnp = ? WHERE id = ?`;

    try {
        // Execute the SQL query
        db.run(
            sql,
            [
                updatedPatient.name,
                updatedPatient.surname,
                updatedPatient.cnp,
                id,
            ],
            function (err) {
                // Check for errors
                if (err) {
                    throw err;
                }

                // If no rows were updated, send a 404 error
                if (this.changes === 0) {
                    return res
                        .status(404)
                        .json({ message: "Patient not found" });
                }

                // If a row was updated, send a success message
                if (this.changes === 1) {
                    return res
                        .status(200)
                        .json({ message: "Patient data updated successfully" });
                }
            }
        );
    } catch (err) {
        console.log(err.message);
        // If there is an error, send a 500 status code and an error message
        res.status(500).json({
            message: "Error updating patient data",
        });
    }
});

// Delete a patient by ID
router.delete("/patient/:id", (req, res) => {
    // Get the patient ID from the URL
    const id = parseInt(req.params.id);

    // SQL query to delete a patient from the patients table
    const sql = `DELETE FROM patients WHERE id=?`;

    try {
        // Execute the SQL query
        db.run(sql, [id], function (err) {
            // Check for errors
            if (err) {
                throw err;
            }

            // If no rows were deleted, send a 404 error
            if (this.changes === 0) {
                return res.status(404).json({ message: "Patient not found" });
            }

            // If a row was deleted, send a success message
            if (this.changes === 1) {
                return res
                    .status(200)
                    .json({ message: "Patient deleted successfully" });
            }
        });
    } catch (err) {
        console.log(err.message);
        // If there is an error, send a 500 status code and an error message
        res.status(500).json({
            message: "Error deleting patient data",
        });
    }
});

export default router;
