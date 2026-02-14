# Meru_Technosoft_Assignment

# 📄 Invoice Management System (Full Stack)

A Full Stack Invoice Management System where users can create invoices, add line items, track payments, archive/restore invoices, delete invoices, and view invoice details with a modern dashboard UI inspired by the Dribbble reference (layout inspiration only).

This project was built as a Full Stack assignment using:

- **Frontend:** React + Vite + TailwindCSS + Redux + Framer Motion  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB Atlas  
- **Authentication:** JWT based login/register  

---

## 🚀 Features

### ✅ Authentication
- Register / Login
- JWT Token stored in localStorage
- Protected routes
- Each user can only see their own invoices

### ✅ Invoice Module
- Create invoice with multiple line items
- Invoice List page (Search + Filters + Sorting + Pagination)
- Invoice Details page
- Add payments (No overpayment allowed)
- Auto status update (DRAFT / PAID)
- Archive / Restore invoice
- Delete invoice

### ✅ UI / UX
- Modern Dashboard layout with Sidebar
- Smooth animations using Framer Motion
- Skeleton shimmer loading UI
- Toast notifications with progress bar timer
- Responsive UI (Desktop + Mobile)

---

## 📸 Screenshots

> Add screenshots inside `frontend/screenshots/` folder and update the paths below.

### 🔹 Invoice List Page
![Invoice List](frontend/screenshots/invoice-list.png)

### 🔹 Invoice Details Page
![Invoice Details](frontend/screenshots/invoice-details.png)

### 🔹 Create Invoice Page
![Create Invoice](frontend/screenshots/create-invoice.png)

### 🔹 Login Page
![Login](frontend/screenshots/login.png)

---

## 📂 Folder Structure

```
invoice-project/
│
├── backend/          # Express + MongoDB Backend
│
└── frontend/         # React + Redux Frontend
```

---

# ⚙️ Setup Instructions (Step-by-Step)

## 1️⃣ Clone the Repository

```bash
git clone <YOUR_GITHUB_REPO_LINK>
cd invoice-project
```

---

# 🛠 Backend Setup (Node + Express + MongoDB Atlas)

## 2️⃣ Go to backend folder

```bash
cd backend
```

## 3️⃣ Install backend dependencies

```bash
npm install
```

## 4️⃣ Create `.env` file inside backend folder

Create a file:

```
backend/.env
```

Add the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

### ✅ Example MongoDB Atlas URI format:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/invoiceDB?retryWrites=true&w=majority
```

### 🔥 JWT_SECRET Example:

```env
JWT_SECRET=mySuperSecretKey123
```

---

## 5️⃣ Run Backend Server

### Run in normal mode:

```bash
npm start
```

### Run in development mode (recommended):

```bash
npm run dev
```

Backend will start at:

```
http://localhost:5000
```

---

# 💻 Frontend Setup (React + Vite)

## 6️⃣ Open a new terminal and go to frontend folder

```bash
cd ../frontend
```

## 7️⃣ Install frontend dependencies

```bash
npm install
```

---

## 8️⃣ Setup API Base URL (Frontend Axios Config)

Go to this file:

```
frontend/src/api/axios.js
```

Make sure it looks like this:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
```

---

## 9️⃣ Run Frontend Server

```bash
npm run dev
```

Frontend will start at:

```
http://localhost:5173
```

---

# 🔑 Default Flow to Use Project

1. Register a new account
2. Login using same credentials
3. Create invoices
4. View invoices list
5. Open invoice details
6. Add payments (no overpayment allowed)
7. Archive/restore/delete invoices

---

# 🌐 API Endpoints

## Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

## Invoice
- `GET /api/invoices` → Get all invoices (user-specific)
- `POST /api/invoices` → Create invoice
- `GET /api/invoices/:id` → Get invoice details
- `POST /api/invoices/:id/payments` → Add payment
- `POST /api/invoices/archive` → Archive invoice
- `POST /api/invoices/restore` → Restore invoice
- `DELETE /api/invoices/:id` → Delete invoice

---

# 📌 Important Business Rules

- Line Total = quantity × unitPrice
- Total = sum of all line totals
- BalanceDue = total - amountPaid
- Overpayment is not allowed
- If balanceDue becomes 0 → invoice status becomes PAID
- Archived invoices are hidden unless filtered

---

# 🧾 Tech Stack

### Frontend
- React + Vite
- TailwindCSS
- Redux
- Axios
- Framer Motion
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

---

# 🚀 Deployment Guide (Backend + Frontend)

---

## ✅ Deploy Backend on Render

### Step 1: Push code to GitHub
Make sure your backend folder is inside repository.

### Step 2: Create Render Web Service
Go to: https://render.com

Click:
**New + → Web Service**

Select your GitHub repository.

### Step 3: Render Build Settings
- **Root Directory:** `backend`
- **Build Command:**
```bash
npm install
```

- **Start Command:**
```bash
npm start
```

### Step 4: Add Environment Variables in Render
Go to:
Render Dashboard → Your Service → Environment

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

### Step 5: Deploy
Click Deploy.

After deployment, you will get backend URL like:

```
https://invoice-backend-1-i32j.onrender.com
```

---

## ✅ Deploy Frontend on Vercel

### Step 1: Push frontend to GitHub
Make sure frontend folder is included.

### Step 2: Create Vercel Project
Go to: https://vercel.com  
Click **New Project** → Select GitHub Repo.

### Step 3: Configure Settings
- **Framework:** Vite
- **Root Directory:** `frontend`
- **Build Command:**
```bash
npm run build
```
- **Output Directory:**
```bash
dist
```

### Step 4: Update Frontend API Base URL for Production
In `frontend/src/api/axios.js`, update:

```js
baseURL: "https://your-backend-name.onrender.com/api"
```

### Step 5: Deploy
Click Deploy.

Frontend will be live at:

```
https://invoice-frontend-amber.vercel.app/
```

---

# 🛑 Common Issues & Fixes

### ❌ Issue: "Cannot GET /invoices"
✅ Fix: Ensure React Router route exists:
```jsx
<Route path="/invoices" element={<InvoiceList />} />
```

### ❌ Issue: MongoDB connection error
✅ Fix: Check MongoDB Atlas whitelist IP and correct `MONGO_URI`.

### ❌ Issue: Unauthorized / Token not working
✅ Fix: Ensure token is being stored and axios interceptor is attaching token.


# 👨‍💻 Author
**Sanjeet Kumar**
