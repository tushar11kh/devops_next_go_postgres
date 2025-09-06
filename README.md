# devops_next_go_postgres

This project is a learning-oriented **full-stack application** where the application code was generated with AI, and the **DevOps implementation** was done from scratch.  
The focus is on **containerization best practices**, **image optimization**, and **networking fundamentals** in Docker.

---

## 🚀 Project Structure
- **Frontend**: React web app.
- **Backend**: Node.js application.
- **Database**: PostgreSQL (official image).

All three components are containerized with Docker.

---

## 🐳 Dockerization Journey

### 1. Single-Stage Dockerfiles
- First attempt used **single-stage Dockerfiles**.
- Drawback: large images with build tools and unnecessary files.

📌 Example:  
- Backend image: **1.04 GB**  
- Frontend image: **1.3 GB**

---

### 2. Multi-Stage Builds
- Split the Dockerfile into **build stage** (dependencies + compilation) and **runtime stage** (only production artifacts).
- Cleaner images with smaller footprint.

📌 Example:  
- Backend reduced to **46.7 MB**  
- Frontend reduced to **1.79 GB**

---

### 3. Distroless Images
- Final optimization using **Google’s Distroless** images:
  - Contain only the minimal runtime.
  - No package managers or shells.
  - Improves **security** and reduces **attack surface**.

📌 Example:  
- Backend final size: **32.9 MB**  
- Frontend final size: **980 MB**

---

## 📊 Docker Image Size Comparison

### Backend
| Stage              | Image Size |
|--------------------|------------|
| Single-Stage       | 1.04 GB    |
| Multi-Stage        | 46.7 MB    |
| Distroless         | 32.9 MB    |

### Frontend
| Stage              | Image Size |
|--------------------|------------|
| Single-Stage       | 1.3 GB     |
| Multi-Stage        | 1.79 GB    |
| Distroless         | 980 MB     |

---

## 🌐 Networking & Ports

### Port Mappings
- **Frontend (React)** runs on port **3000** inside the container.  
  Mapped to host: `localhost:3000`.  
- **Backend (Node.js)** runs on port **5000** inside the container.  
  Mapped to host: `localhost:5000`.  
- **Postgres** runs on port **5432** inside the container.  
  Mapped to host: `localhost:5432`.

### Communication Flow
- **Frontend → Backend**:  
  API requests from React (`localhost:3000`) are forwarded to the backend container on port `5000`.  
- **Backend → Database**:  
  Node.js connects to Postgres on port `5432` using container DNS (e.g., `postgres:5432`).  
- **Host → Containers**:  
  Ports are exposed to allow external access (e.g., developer testing via browser or API client).

---

## 🖼️ Architecture Diagram

```mermaid
flowchart LR
    User[User Browser] -->|HTTP:3000| Frontend[React Container]
    Frontend -->|API Calls:5000| Backend[Node.js Container]
    Backend -->|DB Queries:5432| Database[(Postgres Container)]

graph TD
    A[Single-Stage Build] -->|Large Image| B[Multi-Stage Build]
    B -->|Smaller, Cleaner| C[Distroless Image]
    C -->|Final Output| D[Production-Ready Container]
