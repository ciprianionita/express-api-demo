# Patient API

This repository contains the source code for a simple RESTful API built with Express.js and a SQLite database for managing patient data. You can use this API to retrieve, add, update, and delete patient information.

## Endpoints

The API exposes the following endpoints:

-   **`GET /patients`**: Retrieves a list of all patients.

    -   **Response Body:** An array of patient objects.
    -   **Example Response:**
        ```json
        [
            {
                "id": 1,
                "name": "Ion",
                "surname": "Popescu",
                "cnp": "1234567890123"
            },
            {
                "id": 2,
                "name": "Maria",
                "surname": "Ionescu",
                "cnp": "9876543210987"
            }
        ]
        ```

-   **`POST /patients`**: Adds a new patient to the database.

    -   **Request Body:** A JSON object containing the patient's information.
    -   **Example Request Body:**
        ```json
        {
            "name": "Gheorghe",
            "surname": "Vasile",
            "cnp": "1112223334445"
        }
        ```

-   **`DELETE /patient/:id`**: Removes a patient with the specified `id`.

    -   **Path Parameter:**
        -   `id`: The unique identifier of the patient to be deleted.

-   **`PUT /patient/:id`**: Updates the data of a patient with the specified `id`.
    -   **Path Parameter:**
        -   `id`: The unique identifier of the patient to be updated.
    -   **Request Body:** A JSON object containing the updated patient information. You only need to include the fields you want to update.
    -   **Example Request Body:**
        ```json
        {
            "name": "Ioan",
            "surname": "Popescu"
        }
        ```

## Data Structure

Each patient object in the API follows this structure:

```json
{
  "id": <integer>,
  "name": "<string>",
  "surname": "<string>",
  "cnp": "<string, 13 characters>"
}
```

## Installation

To run this API locally, you will need to have Node.js and npm installed on your machine.

1. Clone the repository:

```sh
git clone <repository_url>
cd <repository_name>
```

2. Install dependencies:

```sh
npm install
```

3. Start the server:

```sh
npm run dev
```

The API server will start on http://localhost:3000.

## Usage

You can use tools like curl, Postman, or Insomnia to interact with the API endpoints.

### Testing with Postman

Here are some examples of how you can test the API endpoints using Postman:

**1. Get all patients (GET /patients)**

-   Open Postman and create a new request.
-   Select the GET method.
-   Enter the request URL: http://localhost:3000/patients
-   Click Send.
-   Expected response: A JSON array of patient objects (as shown in the "Endpoints" section).

**2. Add a new patient (POST /patients)**

-   Create a new request in Postman.
-   Select the POST method.
-   Enter the request URL: http://localhost:3000/patients
-   Go to the Body tab and select the raw option.
-   Choose JSON from the dropdown menu.
-   Enter the JSON payload for the new patient:

```json
{
    "name": "Gheorghe",
    "surname": "Vasile",
    "cnp": "1112223334445"
}
```

-   Click Send.
-   Expected Response: A success or error message in JSON format.

**3. Update a patient (PUT /patient/:id)**

-   Create a new request in Postman.
-   Select the PUT method.
-   Enter the request URL, replacing :id with the ID of the patient you want to update (e.g., http://localhost:3000/patient/1).
-   Go to the Body tab and select the raw option.
-   Choose JSON from the dropdown menu.
-   Enter the JSON payload with the fields you want to update:

```json
{
    "name": "Ioan",
    "surname": "Popescu"
}
```

-   Click Send.
-   Expected Response: A success or error message in JSON format.

**4. Delete a Patient (DELETE /patient/:id)**

-   Create a new request in Postman.
-   Select the DELETE method.
-   Enter the request URL, replacing :id with the ID of a patient you want to delete (e.g., http://localhost:3000/patient/3).
-   Click Send.
-   Expected Response: A success or error message in JSON format.
