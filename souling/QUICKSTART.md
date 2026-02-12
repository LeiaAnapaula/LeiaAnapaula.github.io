# 🌟 Souling - Quick Start Guide

Welcome to Souling - the Operating System for the Human Soul!

## ⚡ Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd souling/backend
npm install
```

**Frontend:**
```bash
cd souling/frontend
npm install
```

### Step 2: Configure Environment

Create a `.env` file in the `backend` folder:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
```

> **Get your Anthropic API key:** Visit https://console.anthropic.com/

### Step 3: Start the Application

**In one terminal (Backend):**
```bash
cd backend
npm run dev
```

**In another terminal (Frontend):**
```bash
cd frontend
npm run dev
```

### Step 4: Open Your Browser

Visit: `http://localhost:3000`

You should see the beautiful Souling landing page!

## 🎯 First Time Setup

### Create Your Account

1. Click "Get Started" or "Register"
2. Choose "I am a... Patient" or "Therapist"
3. Fill in your details
4. Click "Create Account"

### For Patients:

**Create Your Inner Child Avatar:**
1. From the dashboard, click "Inner Child Avatar"
2. Share your childhood age and memories
3. Describe how you felt
4. Let AI create your personalized avatar
5. Review your inner child profile

**Create Your First Session:**
1. Click "New Session" from dashboard
2. Choose a therapist
3. Define your therapeutic goals
4. Add any specific memories to work on
5. Let AI generate your personalized hypnotherapy script

### For Therapists:

**Set Up Your Profile:**
1. From dashboard, go to Therapist Portal
2. Add your specializations
3. Upload certifications
4. Set your availability

**Work with Patients:**
1. View your patient list
2. Review their inner child profiles
3. Create and enhance sessions
4. Use AI to continuously improve your sessions

## 📁 Project Structure

```
souling/
├── backend/              # Express.js API server
│   ├── server.js        # Main server file
│   ├── package.json     # Dependencies
│   └── .env.example     # Environment template
│
├── frontend/            # React application
│   ├── src/
│   │   ├── App.jsx              # Main app component
│   │   ├── components/          # All React components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── InnerChildAvatar.jsx
│   │   │   ├── SessionBuilder.jsx
│   │   │   ├── PatientPortal.jsx
│   │   │   └── TherapistPortal.jsx
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   └── package.json
│
├── README.md           # Project overview
├── SETUP.md           # Detailed setup guide
└── ARCHITECTURE.md    # Technical documentation
```

## 🎨 Key Features

### 1. Inner Child Avatar
- Create a vivid 3D representation of your inner child
- AI analyzes your memories and emotions
- Personalized healing profile

### 2. AI-Powered Hypnotherapy
- Sessions designed to create breakthroughs
- Scripts personalized to your story
- Continuous enhancement based on outcomes

### 3. Therapist Platform
- Manage multiple patients
- Enhance sessions with AI insights
- Track practice analytics

### 4. Therapeutic Journal
- Reflect on your experiences
- Get AI-powered insights
- Track your healing journey

## 🔧 Troubleshooting

**Problem: Backend won't start**
- Make sure you have Node.js v18+
- Check if port 3001 is free
- Verify your .env file has ANTHROPIC_API_KEY

**Problem: Frontend shows blank page**
- Check browser console for errors
- Make sure backend is running
- Clear cache and reload

**Problem: API calls failing**
- Verify backend is running on port 3001
- Check CORS settings in server.js
- Make sure Anthropic API key is valid

## 📚 Next Steps

1. **Read SETUP.md** for production deployment
2. **Read ARCHITECTURE.md** to understand the system
3. **Customize** the platform for your needs
4. **Add features** like audio generation, payment processing

## 🤝 Support & Feedback

This is your platform - make it yours! The code is designed to be:
- **Extensible**: Easy to add new features
- **Maintainable**: Clear structure and documentation
- **Scalable**: Ready for production deployment

## 🎯 Vision

Souling is designed to revolutionize therapeutic healing by:
- Making hypnotherapy accessible to everyone
- Empowering therapists with AI tools
- Creating genuine breakthrough moments
- Connecting people with their inner child

Remember: This platform has the potential to change lives. Each session, each avatar, each moment of healing matters.

---

**Built with ❤️ for transformative healing**

Ready to transform lives? Let's go! 🚀
