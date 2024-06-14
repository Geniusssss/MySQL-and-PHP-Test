# React and PHP Application

## Description
This project is a web application built using React(`v18.3.1`) for the frontend, Material-UI(`v5.15.20`) for the UI library, and PHP(`v8.3.8`) for the backend. It includes a MySQL(`v8.0.37`) database for data storage. The application is designed to display enrolment data in a user-friendly way.

## SETUP

### Prerequisites
- Node.js and npm: [Download and install Node.js](https://nodejs.org/)
- PHP (for the backend): [Download and install PHP](https://www.php.net/)
- MySQL (for the database): [Download and install MySQL](https://www.mysql.com/)

### Replace Tokens
1. Replace backend parameters to connect to your own database in the `database.php` file, under the folder `/backend/config/`
    - `$servername`
    - `$username`
    - `$password`
    - `$dbname`

2. Replace frontend base URL if you start the backend server in different URL. `enrolmentApi.js` file under `/frontend/src/api/`

### Database Setup
1. Create a MySQL database and a user
2. Execute the provided SQL scripts or execute the scripts in MySQL Workbench to set up the database:
    ```bash
    mysql -u <username> -p < database/set_db.sql
    ```
3. Insert the data:
    ```bash
    mysql -u <username> -p course_management < database/insert_data.sql
    ```

### Backend Setup
1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Ensure PHP is installed and configured on your server.
3. Start the PHP server:
    ```bash
    php -S localhost:8000 -t public
    ```

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```

## Usage
1. Ensure MySQL, backend, and frontend servers are running.
2. Access the application through the frontend server URL (`http://localhost:3000`).
