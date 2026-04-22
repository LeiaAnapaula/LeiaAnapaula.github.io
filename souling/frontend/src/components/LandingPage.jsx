import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Sparkles, Users, Mic, Zap, PlayCircle, ArrowRight, Wand2 } from 'lucide-react';

const spatialRealAvatars = [
  {
    name: 'Astra',
    role: 'Trauma Release Guide',
    description: 'Leads calming protocols for emotional safety and grounding before deeper healing work.',
    spatialUrl: 'https://spatialreal.com/avatar/astra'
  },
  {
    name: 'Nova',
    role: 'Inner Child Companion',
    description: 'Supports memory reprocessing sessions with compassionate prompts and reflection.',
    spatialUrl: 'https://spatialreal.com/avatar/nova'
  },
  {
    name: 'Lumi',
    role: 'Somatic Breath Coach',
    description: 'Guides breath and body awareness to regulate the nervous system in real time.',
    spatialUrl: 'https://spatialreal.com/avatar/lumi'
  },
  {
    name: 'Kai',
    role: 'Confidence Architect',
    description: 'Builds personalized confidence scripts and reinforcement routines after each session.',
    spatialUrl: 'https://spatialreal.com/avatar/kai'
  },
  {
    name: 'Mira',
    role: 'Relationship Pattern Analyst',
    description: 'Identifies recurring relational dynamics and supports healthier communication scripts.',
    spatialUrl: 'https://spatialreal.com/avatar/mira'
  },
  {
    name: 'Zion',
    role: 'Stress Reset Specialist',
    description: 'Creates fast reset routines for panic loops, overwhelm, and emotional flooding.',
    spatialUrl: 'https://spatialreal.com/avatar/zion'
  },
  {
    name: 'Sage',
    role: 'Purpose & Meaning Mentor',
    description: 'Helps users reconnect with values, identity, and long-term direction.',
    spatialUrl: 'https://spatialreal.com/avatar/sage'
  },
  {
    name: 'Eden',
    role: 'Sleep & Recovery Optimizer',
    description: 'Designs evening decompression journeys to improve recovery and emotional processing.',
    spatialUrl: 'https://spatialreal.com/avatar/eden'
  },
  {
    name: 'Orion',
    role: 'Peak Performance Coach',
    description: 'Delivers focus and flow-state routines for creators, founders, and athletes.',
    spatialUrl: 'https://spatialreal.com/avatar/orion'
  },
  {
    name: 'Vega',
    role: 'Self-Love Integrator',
    description: 'Supports self-worth healing with affirmational loops and post-session integration.',
    spatialUrl: 'https://spatialreal.com/avatar/vega'
  },
  {
    name: 'Sol',
    role: 'Spiritual Alignment Guide',
    description: 'Blends reflective inquiry and mindfulness for deeper inner coherence.',
    spatialUrl: 'https://spatialreal.com/avatar/sol'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="container mx-auto px-6 py-20">
        <nav className="flex justify-between items-center mb-20">
          <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            Souling
          </div>
          <div className="space-x-4">
            <Link to="/login" className="px-6 py-2 rounded-full border border-white/30 hover:bg-white/10 transition">
              Login
            </Link>
            <Link to="/register" className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition">
              Get Started
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-5xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 text-sm text-purple-100">
            <Wand2 className="w-4 h-4 text-pink-300" />
            SpatialReal-powered avatar network now live
          </div>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Meet Souling's
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              11 AI Healing Avatars
            </span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 leading-relaxed">
            Your SpatialReal avatar collective is now the core of the Souling experience. Each avatar is designed for a
            distinct emotional and transformational outcome—from nervous system regulation to confidence, purpose, and
            deep inner child repair.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#avatars"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition transform hover:scale-105 shadow-2xl"
            >
              Explore Avatars
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg rounded-full border border-white/30 hover:bg-white/10 transition"
            >
              Start with Souling
            </Link>
          </div>
        </div>

        <div id="avatars" className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3">Connected to Your SpatialReal Avatar System</h2>
            <p className="text-purple-200 max-w-3xl mx-auto">
              Launch any of your 11 AI avatars directly and guide users into the right therapeutic journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {spatialRealAvatars.map((avatar, index) => (
              <article
                key={avatar.name}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-pink-300 mb-1">Avatar {index + 1}</p>
                    <h3 className="text-2xl font-bold">{avatar.name}</h3>
                    <p className="text-purple-300 text-sm">{avatar.role}</p>
                  </div>
                  <Sparkles className="w-6 h-6 text-pink-400 flex-shrink-0" />
                </div>
                <p className="text-purple-200 mb-5 leading-relaxed">{avatar.description}</p>
                <a
                  href={avatar.spatialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition"
                >
                  <PlayCircle className="w-4 h-4" />
                  Open in SpatialReal
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Heart className="w-12 h-12" />}
            title="Avatar-Centered Healing"
            description="Route each user to the best-fit AI guide instantly and tailor the therapeutic arc from day one."
          />
          <FeatureCard
            icon={<Mic className="w-12 h-12" />}
            title="Voice-Led Breakthroughs"
            description="Blend avatar conversations with hypnotherapy flows designed for breakthrough moments in one session."
          />
          <FeatureCard
            icon={<Brain className="w-12 h-12" />}
            title="Adaptive Intelligence"
            description="Use ongoing session data to optimize scripts, sequencing, and outcomes across all 11 avatars."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12" />}
            title="Human + AI Care Team"
            description="Let therapists orchestrate interventions while avatars provide always-on support between sessions."
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12" />}
            title="Fast Implementation"
            description="Deploy your avatar ecosystem in one unified landing flow designed for conversion and clarity."
          />
          <FeatureCard
            icon={<Sparkles className="w-12 h-12" />}
            title="Premium Brand Presence"
            description="Present Souling as a cutting-edge healing brand with a coherent, high-trust AI avatar narrative."
          />
        </div>

        <div className="text-center bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Avatar-Led Experience?</h2>
          <p className="text-purple-200 mb-8 text-lg">
            Turn your 11 SpatialReal avatars into one cohesive, conversion-ready therapeutic front door.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/register?role=patient"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition"
            >
              Begin Healing
            </Link>
            <Link
              to="/register?role=therapist"
              className="px-8 py-4 rounded-full border border-white/30 hover:bg-white/10 transition"
            >
              Join as Therapist
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 py-8 text-center text-purple-300">
        <p>© 2026 Souling. Connected to your SpatialReal avatar collective.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition">
      <div className="text-pink-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-purple-200 leading-relaxed">{description}</p>
    </div>
  );
}
