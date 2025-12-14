# 🧠 CollectIQ

CollectIQ is a Second Brain web application that helps users save, organize, and manage useful content (tweets, videos, notes, links, etc.) in one place.
It is built with a MERN-style stack and focuses on productivity, learning, and knowledge management.

Built for learners, developers, and productivity enthusiasts.

---

## ⚙️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel (Frontend & Backend)

---

## 📂 Folder Structure

```bash
collectiq/
├── frontend/        # React + Tailwind frontend
├── backend/         # Node + Express backend
└── README.md

## ✨ Features
🔐 Authentication

Signup & Signin using JWT

Secure password hashing with bcrypt

📚 Content Management

Save Tweets, YouTube videos, Links, Notes

Add titles, details, and tags

Edit & delete content

🏷️ Organization

Tag-based filtering

Search by title, link, details, and tags

Status tracking:

🟣 To Learn

🟡 In Progress

🟢 Done

⭐ Advanced

Pin important cards

Share your brain via public link

Private / Public visibility (in progress)

Dark mode (planned)

Collections / folders (planned)

AI summaries (planned)

## 🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/collectiq.git
cd collectiq

2️⃣ Setup Backend
cd backend
npm install
npm run dev


Create a .env file inside backend/:

PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
JWT_SECRET=your_secret_key


Backend will run on:

http://localhost:3000

3️⃣ Setup Frontend
cd frontend
npm install
npm run dev


Create a .env file inside frontend/:

VITE_BACKEND_URL=http://localhost:3000


Frontend will run on:

http://localhost:5173

## 🔌 API Endpoints
Auth

POST /api/v1/signup

POST /api/v1/signin

Content

POST /api/v1/content

GET /api/v1/content

PUT /api/v1/content/:id

DELETE /api/v1/content/:id

PATCH /api/v1/content/:id/status

PATCH /api/v1/content/:id/pin

Share

POST /api/v1/brain/share

GET /api/v1/brain/:shareLink

## 🌍 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Make sure environment variables are added in Vercel Dashboard.

## 🧭 Roadmap

✅ Auth system

✅ Search & tag filtering

✅ Edit content

✅ Pin cards

🔄 Public / Friends visibility

🌙 Dark mode

📂 Collections

🤖 AI-powered summaries

## 👨‍💻 Author

Pappu Kumar Yadav
B.Tech Student | Full Stack Developer
MERN • TypeScript • MongoDB • React

⭐ Support

If you like this project, please star ⭐ the repository
It really helps!
