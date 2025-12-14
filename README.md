# 🧠 CollectIQ

CollectIQ is a that helps you **capture, organize, and revisit knowledge** from across the internet — tweets, videos, links, notes, and more — all in one place.

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
✨ Features
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

🚀 Getting Started
1️⃣ Clone the Repository
bash
Copy code
git clone https://github.com/your-username/collectiq.git
cd collectiq
2️⃣ Setup Backend
bash
Copy code
cd backend
npm install
npm run dev
Create a .env file inside backend/:

env
Copy code
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
JWT_SECRET=your_secret_key
Backend will run on:

arduino
Copy code
http://localhost:3000
3️⃣ Setup Frontend
bash
Copy code
cd frontend
npm install
npm run dev
Create a .env file inside frontend/:

env
Copy code
VITE_BACKEND_URL=http://localhost:3000
Frontend will run on:

arduino
Copy code
http://localhost:5173
🔌 API Endpoints
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

Backend: Vercel (Serverless)

Database: MongoDB Atlas

Make sure environment variables are added in Vercel Dashboard.

🧭 Roadmap
✅ Auth system

✅ Search & tag filtering

✅ Edit content

✅ Pin cards

🔄 Public / Friends visibility

🌙 Dark mode

📂 Collections

🤖 AI-powered summaries

👨‍💻 Author
Pappu Kumar Yadav
B.Tech Student | Full Stack Developer
MERN • TypeScript • MongoDB • React

⭐ Support
If you like this project, please star ⭐ the repository
It really helps!
