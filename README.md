# Media Gallery

A full-stack MERN application for media upload and management. The app allows users to upload, view, and manage images and videos efficiently. It features AWS S3 for secure media storage, user authentication, and a responsive UI.

## Live Demo

- **Frontend (Vercel)**: [Media Gallery](https://media-gallery-one.vercel.app/)
- **Backend (Heroku)**: [API Server](https://my-media-app-backend.herokuapp.com/)

## Features

- 📂 Upload, view, and delete media files
- 🛡️ Secure authentication using JWT
- 📊 Grid/List view media gallery
- ☁️ AWS S3 storage support
- 🎨 Modern UI with Material-UI/Tailwind
- 🚀 Fully responsive design

## Tech Stack

- **Frontend**: React, Material-UI/Tailwind CSS, Context API/Redux Toolkit
- **Backend**: Node.js, Express, MongoDB, JWT Authentication
- **Storage**: AWS S3 Multer
- **Deployment**: Vercel (Frontend), Heroku (Backend)

## Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/media-gallery.git
cd media-gallery
```

### 2️⃣ Run the Backend
```bash
cd backend
npm install
npm start
```
The backend server will start on http://localhost:5000 (or as configured in the environment variables).

### 3️⃣ Open the Frontend
Once the backend server is running, you can open the frontend by visiting this [Live link](https://google.com)

## 📌 API Endpoints

| Method  | Endpoint     | Description            |
|---------|------------|------------------------|
| **POST**   | `/upload`   | Upload media file      |
| **GET**    | `/media`    | Fetch all media files  |
| **DELETE** | `/media/:id` | Delete a media file   |
