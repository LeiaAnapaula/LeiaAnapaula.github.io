import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Brain, Sparkles, Users, Mic, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      {/* Hero Section */}
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

        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            The Operating System
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
              for the Human Soul
            </span>
          </h1>
          <p className="text-xl text-purple-200 mb-8 leading-relaxed">
            Revolutionary hypnotherapy technology that creates breakthrough moments in a single session. 
            Connect with expert hypnotherapists and experience the transformative power of your inner child.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 text-lg rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition transform hover:scale-105 shadow-2xl"
          >
            Begin Your Journey
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Heart className="w-12 h-12" />}
            title="Inner Child Avatar"
            description="Experience your inner child through vivid, AI-generated imagery so powerful you'll dream about it. Reconnect with the version of yourself that needs healing."
          />
          <FeatureCard
            icon={<Mic className="w-12 h-12" />}
            title="One-Session Breakthroughs"
            description="Our AI-enhanced hypnotherapy audios are designed to create emotional breakthroughs in just one session. Real transformation, measurable results."
          />
          <FeatureCard
            icon={<Brain className="w-12 h-12" />}
            title="AI-Enhanced Therapy"
            description="We continuously improve hypnotherapy scripts using AI analysis, therapist expertise, and patient outcomes to create increasingly powerful sessions."
          />
          <FeatureCard
            icon={<Users className="w-12 h-12" />}
            title="Expert Hypnotherapists"
            description="Connect with verified hypnotherapists who use our cutting-edge technology to deliver transformative healing experiences."
          />
          <FeatureCard
            icon={<Sparkles className="w-12 h-12" />}
            title="Memory Visualization"
            description="Relive and reprocess memories through guided visualization so vivid and therapeutic, they integrate into your healing journey."
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12" />}
            title="Platform & App"
            description="Access your therapeutic journey anywhere. Desktop platform for deep work, mobile app for on-the-go support and reinforcement."
          />
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">How Souling Works</h2>
          <div className="space-y-8">
            <Step
              number="1"
              title="Create Your Inner Child Avatar"
              description="Share your memories, experiences, and the version of yourself that needs healing. Our AI creates a vivid, personalized avatar of your inner child."
            />
            <Step
              number="2"
              title="Connect with a Hypnotherapist"
              description="Match with an expert hypnotherapist who specializes in your specific needs and therapeutic goals."
            />
            <Step
              number="3"
              title="Experience Your Session"
              description="Receive a personalized hypnotherapy audio designed to create breakthrough moments. Most patients experience deep emotional release in the first session."
            />
            <Step
              number="4"
              title="Continuous Enhancement"
              description="Our AI analyzes your experience and therapist feedback to continuously improve and personalize your healing journey."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="text-purple-200 mb-8 text-lg">
            Join thousands who have experienced breakthrough healing with Souling
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register?role=patient"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition"
            >
              I Need Healing
            </Link>
            <Link
              to="/register?role=therapist"
              className="px-8 py-4 rounded-full border border-white/30 hover:bg-white/10 transition"
            >
              I'm a Therapist
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-purple-300">
        <p>© 2026 Souling. Transforming lives through technology and compassion.</p>
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

function Step({ number, title, description }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-xl font-bold flex-shrink-0">
        {number}
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-purple-200 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
