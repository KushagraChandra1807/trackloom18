# 🎶 TrackLoom

TrackLoom is a **full-stack music player application** where users can play songs, chat with friends in real-time, and explore music albums.  
It also includes an **Admin Dashboard** where admins can add/delete songs and albums, and manage the platform.  
Friends can even see **what song you’re currently listening to** 🎧.

---

## ✨ Features

### 👤 User Features
- 🔑 Authentication with **Clerk** (login/signup).
- 🎵 Play, pause, and browse music.
- 💬 Real-time chat with friends via **Socket.IO**.
- 👀 See what your friends are listening to.
- 📱 Fully responsive UI built with **React + TailwindCSS**.

### 🛠️ Admin Features
- 📂 Add/Delete songs and albums.
- 🗑️ Manage existing music content.
- 👥 Manage users and monitor activity.

---

## 🚀 Tech Stack

### Frontend
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
- [Clerk](https://clerk.com/) for authentication
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [Socket.IO Client](https://socket.io/)
- [React Router](https://reactrouter.com/)

### Backend
- [Express](https://expressjs.com/) + [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) with **Mongoose**
- [Socket.IO](https://socket.io/) for real-time communication
- [Cloudinary](https://cloudinary.com/) for music and album storage
- [Node-Cron](https://www.npmjs.com/package/node-cron) for scheduled tasks

---

## 📂 Project Setup

### 🔧 Backend Setup
```bash
git clone https://github.com/<your-username>/trackloom.git
cd trackloom/backend
npm install
```

Create a `.env` file inside `backend/` with:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_key
CLOUDINARY_API_SECRET=your_cloud_secret
```

Run backend in development:
```bash
npm run dev
```

---

### 🎨 Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/` with:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000
```

Run frontend in development:
```bash
npm run dev
```

---

## 🏗️ Build

### Backend
```bash
npm start
```

### Frontend
```bash
npm run build
npm run preview
```

---

## 📸 Demo

https://github.com/user-attachments/assets/37672708-f012-456c-9390-15c68813706c
https://github.com/user-attachments/assets/11fe7e85-405f-46c0-8fcf-b74d3c1f07b6

---

## 📬 Contact

If you like **TrackLoom** or want to collaborate, feel free to connect:

- **Email:** kushagrachandra1807@gmail.com 
- **LinkedIn:** [LinkedIn](https://www.linkedin.com/in/kushagra-chandra-143948303/)  
- **Portfolio:** [Portfolio](https://portfolio-sandy-one-ilvg2zr6lr.vercel.app/)  

---

⭐ Don’t forget to **star this repo** if you found it helpful or interesting!
