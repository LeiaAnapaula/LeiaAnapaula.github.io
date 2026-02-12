import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Heart, Sparkles, Save } from 'lucide-react';

export default function InnerChildAvatar({ user }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    memories: [],
    currentMemory: '',
    emotions: [],
    appearance: {
      hairColor: 'brown',
      eyeColor: 'brown',
      skinTone: 'medium',
      clothing: 'casual'
    },
    characteristics: []
  });
  const [avatarProfile, setAvatarProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !sceneRef.current) {
      initThreeJS();
    }
  }, []);

  const initThreeJS = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(400, 400);
    scene.background = null;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create simple avatar representation
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xffb6c1,
      roughness: 0.4,
      metalness: 0.2
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add particles for magical effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 3;

    sceneRef.current = { scene, camera, renderer, sphere, particles };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      sphere.rotation.y += 0.005;
      particles.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };
    
    animate();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addMemory = () => {
    if (formData.currentMemory.trim()) {
      setFormData(prev => ({
        ...prev,
        memories: [...prev.memories, prev.currentMemory],
        currentMemory: ''
      }));
    }
  };

  const createAvatar = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/inner-child/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          age: formData.age,
          memories: formData.memories,
          characteristics: {
            emotions: formData.emotions,
            appearance: formData.appearance
          }
        })
      });
      
      const data = await response.json();
      setAvatarProfile(data.profile);
      setStep(3);
    } catch (error) {
      console.error('Error creating avatar:', error);
      alert('Failed to create avatar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Meet Your Inner Child
          </h1>
          <p className="text-purple-200 text-lg">
            Create a powerful connection with the version of yourself that needs healing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Panel - Avatar Visualization */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-pink-400" />
              Your Inner Child Avatar
            </h2>
            
            <div className="flex justify-center mb-6">
              <canvas ref={canvasRef} className="rounded-2xl" />
            </div>

            {avatarProfile && (
              <div className="bg-purple-900/30 rounded-2xl p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">Avatar Profile</h3>
                <div className="text-purple-200 text-sm whitespace-pre-wrap">
                  {avatarProfile.aiGeneratedProfile}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Tell Us About Your Inner Child
                </h2>

                <div>
                  <label className="block text-white mb-2">At what age do you feel stuck or wounded?</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300"
                    placeholder="e.g., 7"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Describe a significant memory</label>
                  <textarea
                    value={formData.currentMemory}
                    onChange={(e) => handleInputChange('currentMemory', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-purple-300 h-32"
                    placeholder="Share a vivid memory from your childhood..."
                  />
                  <button
                    onClick={addMemory}
                    className="mt-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Add Memory
                  </button>
                </div>

                {formData.memories.length > 0 && (
                  <div className="space-y-2">
                    <label className="block text-white">Your memories:</label>
                    {formData.memories.map((memory, index) => (
                      <div key={index} className="p-3 rounded-lg bg-purple-900/30 text-purple-200 text-sm">
                        {memory}
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-white mb-2">What emotions did you feel often?</label>
                  <div className="flex flex-wrap gap-2">
                    {['lonely', 'scared', 'invisible', 'not enough', 'overwhelmed', 'unloved'].map(emotion => (
                      <button
                        key={emotion}
                        onClick={() => {
                          const emotions = formData.emotions.includes(emotion)
                            ? formData.emotions.filter(e => e !== emotion)
                            : [...formData.emotions, emotion];
                          handleInputChange('emotions', emotions);
                        }}
                        className={`px-4 py-2 rounded-full transition ${
                          formData.emotions.includes(emotion)
                            ? 'bg-pink-500 text-white'
                            : 'bg-white/10 text-purple-200 hover:bg-white/20'
                        }`}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.age || formData.memories.length === 0}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Appearance
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  How Did You Look?
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Hair Color</label>
                    <select
                      value={formData.appearance.hairColor}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, hairColor: e.target.value }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    >
                      <option value="brown">Brown</option>
                      <option value="blonde">Blonde</option>
                      <option value="black">Black</option>
                      <option value="red">Red</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Eye Color</label>
                    <select
                      value={formData.appearance.eyeColor}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, eyeColor: e.target.value }
                      }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
                    >
                      <option value="brown">Brown</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="hazel">Hazel</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={createAvatar}
                    disabled={loading}
                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      'Creating Avatar...'
                    ) : (
                      <>
                        <Heart className="w-5 h-5" />
                        Create My Inner Child
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && avatarProfile && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Save className="w-6 h-6 text-pink-400" />
                  Your Avatar is Ready
                </h2>
                
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30">
                  <p className="text-white text-lg leading-relaxed">
                    Your inner child avatar has been created. This is the beginning of a profound healing journey. 
                    Your therapist will use this avatar to create deeply personalized hypnotherapy sessions.
                  </p>
                </div>

                <button
                  onClick={() => window.location.href = '/session-builder'}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold"
                >
                  Create Your First Session
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
