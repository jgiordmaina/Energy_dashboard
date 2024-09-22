# Setting Up Local Development Environment for Meter Reading Application

## Table of Contents

1. [Introduction](#1-introduction)
2. [Prerequisites](#2-prerequisites)
3. [Clone the GitHub Repository](#3-clone-the-github-repository)
4. [Setting Up the Backend (Node.js with Express.js)](#4-setting-up-the-backend-nodejs-with-expressjs)
    - [4.1 Navigate to the Backend Directory](#41-navigate-to-the-backend-directory)
    - [4.2 Install Backend Dependencies](#42-install-backend-dependencies)
    - [4.3 Configure Environment Variables](#43-configure-environment-variables)
    - [4.4 Initialize the Database](#44-initialize-the-database)
    - [4.5 Run the Backend Server Locally](#45-run-the-backend-server-locally)
5. [Setting Up the Frontend (React.js)](#5-setting-up-the-frontend-reactjs)
    - [5.1 Navigate to the Frontend Directory](#51-navigate-to-the-frontend-directory)
    - [5.2 Install Frontend Dependencies](#52-install-frontend-dependencies)
    - [5.3 Configure Environment Variables](#53-configure-environment-variables)
    - [5.4 Configure Azure AD B2C for Local Development](#54-configure-azure-ad-b2c-for-local-development)
    - [5.5 Initialize MSAL in React](#55-initialize-msal-in-react)
    - [5.6 Run the Frontend Locally](#56-run-the-frontend-locally)
6. [Running Frontend and Backend Concurrently](#6-running-frontend-and-backend-concurrently)
    - [Option 1: Using Multiple Terminal Instances in VS Code](#option-1-using-multiple-terminal-instances-in-vs-code)
    - [Option 2: Using Concurrently](#option-2-using-concurrently)
7. [Debugging in VS Code](#7-debugging-in-vs-code)
    - [7.1 Debugging the Backend (Node.js)](#71-debugging-the-backend-nodejs)
    - [7.2 Debugging the Frontend (React.js)](#72-debugging-the-frontend-reactjs)
8. [Additional VS Code Extensions for Enhanced Development](#8-additional-vs-code-extensions-for-enhanced-development)
9. [Testing the Application Locally](#9-testing-the-application-locally)
    - [9.1 Verify Backend Functionality](#91-verify-backend-functionality)
    - [9.2 Verify Frontend Functionality](#92-verify-frontend-functionality)
10. [Common Issues and Troubleshooting](#10-common-issues-and-troubleshooting)
    - [Issue 1: CORS Errors](#issue-1-cors-errors)
    - [Issue 2: Environment Variables Not Loaded](#issue-2-environment-variables-not-loaded)
    - [Issue 3: Authentication Failures](#issue-3-authentication-failures)
    - [Issue 4: Database Connection Errors](#issue-4-database-connection-errors)
11. [Best Practices for Local Development](#11-best-practices-for-local-development)
12. [Summary](#12-summary)

---

## 1. Introduction

This document provides step-by-step instructions to set up a local development environment for the **Meter Reading Application** using **React.js** for the frontend, **Node.js with Express.js** for the backend, **Azure AD B2C** for authentication, and **Azure SQL Database** for data storage. **Visual Studio Code (VS Code)** is used as the integrated development environment (IDE) to manage, develop, and debug both frontend and backend seamlessly.

---

## 2. Prerequisites

Before you begin, ensure that you have the following tools installed on your local machine:

1. **Visual Studio Code (VS Code):**
   - [Download VS Code](https://code.visualstudio.com/download)

2. **Node.js and npm:**
   - Download and install the latest **LTS** version from [Node.js Official Website](https://nodejs.org/en/download/).
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

3. **Git:**
   - [Download Git](https://git-scm.com/downloads)
   - Verify installation:
     ```bash
     git --version
     ```

4. **Azure Account:**
   - Ensure you have an active Azure account. If not, [sign up for free](https://azure.microsoft.com/en-us/free/).

5. **Azure CLI (Optional but Recommended):**
   - [Install Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
   - Verify installation:
     ```bash
     az --version
     ```

6. **Postman or Insomnia (Optional for API Testing):**
   - [Postman](https://www.postman.com/downloads/)
   - [Insomnia](https://insomnia.rest/download)

---

## 3. Clone the GitHub Repository

Assuming you have already set up your GitHub repository with separate directories for the frontend and backend, follow these steps:

1. **Open VS Code:**
   - Launch VS Code.

2. **Clone the Repository:**
   - Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (macOS) to open the Command Palette.
   - Type `Git: Clone` and select it.
   - Enter your repository URL (e.g., `https://github.com/yourusername/meter-reading-app.git`).
   - Choose a local directory to clone the repository.

3. **Open the Project:**
   - After cloning, VS Code may prompt you to open the cloned repository. Click **Open**.
   - Alternatively, go to `File > Open Folder` and navigate to your cloned repository.

4. **Repository Structure:**
   - Ensure your repository has the following structure:
     ```
     meter-reading-app/
     ├── backend/
     │   ├── node_modules/
     │   ├── index.js
     │   ├── package.json
     │   └── .env
     ├── frontend/
     │   ├── node_modules/
     │   ├── public/
     │   ├── src/
     │   ├── package.json
     │   └── .env
     └── README.md
     ```

---

## 4. Setting Up the Backend (Node.js with Express.js)

### 4.1 Navigate to the Backend Directory

1. **Open Terminal in VS Code:**
   - Press `` Ctrl + ` `` (backtick) or go to `View > Terminal`.

2. **Change Directory to Backend:**
   ```bash
   cd backend
   ```

### 4.2 Install Backend Dependencies

1. **Install Dependencies:**
   ```bash
   npm install
   ```
   This command installs all packages listed in `backend/package.json`.

### 4.3 Configure Environment Variables

1. **Create a `.env` File:**
   - In the `backend` directory, create a file named `.env`.

2. **Add Environment Variables:**
   ```env
   PORT=5000
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_SERVER=your_db_server.database.windows.net
   DB_DATABASE=your_db_name
   AZURE_AD_B2C_TENANT=your_b2c_tenant_name
   AZURE_AD_B2C_CLIENT_ID=your_backend_api_client_id
   AZURE_AD_B2C_CLIENT_SECRET=your_backend_api_client_secret
   AZURE_AD_B2C_POLICY=your_b2c_policy_name
   ```
   > **Security Note:** Ensure `.env` is added to `.gitignore` to prevent sensitive data from being pushed to GitHub. Your `.gitignore` should include:
   >
   > ```
   > # Backend
   > backend/.env
   >
   > # Frontend
   > frontend/.env
   > ```

3. **Replace Placeholder Values:**
   - **DB_USER:** Your Azure SQL Database username.
   - **DB_PASSWORD:** Your Azure SQL Database password.
   - **DB_SERVER:** Your Azure SQL Server name (e.g., `your_server.database.windows.net`).
   - **DB_DATABASE:** Your Azure SQL Database name.
   - **AZURE_AD_B2C_TENANT:** Your Azure AD B2C tenant name (e.g., `yourtenant`).
   - **AZURE_AD_B2C_CLIENT_ID:** The Client ID of your backend API registered in Azure AD B2C.
   - **AZURE_AD_B2C_CLIENT_SECRET:** The Client Secret of your backend API (keep this secure).
   - **AZURE_AD_B2C_POLICY:** Your Azure AD B2C policy name (e.g., `B2C_1_signupsignin`).

### 4.4 Initialize the Database

1. **Connect to Azure SQL Database:**
   - Use **Azure Data Studio** or **SQL Server Management Studio (SSMS)**.
   - **Azure Data Studio Download:** [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio)

2. **Create the `MeterReadings` Table:**
   - Open a new query window and execute the following SQL script:
     ```sql
     CREATE TABLE MeterReadings (
         Id INT IDENTITY(1,1) PRIMARY KEY,
         UserId NVARCHAR(50) NOT NULL,
         ReadingDate DATE NOT NULL,
         MeterValue DECIMAL(18,2) NOT NULL,
         SubmittedAt DATETIME DEFAULT GETDATE()
     );
     ```
   - Execute the query to create the table.

### 4.5 Run the Backend Server Locally

1. **Start the Server:**
   ```bash
   npm run dev
   ```
   - This command uses `nodemon` to automatically restart the server on code changes.
   - You should see output similar to:
     ```
     Connected to Azure SQL Database
     Server is running on port 5000
     ```

2. **Test the Backend API:**
   - **Using Postman or cURL:**
     - **Endpoint:** `http://localhost:5000/api/meterreadings`
     - **Method:** `POST`
     - **Headers:** 
       - `Content-Type: application/json`
       - `Authorization: Bearer <JWT_TOKEN>` (will be handled by frontend)
     - **Body:**
       ```json
       {
           "userId": "user123",
           "readingDate": "2024-09-20",
           "meterValue": 1234.56
       }
       ```
     - **Expected Response:**
       ```json
       {
           "message": "Reading submitted successfully."
       }
       ```
     > **Note:** Initially, without proper JWT tokens from Azure AD B2C, the protected routes will return `401 Unauthorized`. For testing without authentication, you can temporarily remove the `checkJwt` middleware. **However, ensure to add it back before production.**

---

## 5. Setting Up the Frontend (React.js)

### 5.1 Navigate to the Frontend Directory

1. **Open a New Terminal in VS Code:**
   - Press `` Ctrl + ` `` or go to `View > Terminal`.

2. **Change Directory to Frontend:**
   ```bash
   cd frontend
   ```

### 5.2 Install Frontend Dependencies

1. **Install Dependencies:**
   ```bash
   npm install
   ```
   This command installs all packages listed in `frontend/package.json`.

### 5.3 Configure Environment Variables

1. **Create a `.env` File:**
   - In the `frontend` directory, create a file named `.env`.

2. **Add Environment Variables:**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_AZURE_AD_B2C_CLIENT_ID=your_frontend_app_client_id
   REACT_APP_AZURE_AD_B2C_TENANT=your_b2c_tenant_name
   REACT_APP_AZURE_AD_B2C_POLICY=your_b2c_policy_name
   REACT_APP_AZURE_AD_B2C_SCOPES=api://your_backend_api_client_id/read
   ```
   > **Replace:**
   > - **REACT_APP_API_URL:** Backend API URL (`http://localhost:5000/api` for local development).
   > - **REACT_APP_AZURE_AD_B2C_CLIENT_ID:** The Client ID of your frontend application registered in Azure AD B2C.
   > - **REACT_APP_AZURE_AD_B2C_TENANT:** Your Azure AD B2C tenant name.
   > - **REACT_APP_AZURE_AD_B2C_POLICY:** Your Azure AD B2C policy name.
   > - **REACT_APP_AZURE_AD_B2C_SCOPES:** The scopes required by the frontend to access the backend API.

### 5.4 Configure Azure AD B2C for Local Development

1. **Register the Frontend Application:**
   - In your Azure AD B2C tenant, navigate to **App registrations**.
   - **Register a New Application:**
     - **Name:** `MeterReadingFrontend`
     - **Redirect URI:** `http://localhost:3000`
     - **Implicit Grant:** Ensure `ID tokens` is checked.
   - **Note the Client ID.**

2. **Register the Backend API (if not already):**
   - Ensure your backend API is registered with the necessary scopes.
   - **Expose an API:**
     - **Scope Name:** `read`
     - **Admin Consent Display Name:** `Read access to Meter Reading API`
     - **Admin Consent Description:** `Allows the app to read meter readings`
     - **State:** `Enabled`
   - **Note the Scope URI:** `api://<backend-api-client-id>/read`

3. **Update Frontend MSAL Configuration:**
   - Ensure the frontend's `authConfig.js` (or equivalent) uses the correct values from `.env`.

### 5.5 Initialize MSAL in React

1. **Ensure `authConfig.js` Uses Environment Variables:**
   ```javascript
   // src/authConfig.js
   export const msalConfig = {
       auth: {
           clientId: process.env.REACT_APP_AZURE_AD_B2C_CLIENT_ID,
           authority: `https://${process.env.REACT_APP_AZURE_AD_B2C_TENANT}.b2clogin.com/${process.env.REACT_APP_AZURE_AD_B2C_TENANT}.onmicrosoft.com/${process.env.REACT_APP_AZURE_AD_B2C_POLICY}`,
           redirectUri: 'http://localhost:3000',
       },
       cache: {
           cacheLocation: 'sessionStorage',
           storeAuthStateInCookie: false,
       }
   };
   
   export const loginRequest = {
       scopes: [process.env.REACT_APP_AZURE_AD_B2C_SCOPES]
   };
   ```

2. **Ensure Components Use Environment Variables:**
   - For example, in `MeterReadingForm.js`, ensure API URLs and scopes are derived from `.env`.

### 5.6 Run the Frontend Locally

1. **Start the React App:**
   ```bash
   npm start
   ```
   - This command launches the app on `http://localhost:3000`.
   - Your browser should automatically open the app. If not, navigate to `http://localhost:3000`.

2. **Test the Frontend:**
   - **Login:**
     - Click the **Login** button to initiate the Azure AD B2C authentication flow.
     - Complete the login or signup process.
   - **Submit Meter Reading:**
     - After logging in, navigate to the meter reading form.
     - Fill in the required fields and submit.
     - Verify that the success message appears.

3. **Verify Data in Azure SQL Database:**
   - Connect to your Azure SQL Database and confirm that the new meter reading has been inserted into the `MeterReadings` table.

---

## 6. Running Frontend and Backend Concurrently

For a smoother development experience, you can run both frontend and backend concurrently using the **VS Code Integrated Terminal** or by leveraging tools like **Concurrently**.

### Option 1: Using Multiple Terminal Instances in VS Code

1. **Open Two Terminals:**
   - In VS Code, click the `+` icon in the terminal panel to open a new terminal.
   - You can have one terminal for the backend and another for the frontend.

2. **Run Backend:**
   - In the first terminal, navigate to the backend directory and start the server:
     ```bash
     cd backend
     npm run dev
     ```

3. **Run Frontend:**
   - In the second terminal, navigate to the frontend directory and start the React app:
     ```bash
     cd frontend
     npm start
     ```

### Option 2: Using Concurrently

1. **Install Concurrently Globally (Optional):**
   ```bash
   npm install -g concurrently
   ```

2. **Add a New Script to the Root `package.json`:**
   - If your repository has a root `package.json`, add the following script:
     ```json
     "scripts": {
         "dev": "concurrently \"npm run dev --prefix backend\" \"npm start --prefix frontend\""
     }
     ```
   - If not, you can run `concurrently` directly.

3. **Run Both Services:**
   ```bash
   npm run dev
   ```
   > **Note:** Ensure that ports do not conflict. By default, the backend runs on `5000` and the frontend on `3000`.

---

## 7. Debugging in VS Code

VS Code offers powerful debugging capabilities for both frontend and backend.

### 7.1 Debugging the Backend (Node.js)

1. **Configure Launch Settings:**
   - In the `backend` directory, open the **Run and Debug** view by clicking the Run icon on the sidebar or pressing `Ctrl + Shift + D`.
   - Click on **create a launch.json file**.
   - Select **Node.js** as the environment.
   - Modify the generated `launch.json` to match your backend setup:
     ```json
     {
         "version": "0.2.0",
         "configurations": [
             {
                 "type": "node",
                 "request": "launch",
                 "name": "Launch Backend",
                 "program": "${workspaceFolder}/backend/index.js",
                 "envFile": "${workspaceFolder}/backend/.env",
                 "cwd": "${workspaceFolder}/backend",
                 "restart": true,
                 "runtimeExecutable": "nodemon",
                 "port": 9229
             }
         ]
     }
     ```
     > **Explanation:**
     > - **runtimeExecutable:** Uses `nodemon` for automatic restarts.
     > - **envFile:** Loads environment variables from `.env`.
     > - **port:** The debugging port.

2. **Start Debugging:**
   - Set breakpoints in your backend code (e.g., in `index.js`).
   - Click the **Run** button in the **Run and Debug** view.
   - The backend server will start in debug mode, and you can inspect variables, step through code, etc.

### 7.2 Debugging the Frontend (React.js)

1. **Use Chrome Debugger Extension (Optional):**
   - Install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension in VS Code.

2. **Configure Launch Settings:**
   - In the `frontend` directory, open the **Run and Debug** view.
   - Click on **create a launch.json file**.
   - Select **Chrome** as the environment.
   - Modify the generated `launch.json` to match your frontend setup:
     ```json
     {
         "version": "0.2.0",
         "configurations": [
             {
                 "type": "chrome",
                 "request": "launch",
                 "name": "Launch Frontend",
                 "url": "http://localhost:3000",
                 "webRoot": "${workspaceFolder}/frontend/src",
                 "sourceMaps": true,
                 "trace": true
             }
         ]
     }
     ```

3. **Start Debugging:**
   - Set breakpoints in your React components (e.g., `MeterReadingForm.js`).
   - Click the **Run** button in the **Run and Debug** view.
   - A new Chrome window will launch, and you can debug your frontend code.

---

## 8. Additional VS Code Extensions for Enhanced Development

Enhance your development experience in VS Code by installing the following extensions:

1. **ESLint:**
   - Lints your JavaScript/TypeScript code.
   - [Install ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

2. **Prettier - Code Formatter:**
   - Formats your code consistently.
   - [Install Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

3. **GitLens:**
   - Enhances Git capabilities in VS Code.
   - [Install GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

4. **Azure Tools:**
   - Integrates Azure services with VS Code.
   - [Install Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)

5. **Bracket Pair Colorizer 2:**
   - Colors matching brackets for better readability.
   - [Install Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)

6. **REST Client (Optional):**
   - Allows you to send HTTP requests directly from VS Code.
   - [Install REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

---

## 9. Testing the Application Locally

### 9.1 Verify Backend Functionality

1. **Ensure the Backend Server is Running:**
   - Terminal should display `Server is running on port 5000`.

2. **Test Protected Routes:**
   - Attempt to access `http://localhost:5000/api/meterreadings` without a token.
   - You should receive a `401 Unauthorized` response.

3. **Use Frontend to Submit Data:**
   - With the frontend running and authenticated, submit a meter reading.
   - Verify the response message.
   - Check the database to ensure data is inserted.

### 9.2 Verify Frontend Functionality

1. **Ensure the Frontend is Running:**
   - Open `http://localhost:3000` in your browser.
   - You should see the login button.

2. **Authenticate Using Azure AD B2C:**
   - Click **Login** and complete the authentication flow.
   - After logging in, the meter reading form should be visible.

3. **Submit a Meter Reading:**
   - Fill in the form and submit.
   - Verify the success message.
   - Check your backend logs for any errors.

4. **Handle Errors Gracefully:**
   - Try submitting invalid data to ensure the frontend and backend handle errors appropriately.

---

## 10. Common Issues and Troubleshooting

### Issue 1: CORS Errors

**Symptom:**
