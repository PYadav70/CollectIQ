🧠 CollectIQ – Second Brain Application

CollectIQ is a Second Brain web application that helps users save, organize, and manage useful content (tweets, videos, notes, links, etc.) in one place.
It is built with a MERN-style stack and focuses on productivity, learning, and knowledge management.

🚀 Features
✅ Core Features

🔐 User authentication (Signup / Signin using JWT)

📌 Save content from:

Twitter (X)

YouTube

Notes

Links

Notion

🏷️ Tag-based organization

🔍 Search by title, link, tags, and details

🗑️ Edit & delete saved content

🔄 Content status tracking:

To Learn

In Progress

Done

⭐ Advanced Features

📍 Pinned cards (keep important content at the top)

🔗 Share your “brain” using a public share link

👥 Visibility control (planned):

Only me

Friends

Public

🌙 Dark mode (planned)

📂 Collections / folders (planned)

🤖 AI-powered summaries (planned)

🛠️ Tech Stack
Frontend

React (Vite)

TypeScript

Tailwind CSS

Axios

React Router

Backend

Node.js

Express.js

TypeScript

MongoDB + Mongoose

JWT Authentication

bcrypt (password hashing)

Database

MongoDB (Local / Atlas)

📂 Project Structure
second-brain/
│
├── backend/
│   ├── src/
│   │   ├── config.ts
│   │   ├── db.ts
│   │   ├── middleware.ts
│   │   ├── index.ts
│   │   └── utils.ts
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.tsx
│   ├── .env
│   └── package.json
│
└── README.md

🔐 Environment Variables
Backend (backend/.env)
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
JWT_SECRET=your_jwt_secret

Frontend (frontend/.env)
VITE_BACKEND_URL=http://localhost:3000

▶️ Running Locally
1️⃣ Clone the repository
git clone https://github.com/your-username/collectiq.git
cd collectiq

2️⃣ Start Backend
cd backend
npm install
npm run dev


Backend runs at:

http://localhost:3000

3️⃣ Start Frontend
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

📡 API Endpoints (Backend)
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

🌍 Deployment 

Frontend: Vercel

Backend: Vercel / Render

Database: MongoDB Atlas

🎯 Future Improvements

Dark mode toggle

Friend-based visibility system

Folder / collection system

AI summaries using LLMs

Mobile responsive UI polish

👨‍💻 Author

Pappu Kumar Yadav
B.Tech Student | Full Stack Developer
📌 MERN | TypeScript | MongoDB | React

⭐ Support

If you like this project, don’t forget to star ⭐ the repository!