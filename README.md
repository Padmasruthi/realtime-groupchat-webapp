# 🚀 Real-Time Group Chat Application (MERN + Socket.IO)

A full-stack real-time group chat application built using the MERN stack (MongoDB, Express, React, Node.js) with Socket.IO integration for live messaging.

This application allows users to register, login securely using JWT authentication, and participate in a real-time group chat that activates when 3 users join.

---

## 🌐 Live Demo

🔗 Frontend (Vercel): https://realtime-groupchat-webapp-r4o5.vercel.app
🔗 Backend API (Render): https://realtime-groupchat-webapp.onrender.com

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

### 💬 Real-Time Chat
- Real-time messaging using Socket.IO
- Group chat room ("general")
- Live user count
- Chat activation when 3 users join
- Broadcast messages instantly

### 🎨 UI/UX
- Responsive design
- Toast notifications
- Password visibility toggle
- Clean and modern layout
- Background image styling

### 🚀 Deployment
- Frontend deployed on Vercel
- Backend deployed on Render
- MongoDB Atlas cloud database

---

## 🛠 Tech Stack

### 🖥 Frontend
- React.js
- React Router DOM
- Axios
- Socket.IO Client
- React Toastify
- React Icons

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- Socket.IO
- CORS
- dotenv

### ☁️ Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📂 Project Structure

```
groupchat-app/
│
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── user.js
│   ├── routes/
│   │   └── authRoutes.js
|   |   └── chatRoutes.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── styles/
│   │   ├── assets/
│   │   └── utils/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Padmasruthi/realtime-groupchat-webapp.git
cd realtime-groupchat
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file inside backend folder:

```
PORT=5000
MONGO_URI=mongodb+srv://chatuser:chatpassword123@cluster0.96r4pqg.mongodb.net/realtimeGroupchat?appName=Cluster0
JWT_SECRET=supersecretkey
CLIENT_URL=https://realtime-groupchat-webapp-r4o5.vercel.app
```

### Run Backend:

```bash
npm start
```

Server will run at:

```
http://localhost:5000
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

---

## 🔌 Socket Events

### Client → Server
- `joinGeneral`
- `sendMessage`

### Server → Client
- `receiveMessage`
- `userCount`
- `chatActivated`

---

## 🧠 Application Logic

- Users join the "general" room.
- The server tracks joined users.
- When 3 users join:
  - `chatActivated` event is emitted.
- Messages are broadcast in real-time.
---

## 🔐 Security

- Password hashing using bcrypt
- JWT token generation on login
- Protected routes using middleware
- Environment variables for secrets

---

## 🌟 Future Improvements

- Private chat rooms
- Message persistence with timestamps
- Store chat history in database
- User avatars
- Online/offline status
- Message reactions
- Admin controls
- Rate limiting & validation

---

## 🧪 Testing the App

1. Open 3 different browsers or devices.
2. Register/login with 3 users.
3. Join general chat.
4. Once 3 users join → chat activates.
5. Send messages in real-time.
---

## 📈 What I Learned

- Real-time communication using Socket.IO
- JWT authentication flow
- Protected API routes
- Full-stack deployment
- Environment variable management
- Debugging CORS & production issues
- Handling deployment errors (404, EADDRINUSE, etc.)

---

## 👨‍💻 Author

Name: Padmasruthi  
GitHub: https://github.com/Padmasruthi
LinkedIn: https://www.linkedin.com/in/padmasruthi-h-9394022b5/ 

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!

---

## 📜 License

This project is open-source and available under the MIT License.