# MFU Sport Complex

The **MFU Sport Complex** is an advanced web-based application designed to manage and optimize the operations of the Mae Fah Luang University sports complex. This platform provides seamless interaction for both administrators and users, offering features like account management, booking systems, and personalized profiles. The goal is to create a user-friendly experience while ensuring efficient management of sports facilities.

## Key Features
- **Admin Dashboard**: A centralized control panel for managing bookings, users, and updating news.
-**Email Notifications** : Admins can send automated emails to users when user accounts are restricted or reactivated. When a user is restricted, they receive an email and can no longer log in. Upon reactivation, users are notified via email and regain access to their accounts.
- **User**: Personalized accounts for students and staff to track bookings, training sessions, and bookings.
- **Trainer Availability Check**: Users can verify trainer availability for their desired session before booking. This ensures seamless scheduling and avoids double bookings for trainers during the same time slot. User can check trainers profile before booking.
- **User Profile**: Personalized accounts for students and staff to manage their activities and access essential features. Key functionalities include:
  - Updating their profile picture for a more personalized experience.
  - Tracking booking history to review past and upcoming sessions.
  - Changing passwords securely to maintain account safety.
  - Accessing a history of uploaded profile pictures to track previous updates.
- **Authentication**: Secure login and registration system integrated with MFU university email accounts.
- **JWT-Based Security**: Ensures safe and efficient authentication for all users.

# Demo Screenshot
![HomePage](./frontend/src/images/Homepage.jpg)

## Technology Stack

### **Backend**:
- **Framework**: Express.js

### **Dependencies**:
- **bcryptjs**: Used for hashing passwords.
- **cloudinary**: Used for image uploads and cloud storage.
- **express**: The core framework for building the API.
- **express-validator**: Validation middleware for Express.js.
- **jsonwebtoken**: Used for creating and verifying JWT tokens for authentication.
- **node-cron**: A job scheduler for running tasks at specific intervals.

### **Database**:
- **Database**: MongoDB (NoSQL database for storing user data, bookings, etc.)
- **ODM**: Mongoose (Object Data Modeling library for MongoDB)

### **Frontend**:
- **React**: A JavaScript library for building user interfaces.
- **Vite**: Next-generation, fast build tool for modern web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Ant Design (AntD)**: A popular React UI framework for building elegant and modern UIs.
- **Redux Toolkit**: A state management tool for React, used with Redux.
- **React Router**: For handling routing and navigation between pages in the application.
- **Lottie**: For adding animated graphics and animations to the UI.
- **Axios**: For making HTTP requests to the backend.
- **EmailJS**: A service for sending emails from JavaScript.


