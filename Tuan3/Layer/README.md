# Plugin-based CMS

This project is a plugin-based Content Management System with a React frontend and a Node.js backend using a layered architecture.

## Features

- **Content Management**: CRUD operations for posts.
- **User Management and Roles**: User creation, role assignment (admin, editor, contributor), and JWT-based authentication.
- **Menu Management**: CRUD operations for menus.

## Architecture

The application follows a strict layered architecture:

- **Presentation Layer**: React frontend
- **API Layer**: Express Controllers (REST API)
- **Service Layer**: Business logic
- **Repository Layer**: Database access with Mongoose
- **Database Layer**: MongoDB

## Folder Structure

### Backend

```
backend/
  controllers/
  services/
  repositories/
  models/
  routes/
  middleware/
  server.js
  .env
  package.json
```

### Frontend

```
frontend/
  public/
  src/
    api/
    components/
    pages/
    App.js
    index.js
  .env
  package.json
```

## How to Run

### Prerequisites

- Node.js
- MongoDB

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```
   MONGO_URI=mongodb://localhost:27017/plugin_cms
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory and add the following:
    ```
    REACT_APP_API_URL=http://localhost:5000/api
    ```
4. Start the React application:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.
