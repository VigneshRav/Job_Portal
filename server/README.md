# ⚙️ QuickHire - A Full Stack MERN Job Portal (Backend)

This is the backend server for QuickHire Job Portal built using Node.js, Express, and MongoDB.

---

## 🛠 Tech Stack:

- Node.js

- Express.js

- MongoDB Atlas

- MongoDB Compass

- Mongoose

- Cloudinary (for image uploads)

- Nodemailer (optional)

- Stripe (optional)

- CORS

- Dotenv

---

## 🔑 Environment Variables:

**Create a `.env` file inside `server`:**

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_SECRET_KEY=your_secret_key
- SENTRY_DSN=your_sentry_DSN_url
- CLERK_PUBLISHABLE_KEY=your_publishable_key
- CLERK_SECRET_KEY=your_secret_key
- CLERK_WEBHOOK_SECRET=your_secret_key

---

## 🚀 Running the Server:

- cd server
- npm install
- npm run dev
- Server runs on: http://localhost:5000

---

## 📡 API Routes Documentation:-

**🏠 Root Route**

| Method | Endpoint | Description             | Auth Required |
| ------ | -------- | ----------------------- | ------------- |
| GET    | `/`      | Check if API is working | ❌ No         |


**🔔 Webhooks**

| Method | Endpoint    | Description                  | Auth Required |
| ------ | ----------- | ---------------------------- | ------------- |
| POST   | `/webhooks` | Handles Clerk webhook events | ❌ No         |


**🏢 Company Routes (/api/company)**

| Method | Endpoint                         | Description                         | Middleware       | Auth Required |
| ------ | -------------------------------- | ------------------------------------| ---------------- ----------------|
| POST   | `/api/company/register`          | Register a new company              | `multer`         | ❌ No         |
| POST   | `/api/company/login`             | Company login                       | —                | ❌ No         |
| GET    | `/api/company/company`           | Get logged-in company data          | `protectCompany` | ✅ Yes        |
| POST   | `/api/company/post-job`          | Post a new job                      | `protectCompany` | ✅ Yes        |
| GET    | `/api/company/applicants`        | Get all applicants for company jobs | `protectCompany` | ✅ Yes        |
| GET    | `/api/company/list-jobs`         | Get all jobs posted by company      | `protectCompany` | ✅ Yes        |
| POST   | `/api/company/change-status`     | Change job application status       | `protectCompany` | ✅ Yes        |
| POST   | `/api/company/change-visibility` | Change job visibility               | `protectCompany` | ✅ Yes        |


**💼 Job Routes (/api/jobs)**

| Method | Endpoint        | Description                  | Auth Required |
| ------ | --------------- | ---------------------------- | --------------|
| GET    | `/api/jobs/`    | Get all available jobs       | ❌ No         |
| GET    | `/api/jobs/:id` | Get single job details by ID | ❌ No         |


**👤 User Routes (/api/users)**

| Method | Endpoint                   | Description               | Middleware | Auth Required               |
| ------ | -------------------------- | ------------------------- | ---------- | --------------------------- |
| GET    | `/api/users/user`          | Get logged-in user data   | —          | ❌ No                       |
| POST   | `/api/users/apply`         | Apply for a job           | —          | ❌ No                       |
| GET    | `/api/users/applications`  | Get user job applications | —          | ❌ No                       |
| POST   | `/api/users/update-resume` | Upload/Update resume      | `multer`   | ❌ No                       |


**🛡 Middleware Used**

| Middleware          | Purpose                              |
| ------------------- | ------------------------------------ |
| `clerkMiddleware()` | Clerk authentication middleware      |
| `protectCompany`    | Protects company-only routes         |
| `multer`            | Handles file uploads (image, resume) |
| `Sentry`            | Error monitoring & logging           |


**🧪 Debug Route (Development Only)**

| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| GET    | `/debug-sentry` | Triggers test error for Sentry |

---

## 🔐 Authentication & Authorization:-

- Clerk middleware (if integrated)

- Role-based access control (Recruiter / Job Seeker)

---

## 🗄 Database Models:-

- User

- Company

- Jobs

- Job Applications

---

## 🧪 Testing APIs:-

**You can test APIs using:**

- Postman

- Thunder Client

---

## 🌍 Deployment:-

**Recommended:**

- Render

- Railway

- Cyclic

**Make sure to:**

- Add environment variables

- Allow CORS for frontend domain

---

## ⚠️ Common Errors:-

**404 Error**

Check:

- Correct route path

- Backend URL in frontend

- Environment variables

**MongoDB Connection Failed**

Check:

- IP whitelist in MongoDB Atlas

- Correct connection string

---

## 👨‍💻 Developer:-

- Vignesh R

- Full Stack Developer (MERN)













