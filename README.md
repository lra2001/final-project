# Gaming Community Dashboard

A **Progressive Web Application (PWA)** built using **Django (backend)** and **React + Vite (frontend)**.
The app aims to provide a centralized platform for gamers to connect, review games, and track gaming activities with personalized dashboards.

---

## Tech Stack

| Layer | Technology | Description |
|--------|-------------|-------------|
| **Frontend** | React + Vite | Modern, fast frontend with modular components |
| **Backend** | Django + Django REST Framework | Provides API endpoints and business logic |
| **Database** | PostgreSQL | Relational database for structured data |
| **Environment** | Python, Node.js, npm | Backend and frontend runtime environments |
| **UI Frameworks** | Bootstrap 5, Bootstrap Icons | Responsive and accessible design components |
| **Version Control** | Git + GitHub | Code management and collaboration |
| **Deployment (Planned)** | Render (Backend), Netlify/Vercel (Frontend) | Scalable hosting for both layers |
| **Extras** | dotenv, psycopg2, DRF, PWA manifest | Secure configuration and offline support |

---

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/lra2001/final-project
cd final-project
```

### 2. Create and Activate Virtual Environment
```bash
python -m venv venv
```
**Windows:**
```bash
venv\Scripts\activate
```

### 3. Upgrade pip
```bash
python -m pip install --upgrade pip
```

### 4. Install Django and REST Framework
```bash
pip install django djangorestframework python-dotenv psycopg[binary]
```

### 5. Configure PostgreSQL Database
Create a `.env` file in your project root:
```env
ENGINE=django.db.backends.postgresql
NAME=postgres
USER=masteruser
PASSWORD=12345678
HOST=localhost
PORT=5432
```

Update `settings.py`:
```python
import os
from dotenv import load_dotenv
load_dotenv()

DATABASES = {
    'default': {
        'ENGINE': os.getenv('ENGINE'),
        'NAME': os.getenv('NAME'),
        'USER': os.getenv('USER'),
        'PASSWORD': os.getenv('PASSWORD'),
        'HOST': os.getenv('HOST'),
        'PORT': os.getenv('PORT'),
    }
}
```

### 6. Apply Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Create Superuser
```bash
python manage.py createsuperuser
```

---

## Frontend Setup (React + Vite)

### 1. Create React App
In your project root (same level as `manage.py`):
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Configure Proxy for API Requests
Edit `vite.config.js`:
```js
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
});
```

This allows React (port 5173) to communicate with Django (port 8000) without CORS issues.

---

## Folder Structure (Planned)

```
final-project/
├── backend/
│   ├── manage.py
│   ├── gaming_community_dashboard/
│   ├── users/
│   ├── games/
│   ├── reviews/
│   └── dashboard/
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## Progressive Web App (PWA)

The goal is to make the app installable and available offline using:
- **`vite-plugin-pwa`**
- Service Worker for caching
- `manifest.json` for icons and app metadata

---

## Features (Planned)

- User authentication & profile management
- Browse and review games
- Rate and comment on games
- Dashboard for user activity
- PWA support (installable and offline-ready)
- API integration for external game data