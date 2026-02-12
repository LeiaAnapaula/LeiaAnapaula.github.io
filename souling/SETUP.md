# Souling - Setup & Deployment Guide

## 🌟 Overview

Souling is a revolutionary platform that combines AI-powered hypnotherapy with inner child healing. This guide will help you get the platform up and running.

## 📋 Prerequisites

- Node.js v18 or higher
- PostgreSQL 14 or higher (for production)
- Anthropic API key
- npm or yarn package manager

## 🚀 Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Edit `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🗄️ Database Setup (Production)

For production, you'll want to set up PostgreSQL:

### PostgreSQL Schema

```sql
-- Create database
CREATE DATABASE souling;

-- Users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Therapists table
CREATE TABLE therapists (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    specializations TEXT[],
    bio TEXT,
    certifications TEXT[],
    verified BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 0,
    sessions_count INTEGER DEFAULT 0
);

-- Inner child profiles table
CREATE TABLE inner_child_profiles (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    age INTEGER,
    memories JSONB,
    characteristics JSONB,
    ai_generated_profile TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    patient_id VARCHAR(255) REFERENCES users(id),
    therapist_id VARCHAR(255) REFERENCES therapists(id),
    session_type VARCHAR(100),
    goals TEXT,
    memories TEXT,
    status VARCHAR(50) DEFAULT 'scheduled',
    script TEXT,
    audio_url VARCHAR(500),
    transcript TEXT,
    rating INTEGER,
    breakthrough BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Audio enhancements table
CREATE TABLE audio_enhancements (
    id VARCHAR(255) PRIMARY KEY,
    session_id VARCHAR(255) REFERENCES sessions(id),
    original_script TEXT,
    enhanced_script TEXT,
    therapist_feedback TEXT,
    patient_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Journal entries table
CREATE TABLE journal_entries (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    session_id VARCHAR(255) REFERENCES sessions(id),
    entry TEXT,
    ai_insights TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Inner Child Avatar
- `POST /api/inner-child/create` - Create inner child profile
- `GET /api/inner-child/:userId` - Get inner child profile

### Sessions
- `POST /api/session/create` - Create new session
- `POST /api/session/generate-script` - Generate AI script
- `POST /api/session/enhance-audio` - Enhance session with AI

### Therapists
- `GET /api/therapists` - List all therapists
- `POST /api/therapist/update-profile` - Update therapist profile

### Patients
- `GET /api/patient/sessions/:patientId` - Get patient sessions
- `POST /api/patient/journal` - Submit journal entry

### Analytics
- `GET /api/analytics/patient-progress/:patientId` - Get progress metrics

## 🎨 Frontend Features

### Patient Flow
1. **Registration** → Create account as patient
2. **Inner Child Avatar** → Build personalized avatar
3. **Session Builder** → Design hypnotherapy session
4. **Patient Portal** → Access sessions, journal, progress

### Therapist Flow
1. **Registration** → Create account as therapist
2. **Therapist Portal** → Manage patients
3. **Session Enhancement** → Use AI to improve sessions
4. **Analytics** → Track practice success

## 🔧 Configuration

### Backend Configuration

Edit `backend/server.js` to customize:
- Port number
- CORS settings
- API rate limits
- Database connection

### Frontend Configuration

Edit `frontend/vite.config.js` to customize:
- Development server port
- Build settings
- Proxy configuration

## 🚢 Production Deployment

### Backend Deployment

1. Build for production:
```bash
cd backend
npm install --production
```

2. Set production environment variables
3. Use PM2 or similar for process management:
```bash
npm install -g pm2
pm2 start server.js --name souling-backend
```

### Frontend Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to your hosting service:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Your own server with Nginx

### Environment Variables for Production

Backend:
- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `PORT` - Server port (default: 3001)
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` - PostgreSQL credentials
- `JWT_SECRET` - Secret for JWT tokens
- `NODE_ENV=production`

Frontend:
- `VITE_API_URL` - Backend API URL

## 🔒 Security Considerations

1. **Password Hashing**: Implement bcrypt for password hashing
2. **JWT Authentication**: Add JWT token-based auth
3. **HTTPS**: Use SSL certificates in production
4. **Rate Limiting**: Implement API rate limiting
5. **Input Validation**: Validate all user inputs
6. **CORS**: Configure CORS properly for production

## 📱 Mobile App

The platform is designed to be mobile-responsive. For a native mobile app:

1. Use React Native to share components
2. Implement audio playback for hypnotherapy sessions
3. Add offline support for completed sessions
4. Push notifications for session reminders

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if port 3001 is available
- Verify Anthropic API key is set
- Check Node.js version (v18+)

**Frontend won't start:**
- Clear node_modules and reinstall
- Check if port 3000 is available
- Verify all dependencies installed

**API calls failing:**
- Check backend is running
- Verify CORS settings
- Check API endpoints in frontend

## 📚 Additional Resources

- [Anthropic API Documentation](https://docs.anthropic.com)
- [React Documentation](https://react.dev)
- [Three.js Documentation](https://threejs.org/docs)
- [Express.js Guide](https://expressjs.com)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check environment variables
4. Verify dependencies are installed

## 📄 License

This project is proprietary software for Souling platform.

---

Built with ❤️ for transformative healing experiences.
