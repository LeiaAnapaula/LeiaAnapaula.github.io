import React, { useState, useEffect } from 'react';
import { Calendar, Mic, Book, Heart, TrendingUp, Play, Pause } from 'lucide-react';

export default function PatientPortal({ user }) {
  const [sessions, setSessions] = useState([]);
  const [journalEntry, setJournalEntry] = useState('');
  const [insights, setInsights] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activeTab, setActiveTab] = useState('sessions');
  const [playingSession, setPlayingSession] = useState(null);

  useEffect(() => {
    loadSessions();
    loadProgress();
  }, []);

  const loadSessions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/patient/sessions/${user.id}`);
      const data = await response.json();
      if (data.success) {
        setSessions(data.sessions);
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const loadProgress = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/analytics/patient-progress/${user.id}`);
      const data = await response.json();
      if (data.success) {
        setProgress(data.progress);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const submitJournal = async () => {
    if (!journalEntry.trim()) return;

    try {
      const response = await fetch('http://localhost:3001/api/patient/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          entry: journalEntry
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setInsights(data.insights);
        setJournalEntry('');
      }
    } catch (error) {
      console.error('Error submitting journal:', error);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Your Healing Journey</h1>
          <p className="text-purple-200">Welcome back, {user.name || 'Soul Seeker'}</p>
        </div>

        {/* Progress Overview */}
        {progress && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Calendar className="w-8 h-8" />}
              label="Total Sessions"
              value={progress.totalSessions}
              color="from-blue-500 to-cyan-500"
            />
            <StatCard
              icon={<Heart className="w-8 h-8" />}
              label="Completed"
              value={progress.completedSessions}
              color="from-pink-500 to-rose-500"
            />
            <StatCard
              icon={<TrendingUp className="w-8 h-8" />}
              label="Breakthroughs"
              value={progress.emotionalBreakthroughs}
              color="from-purple-500 to-indigo-500"
            />
            <StatCard
              icon={<Mic className="w-8 h-8" />}
              label="Avg Rating"
              value={progress.averageRating.toFixed(1)}
              color="from-amber-500 to-orange-500"
            />
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <TabButton
            active={activeTab === 'sessions'}
            onClick={() => setActiveTab('sessions')}
            icon={<Mic />}
            label="Sessions"
          />
          <TabButton
            active={activeTab === 'journal'}
            onClick={() => setActiveTab('journal')}
            icon={<Book />}
            label="Journal"
          />
        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {activeTab === 'sessions' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Your Sessions</h2>
                
                {sessions.length === 0 ? (
                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
                    <Mic className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Sessions Yet</h3>
                    <p className="text-purple-200 mb-6">
                      Start your healing journey by creating your first hypnotherapy session
                    </p>
                    <button
                      onClick={() => window.location.href = '/session-builder'}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold"
                    >
                      Create First Session
                    </button>
                  </div>
                ) : (
                  sessions.map(session => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      isPlaying={playingSession === session.id}
                      onPlay={() => setPlayingSession(session.id)}
                      onPause={() => setPlayingSession(null)}
                    />
                  ))
                )}
              </div>
            )}

            {activeTab === 'journal' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Therapeutic Journal</h2>
                
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <label className="block text-white mb-3 font-semibold">
                    How are you feeling today?
                  </label>
                  <textarea
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 h-48 resize-none"
                    placeholder="Express your thoughts, feelings, and reflections from your sessions..."
                  />
                  <button
                    onClick={submitJournal}
                    disabled={!journalEntry.trim()}
                    className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Get AI Insights
                  </button>
                </div>

                {insights && (
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-400" />
                      Therapeutic Insights
                    </h3>
                    <div className="text-purple-100 whitespace-pre-wrap leading-relaxed">
                      {insights}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <ActionButton
                  label="Create New Session"
                  onClick={() => window.location.href = '/session-builder'}
                />
                <ActionButton
                  label="View Inner Child"
                  onClick={() => window.location.href = '/inner-child'}
                />
                <ActionButton
                  label="Find Therapist"
                  onClick={() => window.location.href = '/therapist'}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30">
              <h3 className="text-xl font-bold text-white mb-3">Healing Tip</h3>
              <p className="text-purple-100 leading-relaxed text-sm">
                Listen to your hypnotherapy sessions in a quiet, comfortable space. 
                The more relaxed you are, the more effective the session will be.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-purple-200 text-sm">{label}</div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition ${
        active
          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
          : 'bg-white/5 text-purple-200 hover:bg-white/10'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function SessionCard({ session, isPlaying, onPlay, onPause }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">
            {session.sessionType || 'Hypnotherapy Session'}
          </h3>
          <p className="text-purple-200 text-sm">
            {new Date(session.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          session.status === 'completed'
            ? 'bg-green-500/20 text-green-300'
            : 'bg-yellow-500/20 text-yellow-300'
        }`}>
          {session.status}
        </span>
      </div>

      {session.goals && (
        <p className="text-purple-100 mb-4">{session.goals}</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause' : 'Play Session'}
        </button>
        {session.script && (
          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
            View Script
          </button>
        )}
      </div>
    </div>
  );
}

function ActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-left transition"
    >
      {label}
    </button>
  );
}
