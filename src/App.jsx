import React, { useEffect, useRef, useState } from 'react';
import Unit1MasterHub from './Unit_1_Hub.jsx';
import Unit2MasterHub from './Unit_2_Hub.jsx';
import Unit3MasterHub from './Unit_3_Hub.jsx';
import Unit4MasterHub from './Unit_4_Hub.jsx';

export default function DiscreteMathHome() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeScreen, setActiveScreen] = useState('home');
  const curriculumHubRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const units = [
    {
      id: 1,
      status: 'unlocked',
      title: 'Mathematical Logic',
      subtitle: 'The Architecture of Truth',
      description:
        'Master the absolute foundation of computer processors. Turn English sentences into unbreakable mathematical circuits.',
      icon: 'U1',
      color: 'cyan',
      topics: [
        'Logical Connectives & Truth Sandboxes',
        'Normal Forms (DNF, PCNF)',
        'Theory of Inference & Deductions',
        'Predicate Quantifiers (forall, exists)',
      ],
      actionText: 'Enter Logic Sandbox',
    },
    {
      id: 2,
      status: 'unlocked',
      title: 'Sets & Relations',
      subtitle: 'The Grammar of Data',
      description:
        'Discover how databases store information and how networks map connections through pure interactive algebra.',
      icon: 'U1',
      color: 'fuchsia',
      topics: [
        'Set Operations & Power Sets',
        'Bit-String Computer Representations',
        'Relation Matrices & Posets',
        'Bijective Functions & Inverses',
      ],
      actionText: 'Enter Data Hub',
    },
    {
      id: 3,
      status: 'unlocked',
      title: 'Algebraic Structures',
      subtitle: 'The Cryptography Engine',
      description:
        'Build the algebra behind computation: operation laws, semigroups, monoids, lattices, Hasse diagrams, and Boolean logic.',
      icon: 'ALG',
      color: 'amber',
      topics: [
        'Algebraic Systems & Binary Operations',
        'Semigroups and Monoids',
        'Lattices + Hasse Diagrams',
        'Boolean Algebra + Logic Gate Simplification',
      ],
      actionText: 'Enter Algebra Hub',
    },
    {
      id: 4,
      status: 'unlocked',
      title: 'Trees & Combinatorics',
      subtitle: 'The Optimization Core',
      description:
        'Learn to count the impossible. Build binary search trees and master the art of algorithmic optimization.',
      icon: 'ALG',
      color: 'emerald',
      topics: [
        'Permutations & Combinations',
        'Advanced Repetitions',
        'Binomials & PIE (Pascals/Sets)',
        'The "Choose" Engine',
      ],
      actionText: 'Enter Counting Hub',
    },
    {
      id: 5,
      status: 'locked',
      title: 'Graph Theory',
      subtitle: 'The Network Simulator',
      description:
        'Visualize the internet. Map shortest paths, color vertices, and untangle the mathematics of complex routing.',
      icon: 'U1',
      color: 'rose',
      topics: [
        'Vertices, Edges & Degrees',
        'Euler & Hamilton Paths',
        'Graph Isomorphism',
        'Planar Graphs & Coloring',
      ],
      actionText: 'Initializing...',
    },
  ];

  const getColorClasses = (color) => {
    const map = {
      cyan: {
        from: 'from-cyan-400',
        to: 'to-blue-500',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/50',
        text: 'text-cyan-400',
        shadow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]',
      },
      fuchsia: {
        from: 'from-fuchsia-400',
        to: 'to-purple-500',
        bg: 'bg-fuchsia-500/10',
        border: 'border-fuchsia-500/50',
        text: 'text-fuchsia-400',
        shadow: 'hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]',
      },
      amber: {
        from: 'from-amber-400',
        to: 'to-orange-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/50',
        text: 'text-amber-400',
        shadow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
      },
      emerald: {
        from: 'from-emerald-400',
        to: 'to-teal-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/50',
        text: 'text-emerald-400',
        shadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
      },
      rose: {
        from: 'from-rose-400',
        to: 'to-pink-500',
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/50',
        text: 'text-rose-400',
        shadow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]',
      },
      slate: {
        from: 'from-slate-400',
        to: 'to-slate-500',
        bg: 'bg-slate-800/50',
        border: 'border-slate-700',
        text: 'text-slate-400',
        shadow: '',
      },
    };

    return map[color];
  };

  const openUnit = (unitId) => {
    if (unitId === 1) {
      setActiveScreen('unit1');
    }

    if (unitId === 2) {
      setActiveScreen('unit2');
    }

    if (unitId === 3) {
      setActiveScreen('unit3');
    }

    if (unitId === 4) {
      setActiveScreen('unit4');
    }
  };

  const handleViewSyllabus = () => {
    curriculumHubRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  if (activeScreen === 'unit1') {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="sticky top-0 z-[60] border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <button
              onClick={() => setActiveScreen('home')}
              className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-bold tracking-wide text-slate-200 transition hover:bg-slate-800"
            >
              Back to Home
            </button>
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
              Unit 1
            </span>
          </div>
        </div>
        <Unit1MasterHub />
      </div>
    );
  }

  if (activeScreen === 'unit2') {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="sticky top-0 z-[60] border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <button
              onClick={() => setActiveScreen('home')}
              className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-bold tracking-wide text-slate-200 transition hover:bg-slate-800"
            >
              Back to Home
            </button>
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-fuchsia-400">
              Unit 2
            </span>
          </div>
        </div>
        <Unit2MasterHub />
      </div>
    );
  }

  if (activeScreen === 'unit3') {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="sticky top-0 z-[60] border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <button
              onClick={() => setActiveScreen('home')}
              className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-bold tracking-wide text-slate-200 transition hover:bg-slate-800"
            >
              Back to Home
            </button>
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
              Unit 3
            </span>
          </div>
        </div>
        <Unit3MasterHub />
      </div>
    );
  }

  if (activeScreen === 'unit4') {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="sticky top-0 z-[60] border-b border-slate-800 bg-slate-950/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <button
              onClick={() => setActiveScreen('home')}
              className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-bold tracking-wide text-slate-200 transition hover:bg-slate-800"
            >
              Back to Home
            </button>
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
              Unit 4
            </span>
          </div>
        </div>
        <Unit4MasterHub />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.03), transparent 80%)`,
        }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-sm font-bold tracking-widest text-slate-300 mb-8 animate-fade-in shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            SYSTEM ONLINE
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-tight animate-fade-in-up">
            Discrete Math <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-400 to-amber-400">
              Playground.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 animate-fade-in-up delay-150 leading-relaxed">
            Textbooks are static. Mathematics is dynamic. <br className="hidden md:block" />
            Here, we do not just read theorems, we execute them. Welcome to the interactive
            engineering environment for your mind.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
            <button
              onClick={handleViewSyllabus}
              className="px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-lg border border-slate-700 hover:bg-slate-800 transition-all hover:shadow-lg"
            >
              View Syllabus
            </button>
          </div>
        </header>

        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 animate-fade-in"> */}
          {/* <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-y border-slate-700/50 py-12 px-6 rounded-3xl relative overflow-hidden shadow-2xl"> */}
            {/* <div className="absolute top-0 right-0 opacity-10 text-[150px] -translate-y-10 translate-x-10 pointer-events-none"> */}
              {/* MATH */}
            {/* </div> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10"> */}
              {/* <div>
                <div className="text-4xl mb-4">LAB</div>
                <h3 className="text-xl font-bold text-white mb-2">No Boring Text</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Every concept is a physical, interactive sandbox. You learn by breaking and
                  fixing logical circuits.
                </p>
              </div> */}
              {/* OUR INTENTION BANNER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 animate-fade-in">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-y border-slate-700/50 py-12 px-6 rounded-3xl relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 opacity-10 text-[150px] -translate-y-10 translate-x-10 pointer-events-none">📐</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
                    <div>
                        <div className="text-4xl mb-4">🚫</div>
                        <h3 className="text-xl font-bold text-white mb-2">No Boring Text</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Every concept is a physical, interactive sandbox. You learn by breaking and fixing logical circuits.</p>
                    </div>
                    <div className="md:border-x border-slate-700/50 px-4">
                        <div className="text-4xl mb-4">🏆</div>
                        <h3 className="text-xl font-bold text-white mb-2">Exam Focused</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Theory is useless if you can't pass the test. Every unit features a dedicated University Exam Simulator.</p>
                    </div>
                    <div>
                        <div className="text-4xl mb-4">⚙️</div>
                        <h3 className="text-xl font-bold text-white mb-2">Engineering Mindset</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">We don't teach math for math's sake. We teach the math that builds databases, compilers, and encryption.</p>
                    </div>
                </div>
            </div>
        </div>
              {/* <div className="md:border-x border-slate-700/50 px-4">
                <div className="text-4xl mb-4">LAB</div>
                <h3 className="text-xl font-bold text-white mb-2">Exam Focused</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Theory is useless if you cannot pass the test. Every unit features a dedicated
                  university exam simulator.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">LAB</div>
                <h3 className="text-xl font-bold text-white mb-2">Engineering Mindset</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We do not teach math for math&apos;s sake. We teach the math that builds
                  databases, compilers, and encryption.
                </p>
              </div> */}
              
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div ref={curriculumHubRef} className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-black text-white uppercase tracking-widest">
              Curriculum Hub
            </h2>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {units.map((unit) => {
              const isUnlocked = unit.status === 'unlocked';
              const styles = isUnlocked ? getColorClasses(unit.color) : getColorClasses('slate');

              return (
                <div
                  key={unit.id}
                  onClick={() => isUnlocked && openUnit(unit.id)}
                  className={`group relative rounded-3xl border-2 transition-all duration-500 overflow-hidden flex flex-col h-full ${
                    styles.border
                  } ${styles.bg} ${
                    isUnlocked
                      ? `${styles.shadow} transform hover:-translate-y-2 cursor-pointer`
                      : 'opacity-80 grayscale-[50%] cursor-not-allowed'
                  }`}
                >
                  {isUnlocked && (
                    <div
                      className={`absolute top-0 left-0 right-0 h-32 opacity-20 bg-gradient-to-b ${styles.from} to-transparent`}
                    ></div>
                  )}

                  <div className="p-8 flex-1 relative z-10 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                        {unit.icon}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${
                          isUnlocked
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}
                      >
                        {isUnlocked ? 'Unlocked' : 'Locked'}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70 text-slate-400">
                        Unit {unit.id}
                      </div>
                      <h3
                        className={`text-2xl font-black mb-1 ${isUnlocked ? 'text-white' : 'text-slate-400'}`}
                      >
                        {unit.title}
                      </h3>
                      <h4 className={`text-sm font-bold ${styles.text}`}>{unit.subtitle}</h4>
                    </div>

                    <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-1">
                      {unit.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      <div className="text-xs uppercase font-bold tracking-widest text-slate-500 border-b border-slate-700/50 pb-2">
                        Key Modules
                      </div>
                      <ul className="space-y-2">
                        {unit.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-start gap-2 text-xs text-slate-400 font-medium"
                          >
                            <span className={isUnlocked ? styles.text : 'text-slate-600'}>
                              {isUnlocked ? 'OK' : 'LOCK'}
                            </span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (isUnlocked) {
                          openUnit(unit.id);
                        }
                      }}
                      className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                        isUnlocked
                          ? `bg-slate-950 border border-slate-700 text-white group-hover:bg-gradient-to-r group-hover:${styles.from} group-hover:${styles.to} group-hover:border-transparent group-hover:shadow-lg`
                          : 'bg-slate-900 text-slate-600 border border-slate-800'
                      }`}
                    >
                      {unit.actionText}
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="rounded-3xl border-2 border-slate-800 border-dashed bg-slate-900/30 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
              <div className="text-4xl mb-4 opacity-50">SOON</div>
              <h3 className="text-xl font-bold text-slate-500 uppercase tracking-widest mb-2">
                More Units
              </h3>
              <p className="text-sm text-slate-600 max-w-xs">
                Boolean Algebra, State Machines, and Advanced Cryptography modules are in active
                development.
              </p>
            </div>
          </div>
        </main>

        <footer className="border-t border-slate-800 bg-slate-900/50 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-fuchsia-500 flex items-center justify-center text-white font-black">
                S
              </div>
              <span className="font-bold text-white tracking-widest uppercase">DM Playground</span>
            </div>
            <div className="text-sm font-mono text-slate-500 text-center md:text-right">
              Built for Mastery. <br className="md:hidden" />
              Zero Compromise.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}






