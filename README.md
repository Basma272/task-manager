# 📝 Task Manager API – Elshafra 🕵️‍♀️

Elshafra is a full-featured Task Management REST API with user authentication, email verification (OTP), role-based access (User/Admin), and secure CRUD operations.

---

##  Features

- ✅ User registration with email OTP verification  
- ✅ JWT-based login authentication  
- ✅ Role-based access (admin / user)  
- ✅ Create, update, delete personal tasks  
- ✅ Admin dashboard to view all users + tasks  
- ✅ Update profile / change password  
- ✅ Input validation using Joi  
- ✅ Clean architecture & modular code  

---

##  Tech Stack

| Area       | Tool                     |
|------------|--------------------------|
| Backend    | Node.js, Express.js      |
| Database   | MongoDB + Mongoose       |
| Auth       | JWT, OTP via Nodemailer  |
| Validation | Joi                      |
| Structure  | MVC + Clean Code         |

---

##  Folder Structure

project/ ├── config/ ├── controllers/ ├── middlewares/ ├── models/ ├── routes/ ├── utils/ ├── validations/ ├── server.js

---

## 📬 Environment Variables (.env)

`env
PORT=3000
MONGO_URL=mongodb://localhost:27017/TaskManager
NODE=dev
JWT_SECRET=your-secret-key
EMAIL=your-email@gmail.com 
EMAIL_PASSWORD=your-app-password
EXPIRE_TOKEN=7d


---

##  Installation

git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
npm install
npm run dev


---

##  Auth Routes

Method Endpoint Description

POST /api/auth/signup Register user
POST /api/auth/confirm-email Verify email via OTP
POST /api/auth/login Login and receive token



---

##  Task Routes

Method Endpoint Description

POST /api/tasks Create task
GET /api/tasks Get user tasks
PUT /api/tasks/:id Update task
DELETE /api/tasks/:id Delete task



---

##  User Routes

Method Endpoint Description

GET /api/users/me Get user info
PUT /api/users/me Update profile
PUT /api/users/me/password Change password
DELETE /api/users/me Delete user + their tasks


---

##  Testing Tools

 Fully tested via Postman


---

##  Developed By

Basma Mahmoud – Fullstack Developer (Backend Focus)
LinkedIn – GitHub


---

> Built with a focus on clean architecture, security, and readiness for production deployment.

