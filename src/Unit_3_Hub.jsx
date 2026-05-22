import React, { useState, useMemo, useEffect } from 'react';

// ==========================================
// SHARED UI COMPONENTS (MENTOR'S TOUCH)
// ==========================================
const MentorInsight = ({ title, children, color = "amber" }) => {
  const colorMap = {
    amber: "from-amber-500/20 to-orange-500/5 border-amber-500/30 text-amber-300",
    cyan: "from-cyan-500/20 to-blue-500/5 border-cyan-500/30 text-cyan-300",
    fuchsia: "from-fuchsia-500/20 to-purple-500/5 border-fuchsia-500/30 text-fuchsia-300",
    emerald: "from-emerald-500/20 to-teal-500/5 border-emerald-500/30 text-emerald-300",
    blue: "from-blue-500/20 to-indigo-500/5 border-blue-500/30 text-blue-300"
  };

  return (
    <div className={`relative p-6 md:p-8 rounded-3xl border-2 bg-gradient-to-br ${colorMap[color]} shadow-2xl mb-8 overflow-hidden group`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 text-7xl group-hover:scale-110 transition-transform duration-500 pointer-events-none">🧠</div>
      <h4 className="font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-3">
        <span className="animate-pulse text-xl">✨</span> Mentor's Deep Dive: {title}
      </h4>
      <div className="text-base leading-relaxed text-slate-200 font-medium relative z-10 space-y-3">
        {children}
      </div>
    </div>
  );
};

const FormalDefinition = ({ term, def, color = "amber" }) => {
  const colorTextMap = { cyan: '#06b6d4', red: '#ef4444', emerald: '#10b981', fuchsia: '#ec4899', amber: '#f59e0b', blue: '#3b82f6' };
  const colorBorderMap = { cyan: 'rgba(6, 182, 212, 0.3)', red: 'rgba(239, 68, 68, 0.3)', emerald: 'rgba(16, 185, 129, 0.3)', fuchsia: 'rgba(236, 72, 153, 0.3)', amber: 'rgba(245, 158, 11, 0.3)', blue: 'rgba(59, 130, 246, 0.3)' };
  return (
    <div className="bg-slate-950 p-5 rounded-2xl border mb-6 shadow-inner" style={{ borderColor: colorBorderMap[color] }}>
      <strong className="font-black uppercase tracking-widest text-xs block mb-2" style={{ color: colorTextMap[color] }}>Formal Concept: {term}</strong>
      <span className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">{def}</span>
    </div>
  );
};

// Utility: Shuffle Array for Random Options
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// ==========================================
// PHASE 1: ALGEBRAIC SYSTEMS & SUBSTRUCTURES
// ==========================================
const BinaryProperties = () => {
  const [activeOp, setActiveOp] = useState('addition');
  
  const ops = {
    addition: { 
      name: 'Addition (+)', set: 'Integers (ℤ)', symbol: '+', 
      closure: { val: true, layman: "The Vegas Rule", def: "∀ a,b ∈ S, (a * b) ∈ S", desc: 'What happens in the set, stays in the set. Combining two integers always creates another integer. It never escapes into fractions.', ex: '5 + (-2) = 3. (3 is an Integer, PASS).' },
      commutative: { val: true, layman: "The Seat-Swap Rule", def: "a * b = b * a", desc: 'Swapping the positions of the elements changes absolutely nothing about the result.', ex: '5 + 3 = 8, and 3 + 5 = 8. (PASS).' },
      associative: { val: true, layman: "The Grouping Rule", def: "(a * b) * c = a * (b * c)", desc: 'Shifting the parentheses (who groups with who first) does not change the final outcome.', ex: '(1 + 2) + 3 = 6, and 1 + (2 + 3) = 6. (PASS).' },
      identity: { val: true, element: '0', layman: "The Perfect Mirror", def: "a * e = a", desc: 'There exists a special "do nothing" element that leaves every other element completely unchanged.', ex: '7 + 0 = 7. The mirror is 0. (PASS).' },
      inverse: { val: true, layman: "The Undo Button", def: "a * a⁻¹ = e", desc: 'Every element has a partner that perfectly cancels it out, returning you to the Identity (mirror).', ex: '5 + (-5) = 0. (PASS).' },
      color: 'cyan'
    },
    subtraction: { 
      name: 'Subtraction (-)', set: 'Integers (ℤ)', symbol: '-', 
      closure: { val: true, layman: "The Vegas Rule", def: "∀ a,b ∈ S, (a * b) ∈ S", desc: 'Subtracting any integer from another integer always yields an integer.', ex: '5 - 8 = -3. (-3 is an Integer, PASS).' },
      commutative: { val: false, layman: "The Seat-Swap Rule", def: "a * b = b * a", desc: 'Fails miserably. Order matters drastically in subtraction.', ex: '10 - 2 = 8. But 2 - 10 = -8. (8 ≠ -8, FAIL).' },
      associative: { val: false, layman: "The Grouping Rule", def: "(a * b) * c = a * (b * c)", desc: 'Fails. Changing who gets subtracted first changes the entire mathematical result.', ex: '(10 - 5) - 2 = 3. But 10 - (5 - 2) = 7. (3 ≠ 7, FAIL).' },
      identity: { val: false, element: 'None', layman: "The Perfect Mirror", def: "a * e = a AND e * a = a", desc: 'Fails. The mirror must work identically from BOTH sides. a-0=a works, but 0-a=-a (fails).', ex: '5 - 0 = 5. But 0 - 5 = -5. (FAIL).' },
      inverse: { val: false, layman: "The Undo Button", def: "a * a⁻¹ = e", desc: 'Cannot mathematically exist because we do not have a valid Identity Element first!', ex: 'Failed Prerequisite.' },
      color: 'red'
    },
    multiplication: { 
      name: 'Multiplication (×)', set: 'Integers (ℤ)', symbol: '×', 
      closure: { val: true, layman: "The Vegas Rule", def: "∀ a,b ∈ S, (a * b) ∈ S", desc: 'Multiplying two integers always creates another integer.', ex: '4 × (-3) = -12. (PASS).' },
      commutative: { val: true, layman: "The Seat-Swap Rule", def: "a * b = b * a", desc: 'Order of multiplication does not matter.', ex: '4 × 5 = 20, and 5 × 4 = 20. (PASS).' },
      associative: { val: true, layman: "The Grouping Rule", def: "(a * b) * c = a * (b * c)", desc: 'Grouping factors differently yields the same product.', ex: '(2 × 3) × 4 = 24, and 2 × (3 × 4) = 24. (PASS).' },
      identity: { val: true, element: '1', layman: "The Perfect Mirror", def: "a * e = a", desc: 'Multiplying by 1 leaves the element completely unchanged.', ex: '8 × 1 = 8. (PASS).' },
      inverse: { val: false, layman: "The Undo Button", def: "a * a⁻¹ = e", desc: 'Fails! The inverse of 5 would be 1/5. But 1/5 is a fraction, and fractions are NOT allowed in the Set of Integers!', ex: '5 × (1/5) = 1. But 1/5 ∉ ℤ. (FAIL).' },
      color: 'emerald'
    },
    division: { 
      name: 'Division (/)', set: 'Non-Zero Rationals (ℚ*)', symbol: '/', 
      closure: { val: true, layman: "The Vegas Rule", def: "∀ a,b ∈ S, (a * b) ∈ S", desc: 'Dividing two non-zero fractions gives another valid fraction.', ex: '(1/2) / (3/4) = 4/6 = 2/3. (PASS).' },
      commutative: { val: false, layman: "The Seat-Swap Rule", def: "a * b = b * a", desc: 'Fails. Swapping the numerator and denominator flips the result.', ex: '4 / 2 = 2. But 2 / 4 = 0.5. (2 ≠ 0.5, FAIL).' },
      associative: { val: false, layman: "The Grouping Rule", def: "(a * b) * c = a * (b * c)", desc: 'Fails. Changing the grouping completely rewrites the equation.', ex: '(8 / 4) / 2 = 1. But 8 / (4 / 2) = 4. (1 ≠ 4, FAIL).' },
      identity: { val: false, element: 'None', layman: "The Perfect Mirror", def: "a * e = a AND e * a = a", desc: 'Fails. Identity must work identically from BOTH sides. (a/1)=a works, but (1/a)≠a fails.', ex: '5 / 1 = 5. But 1 / 5 = 0.2. (FAIL).' },
      inverse: { val: false, layman: "The Undo Button", def: "a * a⁻¹ = e", desc: 'Cannot exist without a valid Identity Element first!', ex: 'Failed Prerequisite.' },
      color: 'fuchsia'
    },
    custom: {
      name: 'Custom (a+b-ab)', set: 'Rationals (ℚ)', symbol: '*',
      closure: { val: true, layman: "The Vegas Rule", def: "∀ a,b ∈ ℚ, (a + b - ab) ∈ ℚ", desc: 'Standard arithmetic (+, -, ×) on rational numbers always stays rational.', ex: '2 * 3 = 2 + 3 - (2)(3) = -1. (-1 ∈ ℚ, PASS).' },
      commutative: { val: true, layman: "The Seat-Swap Rule", def: "a * b = b * a", desc: 'Addition and multiplication are inherently commutative.', ex: 'a+b-ab is mathematically identical to b+a-ba. (PASS).' },
      associative: { val: true, layman: "The Grouping Rule", def: "(a * b) * c = a * (b * c)", desc: 'Both sides mathematically expand to exactly: a+b+c - ab-bc-ac + abc.', ex: 'Try it: (1*2)*3 = 1. 1*(2*3) = 1. (PASS).' },
      identity: { val: true, element: '0', layman: "The Perfect Mirror", def: "a * e = a", desc: 'Solve algebraically: a + e - ae = a ⟹ e(1-a)=0 ⟹ e=0.', ex: '5 * 0 = 5 + 0 - (5)(0) = 5. (PASS).' },
      inverse: { val: false, layman: "The Undo Button", def: "a * a⁻¹ = e", desc: 'Fails critically for a=1. If 1*b = 0 ⟹ 1+b-b = 0 ⟹ 1 = 0 (Impossible!).', ex: 'The number 1 has no undo button. Thus, (ℚ, *) is NOT a Group.' },
      color: 'amber'
    }
  };

  const currentOp = ops[activeOp];

  const PropertyCard = ({ title, propData }) => (
    <div className={`p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col sm:flex-row items-start gap-5 ${propData.val ? 'bg-emerald-900/20 border-emerald-500/40' : 'bg-red-900/10 border-red-500/30'}`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 border-2 shadow-inner ${propData.val ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
        {propData.val ? '✅' : '❌'}
      </div>
      <div className="w-full">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 mb-3">
            <h4 className={`text-lg font-black tracking-wide ${propData.val ? 'text-emerald-400' : 'text-red-400'}`}>{title}</h4>
            <span className="font-mono text-xs bg-slate-950 px-3 py-1 rounded border border-slate-800 text-slate-300 shadow-inner block">{propData.def}</span>
        </div>
        
        <div className="inline-block px-3 py-1 bg-blue-900/30 border border-blue-500/30 text-blue-300 text-xs uppercase tracking-widest font-black rounded-lg mb-3 shadow-inner">
           Layman's Term: {propData.layman}
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-4 font-medium">{propData.desc}</p>
        
        <div className="bg-black/50 border border-slate-700/50 rounded-xl p-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-1">Proof / Example</span>
            <span className="font-mono text-sm text-amber-200">{propData.ex}</span>
        </div>

        {propData.element && propData.val && (
          <div className="mt-4 text-sm font-black tracking-widest uppercase bg-emerald-950 border border-emerald-500/50 inline-block px-4 py-2 rounded-lg text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            Identity (e) = {propData.element}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-cyan-400 tracking-tight">1. Algebraic Core Properties</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          An Algebraic System requires two things: A <strong>Set (Universe)</strong> and an <strong>Operation (Physics)</strong>. Let's translate the intimidating math into plain English so you can understand it fearlessly.
        </p>
      </header>

      <MentorInsight title="Why do some operations fail?" color="cyan">
        Don't fear these abstract properties! Notice how <strong>Subtraction</strong> fails almost everything. Because order matters ($5-3 \neq 3-5$), a computer processor cannot break subtraction tasks into parallel chunks. It MUST compute them strictly in order from left to right. This is why <strong>Associative</strong> and <strong>Commutative</strong> properties are the holy grail of fast computing!
      </MentorInsight>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Object.keys(ops).map(k => {
          const colorMap = { cyan: '#0891b2', red: '#dc2626', emerald: '#059669', fuchsia: '#d946ef', amber: '#d97706' };
          const bgColorMap = { cyan: '#164e63', red: '#7f1d1d', emerald: '#065f46', fuchsia: '#701a4c', amber: '#78350f' };
          const borderColorMap = { cyan: '#06b6d4', red: '#ef4444', emerald: '#10b981', fuchsia: '#ec4899', amber: '#f59e0b' };
          return (
            <button 
              key={k} 
              onClick={() => setActiveOp(k)} 
              className="px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all border-2"
              style={activeOp === k ? {
                backgroundColor: bgColorMap[ops[k].color],
                borderColor: borderColorMap[ops[k].color],
                color: 'white',
                boxShadow: `0 0 25px rgba(${parseInt(colorMap[ops[k].color].slice(1,3), 16)}, ${parseInt(colorMap[ops[k].color].slice(3,5), 16)}, ${parseInt(colorMap[ops[k].color].slice(5,7), 16)}, 0.5)`,
                transform: 'scale(1.05)'
              } : {
                backgroundColor: '#1e293b',
                borderColor: '#334155',
                color: '#a1a5af'
              }}
            >
              {ops[k].name}
            </button>
          );
        })}
      </div>

      <div className="bg-slate-900/80 border border-slate-700/80 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PropertyCard title="1. Closure" propData={currentOp.closure} />
          <PropertyCard title="2. Commutative" propData={currentOp.commutative} />
          <PropertyCard title="3. Associative" propData={currentOp.associative} />
          <PropertyCard title="4. Identity (e)" propData={currentOp.identity} />
          <div className="lg:col-span-2">
             <PropertyCard title="5. Inverse (a⁻¹)" propData={currentOp.inverse} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StructuresBuilder = () => {
  const [activeSet, setActiveSet] = useState('complex');

  const sets = {
    complex: {
      name: 'Complex Roots: {1,-1,i,-i} under (×)', 
      sys: true, semi: true, monoid: true, group: true, abelian: true,
      ex: { 
          sys: '(i) × (-i) = -i² = -(-1) = 1 ∈ G. (Closed).', 
          semi: 'Complex multiplication is inherently associative.', 
          monoid: 'Identity is e = 1.', 
          group: 'Inverses: (1)⁻¹=1, (-1)⁻¹=-1, (i)⁻¹=-i, (-i)⁻¹=i. Every element has an inverse.',
          abelian: 'Order does not matter: i × -1 = -1 × i.'
      }
    },
    exponents: {
      name: 'Prime Exponents: {2ᵃ3ᵇ} under (×)', 
      sys: true, semi: true, monoid: true, group: true, abelian: true,
      ex: { 
          sys: '(2ᵃ3ᵇ) × (2ᶜ3ᵈ) = 2ᵃ⁺ᶜ3ᵇ⁺ᵈ. Since a,b,c,d ∈ ℤ, their sums are in ℤ. (Closed).', 
          semi: 'Multiplication of real numbers is associative.', 
          monoid: 'Identity is e = 1 = 2⁰3⁰. Since 0 ∈ ℤ, 1 is in the set.', 
          group: 'Inverse of (2ᵃ3ᵇ) is (2⁻ᵃ3⁻ᵇ). Since a,b ∈ ℤ, -a,-b ∈ ℤ. Perfect!',
          abelian: '2ᵃ3ᵇ × 2ᶜ3ᵈ = 2ᶜ3ᵈ × 2ᵃ3ᵇ.'
      }
    },
    q_plus: {
      name: 'Fractional System: (ℚ⁺, ab/3)', 
      sys: true, semi: true, monoid: true, group: true, abelian: true,
      ex: { 
          sys: '(2)(3)/3 = 2 ∈ ℚ⁺', 
          semi: '((ab/3)c)/3 = abc/9 = a(bc/3)/3', 
          monoid: 'Identity e=3. a◦3 = 3a/3 = a.', 
          group: 'Inverse b=9/a. a◦(9/a) = (a*9/a)/3 = 9/3 = 3 = e.',
          abelian: 'ab/3 = ba/3.'
      }
    },
    z_mult: {
      name: 'Integer Multiplication: (ℤ, ×)', 
      sys: true, semi: true, monoid: true, group: false, abelian: false,
      ex: { 
          sys: 'An integer times an integer is always an integer. Perfectly closed.', 
          semi: '(a × b) × c = a × (b × c). Standard multiplication is associative.', 
          monoid: 'Identity e = 1. Since 1 ∈ ℤ, the identity element exists.', 
          group: 'TRICKY FAIL 🚨: To get e=1, the inverse of 2 is ½. But ½ is a fraction! (½ ∉ ℤ). Most elements lack inverses. Not a Group!',
          abelian: 'Halted. Structure collapses at the Group level.'
      }
    }
  };

  const c = sets[activeSet];

  const Stage = ({ title, active, rule, ex, icon, level }) => (
    <div className={`relative p-6 rounded-3xl border-2 transition-all duration-700 flex flex-col md:flex-row items-center gap-6 z-10 ${active ? 'bg-slate-900 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]' : 'bg-slate-900/40 border-slate-800 opacity-60 grayscale'}`}>
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0 border-2 shadow-inner ${active ? 'bg-cyan-950 text-cyan-400 border-cyan-500/50' : 'bg-slate-950 text-slate-700 border-slate-800'}`}>
        {icon}
      </div>
      <div className="flex-1 text-center md:text-left w-full">
        <div className={`text-xs font-black uppercase tracking-widest mb-1 ${active ? 'text-cyan-500' : 'text-slate-600'}`}>Level {level}</div>
        <div className="flex flex-col xl:flex-row xl:items-center gap-2 mb-3">
            <h4 className={`text-xl font-black uppercase tracking-wider ${active ? 'text-white' : 'text-slate-500'}`}>{title}</h4>
            {active && <span className="font-mono text-xs bg-slate-950 px-2 py-1 rounded text-cyan-300 border border-slate-800">Rule: {rule}</span>}
        </div>
        
        <div className={`p-3 rounded-xl font-mono text-sm border shadow-inner ${active ? 'bg-black/50 border-emerald-500/30 text-emerald-300' : 'bg-red-950/30 border-red-500/30 text-red-400'}`}>
            <span className="font-sans font-bold uppercase tracking-widest text-[10px] block mb-1 opacity-70">Proof Validation:</span>
            {ex}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-cyan-400 tracking-tight">2. The Hierarchy Builder 🏗️</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          Algebraic structures are built on top of each other. Watch how adding mathematical rules "levels up" a system into higher structures.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <FormalDefinition color="cyan" term="Semigroup" def="An algebraic system (S, *) that perfectly satisfies both Closure and Associativity." />
        <FormalDefinition color="cyan" term="Monoid" def="A Semigroup that also contains a universal Identity Element (e)." />
        <FormalDefinition color="cyan" term="Group" def="A Monoid where every single element possesses a mathematical Inverse." />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.keys(sets).map(k => (
          <button 
            key={k} onClick={() => setActiveSet(k)}
            className={`px-8 py-5 rounded-2xl font-bold transition-all border-2 flex flex-col items-center min-w-[240px] ${activeSet === k ? 'bg-cyan-900/30 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-[1.03]' : 'bg-slate-900 border-slate-700 text-slate-500 hover:bg-slate-800'}`}
          >
            <span className="text-lg">{sets[k].name}</span>
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative px-4 md:px-0">
        <div className="absolute left-[3.5rem] md:left-[4.5rem] top-10 bottom-10 w-2 bg-slate-800 rounded-full z-0 hidden md:block"></div>
        <div className="absolute left-[3.5rem] md:left-[4.5rem] top-10 w-2 bg-gradient-to-b from-cyan-400 to-emerald-500 rounded-full z-0 transition-all duration-1000 shadow-[0_0_15px_cyan] hidden md:block" 
             style={{ height: c.abelian ? '100%' : c.group ? '80%' : c.monoid ? '60%' : c.semi ? '30%' : '0%' }}></div>
             
        <div className="space-y-6">
          <Stage level="1" title="Algebraic System" rule="Closure" ex={c.ex.sys} active={c.sys} icon="📦" />
          <Stage level="2" title="Semi-Group" rule="Associativity" ex={c.ex.semi} active={c.semi} icon="🔗" />
          <Stage level="3" title="Monoid" rule="Identity Element" ex={c.ex.monoid} active={c.monoid} icon="🛡️" />
          <Stage level="4" title="Group" rule="Inverse Elements" ex={c.ex.group} active={c.group} icon="🔄" />
          <Stage level="5" title="Abelian Group" rule="Commutative Property" ex={c.ex.abelian} active={c.abelian} icon="⭐" />
        </div>
      </div>
    </div>
  );
};

const SubstructureLab = () => {
  const [subset, setSubset] = useState([0, 1, 2]);
  const parentSet = [0, 1, 2, 3];
  
  // Op is Addition Modulo 4
  const op = (a, b) => (a + b) % 4;

  const toggleSubset = (x) => {
    setSubset((prev) => prev.includes(x) ? prev.filter((item) => item !== x) : [...prev, x].sort());
  };

  // Compute closure explicitly to provide feedback
  let isClosed = true;
  let failedExample = null;
  
  if (subset.length === 0) isClosed = false;
  else {
      for (const a of subset) {
        for (const b of subset) {
          const res = op(a, b);
          if (!subset.includes(res)) {
              isClosed = false;
              if (!failedExample) failedExample = { a, b, res };
          }
        }
      }
  }

  const hasIdentity = subset.includes(0);
  const isSubsemigroup = subset.length > 0 && isClosed; 
  const isSubmonoid = isSubsemigroup && hasIdentity;

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-fuchsia-400 tracking-tight">3. Sub-Structure Lab 🧩</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          A subset is just a random collection of items. To be a <strong>Submonoid</strong>, it must perfectly satisfy the rules of a Monoid WITHOUT relying on the parent set.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-center border-b border-slate-800 pb-4">
            System: (Z₄, + mod 4)
          </h3>
          <div className="text-center mb-6 text-slate-400 text-sm">Parent Set S = {"{"}0, 1, 2, 3{"}"}, Identity (e) = 0</div>
          
          <div className="flex justify-center gap-3 mb-8">
            {parentSet.map((x) => (
              <button
                key={x} onClick={() => toggleSubset(x)}
                className={`w-16 h-16 rounded-2xl text-2xl font-black transition-all transform active:scale-95 border-2 ${
                  subset.includes(x)
                    ? 'bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,0.3)] scale-110'
                    : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner text-center">
             <div className="text-xs uppercase text-slate-500 font-bold tracking-widest mb-3">Your Subset (T)</div>
             <div className="text-3xl font-mono font-black text-white tracking-widest">{"{"} {subset.join(', ')} {"}"}</div>
             {subset.length === 0 && <div className="text-sm text-red-400 mt-2">Subset cannot be empty!</div>}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-center">
            <h3 className="text-xl font-bold text-fuchsia-400 mb-6 uppercase tracking-widest text-center border-b border-slate-800 pb-4">
               Validation Engine
            </h3>
            
            <div className="space-y-4 mb-6">
                <div className={`p-4 rounded-2xl border-2 transition-all ${isClosed ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`font-black uppercase tracking-widest ${isClosed ? 'text-emerald-400' : 'text-red-400'}`}>1. Is Closed?</span>
                        <span className="font-black text-2xl">{isClosed ? '✅' : '❌'}</span>
                    </div>
                    {isClosed ? (
                        <p className="text-sm text-emerald-200/80 font-mono bg-black/30 p-2 rounded border border-emerald-500/30">
                            <strong>Definition Passed:</strong> For every a,b in T, (a+b mod 4) is also in T. No results escaped your subset!
                        </p>
                    ) : failedExample ? (
                        <p className="text-sm text-red-300 font-mono bg-black/30 p-2 rounded border border-red-500/30">
                            <strong>Definition Failed:</strong> The elements {failedExample.a} and {failedExample.b} are in T. <br/>
                            But {failedExample.a} + {failedExample.b} = <strong>{failedExample.res}</strong> (mod 4). <br/>
                            <strong>{failedExample.res} is MISSING from your subset!</strong>
                        </p>
                    ) : <p className="text-sm text-slate-500">Add elements to begin.</p>}
                </div>
                
                <div className={`p-4 rounded-2xl border-2 transition-all ${hasIdentity ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`font-black uppercase tracking-widest ${hasIdentity ? 'text-emerald-400' : 'text-red-400'}`}>2. Has Identity?</span>
                        <span className="font-black text-2xl">{hasIdentity ? '✅' : '❌'}</span>
                    </div>
                    {hasIdentity ? (
                        <p className="text-sm text-emerald-200/80 font-mono bg-black/30 p-2 rounded border border-emerald-500/30">Pass: The identity element (0) is inside T.</p>
                    ) : (
                        <p className="text-sm text-red-300 font-mono bg-black/30 p-2 rounded border border-red-500/30">Fail: Your subset must explicitly include '0' to be a Monoid.</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border-2 text-center transition-all ${isSubsemigroup ? 'bg-fuchsia-900/40 border-fuchsia-400 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
                    <div className="text-[10px] uppercase font-black tracking-widest mb-1 opacity-70">Definition Met</div>
                    <div className="font-black text-base sm:text-lg">Subsemigroup</div>
                </div>
                <div className={`p-5 rounded-2xl border-2 text-center transition-all ${isSubmonoid ? 'bg-amber-900/40 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
                    <div className="text-[10px] uppercase font-black tracking-widest mb-1 opacity-70">Definition Met</div>
                    <div className="font-black text-base sm:text-lg">Submonoid</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PHASE 2: POSETS & LATTICES
// ==========================================
const HasseBuilder = () => {
  const [step, setStep] = useState(0); 

  const nodes = [
    { id: 1, val: 1, pos0: {x: 50, y: 15}, pos3: {x: 50, y: 85} }, 
    { id: 2, val: 2, pos0: {x: 20, y: 50}, pos3: {x: 30, y: 50} }, 
    { id: 3, val: 3, pos0: {x: 80, y: 50}, pos3: {x: 70, y: 50} }, 
    { id: 4, val: 6, pos0: {x: 50, y: 85}, pos3: {x: 50, y: 15} }  
  ];

  const edges = [
    { source: 1, target: 1, type: 'reflexive' },
    { source: 2, target: 2, type: 'reflexive' },
    { source: 3, target: 3, type: 'reflexive' },
    { source: 4, target: 4, type: 'reflexive' },
    { source: 1, target: 2, type: 'direct' },
    { source: 1, target: 3, type: 'direct' },
    { source: 2, target: 4, type: 'direct' },
    { source: 3, target: 4, type: 'direct' },
    { source: 1, target: 4, type: 'transitive' } 
  ];

  const getPos = (id) => step === 3 ? nodes.find(n => n.id === id).pos3 : nodes.find(n => n.id === id).pos0;

  const renderArrow = (edge) => {
    const p1 = getPos(edge.source);
    const p2 = getPos(edge.target);
    
    if (step >= 1 && edge.type === 'reflexive') return null;
    if (step >= 2 && edge.type === 'transitive') return null;

    if (edge.type === 'reflexive') {
      return (
        <path 
          key={`ref-${edge.source}`} 
          d={`M ${p1.x+5} ${p1.y-5} C ${p1.x+20} ${p1.y-25}, ${p1.x-20} ${p1.y-25}, ${p1.x-5} ${p1.y-5}`} 
          fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3" markerEnd="url(#arrowhead)" 
          className="transition-all duration-1000 opacity-50"
        />
      );
    }

    return (
      <line 
        key={`edge-${edge.source}-${edge.target}`}
        x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
        stroke={edge.type === 'transitive' ? '#ef4444' : (step === 3 ? '#d946ef' : '#94a3b8')} 
        strokeWidth={step === 3 ? 3 : 2}
        strokeDasharray={edge.type === 'transitive' ? '4,4' : 'none'}
        markerEnd={step === 3 ? '' : (edge.type === 'transitive' ? 'url(#arrowhead-red)' : 'url(#arrowhead-light)')}
        className={`transition-all duration-1000 ${step === 3 ? 'drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]' : ''}`}
      />
    );
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-fuchsia-400 tracking-tight">1. Hasse Diagram Filter 🧹</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          A raw Poset graph is an unreadable mess of redundant arrows. A Hasse Diagram is the mathematically stripped-down, elegant core structure.
        </p>
      </header>

      <MentorInsight title="Transitive Reduction" color="fuchsia">
        What we are doing here is a visual algorithm called <strong>Transitive Reduction</strong>. If Node A relies on B, and B relies on C, drawing an arrow directly from A to C is redundant clutter. By organizing nodes hierarchically (bottom-to-top), we can safely delete the arrowheads without losing any information!
      </MentorInsight>

      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-10 shadow-2xl">
        <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-slate-950 border border-slate-700 font-mono text-sm text-fuchsia-300 shadow-inner">
                Relation: "x Exactly Divides y" on Set {"{"}1, 2, 3, 6{"}"}
            </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          <div className="lg:col-span-5 space-y-4">
            <button onClick={() => setStep(0)} className={`w-full p-5 rounded-2xl border text-left transition-all ${step === 0 ? 'bg-fuchsia-900/30 border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.2)] scale-[1.02]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
              <div className={`font-black uppercase tracking-widest text-xs mb-1 ${step === 0 ? 'text-fuchsia-400' : 'text-slate-600'}`}>State 0</div>
              <div className="text-xl font-bold text-white mb-2">Raw Directed Graph</div>
              <div className="text-sm text-slate-400">Every single relationship is drawn explicitly. Cluttered.</div>
            </button>
            
            <button onClick={() => setStep(1)} className={`w-full p-5 rounded-2xl border text-left transition-all ${step === 1 ? 'bg-fuchsia-900/30 border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.2)] scale-[1.02]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
              <div className={`font-black uppercase tracking-widest text-xs mb-1 ${step === 1 ? 'text-fuchsia-400' : 'text-slate-600'}`}>Step 1</div>
              <div className="text-xl font-bold text-white mb-2">Remove Reflexive Loops</div>
              <div className="text-sm text-slate-400">Because Posets are guaranteed Reflexive, self-loops are assumed.</div>
            </button>

            <button onClick={() => setStep(2)} className={`w-full p-5 rounded-2xl border text-left transition-all ${step === 2 ? 'bg-fuchsia-900/30 border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.2)] scale-[1.02]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
              <div className={`font-black uppercase tracking-widest text-xs mb-1 ${step === 2 ? 'text-fuchsia-400' : 'text-slate-600'}`}>Step 2</div>
              <div className="text-xl font-bold text-white mb-2">Remove Transitive Edges</div>
              <div className="text-sm text-slate-400">1 divides 2, 2 divides 6, so 1 divides 6 is redundant. Delete <span className="text-red-400 font-bold">red arrow</span>.</div>
            </button>

            <button onClick={() => setStep(3)} className={`w-full p-5 rounded-2xl border text-left transition-all ${step === 3 ? 'bg-fuchsia-600 border-fuchsia-400 text-white shadow-[0_0_30px_rgba(217,70,239,0.5)] scale-[1.05]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
              <div className={`font-black uppercase tracking-widest text-xs mb-1 ${step === 3 ? 'text-fuchsia-200' : 'text-slate-600'}`}>Final Step</div>
              <div className="text-xl font-black mb-2">Align Upwards (Hasse)</div>
              <div className={`text-sm ${step === 3 ? 'text-fuchsia-100' : 'text-slate-400'}`}>Arrange "smaller" values at the bottom. Delete arrowheads!</div>
            </button>
          </div>

          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 relative overflow-hidden h-[450px] flex items-center justify-center shadow-inner">
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-sm absolute overflow-visible">
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#64748b" />
                </marker>
                <marker id="arrowhead-light" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#94a3b8" />
                </marker>
                <marker id="arrowhead-red" markerWidth="6" markerHeight="6" refX="16" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#ef4444" />
                </marker>
              </defs>
              {edges.map(renderArrow)}
              {nodes.map(node => {
                const pos = getPos(node.id);
                return (
                  <g key={`node-${node.id}`} className="transition-all duration-1000" transform={`translate(${pos.x}, ${pos.y})`}>
                    <circle r="7" fill={step === 3 ? '#a21caf' : '#1e293b'} stroke={step === 3 ? '#fdf4ff' : '#94a3b8'} strokeWidth="2" className={`transition-all duration-1000 ${step===3 ? 'drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]' : ''}`} />
                    <text textAnchor="middle" dy=".35em" fill="#fff" fontSize="5" fontWeight="black" className="pointer-events-none font-mono">{node.val}</text>
                  </g>
                )
              })}
            </svg>
            {step === 3 && (
               <div className="absolute top-6 left-6 text-fuchsia-400 font-black tracking-widest uppercase text-sm animate-pulse bg-fuchsia-950/80 px-4 py-2 rounded-lg border border-fuchsia-500/50 shadow-lg">
                  Perfect Hasse Diagram
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LatticeExplorer = () => {
  const [nodeA, setNodeA] = useState(null);
  const [nodeB, setNodeB] = useState(null);

  // Divisibility Lattice Example: L = {1, 2, 3, 5, 30}
  const nodes = [
    { id: '30', label: '30 (Top)', x: 50, y: 10 },
    { id: '2', label: '2', x: 20, y: 50 },
    { id: '3', label: '3', x: 50, y: 50 },
    { id: '5', label: '5', x: 80, y: 50 },
    { id: '1', label: '1 (Bottom)', x: 50, y: 90 }
  ];

  const edges = [
    { source: '1', target: '2' }, { source: '1', target: '3' }, { source: '1', target: '5' },
    { source: '2', target: '30' }, { source: '3', target: '30' }, { source: '5', target: '30' }
  ];

  const handleNodeClick = (id) => {
    if (nodeA === id) setNodeA(null);
    else if (nodeB === id) setNodeB(null);
    else if (!nodeA) setNodeA(id);
    else if (!nodeB) setNodeB(id);
    else { setNodeA(id); setNodeB(null); } 
  };

  const getResults = () => {
      if(!nodeA || !nodeB) return {join: '?', meet: '?'};
      const a = parseInt(nodeA); const b = parseInt(nodeB);
      const gcd = (x, y) => (!y ? x : gcd(y, x % y));
      const lcm = (x, y) => (x * y) / gcd(x, y);
      
      const meetNum = gcd(a,b);
      const lcmNum = lcm(a,b);

      let join = '30'; 
      if (a === b) join = a.toString();
      else if (a === 1 || b === 1) join = Math.max(a,b).toString();
      else if (a === 30 || b === 30) join = '30';
      
      return { join, meet: meetNum.toString(), lcmNum };
  }

  const { join, meet, lcmNum } = getResults();
  const isLUB = (id) => id === join && nodeA && nodeB;
  const isGLB = (id) => id === meet && nodeA && nodeB;
  const isSelected = (id) => id === nodeA || id === nodeB;

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-emerald-400 tracking-tight">2. The Lattice Engine (LUB/GLB) 💎</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          A Lattice is a perfect Poset. Select any two elements below to see how they uniquely resolve.
        </p>
      </header>

      <div className="max-w-4xl mx-auto mb-8">
        <FormalDefinition color="emerald" term="Lattice" def="A Poset where EVERY pair of elements has a unique Least Upper Bound (Join / LUB) and a unique Greatest Lower Bound (Meet / GLB)." />
      </div>

      <MentorInsight title="The LCM / GCD Rule" color="emerald">
        In a <strong>Divisibility Lattice</strong>, finding the Meet and Join is just basic arithmetic!
        <br/><br/>
        <strong>Meet (GLB / ∧):</strong> Simply calculate the Greatest Common Divisor (GCD). Visually, trace lines DOWNWARDS from both nodes. The first intersection is your Meet!
        <br/>
        <strong>Join (LUB / ∨):</strong> Calculate the Least Common Multiple (LCM). BUT WAIT! What if you pick 2 and 3? The LCM is 6. However, 6 is NOT in our set L = {"{"}1, 2, 3, 5, 30{"}"}. Therefore, we must find the <em>next available multiple</em> inside the set. Since 30 is a multiple of both 2 and 3, our Join is <strong>30</strong>!
      </MentorInsight>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 relative h-[450px] flex items-center justify-center shadow-2xl overflow-hidden group">
          <div className="absolute top-4 left-4 bg-slate-950 px-3 py-1 rounded border border-slate-800 text-xs font-mono text-emerald-400">Poset: (L, /)</div>
          <svg viewBox="0 0 100 100" className="w-full h-full max-w-[280px] overflow-visible relative z-10">
            {edges.map(e => {
              const p1 = nodes.find(n => n.id === e.source);
              const p2 = nodes.find(n => n.id === e.target);
              
              let stroke = "#334155"; let strokeWidth = "2"; let classes = "transition-all duration-500";
              if (nodeA && nodeB) {
                  // Highlight Join Path (UP)
                  if ((e.target === join && (e.source === nodeA || e.source === nodeB)) || 
                      (e.target === '30' && join === '30' && (e.source === nodeA || e.source === nodeB))) {
                      stroke = "#ef4444"; strokeWidth = "4"; classes += " drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]";
                  }
                  // Highlight Meet Path (DOWN)
                  if ((e.source === meet && (e.target === nodeA || e.target === nodeB)) ||
                      (e.source === '1' && meet === '1' && (e.target === nodeA || e.target === nodeB))) {
                      stroke = "#10b981"; strokeWidth = "4"; classes += " drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]";
                  }
              }
              return <line key={`${e.source}-${e.target}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={stroke} strokeWidth={strokeWidth} className={classes} />
            })}

            {nodes.map(n => {
              const selected = isSelected(n.id); const lub = isLUB(n.id); const glb = isGLB(n.id);
              let fill = '#1e293b', stroke = '#64748b', scale = 1, extraClasses = "";
              if (selected) { fill = '#1e3a8a'; stroke = '#60a5fa'; scale = 1.2; extraClasses = "drop-shadow-[0_0_15px_rgba(96,165,250,0.8)]"; }
              if (lub) { fill = '#ef4444'; stroke = '#fca5a5'; scale = 1.4; extraClasses = "drop-shadow-[0_0_20px_rgba(239,68,68,1)]"; }
              if (glb) { fill = '#10b981'; stroke = '#6ee7b7'; scale = 1.4; extraClasses = "drop-shadow-[0_0_20px_rgba(16,185,129,1)]"; }
              if (selected && lub && glb) { fill = '#a855f7'; stroke = '#e879f9'; scale = 1.5; extraClasses = "drop-shadow-[0_0_20px_rgba(217,70,239,1)]"; }

              return (
                <g key={n.id} onClick={() => handleNodeClick(n.id)} className="cursor-pointer transition-all duration-300" style={{ transformOrigin: `${n.x}px ${n.y}px`, transform: `scale(${scale})` }}>
                  <circle cx={n.x} cy={n.y} r="6" fill={fill} stroke={stroke} strokeWidth="1.5" className={`transition-all duration-300 ${extraClasses}`} />
                  <text x={n.x} y={n.y} textAnchor="middle" dy=".35em" fill="#fff" fontSize="5" fontWeight="bold" className="pointer-events-none font-mono">{n.id}</text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="flex flex-col gap-5 justify-center">
            <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-700 shadow-xl backdrop-blur">
                <div className="text-xs uppercase text-slate-500 font-bold tracking-widest mb-3 flex items-center justify-between">
                  <span>Selected Inputs</span>
                  {(nodeA && nodeB) && <button onClick={() => {setNodeA(null); setNodeB(null)}} className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded-lg border border-slate-600 hover:text-white hover:bg-slate-700">Clear</button>}
                </div>
                <div className="text-2xl font-mono text-white flex items-center gap-4 justify-center">
                  <span className={`w-16 h-12 flex items-center justify-center rounded-xl border-2 shadow-inner transition-all ${nodeA ? 'bg-blue-900/50 border-blue-500 text-blue-300' : 'bg-slate-950 border-slate-800 text-slate-700'}`}>{nodeA || '?'}</span>
                  <span className="text-slate-600 text-sm font-sans">and</span>
                  <span className={`w-16 h-12 flex items-center justify-center rounded-xl border-2 shadow-inner transition-all ${nodeB ? 'bg-blue-900/50 border-blue-500 text-blue-300' : 'bg-slate-950 border-slate-800 text-slate-700'}`}>{nodeB || '?'}</span>
                </div>
            </div>

            <div className={`p-6 rounded-3xl border-2 transition-all duration-700 relative overflow-hidden ${nodeA && nodeB ? 'bg-red-950/40 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)]' : 'bg-slate-900 border-slate-800 opacity-60 grayscale'}`}>
                <div className="text-[10px] md:text-xs uppercase text-red-400/80 font-black tracking-widest mb-2">Least Upper Bound (Join / ∨)</div>
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <div className="text-sm text-slate-400 mt-1 font-mono">{nodeA || 'a'} ∨ {nodeB || 'b'} = <span className="font-bold text-red-300">{join}</span></div>
                    {nodeA && nodeB && join !== lcmNum.toString() ? (
                        <div className="text-xs text-red-300/70 mt-1">LCM is {lcmNum}, but {lcmNum} ∉ L. Next valid multiple is 30!</div>
                    ) : (
                        <div className="text-xs text-red-300/70 mt-1">Calculated LCM directly.</div>
                    )}
                  </div>
                  <div className={`w-16 h-16 flex items-center justify-center rounded-2xl text-3xl font-black text-white shadow-inner transition-all ${nodeA && nodeB ? 'bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-slate-800'}`}>{join}</div>
                </div>
            </div>

            <div className={`p-6 rounded-3xl border-2 transition-all duration-700 relative overflow-hidden ${nodeA && nodeB ? 'bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'bg-slate-900 border-slate-800 opacity-60 grayscale'}`}>
                <div className="text-[10px] md:text-xs uppercase text-emerald-400/80 font-black tracking-widest mb-2">Greatest Lower Bound (Meet / ∧)</div>
                <div className="flex justify-between items-center relative z-10">
                  <div>
                     <div className="text-sm text-slate-400 mt-1 font-mono">{nodeA || 'a'} ∧ {nodeB || 'b'} = GCD({nodeA||'a'}, {nodeB||'b'}) = <span className="font-bold text-emerald-300">{meet}</span></div>
                     <div className="text-xs text-emerald-300/70 mt-1">Calculated GCD directly.</div>
                  </div>
                  <div className={`w-16 h-16 flex items-center justify-center rounded-2xl text-3xl font-black text-white shadow-inner transition-all ${nodeA && nodeB ? 'bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-800'}`}>{meet}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const LatticePropertiesAnalyzer = () => {
  const [activeLat, setActiveLat] = useState('chain');

  // SVG drawing helpers
  const drawChain = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full p-4">
      <line x1="50" y1="90" x2="50" y2="10" stroke="#94a3b8" strokeWidth="2"/>
      {[10, 36, 63, 90].map((y,i) => <circle key={y} cx="50" cy={y} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />)}
      <text x="35" y="93" fill="#cbd5e1" fontSize="8" className="font-mono">1</text>
      <text x="35" y="66" fill="#cbd5e1" fontSize="8" className="font-mono">5</text>
      <text x="30" y="39" fill="#cbd5e1" fontSize="8" className="font-mono">25</text>
      <text x="25" y="13" fill="#cbd5e1" fontSize="8" className="font-mono">125</text>
    </svg>
  );

  const drawPentagon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full p-4">
      <line x1="50" y1="90" x2="20" y2="50" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="50" y1="90" x2="80" y2="65" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="80" y1="65" x2="80" y2="35" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="80" y1="35" x2="50" y2="10" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="20" y1="50" x2="50" y2="10" stroke="#94a3b8" strokeWidth="2"/>
      <circle cx="50" cy="90" r="5" fill="#1e293b" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="50" cy="10" r="5" fill="#1e293b" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="20" cy="50" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="80" cy="65" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="80" cy="35" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1.5"/>
      <text x="20" y="40" fill="#fca5a5" fontSize="8" className="font-mono font-bold">a</text>
      <text x="90" y="68" fill="#fca5a5" fontSize="8" className="font-mono font-bold">c</text>
      <text x="90" y="38" fill="#fca5a5" fontSize="8" className="font-mono font-bold">b</text>
    </svg>
  );

  const drawDiamond = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full p-4">
      <line x1="50" y1="90" x2="20" y2="50" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="50" y1="90" x2="50" y2="50" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="50" y1="90" x2="80" y2="50" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="50" y1="10" x2="20" y2="50" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="50" y1="10" x2="50" y2="50" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="50" y1="10" x2="80" y2="50" stroke="#94a3b8" strokeWidth="2"/>
      <circle cx="50" cy="90" r="5" fill="#1e293b" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="50" cy="10" r="5" fill="#1e293b" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="20" cy="50" r="5" fill="#3b82f6" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="50" cy="50" r="5" fill="#3b82f6" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="80" cy="50" r="5" fill="#3b82f6" stroke="#fff" strokeWidth="1.5"/>
      <text x="12" y="52" fill="#93c5fd" fontSize="8" className="font-mono font-bold">a</text>
      <text x="42" y="52" fill="#93c5fd" fontSize="8" className="font-mono font-bold">b</text>
      <text x="88" y="52" fill="#93c5fd" fontSize="8" className="font-mono font-bold">c</text>
    </svg>
  );

  const drawBoolean = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full p-4">
      <line x1="50" y1="90" x2="30" y2="50" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="50" y1="90" x2="70" y2="50" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="50" y1="10" x2="30" y2="50" stroke="#94a3b8" strokeWidth="2"/>
      <line x1="50" y1="10" x2="70" y2="50" stroke="#94a3b8" strokeWidth="2"/>
      <circle cx="50" cy="90" r="5" fill="#1e293b" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="50" cy="10" r="5" fill="#1e293b" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="30" cy="50" r="5" fill="#10b981" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="70" cy="50" r="5" fill="#10b981" stroke="#fff" strokeWidth="1.5"/>
      <text x="48" y="99" fill="#94a3b8" fontSize="6" className="font-mono font-bold">∅ (0)</text>
      <text x="15" y="52" fill="#6ee7b7" fontSize="8" className="font-mono font-bold">{"{a}"}</text>
      <text x="78" y="52" fill="#6ee7b7" fontSize="8" className="font-mono font-bold">{"{b}"}</text>
      <text x="44" y="6" fill="#94a3b8" fontSize="6" className="font-mono font-bold">{"{a,b}"} (1)</text>
    </svg>
  );

  const latData = {
    chain: { 
      name: "Linear Chain", subtitle: "e.g. {1,5,25,125}", 
      bounded: true, dist: true, comp: false, bottom: "1", top: "125",
      svg: drawChain,
      distDesc: "Any Totally Ordered Set (chain) is automatically Distributive. It does not contain an N5 or M3 sub-shape.",
      compDesc: "Only the top and bottom elements have complements. The middle elements (5, 25) have no partner to combine with to reach 1 and 125 simultaneously."
    },
    n5: { 
      name: "Pentagon Lattice (N5)", subtitle: "The Distributivity Killer",
      bounded: true, dist: false, comp: false, bottom: "0", top: "1",
      svg: drawPentagon,
      distDesc: "FAILS DISTRIBUTIVITY! The equation a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c) evaluates differently on each side. If a lattice contains this shape, it is completely broken for Boolean logic.",
      compDesc: "Not every element has a complement. Node 'c' has no partner to reach 1."
    },
    m3: {
      name: "Diamond Lattice (M3)", subtitle: "The Complement King",
      bounded: true, dist: false, comp: true, bottom: "0", top: "1",
      svg: drawDiamond,
      distDesc: "FAILS DISTRIBUTIVITY! Similar to the Pentagon, this highly symmetrical diamond shape breaks the distributive law completely.",
      compDesc: "PASSES! Every middle node can pair with ANY OTHER middle node to reach the Top (1) and Bottom (0). It is perfectly Complemented."
    },
    bool: {
      name: "Boolean Lattice", subtitle: "Power Set P({a,b})",
      bounded: true, dist: true, comp: true, bottom: "∅", top: "{a,b}",
      svg: drawBoolean,
      distDesc: "PASSES! Subsets follow the Distributive law perfectly using Union (∪) and Intersection (∩).",
      compDesc: "PASSES! Every set has a perfect complement. {a} combined with {b} gives the full universe {a,b}. Their intersection gives ∅."
    }
  };

  const curr = latData[activeLat];

  const PropCard = ({ title, active, desc, layman }) => (
    <div className={`p-5 rounded-2xl border-2 transition-all ${active ? 'bg-amber-900/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-slate-900 border-slate-700 opacity-60 grayscale'}`}>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-white uppercase tracking-wider">{title}</h4>
        <span className={`font-black px-3 py-1 rounded text-sm ${active ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>{active ? 'PASS' : 'FAIL'}</span>
      </div>
      <div className="text-[10px] text-amber-300 font-bold uppercase tracking-widest mb-3">{layman}</div>
      <p className="text-sm text-slate-300 font-medium leading-relaxed">{desc}</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-amber-400 tracking-tight">3. Lattice Properties 🏛️</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          Explore classic lattice structures to see how they pass or fail key mathematical properties.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <FormalDefinition color="amber" term="Bounded Lattice" def="A lattice that has a supreme absolute Top element (usually denoted as 1) and an absolute Bottom element (denoted as 0)." />
        <FormalDefinition color="amber" term="Distributive Lattice" def="A lattice where the Distributive Laws hold: a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c). Visually, it means the lattice does NOT contain any Pentagon (N5) or Diamond (M3) sub-structures." />
      </div>

      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-10 shadow-2xl">
        <div className="flex flex-wrap justify-center gap-4 mb-10 border-b border-slate-800 pb-8">
          {Object.keys(latData).map(k => (
            <button 
              key={k} onClick={() => setActiveLat(k)}
              className={`px-6 py-4 rounded-xl transition-all border-2 flex flex-col items-center ${activeLat === k ? 'bg-amber-500/20 border-amber-500 text-amber-300 scale-105' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
            >
              <span className="font-black text-lg">{latData[k].name}</span>
              <span className="text-xs font-mono opacity-80">{latData[k].subtitle}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 bg-slate-950 rounded-3xl border border-slate-800 h-[400px] shadow-inner flex items-center justify-center p-4 relative">
               <div className="absolute top-4 left-4 bg-slate-900 px-3 py-1 rounded border border-slate-700 text-xs font-mono text-amber-400">Hasse Diagram</div>
               {curr.svg()}
            </div>
            
            <div className="lg:col-span-7 space-y-4">
              <PropCard title="Bounded" layman="Is there a ceiling and a floor?" active={curr.bounded} desc={`Has absolute Top (${curr.top}) and absolute Bottom (${curr.bottom}).`} />
              <PropCard title="Distributive" layman="The 'No Tangled Wires' Rule" active={curr.dist} desc={curr.distDesc} />
              <PropCard title="Complemented" layman="The 'Perfect Partner' Rule" active={curr.comp} desc={curr.compDesc} />
            </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PHASE 3: BOOLEAN ALGEBRA
// ==========================================
const BooleanSimplifier = () => {
  const [activeQ, setActiveQ] = useState(0);

  const laws = [
    { name: "Identity Law", rule: "A + 0 = A", rule2: "A · 1 = A", desc: "Adding False or Multiplying by True changes nothing." },
    { name: "Null Law", rule: "A + 1 = 1", rule2: "A · 0 = 0", desc: "Adding True forces True. Multiplying by False forces False." },
    { name: "Idempotent Law", rule: "A + A = A", rule2: "A · A = A", desc: "Redundancy changes nothing. Doing something twice is just doing it once." },
    { name: "Complement Law", rule: "A + A' = 1", rule2: "A · A' = 0", desc: "A variable combined with its exact opposite yields an absolute." },
    { name: "De Morgan's Laws", rule: "(A + B)' = A' · B'", rule2: "(A · B)' = A' + B'", desc: "Break the line, change the sign. The complement of an OR is the AND of the complements." },
    { name: "Absorption Law", rule: "A + (A · B) = A", rule2: "A · (A + B) = A", desc: "The larger term completely 'absorbs' the smaller attached term." }
  ];

  const questions = [
    {
        title: "Challenge: The Absorption Proof",
        q: "Prove: x + (x · y) = x",
        steps: [
            { text: "(x · 1) + (x · y)", rule: "First, use Identity Law (x = x·1) to make factoring easier." },
            { text: "x · (1 + y)", rule: "Distributive Law allows us to factor out the 'x'." },
            { text: "x · (1)", rule: "Null Law: (1 + y) is always True (1) because anything OR True is True." },
            { text: "x", rule: "Identity Law: x · 1 leaves just x." }
        ],
        desc: "We just proved the Absorption Law step-by-step!"
    },
    {
        title: "Challenge: Finding the Dual",
        q: "Dual of: xy(y+y'z) + x'z",
        steps: [
            { text: "(x · y) · (y + (y' · z)) + (x' · z)", rule: "First, add explicit DOTS (·) for multiplication." },
            { text: "Swap all (·) with (+) AND swap all (+) with (·)", rule: "Definition of a Boolean Dual." },
            { text: "(x + y) + (y · (y' + z)) · (x' + z)", rule: "Resulting Dual. Notice we preserved the original variable casing (x' stays x')." }
        ],
        desc: "The Dual principle states that any theorem in Boolean algebra remains true if you swap ANDs/ORs and 1s/0s."
    },
    {
        title: "Challenge: De Morgan's Complement",
        q: "Complement of: x(y'z' + yz)",
        steps: [
            { text: "[ x · (y'z' + yz) ]'", rule: "Apply negation to entire expression" },
            { text: "x' + (y'z' + yz)'", rule: "De Morgan's Law: (A · B)' = A' + B'" },
            { text: "x' + ( (y'z')' · (yz)' )", rule: "De Morgan's Law on the inner sum: (A + B)' = A' · B'" },
            { text: "x' + ( (y''+z'') · (y'+z') )", rule: "De Morgan's Law on the inner products" },
            { text: "x' + ( (y+z) · (y'+z') )", rule: "Double Negation Law: y'' = y" }
        ],
        desc: "Finding the complement requires recursive, inside-out application of De Morgan's Laws."
    }
  ];

  const current = questions[activeQ];

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-blue-400 tracking-tight">Boolean Circuit Simplifier ⚡</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          Boolean Algebra is the mathematics of 1s (True) and 0s (False). It is the language that powers every CPU, smartphone, and piece of software in the world.
        </p>
      </header>

      {/* Boolean Laws Cheat Sheet */}
      <div className="max-w-5xl mx-auto bg-slate-900 border border-blue-500/30 rounded-3xl p-6 md:p-8 shadow-2xl mb-12">
        <h3 className="text-xl font-black text-blue-300 mb-6 uppercase tracking-widest border-b border-slate-800 pb-3">The Laws of Boolean Algebra</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {laws.map((law, idx) => (
             <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner hover:border-blue-500/50 transition-colors">
               <h4 className="text-sm font-bold text-slate-300 mb-2">{law.name}</h4>
               <div className="flex flex-col gap-1 mb-2">
                 <span className="font-mono text-blue-400 font-bold bg-blue-900/20 px-2 py-1 rounded inline-block w-max">{law.rule}</span>
                 <span className="font-mono text-emerald-400 font-bold bg-emerald-900/20 px-2 py-1 rounded inline-block w-max">{law.rule2}</span>
               </div>
               <p className="text-xs text-slate-500">{law.desc}</p>
             </div>
           ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-10 shadow-2xl">
        <div className="flex flex-wrap justify-center gap-3 mb-10 border-b border-slate-800 pb-8">
           {questions.map((q, idx) => (
               <button key={idx} onClick={() => setActiveQ(idx)} className={`px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all border-2 ${activeQ === idx ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'}`}>
                   {q.title}
               </button>
           ))}
        </div>

        <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 shadow-inner">
           <div className="text-xs uppercase text-slate-500 font-bold tracking-widest mb-2">Original Expression</div>
           <div className="text-2xl md:text-4xl font-mono font-black text-white mb-8 bg-blue-900/20 p-6 rounded-2xl border border-blue-500/30">
               {current.q}
           </div>

           <div className="space-y-4">
               {current.steps.map((step, idx) => (
                   <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 relative overflow-hidden group">
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                       <div className="flex-1 font-mono text-lg md:text-xl font-bold text-blue-300 pl-4">{step.text}</div>
                       <div className="text-sm font-sans font-medium text-slate-400 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 md:max-w-xs leading-relaxed">
                           {step.rule}
                       </div>
                   </div>
               ))}
           </div>

           <div className="mt-8 text-center text-emerald-400 font-bold bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/30">
             {current.desc}
           </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PHASE 4: THE ULTIMATE EXAM SUITE
// ==========================================
const InteractiveProver = () => {
  const [activeQ, setActiveQ] = useState('q1');
  const [proofStep, setProofStep] = useState(0);
  const [feedback, setFeedback] = useState({ text: '', type: '' });

  const examData = useMemo(() => ({
    q1: {
      title: "Case 1: Custom Operation Test",
      question: "Let a*b = a+b-ab on Rationals (ℚ). Test whether it is a Group.",
      premises: ["Closure: a+b-ab is rational.", "Identity (e): a*e = a", "Inverse: a*b = e"],
      steps: [
        { expected: 'e = 0', options: ['e = 1', 'e = 0', 'e = a', 'None'], prompt: 'Step 1: Find Identity. a + e - ae = a. Solve for e.', result: 'Identity found: e = 0.' },
        { expected: 'b = a / (a-1)', options: ['b = 1/a', 'b = -a', 'b = a / (a-1)', 'b = 0'], prompt: 'Step 2: Find Inverse (b). Set a*b = 0. a + b - ab = 0. Solve for b.', result: 'Inverse formula: b = a / (a - 1)' },
        { expected: 'Fails when a = 1', options: ['Always works', 'Fails when a = 1', 'Fails for negatives', 'Fails for zero'], prompt: 'Step 3: Look at the inverse formula b = a / (a-1). Does this work for EVERY rational number "a"?', result: 'Denominator becomes 0 when a=1.' }
      ],
      conclusion: "Because the element '1' has NO inverse, the set fails the group requirement! It is just a Monoid."
    },
    q2: {
      title: "Case 2: Abelian Group Proof",
      question: "Show that ℚ⁺ forms an abelian group under a ◦ b = ab/3.",
      premises: ["Abelian means Commutative.", "Identity: a◦e = a", "Inverse: a◦b = e"],
      steps: [
        { expected: 'Yes, ab/3 = ba/3', options: ['Yes, ab/3 = ba/3', 'No, order matters'], prompt: 'Step 1: Is it Commutative (Abelian)? Does a◦b = b◦a?', result: 'Commutative property holds.' },
        { expected: 'e = 3', options: ['e = 1', 'e = 0', 'e = 3', 'e = 1/3'], prompt: 'Step 2: Find Identity. ae/3 = a. Solve for e.', result: 'Identity is e = 3. (And 3 ∈ ℚ⁺).' },
        { expected: 'b = 9/a', options: ['b = 1/a', 'b = 3/a', 'b = 9/a', 'b = -a'], prompt: 'Step 3: Find Inverse. ab/3 = 3. Solve for b.', result: 'Inverse formula: b = 9/a.' },
        { expected: 'Yes', options: ['Yes', 'No'], prompt: 'Step 4: If a is positive, is 9/a always positive and rational?', result: 'Yes, inverses always exist in ℚ⁺.' }
      ],
      conclusion: "Perfect! All properties hold. (ℚ⁺, ab/3) is an Abelian Group."
    }
  }), []); 

  const examKeys = Object.keys(examData);
  const activeCase = examData[activeQ];

  // Dynamic Shuffling of options every time proofStep or activeQ changes!
  const currentOptions = useMemo(() => {
    return shuffleArray(activeCase.steps[proofStep]?.options || []);
  }, [activeQ, proofStep, activeCase.steps]);

  const handleCaseSwitch = (q) => { setActiveQ(q); setProofStep(0); setFeedback({ text: '', type: '' }); };
  const handleProofGuess = (guess) => {
      if (guess === activeCase.steps[proofStep].expected) {
          if (proofStep === activeCase.steps.length - 1) {
              setProofStep(proofStep + 1); setFeedback({ text: 'Proof Successfully Derived!', type: 'success' });
          } else {
              setProofStep(proofStep + 1); setFeedback({ text: 'Valid deduction. Proceed.', type: 'success' });
          }
      } else { setFeedback({ text: 'Logic Error. Check your math.', type: 'error' }); }
  };

  return (
    <div className="space-y-8 animate-fade-in mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-500 tracking-tight">Master Prover 🕵️‍♂️</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">Don't fear the math. Deduce complex proofs step-by-step interactively.</p>
      </header>

      <div className="bg-slate-900 border-2 border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex border-b border-slate-800 bg-slate-950 pt-4 px-4 overflow-x-auto scrollbar-hide">
            {examKeys.map((q) => (
                <button key={q} onClick={() => handleCaseSwitch(q)} className={`px-8 py-5 font-black tracking-widest uppercase text-sm whitespace-nowrap border-b-4 transition-all ${activeQ === q ? `border-amber-400 text-amber-400 bg-slate-900` : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    {examData[q].title}
                </button>
            ))}
        </div>
        
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-inner">
                <div className="text-white text-base md:text-lg font-bold mb-8 bg-slate-900 p-6 rounded-2xl border-l-4 border-amber-500 shadow-lg">{activeCase.question}</div>
                
                <h4 className="text-xs uppercase text-slate-500 font-bold tracking-widest mb-4">Your Deductions</h4>
                <div className="space-y-4">
                  {activeCase.steps.map((step, idx) => (
                      <div key={idx}>
                          {proofStep > idx ? (
                              <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-500/30 text-emerald-300 font-mono text-sm md:text-base animate-fade-in flex gap-3">
                                <span className="font-bold">✓</span> <span>{step.result}</span>
                              </div>
                          ) : proofStep === idx ? (
                              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-500 font-mono text-sm animate-pulse flex gap-3">
                                <span>▶</span> <span>[ Awaiting Logic Input... ]</span>
                              </div>
                          ) : null}
                      </div>
                  ))}
                </div>
            </div>

            <div className="flex flex-col justify-center">
                {proofStep < activeCase.steps.length ? (
                    <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-700 shadow-xl animate-fade-in">
                        <p className="text-amber-300 mb-8 font-bold bg-amber-900/20 p-5 rounded-xl border border-amber-500/30 text-lg leading-relaxed">{activeCase.steps[proofStep].prompt}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {currentOptions.map(opt => (
                                <button key={opt} onClick={() => handleProofGuess(opt)} className="p-5 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-600 font-mono font-bold text-slate-300 hover:text-white transition-all active:scale-95 shadow-md text-sm">{opt}</button>
                            ))}
                        </div>
                        {feedback.text && <div className={`mt-6 p-4 rounded-xl font-bold text-sm text-center shadow-inner ${feedback.type === 'success' ? 'text-emerald-400 bg-emerald-900/30' : 'text-red-400 bg-red-900/30'}`}>{feedback.text}</div>}
                    </div>
                ) : (
                    <div className="text-center bg-emerald-900/20 p-10 rounded-3xl border-2 border-emerald-500/50 animate-bounce-in shadow-2xl">
                        <div className="text-7xl mb-6">🏆</div>
                        <h4 className="text-3xl font-black text-emerald-400 mb-4 tracking-tight">Q.E.D. Proof Complete!</h4>
                        <p className="text-emerald-200/80 font-medium leading-relaxed text-lg mb-8">{activeCase.conclusion}</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

const FinalQuiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  const rawQuestions = useMemo(() => [
    { q: "Which of the following is REQUIRED for an algebraic system to be considered a Semigroup?", opts: ["Commutativity", "An Identity Element", "Associativity", "Inverse Elements"], ans: 2, exp: "Correct! A Semigroup requires Closure and Associativity. An identity element would upgrade it to a Monoid." },
    { q: "When drawing a Hasse Diagram from a Poset, which edges do you mathematically DELETE?", opts: ["Only Reflexive loops", "Only Transitive edges", "Both Reflexive loops and Transitive edges", "None"], ans: 2, exp: "Hasse diagrams strip away redundant info. Reflexive loops are implied, and transitive connections are implied by upward tracing." },
    { q: "In a Lattice, every pair of elements must have exactly ONE unique:", opts: ["Inverse", "Least Upper Bound (Join) and Greatest Lower Bound (Meet)", "Complement", "Path to the top node"], ans: 1, exp: "LUB (Join) and GLB (Meet) are the defining characteristics of a mathematical Lattice." },
    { q: "Boolean Algebra is a specific type of Lattice that is BOTH:", opts: ["Distributive and Complemented", "Bounded and Infinite", "Associative and Commutative", "Linear and Bounded"], ans: 0, exp: "Boolean Algebra is mathematically defined as a Distributive, Complemented Lattice." },
    { q: "A NAND gate outputs 0 ONLY when:", opts: ["Both inputs are 0", "At least one input is 1", "Both inputs are 1", "Inputs differ"], ans: 2, exp: "Correct. NAND is the negation of AND. It only outputs 0 if both inputs are 1." },
    // 5 New Questions
    { q: "What is the identity element for the OR (+) operation in Boolean Algebra?", opts: ["1 (True)", "0 (False)", "The variable itself", "There is no identity"], ans: 1, exp: "Correct! A + 0 = A. Zero is the identity element for OR." },
    { q: "If an algebraic system has Closure, Associativity, Identity, and Inverses, what is it called?", opts: ["Semigroup", "Monoid", "Group", "Lattice"], ans: 2, exp: "Correct! Passing all 4 of those properties officially makes it a Group." },
    { q: "In a Divisibility Lattice, the Greatest Lower Bound (Meet) of two numbers corresponds to their:", opts: ["Least Common Multiple (LCM)", "Greatest Common Divisor (GCD)", "Product", "Difference"], ans: 1, exp: "Exactly. The GLB (Meet) is the highest number that divides both, which is the GCD." },
    { q: "Which lattice property guarantees that no hidden 'Diamond' (M3) or 'Pentagon' (N5) sub-structures exist?", opts: ["Bounded", "Complemented", "Distributive", "Reflexive"], ans: 2, exp: "Distributive lattices are clean. If they contain an N5 or M3, they immediately fail distributivity." },
    { q: "According to the Absorption Law in Boolean Algebra, what does `A + (A · B)` simplify to?", opts: ["A + B", "B", "1", "A"], ans: 3, exp: "Correct! The larger term 'A' completely absorbs the smaller attached term '(A · B)'." }
  ], []);

  // Shuffle questions and their options on start!
  const questions = useMemo(() => {
    return rawQuestions.map(q => {
      const correctText = q.opts[q.ans];
      const shuffledOpts = shuffleArray([...q.opts]);
      const newAnsIndex = shuffledOpts.indexOf(correctText);
      return { ...q, opts: shuffledOpts, ans: newAnsIndex };
    });
  }, [quizStarted]); // Reshuffles every time the quiz restarts

  const handleCheck = () => { if (selected === null) return; setChecked(true); if (selected === questions[currentQ].ans) setScore(score + 1); };
  const handleNext = () => { if (currentQ < questions.length - 1) { setCurrentQ(currentQ + 1); setSelected(null); setChecked(false); } else setShowResults(true); };

  return (
    <div className="space-y-8 animate-fade-in mx-2 md:mx-0 py-8">
      {!quizStarted ? (
        <div className="bg-gradient-to-br from-amber-900 to-orange-950 rounded-3xl p-10 md:p-16 text-center border-4 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
            <div className="text-7xl mb-8 animate-bounce">🎓</div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Final Boss Fight</h2>
            <p className="text-lg md:text-xl text-amber-200/80 max-w-2xl mx-auto mb-12 font-medium">You have leveled up through Algebraic Systems, Hasse Diagrams, and Logic Gates. Prove your mastery across 10 randomized questions.</p>
            <button onClick={() => setQuizStarted(true)} className="px-10 py-5 bg-amber-500 text-slate-950 text-xl font-black uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:bg-amber-400 transition-all hover:scale-105 active:scale-95">Initiate Final Exam 🚀</button>
        </div>
      ) : showResults ? (
        <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center border-2 border-emerald-500 shadow-2xl">
            <div className="text-7xl md:text-8xl mb-8">{score === questions.length ? '🏆' : (score > 6 ? '🎖️' : '💪')}</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Exam Complete!</h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 font-medium">Score: <span className="text-emerald-400 font-black">{score}</span> / {questions.length}</p>
            <button onClick={() => {setQuizStarted(false); setCurrentQ(0); setScore(0); setShowResults(false); setSelected(null); setChecked(false);}} className="px-8 py-4 bg-slate-800 text-white font-black uppercase tracking-widest rounded-full hover:bg-slate-700 transition-all border border-slate-600 shadow-lg active:scale-95">Retake Exam</button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-amber-500/50 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="mb-8 md:mb-10 border-b border-slate-800 pb-6 flex justify-between items-center gap-4">
              <span className="text-amber-500 font-black uppercase tracking-widest text-sm">Question {currentQ + 1} of {questions.length}</span>
              <span className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-700 font-mono font-bold text-sm text-white shadow-inner">Score: <span className="text-amber-400">{score}</span></span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-10 leading-relaxed tracking-wide">{questions[currentQ].q}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {questions[currentQ].opts.map((opt, i) => {
                    let c = "p-5 md:p-8 rounded-2xl border-2 text-left font-bold text-lg transition-all ";
                    if (!checked) c += selected === i ? "bg-amber-600/90 border-amber-400 text-white transform scale-[1.03] shadow-[0_0_20px_rgba(245,158,11,0.4)]" : "bg-slate-950 border-slate-700 text-slate-300 hover:border-amber-500/70 hover:bg-slate-900";
                    else c += i === questions[currentQ].ans ? "bg-emerald-900/80 border-emerald-500 text-emerald-300 shadow-inner" : (selected === i ? "bg-red-900/80 border-red-500 text-red-300 opacity-50" : "bg-slate-950 border-slate-800 opacity-30");
                    return <button key={i} onClick={() => !checked && setSelected(i)} disabled={checked} className={c}>{opt}</button>;
                })}
            </div>
            {!checked ? (
                <button onClick={handleCheck} disabled={selected === null} className={`px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-lg w-full md:w-auto transition-all ${selected !== null ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:bg-amber-400 hover:scale-[1.02]' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>Verify Answer</button>
            ) : (
                <div className="animate-fade-in">
                    <div className={`p-6 rounded-2xl border-2 mb-8 text-lg font-medium shadow-inner ${selected === questions[currentQ].ans ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-300' : 'bg-amber-900/20 border-amber-500/50 text-amber-300'}`}>
                      <span className="font-black block mb-2">{selected === questions[currentQ].ans ? "✅ CORRECT" : "❌ INCORRECT"}</span>
                      {questions[currentQ].exp}
                    </div>
                    <button onClick={handleNext} className="px-10 py-5 bg-white text-slate-900 font-black uppercase tracking-widest rounded-2xl w-full md:w-auto hover:bg-slate-200 transition-all active:scale-95">{currentQ < questions.length - 1 ? 'Next Question ➡️' : 'See Results 🏆'}</button>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

const ExamPhase = ({ activeTab }) => (
  <>
    {activeTab === 'prover' && <InteractiveProver />}
    {activeTab === 'quiz' && <FinalQuiz />}
  </>
);

// ==========================================
// THE ROOT COMPONENT: UNIT 3 MASTER HUB
// ==========================================
export default function Unit3MasterHub() {
  const [activePhase, setActivePhase] = useState('algebra'); 
  
  const [activeSubTabs, setActiveSubTabs] = useState({
    algebra: 'properties', posets: 'hasse', boolean: 'algebra', exam: 'prover'
  });

  const handleSubTabChange = (tabId) => setActiveSubTabs(prev => ({ ...prev, [activePhase]: tabId }));

  const PHASES = [
    { id: 'algebra', title: '1. Algebraic Systems', icon: '⚙️' },
    { id: 'posets', title: '2. Posets & Lattices', icon: '💎' },
    { id: 'boolean', title: '3. Boolean Algebra', icon: '🔌' },
    { id: 'exam', title: '4. Sandbox & Exams', icon: '🏆' }
  ];

  const SUB_TABS = {
    algebra: [
      { id: 'properties', title: 'Binary Properties', icon: '🔍' }, 
      { id: 'structures', title: 'Hierarchy Builder', icon: '🏗️' },
      { id: 'substructures', title: 'Sub-Structure Lab', icon: '🧩' }
    ],
    posets: [
      { id: 'hasse', title: 'Hasse Filter', icon: '🧹' },
      { id: 'lattices', title: 'Lattice Engine (LUB/GLB)', icon: '💎' }, 
      { id: 'lattice_props', title: 'Lattice Properties', icon: '🏛️' }
    ],
    boolean: [
      { id: 'algebra', title: 'Concept Simplifier', icon: '⚡' }
    ],
    exam: [
      { id: 'prover', title: 'Master Prover', icon: '🕵️‍♂️' },
      { id: 'quiz', title: 'Final Boss Quiz', icon: '🎓' }
    ]
  };

  const activeSubTab = activeSubTabs[activePhase];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-2xl flex flex-col backdrop-blur-md bg-opacity-90">
        <div className="px-3 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-800/50">
            <div className="text-center md:text-left shrink-0">
              <div className="text-[10px] md:text-xs font-black tracking-widest text-amber-500 uppercase mb-1 flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Unit 3 • Full Masterclass
              </div>
              <h1 className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 tracking-tight">THE ALGEBRA ENGINE</h1>
            </div>
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide py-1">
              <nav className="flex flex-nowrap gap-2 justify-start md:justify-end w-max mx-auto md:mx-0 px-2">
                  {PHASES.map(phase => (
                      <button key={phase.id} onClick={() => setActivePhase(phase.id)} className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-black text-xs md:text-sm transition-all flex items-center gap-2 shrink-0 ${activePhase === phase.id ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] transform scale-105' : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700/50'}`}>
                          <span className="text-lg">{phase.icon}</span> <span>{phase.title}</span>
                      </button>
                  ))}
              </nav>
            </div>
        </div>
        <div className="bg-slate-950/30 py-2.5">
            <div className="w-full overflow-x-auto scrollbar-hide py-1">
              <nav className="flex flex-nowrap gap-3 justify-start md:justify-center w-max mx-auto px-4">
                  {SUB_TABS[activePhase].map(tab => (
                      <button key={tab.id} onClick={() => handleSubTabChange(tab.id)} className={`whitespace-nowrap px-4 py-2 rounded-lg font-bold text-xs md:text-sm transition-all flex items-center gap-2 shrink-0 ${activeSubTab === tab.id ? 'bg-slate-700 text-white shadow-md border border-slate-500' : 'text-slate-500 hover:text-slate-300 border border-transparent hover:bg-slate-800/50'}`}>
                          <span>{tab.icon}</span> <span>{tab.title}</span>
                      </button>
                  ))}
              </nav>
            </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-4 md:px-8 py-8 md:py-14 overflow-x-hidden">
        {activePhase === 'algebra' && (
          <>
            {activeSubTab === 'properties' && <BinaryProperties />}
            {activeSubTab === 'structures' && <StructuresBuilder />}
            {activeSubTab === 'substructures' && <SubstructureLab />}
          </>
        )}
        {activePhase === 'posets' && (
          <>
            {activeSubTab === 'hasse' && <HasseBuilder />}
            {activeSubTab === 'lattices' && <LatticeExplorer />}
            {activeSubTab === 'lattice_props' && <LatticePropertiesAnalyzer />}
          </>
        )}
        {activePhase === 'boolean' && (
          <>
            {activeSubTab === 'algebra' && <BooleanSimplifier />}
          </>
        )}
        {activePhase === 'exam' && <ExamPhase activeTab={activeSubTab} />}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #020617; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; border: 2px solid #020617; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}