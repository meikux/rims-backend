# 🍴 Restaurant Back-of-House Management App (Backend)

## 📌 Overview
This backend API powers a restaurant management system focused on back-of-house operations.  
It helps restaurant managers and staff streamline inventory, scheduling, and compliance tasks, with secure role-based access and scalable architecture.

---

## 🚀 Features

### ✅ MVP Features
- **Authentication**
  - JWT-based login and registration
  - Role-based access control (`manager` vs `staff`)
- **Inventory Management**
  - Add, update, delete items (manager only)
  - View inventory (staff + manager)
  - Low-stock threshold alerts

### 🔜 Planned Features
- Staff scheduling and shift planner
- POS integration for auto-updating inventory
- Analytics dashboard (sales, waste, labor)
- Supplier auto-reordering
- Compliance logs (food safety, cleaning schedules)

---

## 🛠️ Tech Stack
- **Node.js** + **Express** — API framework
- **MongoDB** + **Mongoose** — NoSQL database
- **JWT** — Authentication
- **bcrypt** — Password hashing
- **dotenv** — Environment variable management


