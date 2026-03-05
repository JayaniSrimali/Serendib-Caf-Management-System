# Café Serendib

A full-stack MERN web application for a modern café brand named "Café Serendib". Built with beautiful aesthetics, robust functionality, and a seamless developer experience in mind.

## 🚀 Technologies

### Frontend
- **React (Vite)**
- **Tailwind CSS** (Configured with custom typography and warm brown, cream, gold palette)
- **React Router DOM**
- **Axios** (With interceptors configured)
- **React Hook Form**
- **Context API** (Auth Context & Cart Context implemented)
- **Framer Motion**

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **bcryptjs**
- **MVC Architecture**

## 📁 Project Structure

\`\`\`text
cafe-serendib/
   ├── serendib-backend/
   │   ├── config/ (Database connections)
   │   ├── controllers/ (Business logic handlers)
   │   ├── middleware/ (Auth & Error handlers)
   │   ├── models/ (Mongoose schemas)
   │   ├── routes/ (Express routes)
   │   ├── .env (Example Environment configuration)
   │   └── server.js (Server entry point)
   └── serendib-frontend/
       ├── src/
       │   ├── components/ (Reusable UI pieces)
       │   ├── context/ (AuthContext, CartContext)
       │   ├── pages/ (Application views)
       │   ├── utils/ (e.g. axiosInstance setup)
       │   ├── App.jsx (Layout & Routing logic)
       │   ├── main.jsx (Application mount with Providers)
       │   └── index.css (Global and Tailwind base styles)
       ├── tailwind.config.js (Theme and layout variables)
       ├── ...
\`\`\`

## 🛠️ Setup Instructions

### Backend
1. Go to `serendib-backend` folder: \`cd cafe-serendib/serendib-backend\`
2. Install dependencies: \`npm install\`
3. Verify your `.env` contains:
   \`\`\`
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/serendib_cafe_db
   JWT_SECRET=serendib_super_secret_key_12345
   JWT_EXPIRES_IN=30d
   \`\`\`
4. Run server: \`npm run dev\` (Configured via nodemon)

### Frontend
1. Go to `serendib-frontend` folder: \`cd cafe-serendib/serendib-frontend\`
2. Install dependencies: \`npm install\`
3. Run dev server: \`npm run dev\`
4. Access app at http://localhost:5173

## 🌟 Security Features
- **Passwords** are securely hashed using bcrypt prior to storing them in the DB.
- **Protected Routes** are managed seamlessly by `authMiddleware.js` on the server and context API on the client.
- **Admin Access Checkers** configured on crucial application routes for menu edits.
