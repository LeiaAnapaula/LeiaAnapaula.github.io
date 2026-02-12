const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// In-memory storage (replace with PostgreSQL in production)
const database = {
  users: [],
  therapists: [],
  sessions: [],
  innerChildProfiles: [],
  audioEnhancements: []
};

// ============= AUTH ROUTES =============

app.post('/api/auth/register', (req, res) => {
  const { email, password, role, name } = req.body;
  
  const user = {
    id: `user_${Date.now()}`,
    email,
    password, // Hash in production!
    role, // 'patient' or 'therapist'
    name,
    createdAt: new Date()
  };
  
  database.users.push(user);
  
  if (role === 'therapist') {
    database.therapists.push({
      id: `therapist_${Date.now()}`,
      userId: user.id,
      specializations: [],
      verified: false,
      rating: 0,
      sessionsCount: 0
    });
  }
  
  res.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = database.users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({ success: true, user: { id: user.id, email: user.email, role: user.role } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// ============= INNER CHILD AVATAR ROUTES =============

app.post('/api/inner-child/create', async (req, res) => {
  const { userId, memories, age, characteristics } = req.body;
  
  try {
    // Use Claude to generate inner child profile
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `Based on these childhood memories and characteristics, create a detailed inner child avatar profile:
        
Age: ${age}
Memories: ${JSON.stringify(memories)}
Characteristics: ${JSON.stringify(characteristics)}

Create a therapeutic inner child profile including:
1. Visual description for avatar generation
2. Emotional patterns
3. Core wounds and needs
4. Healing affirmations
5. Therapeutic approach recommendations

Format as JSON.`
      }]
    });
    
    const profileText = message.content[0].text;
    
    const innerChildProfile = {
      id: `ic_${Date.now()}`,
      userId,
      age,
      memories,
      characteristics,
      aiGeneratedProfile: profileText,
      createdAt: new Date()
    };
    
    database.innerChildProfiles.push(innerChildProfile);
    
    res.json({ success: true, profile: innerChildProfile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/inner-child/:userId', (req, res) => {
  const profile = database.innerChildProfiles.find(p => p.userId === req.params.userId);
  res.json({ success: true, profile });
});

// ============= HYPNOTHERAPY SESSION ROUTES =============

app.post('/api/session/create', async (req, res) => {
  const { patientId, therapistId, sessionType, goals, memories } = req.body;
  
  const session = {
    id: `session_${Date.now()}`,
    patientId,
    therapistId,
    sessionType,
    goals,
    memories,
    status: 'scheduled',
    createdAt: new Date(),
    audioUrl: null,
    transcript: null
  };
  
  database.sessions.push(session);
  res.json({ success: true, session });
});

app.post('/api/session/generate-script', async (req, res) => {
  const { sessionId, patientProfile, innerChildData, therapeuticGoals } = req.body;
  
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `You are an expert hypnotherapist creating a deeply transformative session script. Create a hypnotherapy session that is emotionally powerful and designed to facilitate breakthrough moments.

Patient Profile: ${JSON.stringify(patientProfile)}
Inner Child Data: ${JSON.stringify(innerChildData)}
Therapeutic Goals: ${JSON.stringify(therapeuticGoals)}

Create a complete hypnotherapy script with:
1. Induction (progressive relaxation)
2. Deepening techniques
3. Inner child visualization and dialogue
4. Memory reprocessing and healing
5. Positive suggestions and affirmations
6. Gradual emergence

The script should be emotionally evocative, use vivid sensory language, and facilitate deep emotional release. Include pauses marked as [PAUSE - 5s], [PAUSE - 10s] etc.`
      }]
    });
    
    const script = message.content[0].text;
    
    const session = database.sessions.find(s => s.id === sessionId);
    if (session) {
      session.script = script;
      session.scriptGeneratedAt = new Date();
    }
    
    res.json({ success: true, script });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/session/enhance-audio', async (req, res) => {
  const { sessionId, therapistFeedback, patientResponse } = req.body;
  
  try {
    const session = database.sessions.find(s => s.id === sessionId);
    
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      messages: [{
        role: 'user',
        content: `Enhance this hypnotherapy script based on feedback:

Original Script: ${session.script}

Therapist Feedback: ${therapistFeedback}
Patient Response: ${patientResponse}

Provide an enhanced version that:
1. Incorporates therapist insights
2. Addresses patient's specific emotional responses
3. Strengthens the most impactful moments
4. Adjusts pacing based on feedback
5. Deepens the therapeutic techniques

Return the enhanced script.`
      }]
    });
    
    const enhancedScript = message.content[0].text;
    
    const enhancement = {
      id: `enhance_${Date.now()}`,
      sessionId,
      originalScript: session.script,
      enhancedScript,
      therapistFeedback,
      patientResponse,
      createdAt: new Date()
    };
    
    database.audioEnhancements.push(enhancement);
    session.script = enhancedScript;
    
    res.json({ success: true, enhancedScript, enhancement });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= THERAPIST ROUTES =============

app.get('/api/therapists', (req, res) => {
  const therapists = database.therapists.map(t => {
    const user = database.users.find(u => u.id === t.userId);
    return { ...t, name: user.name, email: user.email };
  });
  res.json({ success: true, therapists });
});

app.post('/api/therapist/update-profile', (req, res) => {
  const { therapistId, specializations, bio, certifications } = req.body;
  
  const therapist = database.therapists.find(t => t.id === therapistId);
  if (therapist) {
    therapist.specializations = specializations;
    therapist.bio = bio;
    therapist.certifications = certifications;
    res.json({ success: true, therapist });
  } else {
    res.status(404).json({ success: false, message: 'Therapist not found' });
  }
});

// ============= PATIENT ROUTES =============

app.get('/api/patient/sessions/:patientId', (req, res) => {
  const sessions = database.sessions.filter(s => s.patientId === req.params.patientId);
  res.json({ success: true, sessions });
});

app.post('/api/patient/journal', async (req, res) => {
  const { userId, entry, sessionId } = req.body;
  
  try {
    // Use Claude to analyze journal entry and provide insights
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{
        role: 'user',
        content: `Analyze this therapeutic journal entry and provide compassionate insights:

Entry: ${entry}

Provide:
1. Emotional themes identified
2. Progress indicators
3. Gentle reflections
4. Suggested areas for next session
5. Affirmations based on the entry

Be warm, validating, and therapeutically supportive.`
      }]
    });
    
    const insights = message.content[0].text;
    
    res.json({ success: true, insights });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= ANALYTICS & INSIGHTS =============

app.get('/api/analytics/patient-progress/:patientId', (req, res) => {
  const sessions = database.sessions.filter(s => s.patientId === req.params.patientId);
  
  const progress = {
    totalSessions: sessions.length,
    completedSessions: sessions.filter(s => s.status === 'completed').length,
    emotionalBreakthroughs: sessions.filter(s => s.breakthrough).length,
    averageRating: sessions.reduce((sum, s) => sum + (s.rating || 0), 0) / sessions.length
  };
  
  res.json({ success: true, progress });
});

// ============= START SERVER =============

app.listen(PORT, () => {
  console.log(`🌟 Souling backend running on port ${PORT}`);
  console.log(`💫 Transforming lives, one session at a time`);
});

module.exports = app;
