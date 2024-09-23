
# Meter Reading Application

## Overview

The **Meter Reading Application** allows users to submit their meter readings along with the reading date and the name of the person submitting the reading. The application consists of a **React frontend** and an **Express.js backend**, and communicates between the two via a REST API.

### Table of Contents

1. [Prerequisites](#prerequisites)
2. [Technologies Used](#technologies-used)
3. [Project Setup](#project-setup)
   - [Clone the Repository](#clone-the-repository)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
4. [Running the Application Locally](#running-the-application-locally)
   - [Running the Backend](#running-the-backend)
   - [Running the Frontend](#running-the-frontend)
5. [Testing the Application](#testing-the-application)
6. [Troubleshooting and Common Issues](#troubleshooting-and-common-issues)

---

## Prerequisites

Before starting, ensure that you have the following installed:

- **Node.js** (Latest LTS): [Download Here](https://nodejs.org/en/)
- **npm** (Installed with Node.js)
- **Git**: [Download Here](https://git-scm.com/downloads)
- **Postman** or **cURL** for API testing (Optional)

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **HTTP Client**: Axios

---

## Project Setup

### Clone the Repository

To get started, clone the repository to your local machine:

``` bash
git clone https://github.com/yourusername/meter-reading-app.git
```

Navigate into the project directory:

```bash
cd meter-reading-app
```

### Backend Setup

1. **Navigate to the \`backend\` folder**:

```bash
cd backend
```

2. **Install Backend Dependencies**:

```bash
npm install
```

3. **Run the Backend**:

Start the backend server using \`nodemon\` for auto-reload during development:

```bash
npm run dev
```

If \`nodemon\` is not installed, you can install it globally with:

```bash
npm install -g nodemon
```

Alternatively, you can run the server directly with \`node\`:

```bash
node index.js
```

The backend will run on \`http://localhost:5000\`.

4. **Backend API Example**:

The backend exposes an API endpoint for submitting meter readings. You can test it using Postman or \`cURL\`.

- **POST** \`http://localhost:5000/api/meterreadings\`
- **Sample Request Body**:

```json
{
  "personName": "John Doe",
  "readingDate": "2024-09-22",
  "meterValue": 1234.56
}
```

- **Response**:

```json
{
  "message": "Reading submitted successfully."
}
```

---

### Frontend Setup

1. **Navigate to the \`frontend\` folder**:

```bash
cd frontend
```

2. **Install Frontend Dependencies**:

```bash
npm install
```

3. **Set Up Environment Variables**:

In the \`frontend\` directory, create a \`.env\` file with the following contents to set the backend API URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Run the Frontend**:

Start the React development server:

```bash
npm start
```

The React app will run on \`http://localhost:3000\`.

---

## Running the Application Locally

### Running the Backend

1. Navigate to the \`backend\` directory:

```bash
cd backend
```

2. Run the backend server:

```bash
npm run dev
```

The backend will be available at \`http://localhost:5000\`.

### Running the Frontend

1. Navigate to the \`frontend\` directory:

```bash
cd frontend
```

2. Start the frontend React development server:

```bash
npm start
```

The frontend will be available at \`http://localhost:3000\`.

---

## Testing the Application

### Testing the Frontend

1. Open \`http://localhost:3000\` in your browser.
2. Fill out the form with the following fields:
   - **Person Name**
   - **Reading Date**
   - **Meter Value**
3. Submit the form. You should see a success message indicating the submission of the meter reading.

### Testing the Backend with Postman or cURL

To manually test the backend:

1. Open **Postman** or use **cURL**.
2. Make a \`POST\` request to the backend API:

```bash
POST http://localhost:5000/api/meterreadings
```

3. Include the following JSON in the request body:

```json
{
  "personName": "John Doe",
  "readingDate": "2024-09-22",
  "meterValue": 1234.56
}
```

4. Check the response. It should return:

```json
{
  "message": "Reading submitted successfully."
}
```

---



## Deploying to Azure

### Deploying the Backend to Azure App Service

Azure App Service is a platform-as-a-service (PaaS) that allows you to host your Node.js backend.

1. **Login to Azure CLI**:

   Make sure you are logged into the Azure CLI by running:

   ```bash
   az login
   ```

2. **Create a Resource Group**:

   Create a resource group to organize related Azure resources.

   ```bash
   az group create --name JG_MeterReadingAppGroup --location <your-region>
   ```

3. **Create an App Service Plan**:

   An App Service plan specifies the location, size, and pricing tier of the app.

   ```bash
   az appservice plan create --name MeterReadingAppPlan --resource-group JG_MeterReadingAppGroup --sku FREE
   ```

4. **Create the App Service with Node.js 20-lts**:

   Now, create the app service that will host your Node.js backend:

   ```bash
   az webapp create --resource-group JG_MeterReadingAppGroup --plan MeterReadingAppPlan --name MeterReadingBackend --runtime 'NODE:20lts'
   ```

5. **Deploy to App Service**:

   To deploy the backend, use the following commands:

   ```bash
   cd backend
   git init
   git remote add azure https://<your-app-service-repo-url>.git
   git add .
   git commit -m "Initial commit"
   git push azure master
   ```

6. **Configure Environment Variables**:

   Set up environment variables for your app:

   ```bash
   az webapp config appsettings set --resource-group JG_MeterReadingAppGroup --name MeterReadingBackend --settings "NODE_ENV=production"
   ```

7. **Test the Backend**:

   After the deployment completes, the backend will be available at the URL: `https://<your-app-name>.azurewebsites.net`

---

### Deploying the Frontend to Azure Static Web Apps

Azure Static Web Apps is a service that automatically builds and deploys full-stack web apps to Azure from a GitHub repository.

1. **Push Code to GitHub**:

   Make sure your frontend code is pushed to a GitHub repository.

2. **Create a Static Web App**:

   In the Azure portal, search for **Static Web Apps** and click **Create**.

3. **Connect GitHub Repository**:

   During the creation process, select your GitHub repository and branch (e.g., `main`) for deployment.

4. **Build Configuration**:

   - **App Location**: `/frontend`
   - **API Location**: Leave blank (since your API is already deployed separately)
   - **Output Location**: `/frontend/build`

5. **Deploy**:

   Once the Static Web App is created, Azure will automatically deploy your frontend code from the selected GitHub repository.

6. **Frontend Environment Variables**:

   In the Azure Portal, navigate to **Settings > Configuration** of the Static Web App and set the backend URL as an environment variable:

   ```env
   REACT_APP_API_URL=https://<your-backend-app-name>.azurewebsites.net/api
   ```

7. **Test the Frontend**:

   After deployment, your frontend will be available at the URL: `https://<your-static-web-app-name>.azurestaticapps.net`


---

## Troubleshooting and Common Issues

### Issue 1: \`nodemon\` Not Installed
If \`nodemon\` is not recognized when running \`npm run dev\`, install it globally:

```bash
npm install -g nodemon
```

### Issue 2: CORS Issues
If you encounter CORS issues when submitting from the frontend to the backend, make sure CORS is enabled in the backend:

```javascript
const cors = require('cors');
app.use(cors());
```

### Issue 3: Environment Variables Not Loaded
Ensure that the \`.env\` file is correctly set up in the frontend with the backend API URL:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Summary

By following these instructions, you will be able to run both the backend and frontend of the **Meter Reading Application** locally. You can submit readings through the form on the frontend and receive them on the backend, which can be tested with Postman or cURL.

Feel free to reach out if you encounter any issues or need further assistance!
..