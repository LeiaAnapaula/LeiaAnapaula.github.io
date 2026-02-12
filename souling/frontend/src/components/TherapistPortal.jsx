import React, { useState, useEffect } from 'react';
import { Users, Mic, Star, TrendingUp, FileText, Send } from 'lucide-react';

export default function TherapistPortal({ user }) {
  const [patients, setPatients] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [enhancing, setEnhancing] = useState(false);
  const [activeTab, setActiveTab] = useState('patients');

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    // Mock data - replace with real API call
    setPatients([
      {
        id: 'patient_1',
        name: 'Sarah M.',
        age: 32,
        sessionsCount: 3,
        lastSession: '2026-01-25',
        progress: 'excellent',
        innerChildAge: 7
      },
      {
        id: 'patient_2',
        name: 'Michael T.',
        age: 45,
        sessionsCount: 1,
        lastSession: '2026-01-28',
        progress: 'good',
        innerChildAge: 10
      }
    ]);
  };

  const enhanceSession = async () => {
    if (!selectedSession || !feedback.trim()) return;

    setEnhancing(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/session/enhance-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          therapistFeedback: feedback,
          patientResponse: selectedSession.patientResponse || ''
        })
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Session enhanced successfully!');
        setFeedback('');
        setSelectedSession(null);
      }
    } catch (error) {
      console.error('Error enhancing session:', error);
      alert('Failed to enhance session');
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Therapist Portal</h1>
          <p className="text-purple-200">Empowering healing through technology</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users className="w-8 h-8" />}
            label="Active Patients"
            value={patients.length}
            color="from-blue-500 to-cyan-500"
          />
          <StatCard
            icon={<Mic className="w-8 h-8" />}
            label="Total Sessions"
            value={patients.reduce((sum, p) => sum + p.sessionsCount, 0)}
            color="from-pink-500 to-rose-500"
          />
          <StatCard
            icon={<Star className="w-8 h-8" />}
            label="Avg Rating"
            value="4.9"
            color="from-amber-500 to-orange-500"
          />
          <StatCard
            icon={<TrendingUp className="w-8 h-8" />}
            label="Success Rate"
            value="96%"
            color="from-green-500 to-emerald-500"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <TabButton
            active={activeTab === 'patients'}
            onClick={() => setActiveTab('patients')}
            icon={<Users />}
            label="Patients"
          />
          <TabButton
            active={activeTab === 'enhance'}
            onClick={() => setActiveTab('enhance')}
            icon={<Mic />}
            label="Enhance Sessions"
          />
          <TabButton
            active={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
            icon={<TrendingUp />}
            label="Analytics"
          />
        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {activeTab === 'patients' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Your Patients</h2>
                
                {patients.map(patient => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
              </div>
            )}

            {activeTab === 'enhance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">AI-Enhanced Session Improvement</h2>
                
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <p className="text-purple-200 mb-6">
                    Use AI to continuously improve your hypnotherapy sessions based on patient outcomes 
                    and your professional insights. Our technology learns from each enhancement to make 
                    future sessions even more effective.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white mb-2 font-semibold">
                        Select Session to Enhance
                      </label>
                      <select
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
                        onChange={(e) => {
                          const session = { id: e.target.value };
                          setSelectedSession(session);
                        }}
                      >
                        <option value="">Choose a session...</option>
                        <option value="session_1">Sarah M. - Session 3</option>
                        <option value="session_2">Michael T. - Session 1</option>
                      </select>
                    </div>

                    {selectedSession && (
                      <>
                        <div>
                          <label className="block text-white mb-2 font-semibold">
                            Your Professional Feedback
                          </label>
                          <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 h-48 resize-none"
                            placeholder="What worked well? What could be improved? What emotional responses did you observe? Any specific techniques that were particularly effective?"
                          />
                        </div>

                        <button
                          onClick={enhanceSession}
                          disabled={enhancing || !feedback.trim()}
                          className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-5 h-5" />
                          {enhancing ? 'Enhancing Session...' : 'Enhance with AI'}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
                  <h3 className="text-lg font-bold text-white mb-3">How Enhancement Works</h3>
                  <ul className="space-y-2 text-purple-100">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>AI analyzes your feedback and patient responses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Identifies the most emotionally impactful moments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Suggests improvements to pacing, language, and techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400 mt-1">•</span>
                      <span>Creates an enhanced version while maintaining your therapeutic approach</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Practice Analytics</h2>
                
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Session Effectiveness</h3>
                  <div className="space-y-4">
                    <ProgressBar label="Emotional Breakthrough Rate" value={96} color="pink" />
                    <ProgressBar label="Patient Satisfaction" value={98} color="purple" />
                    <ProgressBar label="Session Completion Rate" value={92} color="blue" />
                    <ProgressBar label="Follow-up Booking Rate" value={88} color="green" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">Most Effective Techniques</h3>
                    <ul className="space-y-2 text-purple-200">
                      <li>1. Inner child visualization</li>
                      <li>2. Progressive relaxation</li>
                      <li>3. Memory reprocessing</li>
                      <li>4. Positive affirmations</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-3">Common Breakthroughs</h3>
                    <ul className="space-y-2 text-purple-200">
                      <li>• Childhood wounds recognized</li>
                      <li>• Emotional release achieved</li>
                      <li>• Self-compassion developed</li>
                      <li>• New perspective gained</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <ActionButton label="Create New Session" />
                <ActionButton label="Schedule Appointment" />
                <ActionButton label="View Resources" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30">
              <h3 className="text-xl font-bold text-white mb-3">Professional Tip</h3>
              <p className="text-purple-100 leading-relaxed text-sm">
                The most powerful hypnotherapy sessions create a safe space for emotional vulnerability. 
                Trust the process and let the AI enhance your natural therapeutic abilities.
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

function PatientCard({ patient }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{patient.name}</h3>
          <p className="text-purple-200 text-sm">
            Last session: {patient.lastSession}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          patient.progress === 'excellent'
            ? 'bg-green-500/20 text-green-300'
            : 'bg-yellow-500/20 text-yellow-300'
        }`}>
          {patient.progress}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-purple-200 text-sm">Total Sessions</div>
          <div className="text-white font-bold text-lg">{patient.sessionsCount}</div>
        </div>
        <div>
          <div className="text-purple-200 text-sm">Inner Child Age</div>
          <div className="text-white font-bold text-lg">{patient.innerChildAge}</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white">
          View Profile
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white">
          New Session
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ label, value, color }) {
  const colorMap = {
    pink: 'from-pink-500 to-rose-500',
    purple: 'from-purple-500 to-indigo-500',
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500'
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-purple-200">{label}</span>
        <span className="text-white font-semibold">{value}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colorMap[color]} transition-all duration-1000`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ActionButton({ label }) {
  return (
    <button className="w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-left transition">
      {label}
    </button>
  );
}
