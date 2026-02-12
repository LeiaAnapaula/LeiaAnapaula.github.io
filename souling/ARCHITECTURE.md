# Souling - Technical Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     SOULING PLATFORM                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │   Frontend   │◄────────┤   Backend    │                 │
│  │  React App   │         │  Express.js  │                 │
│  └──────┬───────┘         └──────┬───────┘                 │
│         │                        │                          │
│    ┌────▼──────┐          ┌──────▼────────┐               │
│    │  Three.js │          │  Anthropic    │               │
│    │  Avatar   │          │  Claude API   │               │
│    └───────────┘          └───────────────┘               │
│                                  │                          │
│                           ┌──────▼────────┐               │
│                           │  PostgreSQL   │               │
│                           │   Database    │               │
│                           └───────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Core Components

### 1. Frontend (React + Vite)

**Technology Stack:**
- React 18 with functional components and hooks
- React Router for navigation
- Tailwind CSS for styling
- Three.js for 3D avatar rendering
- Lucide React for icons

**Key Components:**

#### Landing Page
- Marketing and feature showcase
- Call-to-action for registration
- Feature cards with animations

#### Authentication System
- Login/Register flows
- Role selection (Patient/Therapist)
- Session management with localStorage

#### Inner Child Avatar Creator
- Multi-step form for collecting memories
- 3D visualization using Three.js
- AI-generated profile creation
- Emotional mapping

#### Session Builder
- Therapist selection
- Goal definition
- Memory integration
- AI script generation

#### Patient Portal
- Session management
- Therapeutic journal
- Progress tracking
- Quick actions dashboard

#### Therapist Portal
- Patient management
- Session enhancement tools
- Analytics dashboard
- Practice insights

### 2. Backend (Node.js + Express)

**Technology Stack:**
- Express.js web framework
- Anthropic Claude API for AI features
- PostgreSQL for data persistence
- CORS for cross-origin requests

**API Architecture:**

#### Authentication Layer
```javascript
POST /api/auth/register
POST /api/auth/login
```

#### Inner Child Profile Management
```javascript
POST /api/inner-child/create
GET /api/inner-child/:userId
```

#### Session Management
```javascript
POST /api/session/create
POST /api/session/generate-script
POST /api/session/enhance-audio
```

#### Therapist Services
```javascript
GET /api/therapists
POST /api/therapist/update-profile
```

#### Patient Services
```javascript
GET /api/patient/sessions/:patientId
POST /api/patient/journal
```

#### Analytics
```javascript
GET /api/analytics/patient-progress/:patientId
```

### 3. AI Integration (Anthropic Claude)

**Model Used:** Claude Sonnet 4

**AI Features:**

#### Inner Child Profile Generation
- Analyzes childhood memories
- Creates visual descriptions
- Identifies emotional patterns
- Suggests healing approaches

**Prompt Structure:**
```
Input: Age, memories, characteristics
Output: Therapeutic profile with:
  - Visual description
  - Emotional patterns
  - Core wounds
  - Healing affirmations
  - Therapeutic recommendations
```

#### Hypnotherapy Script Generation
- Creates personalized session scripts
- Incorporates inner child data
- Uses proven hypnotherapy techniques
- Includes timing and pacing

**Prompt Structure:**
```
Input: Patient profile, inner child data, goals
Output: Complete script with:
  - Induction
  - Deepening
  - Visualization
  - Memory reprocessing
  - Positive suggestions
  - Emergence
```

#### Session Enhancement
- Analyzes therapist feedback
- Identifies impactful moments
- Refines language and pacing
- Strengthens therapeutic techniques

**Prompt Structure:**
```
Input: Original script, feedback, patient response
Output: Enhanced script with:
  - Therapist insights integrated
  - Emotional responses addressed
  - Improved pacing
  - Deepened techniques
```

#### Journal Insights
- Analyzes patient journal entries
- Identifies emotional themes
- Provides compassionate reflections
- Suggests session focus areas

### 4. 3D Avatar System (Three.js)

**Implementation:**
- Sphere-based avatar representation
- Particle system for magical effects
- Ambient and directional lighting
- Continuous rotation animation
- Transparent background

**Future Enhancements:**
- Humanoid model with customization
- Facial expressions based on emotions
- Age-appropriate appearance
- Memory-triggered animations
- Interactive avatar dialogue

### 5. Database Schema (PostgreSQL)

**Core Tables:**

#### Users
- Authentication credentials
- Role (patient/therapist)
- Profile information

#### Therapists
- Specializations
- Certifications
- Ratings and reviews
- Session statistics

#### Inner Child Profiles
- Age and memories
- Characteristics
- AI-generated insights
- Visual attributes

#### Sessions
- Patient-therapist pairing
- Session type and goals
- Generated scripts
- Audio recordings
- Outcomes and ratings

#### Audio Enhancements
- Enhancement history
- Feedback loops
- Version tracking

#### Journal Entries
- Patient reflections
- AI insights
- Session connections

## 🔄 Data Flow

### Patient Journey Flow

```
1. Registration → Create Account
2. Dashboard → View Quick Actions
3. Inner Child → Build Avatar Profile
   ↓
   AI analyzes memories & creates profile
   ↓
4. Session Builder → Select Therapist & Define Goals
   ↓
   AI generates personalized script
   ↓
5. Patient Portal → Access Session
6. Journal → Reflect on Experience
   ↓
   AI provides insights
   ↓
7. Progress → Track Healing Journey
```

### Therapist Enhancement Flow

```
1. Patient completes session
2. Patient provides feedback
3. Therapist reviews session
4. Therapist submits professional insights
   ↓
   AI analyzes both perspectives
   ↓
5. AI generates enhanced version
6. Enhanced script available for future sessions
7. Platform learns and improves
```

## 🔒 Security Architecture

### Authentication
- Password hashing (bcrypt in production)
- JWT token-based sessions
- Role-based access control

### API Security
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention

### Data Protection
- HIPAA compliance considerations
- Encrypted sensitive data
- Secure API key management
- Regular security audits

## 📊 Scalability Considerations

### Horizontal Scaling
- Stateless API design
- Load balancer ready
- Session storage externalization

### Caching Strategy
- API response caching
- Static asset CDN
- Database query optimization

### Performance Optimization
- Lazy loading components
- Code splitting
- Image optimization
- API request batching

## 🎨 UI/UX Design Philosophy

### Visual Design
- Dark gradient background (purple to blue)
- Glassmorphism effects
- Smooth transitions
- Responsive layouts

### User Experience
- Minimal cognitive load
- Clear call-to-actions
- Progressive disclosure
- Emotional design

### Accessibility
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus indicators

## 🚀 Future Enhancements

### Phase 2 Features
- Voice-to-text for session notes
- Real-time audio generation
- Advanced 3D avatar customization
- Group therapy sessions

### Phase 3 Features
- Mobile native apps (iOS/Android)
- Offline session playback
- Wearable integration
- VR therapy experiences

### AI Improvements
- Multi-modal AI (voice + text)
- Emotion detection from audio
- Personalized voice synthesis
- Predictive analytics for outcomes

### Platform Expansion
- Marketplace for therapists
- Session templates library
- Community features
- Integration with health records

## 📈 Metrics & Analytics

### Key Performance Indicators

**Patient Metrics:**
- Session completion rate
- Emotional breakthrough frequency
- Journal engagement
- Session ratings

**Therapist Metrics:**
- Patient retention
- Session effectiveness
- Enhancement frequency
- Response time

**Platform Metrics:**
- User growth rate
- Session generation time
- AI script quality scores
- System uptime

## 🔧 Development Workflow

### Local Development
```bash
# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev
```

### Testing Strategy
- Unit tests for components
- Integration tests for API
- E2E tests for user flows
- AI prompt testing

### CI/CD Pipeline
1. Code commit
2. Automated tests
3. Build process
4. Staging deployment
5. Manual QA
6. Production deployment

## 📱 Mobile Strategy

### Progressive Web App
- Service workers for offline
- Push notifications
- Add to home screen
- App-like experience

### Native Mobile Apps
- React Native for code sharing
- Platform-specific optimizations
- Native audio features
- Biometric authentication

---

This architecture is designed to scale with the vision of becoming the "Operating System for the Human Soul" - a transformative platform that revolutionizes therapeutic healing through technology.
