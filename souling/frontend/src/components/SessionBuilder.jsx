import React, { useState, useEffect } from 'react';
import { Wand2, Heart, Calendar, Loader } from 'lucide-react';

export default function SessionBuilder({ user }) {
  const [step, setStep] = useState(1);
  const [therapists, setTherapists] = useState([]);
  const [innerChild, setInnerChild] = useState(null);
  const [formData, setFormData] = useState({
    therapistId: '',
    sessionType: 'inner-child-healing',
    goals: '',
    specificMemories: '',
    desiredOutcome: ''
  });
  const [generatingScript, setGeneratingScript] = useState(false);
  const [script, setScript] = useState(null);

  useEffect(() => {
    loadTherapists();
    loadInnerChild();
  }, []);

  const loadTherapists = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/therapists');
      const data = await response.json();
      if (data.success) {
        setTherapists(data.therapists);
      }
    } catch (error) {
      console.error('Error loading therapists:', error);
    }
  };

  const loadInnerChild = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/inner-child/${user.id}`);
      const data = await response.json();
      if (data.success && data.profile) {
        setInnerChild(data.profile);
      }
    } catch (error) {
      console.error('Error loading inner child:', error);
    }
  };

  const createSession = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: user.id,
          therapistId: formData.therapistId,
          sessionType: formData.sessionType,
          goals: formData.goals,
          memories: formData.specificMemories
        })
      });
      
      const data = await response.json();
      if (data.success) {
        generateScript(data.session.id);
      }
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session');
    }
  };

  const generateScript = async (sessionId) => {
    setGeneratingScript(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/session/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          patientProfile: {
            age: user.age,
            goals: formData.goals,
            desiredOutcome: formData.desiredOutcome
          },
          innerChildData: innerChild,
          therapeuticGoals: formData.goals
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setScript(data.script);
        setStep(4);
      }
    } catch (error) {
      console.error('Error generating script:', error);
      alert('Failed to generate script');
    } finally {
      setGeneratingScript(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Create Your Session</h1>
          <p className="text-purple-200 text-lg">
            Design a transformative hypnotherapy experience tailored to your needs
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <StepIndicator number={1} active={step >= 1} label="Therapist" />
            <div className={`w-12 h-1 ${step >= 2 ? 'bg-purple-500' : 'bg-white/20'}`} />
            <StepIndicator number={2} active={step >= 2} label="Goals" />
            <div className={`w-12 h-1 ${step >= 3 ? 'bg-purple-500' : 'bg-white/20'}`} />
            <StepIndicator number={3} active={step >= 3} label="Review" />
            <div className={`w-12 h-1 ${step >= 4 ? 'bg-purple-500' : 'bg-white/20'}`} />
            <StepIndicator number={4} active={step >= 4} label="Generate" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Choose Your Hypnotherapist</h2>
              
              {!innerChild ? (
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6">
                  <p className="text-yellow-100 mb-4">
                    You haven't created your inner child avatar yet. This is an important step for creating 
                    personalized sessions.
                  </p>
                  <button
                    onClick={() => window.location.href = '/inner-child'}
                    className="px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
                  >
                    Create Inner Child Avatar
                  </button>
                </div>
              ) : null}

              <div className="space-y-4">
                {therapists.length === 0 ? (
                  <p className="text-purple-200">Loading therapists...</p>
                ) : (
                  therapists.map(therapist => (
                    <TherapistCard
                      key={therapist.id}
                      therapist={therapist}
                      selected={formData.therapistId === therapist.id}
                      onSelect={() => setFormData(prev => ({ ...prev, therapistId: therapist.id }))}
                    />
                  ))
                )}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.therapistId}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Define Your Therapeutic Goals</h2>

              <div>
                <label className="block text-white mb-2 font-semibold">Session Type</label>
                <select
                  value={formData.sessionType}
                  onChange={(e) => setFormData(prev => ({ ...prev, sessionType: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
                >
                  <option value="inner-child-healing">Inner Child Healing</option>
                  <option value="trauma-reprocessing">Trauma Reprocessing</option>
                  <option value="anxiety-relief">Anxiety Relief</option>
                  <option value="self-compassion">Self-Compassion Building</option>
                  <option value="emotional-release">Emotional Release</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold">
                  What would you like to work on?
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 h-32 resize-none"
                  placeholder="Describe what you hope to heal or transform through this session..."
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold">
                  Specific Memories or Situations (Optional)
                </label>
                <textarea
                  value={formData.specificMemories}
                  onChange={(e) => setFormData(prev => ({ ...prev, specificMemories: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 h-32 resize-none"
                  placeholder="Any specific memories or situations you'd like to address..."
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-semibold">
                  Desired Outcome
                </label>
                <input
                  type="text"
                  value={formData.desiredOutcome}
                  onChange={(e) => setFormData(prev => ({ ...prev, desiredOutcome: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300"
                  placeholder="e.g., Feel more confident, Release childhood pain, Find inner peace..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.goals || !formData.desiredOutcome}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Review
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Review Your Session</h2>

              <div className="space-y-4">
                <ReviewItem label="Session Type" value={formData.sessionType.replace('-', ' ')} />
                <ReviewItem label="Therapeutic Goals" value={formData.goals} />
                {formData.specificMemories && (
                  <ReviewItem label="Specific Memories" value={formData.specificMemories} />
                )}
                <ReviewItem label="Desired Outcome" value={formData.desiredOutcome} />
              </div>

              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-pink-400" />
                  AI-Powered Session Generation
                </h3>
                <p className="text-purple-100 leading-relaxed text-sm">
                  Our AI will create a personalized hypnotherapy script based on your inner child profile, 
                  therapeutic goals, and your therapist's expertise. This session is designed to create 
                  breakthrough moments and facilitate deep emotional healing.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={createSession}
                  disabled={generatingScript}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold flex items-center justify-center gap-2"
                >
                  {generatingScript ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Session
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 4 && script && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Heart className="w-7 h-7 text-pink-400" />
                Your Session is Ready
              </h2>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
                <p className="text-green-100 leading-relaxed">
                  Your personalized hypnotherapy session has been created. This script has been designed 
                  specifically for you, incorporating your inner child profile and therapeutic goals.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-bold text-white mb-4">Session Script Preview</h3>
                <div className="text-purple-100 whitespace-pre-wrap leading-relaxed text-sm">
                  {script.slice(0, 1000)}...
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => window.location.href = '/patient'}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setFormData({
                      therapistId: '',
                      sessionType: 'inner-child-healing',
                      goals: '',
                      specificMemories: '',
                      desiredOutcome: ''
                    });
                    setScript(null);
                  }}
                  className="flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold"
                >
                  Create Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ number, active, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition ${
        active
          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
          : 'bg-white/10 text-purple-300'
      }`}>
        {number}
      </div>
      <div className="text-purple-200 text-sm mt-2">{label}</div>
    </div>
  );
}

function TherapistCard({ therapist, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`p-6 rounded-2xl border cursor-pointer transition ${
        selected
          ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500'
          : 'bg-white/5 border-white/10 hover:bg-white/10'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{therapist.name}</h3>
          <p className="text-purple-200 text-sm mb-3">{therapist.email}</p>
          {therapist.specializations && therapist.specializations.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {therapist.specializations.map((spec, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-purple-900/30 text-purple-200 text-xs">
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-yellow-400 text-sm mb-1">★ {therapist.rating || '5.0'}</div>
          <div className="text-purple-200 text-xs">{therapist.sessionsCount || 0} sessions</div>
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="text-purple-300 text-sm mb-1">{label}</div>
      <div className="text-white capitalize">{value}</div>
    </div>
  );
}
