// Validate new or updated patient data
const validation = (res, patientData) => {
    // Required fields and their formats
    const requiredFields = {
        name: /^[a-zA-Z]+$/,
        surname: /^[a-zA-Z]+$/,
        cnp: /^\d{13}$/, // 13 numbers
    };

    // Arrays to store missing, unknown, and incorrect fields
    const missingFields = [];
    const unknownFields = [];
    const incorrectFields = [];

    // Loop through the required fields array
    for (const field in requiredFields) {
        // If the field does not match, add it to the missing fields array
        if (!(field in patientData)) {
            missingFields.push(field);
        }
    }

    // Loop through each field in the new patient data object
    for (const field in patientData) {
        // Check if the field exists in the required fields object
        if (!(field in requiredFields)) {
            // If the field does not match, add it to the unknown fields array
            unknownFields.push(field);
        }

        // Check if the field exists in the required fields object
        if (requiredFields[field] && requiredFields[field] instanceof RegExp) {
            // Check if the field matches the expected format
            if (!requiredFields[field].test(patientData[field])) {
                // If the field does not match, add it to the incorrect fields array
                incorrectFields.push(field);
            }
        }
    }

    // If there are any missing fields, return a 400 error response
    if (missingFields.length > 0) {
        res.status(400).json({
            message: `Required fields: ${missingFields.join(", ")}`,
        });
        return;
    }

    // If there are any unknown fields, return a 400 error response
    if (unknownFields.length > 0) {
        res.status(400).json({
            message: `Unknown fields: ${unknownFields.join(", ")}`,
        });
        return;
    }

    // If there are any incorrect fields, return a 400 error response
    if (incorrectFields.length > 0) {
        res.status(400).json({
            message: `Invalid format for fields: ${incorrectFields.join(", ")}`,
        });
        return;
    }
};

export default validation;
