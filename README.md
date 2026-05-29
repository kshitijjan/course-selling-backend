# Course Selling Backend

A Node.js and Express backend for a course selling platform. This project provides authentication using JWT (JSON Web Tokens) and uses MongoDB for persistent data storage. It includes separate routes and functionalities for `Admins` (course creators) and `Users` (course buyers).

## Features

- **JWT Authentication**: Secure endpoints requiring a valid token in the headers (`Authorization: Bearer <token>`).
- **Role-based Actions**: Separation of concerns between Admins (can create and manage courses) and Users (can browse and purchase courses).
- **MongoDB Database**: Persistent data storage for users, admins, and courses using Mongoose.

## Prerequisites

- Node.js installed
- MongoDB database (local or MongoDB Atlas)

## Setup and Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   mongodbURL="your_mongodb_connection_string"
   JWT_SECRET="your_jwt_secret_key"
   ```

3. **Start the Server:**
   ```bash
   npm start
   ```
   *(Or run using `node index.js` depending on your scripts)*

## API Documentation

### Admin Routes

- **POST `/admin/signup`**
  - **Description:** Creates a new admin account.
  - **Body:** `{ "username": "admin", "password": "pass" }`
  - **Response:** `{ "message": "Admin created successfully" }`

- **POST `/admin/signin`**
  - **Description:** Logs in an admin account.
  - **Body:** `{ "username": "admin", "password": "pass" }`
  - **Response:** `{ "token": "your-token" }`

- **POST `/admin/courses`**
  - **Description:** Creates a new course.
  - **Headers:** `{ "Authorization": "Bearer <your-token>" }`
  - **Body:** `{ "title": "course title", "description": "course description", "price": 100, "imageLink": "https://linktoimage.com" }`
  - **Response:** `{ "message": "Course created successfully", "courseId": "new course id" }`

- **GET `/admin/courses`**
  - **Description:** Returns all courses created.
  - **Headers:** `{ "Authorization": "Bearer <your-token>" }`
  - **Response:** Returns an array of course objects.

---

### User Routes

- **POST `/users/signup`**
  - **Description:** Creates a new user account.
  - **Body:** `{ "username": "user", "password": "pass" }`
  - **Response:** `{ "message": "User created successfully" }`

- **POST `/users/signin`**
  - **Description:** Logs in a user account.
  - **Body:** `{ "username": "user", "password": "pass" }`
  - **Response:** `{ "token": "your-token" }`

- **GET `/users/courses`**
  - **Description:** Lists all available courses.
  - **Headers:** `{ "Authorization": "Bearer <your-token>" }`
  - **Response:** Returns an array of course objects.

- **POST `/users/courses/:courseId`**
  - **Description:** Purchases a specific course.
  - **Headers:** `{ "Authorization": "Bearer <your-token>" }`
  - **Response:** `{ "message": "Course purchased successfully" }`

- **GET `/users/purchasedCourses`**
  - **Description:** Lists all the courses purchased by the authenticated user.
  - **Headers:** `{ "Authorization": "Bearer <your-token>" }`
  - **Response:** Returns an array of purchased course objects.
