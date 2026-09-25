# Codexia

<p align="center">
  <h2 align="center">⚡ Codexia — AI-Powered Cloud Code Editor & Workspace</h2>
  <p align="center">
    A production-grade, cloud-native IDE with an autonomous AI coding agent, live multi-environment preview, interactive cloud terminal, and microservices architecture.
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-blue.svg" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-Build%20Tool-purple.svg" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-Express%20Microservices-green.svg" alt="Node.js Express" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini%20%2B%20LangGraph-orange.svg" alt="Gemini LangGraph" />
  <img src="https://img.shields.io/badge/Payments-Cashfree%20PG-00C9A7.svg" alt="Cashfree Payments" />
  <img src="https://img.shields.io/badge/Cloud-AWS%20ECS%20Fargate-FF9900.svg" alt="AWS ECS" />
  <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen.svg" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Cache-Redis-red.svg" alt="Redis" />
</p>

---

## 🌟 Overview

**Codexia** is a modern cloud-based IDE designed to elevate developer velocity. Rather than merely offering code auto-completion, Codexia incorporates an autonomous coding agent that understands project structure, creates and updates files, performs live refactors, and streams reasoning directly to the user.

Key highlights include:
- **Autonomous AI Agent**: Inspects filesystem trees, executes actions (`create_folder`, `create_file`, `update_file`, `delete_file`), and delivers real-time updates via Server-Sent Events (SSE).
- **Dual Live Preview**: In-browser sandboxed rendering for HTML/CSS/JS and React applications.
- **Interactive Cloud Terminal**: Real-time terminal sessions via WebSockets and `node-pty`.
- **Microservices Architecture**: 6 specialized microservices coordinated by a centralized API Gateway.
- **Cashfree Payments Integration**: Production-ready checkout with modal payments and credit tier replenishment.
- **Enterprise-Grade Cloud Deployment**: AWS ECS Fargate, Application Load Balancers, CloudFront CDN, and S3.

---

## 🏗️ System Architecture

```
                                  ┌───────────────────────────┐
                                  │      Client Browser       │
                                  │ (React 18 + Vite Frontend)│
                                  └─────────────┬─────────────┘
                                                │ HTTPS / WSS
                                                ▼
                                  ┌───────────────────────────┐
                                  │      CloudFront CDN       │
                                  └─────────────┬─────────────┘
                                                │
                                                ▼
                                  ┌───────────────────────────┐
                                  │     API Gateway (8000)    │
                                  │ Reverse Proxy, Auth, SSE  │
                                  └──────┬──────────┬─────────┘
                                         │          │
         ┌───────────────────────────────┴──────────┴───────────────────────────────┐
         │                                                                          │
         ▼                                  ▼                                       ▼
┌──────────────────┐              ┌──────────────────┐                    ┌──────────────────┐
│   Auth Service   │              │    AI Service    │                    │ Payment Service  │
│      (8001)      │              │      (8004)      │                    │      (8006)      │
├──────────────────┤              ├──────────────────┤                    ├──────────────────┤
│ Firebase Admin   │              │ LangGraph Agent  │                    │ Cashfree PG SDK  │
│ Redis Sessions   │              │ Google Gemini    │                    │ Order & Credits  │
└────────┬─────────┘              └────────┬─────────┘                    └────────┬─────────┘
         │                                 │                                       │
         ▼                                 ▼                                       ▼
┌──────────────────┐              ┌──────────────────┐                    ┌──────────────────┐
│ Project Service  │              │   File Service   │                    │ Terminal Service │
│      (8002)      │              │      (8003)      │                    │      (8005)      │
├──────────────────┤              ├──────────────────┤                    ├──────────────────┤
│ CRUD, Star/Delete│              │ File System Tree │                    │ WebSocket PTY    │
│ Redis Cache      │              │ Content Storage  │                    │ Interactive Bash │
└────────┬─────────┘              └────────┬─────────┘                    └──────────────────┘
         │                                 │
         └────────────────┬────────────────┘
                          ▼
              ┌────────────────────────┐
              │   MongoDB Atlas &      │
              │ AWS ElastiCache(Redis) │
              └────────────────────────┘
```

---

## 🧩 Microservices Breakdown

| Service | Port | Description | Tech Stack |
| :--- | :---: | :--- | :--- |
| **API Gateway** | `8000` | Central entry point, cookie authentication verification, reverse proxying, SSE streaming and WebSocket upgrade. | Express, `http-proxy`, `express-http-proxy`, Redis |
| **Auth Service** | `8001` | Authentication via Firebase OAuth, distributed session tokens, credit deductions and top-ups. | Firebase Admin SDK, MongoDB, Redis |
| **Project Service** | `8002` | Project lifecycle management (create, list, star, delete) with Redis caching. | Express, Mongoose, Redis |
| **File Service** | `8003` | Virtual file tree, folder creation, file content reading/writing. | Express, Mongoose |
| **AI Service** | `8004` | Autonomous agent execution graph with tools, context building, and SSE streaming. | LangChain, LangGraph, Google Gemini |
| **Terminal Service** | `8005` | Real-time cloud shell sessions over Socket.IO and node-pty. | Socket.IO, `node-pty` |
| **Payment Service** | `8006` | Payment order creation, verification, credit allocation. | Cashfree Payments PG v3 SDK, Mongoose |

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 18, Vite
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS, Framer Motion
- **Icons**: Lucide React
- **Payments**: Cashfree Payments Web Checkout SDK v3
- **Terminal UI**: Xterm.js

### Backend & Core Services
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **AI Framework**: `@langchain/langgraph`, `@langchain/google-genai`, `@langchain/core`
- **Authentication**: Firebase Admin SDK
- **Caching & Sessions**: Redis (ioredis)
- **Database**: MongoDB Atlas via Mongoose
- **Payments**: `cashfree-pg` (Production Environment)

### Cloud & DevOps
- **Containerization**: Docker
- **Orchestration**: AWS ECS (Elastic Container Service) on AWS Fargate
- **CDN & Storage**: AWS CloudFront, AWS S3
- **Networking**: Application Load Balancer (ALB), Target Groups, VPC

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- MongoDB instance (local or MongoDB Atlas)
- Redis instance (local or cloud)
- Cashfree Payments Developer / Production Account
- Google Gemini API Key
- Firebase Project with Google OAuth enabled

---

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arkokundu500/Codexia.git
   cd Codexia
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

   Create `frontend/.env`:
   ```env
   VITE_SERVER_URL=http://localhost:8000
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

3. **Backend Services Setup:**
   Each service has its own dependencies and `.env` file:

   - **Gateway (`backend/gateway`)**:
     ```bash
     cd backend/gateway
     npm install
     ```
     `.env`:
     ```env
     PORT=8000
     FRONTEND_URL=http://localhost:5173
     AUTH_SERVICE=http://localhost:8001
     PROJECT_SERVICE=http://localhost:8002
     FILE_SERVICE=http://localhost:8003
     AI_SERVICE=http://localhost:8004
     TERMINAL_SERVICE=http://localhost:8005
     PAYMENT_SERVICE=http://localhost:8006
     REDIS_URL=redis://localhost:6379
     ```

   - **Payment Service (`backend/services/payment`)**:
     ```bash
     cd backend/services/payment
     npm install
     ```
     `.env`:
     ```env
     PORT=8006
     MONGODB_URI=your_mongodb_uri
     REDIS_URL=redis://localhost:6379
     CASHFREE_APP_ID=your_cashfree_app_id
     CASHFREE_SECRET_KEY=your_cashfree_secret_key
     CASHFREE_ENV=PRODUCTION
     AUTH_SERVICE=http://localhost:8001
     ```

   - Repeat `npm install` for `auth`, `project`, `file`, `ai`, and `terminal` services.

4. **Running Locally:**
   Run services in separate terminal windows or with a process manager like `concurrently`:
   ```bash
   # In frontend:
   npm run dev

   # In backend/gateway:
   npm run dev
   ```

---

## 💳 Payments Integration (Cashfree)

Codexia uses **Cashfree Payments PG SDK** for reliable, compliant payment processing:
- **Order Creation**: Frontend requests order creation with selected tier (`pro` or `team`).
- **Payment Session**: Payment service calls `Cashfree.PGCreateOrder()` and returns a secure `payment_session_id`.
- **Seamless Drop-In Checkout**: In-page modal checkout launched via Cashfree JS SDK v3:
  ```js
  const cashfree = window.Cashfree({ mode: "production" });
  cashfree.checkout({ paymentSessionId, redirectTarget: "_modal" });
  ```
- **Verification & Credit Allocation**: Once completed, backend verifies transaction status with `Cashfree.PGFetchOrder()` and dynamically tops up user credits.

---

## 🔒 Security & Best Practices

- **HTTP-Only & Secure Cookies**: Authentication tokens are stored in strict `httpOnly`, `secure`, and `sameSite` cookies.
- **Distributed Session Invalidation**: Single-point Redis cache flush ensures immediate logout across all microservices.
- **Stream Buffering**: API Gateway safely restreams JSON bodies while maintaining uninterrupted SSE pipes to the AI agent.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/arkokundu500">Arko Kundu</a>
</p>
