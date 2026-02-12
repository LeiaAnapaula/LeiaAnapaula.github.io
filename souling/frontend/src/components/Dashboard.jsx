import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mic, Users, BookOpen, LogOut } from 'lucide-react';

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome, {user.name || 'Soul Seeker'}
            </h1>
            <p className="text-purple-200">Your journey to healing starts here</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {user.role === 'patient' ? (
            <>
              <QuickActionCard
                icon={<Heart className="w-8 h-8" />}
                title="Inner Child Avatar"
                description="Create or view your inner child"
                onClick={() => navigate('/inner-child')}
                color="from-pink-500 to-rose-500"
              />
              <QuickActionCard
                icon={<Mic className="w-8 h-8" />}
                title="New Session"
                description="Create a hypnotherapy session"
                onClick={() => navigate('/session-builder')}
                color="from-purple-500 to-indigo-500"
              />
              <QuickActionCard
                icon={<BookOpen className="w-8 h-8" />}
                title="My Sessions"
                description="View your session history"
                onClick={() => navigate('/patient')}
                color="from-blue-500 to-cyan-500"
              />
              <QuickActionCard
                icon={<Users className="w-8 h-8" />}
                title="Find Therapist"
                description="Connect with a hypnotherapist"
                onClick={() => navigate('/therapist')}
                color="from-amber-500 to-orange-500"
              />
            </>
          ) : (
            <>
              <QuickActionCard
                icon={<Users className="w-8 h-8" />}
                title="My Patients"
                description="View and manage patients"
                onClick={() => navigate('/therapist')}
                color="from-blue-500 to-cyan-500"
              />
              <QuickActionCard
                icon={<Mic className="w-8 h-8" />}
                title="Enhance Sessions"
                description="AI-powered improvements"
                onClick={() => navigate('/therapist')}
                color="from-purple-500 to-indigo-500"
              />
              <QuickActionCard
                icon={<BookOpen className="w-8 h-8" />}
                title="Analytics"
                description="Track your practice success"
                onClick={() => navigate('/therapist')}
                color="from-pink-500 to-rose-500"
              />
              <QuickActionCard
                icon={<Heart className="w-8 h-8" />}
                title="Resources"
                description="Training and support"
                onClick={() => navigate('/therapist')}
                color="from-amber-500 to-orange-500"
              />
            </>
          )}
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl p-8 border border-pink-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">
            {user.role === 'patient' 
              ? 'Your Healing Journey Awaits'
              : 'Empowering Transformation Through Technology'
            }
          </h2>
          <p className="text-purple-100 leading-relaxed mb-6">
            {user.role === 'patient'
              ? 'Souling combines cutting-edge AI technology with proven hypnotherapy techniques to create transformative healing experiences. Start by creating your inner child avatar, then work with expert therapists to design personalized sessions that create breakthrough moments.'
              : 'Use Souling\'s AI-enhanced platform to deliver more powerful hypnotherapy sessions to your patients. Our technology learns from each session, helping you continuously improve your therapeutic approach and create deeper healing experiences.'
            }
          </p>
          <button
            onClick={() => navigate(user.role === 'patient' ? '/inner-child' : '/therapist')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold"
          >
            {user.role === 'patient' ? 'Get Started' : 'View Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, description, onClick, color }) {
  return (
    <div
      onClick={onClick}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition cursor-pointer group"
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-purple-200 text-sm">{description}</p>
    </div>
  );
}
