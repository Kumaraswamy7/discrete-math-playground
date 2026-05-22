import React, { useState, useMemo, useEffect } from 'react';

// ==========================================
// CORE MATH UTILITIES
// ==========================================
const fact = (n) => {
  if (n < 0) return 0;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
};
const nCr = (n, r) => {
  if (r < 0 || r > n) return 0;
  return fact(n) / (fact(r) * fact(n - r));
};
const nPr = (n, r) => {
  if (r < 0 || r > n) return 0;
  return fact(n) / fact(n - r);
};

// Utility: Absolute Random Shuffle
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// ==========================================
// SHARED UI COMPONENTS (MENTOR'S TOUCH)
// ==========================================
const MentorInsight = ({ title, children, color = "violet" }) => {
  const colorMap = {
    amber: "from-amber-500/20 to-orange-500/5 border-amber-500/30 text-amber-300",
    cyan: "from-cyan-500/20 to-blue-500/5 border-cyan-500/30 text-cyan-300",
    fuchsia: "from-fuchsia-500/20 to-pink-500/5 border-fuchsia-500/30 text-fuchsia-300",
    emerald: "from-emerald-500/20 to-teal-500/5 border-emerald-500/30 text-emerald-300",
    blue: "from-blue-500/20 to-indigo-500/5 border-blue-500/30 text-blue-300",
    violet: "from-violet-500/20 to-purple-500/5 border-violet-500/30 text-violet-300",
    red: "from-red-500/20 to-rose-500/5 border-red-500/30 text-red-300"
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

const FormalDefinition = ({ term, layman, def, formula, color = "violet" }) => (
  <div className={`bg-slate-950 p-5 rounded-2xl border border-${color}-500/30 mb-6 shadow-inner relative overflow-hidden`}>
    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${color}-500 opacity-80`}></div>
    <div className="pl-4">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <strong className={`text-${color}-400 font-black uppercase tracking-widest text-sm`}>{term}</strong>
            {formula && <span className={`font-mono font-bold bg-${color}-900/40 text-${color}-200 px-3 py-1 rounded-lg border border-${color}-500/40`}>{formula}</span>}
        </div>
        {layman && <div className={`text-[10px] text-${color}-300 font-bold uppercase tracking-widest mb-3 opacity-80`}>"{layman}"</div>}
        <span className="text-slate-300 text-sm md:text-base font-medium leading-relaxed block">{def}</span>
    </div>
  </div>
);

// ==========================================
// PHASE 1: BASICS OF COUNTING
// ==========================================
const CountingBasics = () => {
  const [shirt, setShirt] = useState(0);
  const [pant, setPant] = useState(0);
  
  const shirts = ['👕 Red', '👕 Blue', '👕 Green'];
  const pants = ['👖 Jeans', '👖 Khakis'];

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-fuchsia-400 tracking-tight">1. The Fundamentals of Counting</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          Combinatorics is just counting without actually counting. It all boils down to two simple rules: AND vs OR.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
           <FormalDefinition color="fuchsia" term="The Product Rule (AND)" layman="The Outfit Rule" def="If task A can be done in 'm' ways, AND task B can be done in 'n' ways, doing BOTH takes (m × n) ways." formula="m × n" />
           <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-xl">
             <h4 className="text-white font-bold mb-4 text-center">Build an Outfit: {shirts.length} Shirts AND {pants.length} Pants</h4>
             <div className="flex justify-center gap-8 mb-6">
                <div className="space-y-2">
                   {shirts.map((s, i) => (
                       <button key={i} onClick={()=>setShirt(i)} className={`block w-full px-4 py-2 rounded-xl font-bold transition-all ${shirt===i?'bg-fuchsia-600 text-white':'bg-slate-800 text-slate-400'}`}>{s}</button>
                   ))}
                </div>
                <div className="text-3xl flex items-center font-black text-fuchsia-500/50">×</div>
                <div className="space-y-2">
                   {pants.map((p, i) => (
                       <button key={i} onClick={()=>setPant(i)} className={`block w-full px-4 py-2 rounded-xl font-bold transition-all ${pant===i?'bg-blue-600 text-white':'bg-slate-800 text-slate-400'}`}>{p}</button>
                   ))}
                </div>
             </div>
             <div className="text-center font-mono text-fuchsia-300 bg-fuchsia-950 p-4 rounded-xl border border-fuchsia-500/30">
                Current Outfit: <strong>{shirts[shirt].split(' ')[1]} & {pants[pant].split(' ')[1]}</strong><br/>
                Total Outfits Possible: 3 × 2 = <strong>6</strong>
             </div>
           </div>
        </div>

        <div>
           <FormalDefinition color="cyan" term="The Sum Rule (OR)" layman="The Dessert Rule" def="If task A can be done in 'm' ways, OR task B can be done in 'n' ways (and they don't overlap), doing ONE of them takes (m + n) ways." formula="m + n" />
           <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-xl">
             <h4 className="text-white font-bold mb-4 text-center">Pick ONE Dessert: 4 Cakes OR 3 Pies</h4>
             <div className="flex justify-center items-center gap-6 mb-6">
                <div className="bg-slate-800 p-4 rounded-2xl grid grid-cols-2 gap-2">
                    <span className="text-2xl">🍰</span><span className="text-2xl">🍰</span>
                    <span className="text-2xl">🍰</span><span className="text-2xl">🍰</span>
                </div>
                <div className="text-3xl flex items-center font-black text-cyan-500/50">+</div>
                <div className="bg-slate-800 p-4 rounded-2xl grid grid-cols-2 gap-2">
                    <span className="text-2xl">🥧</span><span className="text-2xl">🥧</span>
                    <span className="text-2xl">🥧</span>
                </div>
             </div>
             <div className="text-center font-mono text-cyan-300 bg-cyan-950 p-4 rounded-xl border border-cyan-500/30">
                You can only eat ONE.<br/>
                Total Choices Possible: 4 + 3 = <strong>7</strong>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PHASE 2: PERMUTATIONS & COMBINATIONS
// ==========================================
const PermsCombsEngine = () => {
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  const [orderMatters, setOrderMatters] = useState(true);
  const [repsAllowed, setRepsAllowed] = useState(false);

  let result = 0; let formulaStr = ""; let name = ""; let layman = "";

  if (orderMatters && !repsAllowed) {
      name = "Permutation (No Repetition)";
      layman = "The Running Race: 1st, 2nd, 3rd place from 'n' runners.";
      formulaStr = "P(n,r) = n! / (n-r)!";
      result = nPr(n, r);
  } else if (!orderMatters && !repsAllowed) {
      name = "Combination (No Repetition)";
      layman = "The Fruit Salad: Picking 'r' fruits from 'n' options. Order doesn't matter.";
      formulaStr = "C(n,r) = n! / [r!(n-r)!]";
      result = nCr(n, r);
  } else if (orderMatters && repsAllowed) {
      name = "Permutation (With Repetition)";
      layman = "The Digital Password: An 'r' digit pin code using 'n' allowed numbers.";
      formulaStr = "n^r";
      result = Math.pow(n, r);
  } else if (!orderMatters && repsAllowed) {
      name = "Combination (With Repetition)";
      layman = "Stars & Bars: Buying 'r' donuts choosing from 'n' flavors. Endless supply.";
      formulaStr = "C(n+r-1, r)";
      result = nCr(n + r - 1, r);
  }

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-amber-400 tracking-tight">2. The "Choose" Engine 🎲</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          Every counting problem in existence is determined by just two questions: <strong>Does Order Matter?</strong> and <strong>Can you reuse items?</strong>
        </p>
      </header>

      <MentorInsight title="Permutation vs Combination" color="amber">
        A "Combination Lock" is actually named wrong! If the code is 1-2-3, putting in 3-2-1 will NOT open it. Order matters! It should be called a <strong>Permutation Lock</strong>.<br/><br/>
        A true <strong>Combination</strong> is making a smoothie. If you put in apples then bananas, or bananas then apples, it tastes exactly the same. Order doesn't matter.
      </MentorInsight>

      <div className="bg-slate-900 border border-slate-700 p-6 md:p-10 rounded-3xl shadow-2xl max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="space-y-8">
            <div>
               <label className="block text-sm uppercase font-black tracking-widest text-slate-500 mb-4">Total Items Available (n = {n})</label>
               <input type="range" min="1" max="12" value={n} onChange={(e) => {setN(parseInt(e.target.value)); if(r > e.target.value && !repsAllowed) setR(parseInt(e.target.value));}} className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div>
               <label className="block text-sm uppercase font-black tracking-widest text-slate-500 mb-4">Items to Choose (r = {r})</label>
               <input type="range" min="1" max={repsAllowed ? 12 : n} value={r} onChange={(e) => setR(parseInt(e.target.value))} className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setOrderMatters(!orderMatters)} className={`p-4 rounded-xl border-2 font-bold transition-all flex flex-col items-center justify-center gap-2 ${orderMatters ? 'bg-amber-900/40 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                    <span className="text-2xl">{orderMatters ? '🔢' : '🥗'}</span>
                    <span className="text-sm text-center">Order Matters</span>
                </button>
                <button onClick={() => {setRepsAllowed(!repsAllowed); if(!repsAllowed===false && r>n) setR(n);}} className={`p-4 rounded-xl border-2 font-bold transition-all flex flex-col items-center justify-center gap-2 ${repsAllowed ? 'bg-amber-900/40 border-amber-500 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                    <span className="text-2xl">{repsAllowed ? '🔄' : '🚫'}</span>
                    <span className="text-sm text-center">Repetitions allowed</span>
                </button>
            </div>
         </div>

         <div className="flex flex-col justify-center">
            <div className={`p-8 rounded-3xl border-2 transition-all duration-500 shadow-2xl relative overflow-hidden bg-slate-950 border-amber-500/50`}>
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-serif pointer-events-none">{orderMatters ? 'P' : 'C'}</div>
                <div className="text-[10px] text-amber-400 font-black uppercase tracking-widest mb-1">Current Formula</div>
                <h3 className="text-2xl font-black text-white mb-2">{name}</h3>
                <p className="text-sm text-slate-400 mb-6 italic">"{layman}"</p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 font-mono text-xl text-amber-300 mb-6 text-center shadow-inner">
                    {formulaStr}
                </div>
                <div className="flex justify-between items-end border-t border-slate-800 pt-6">
                    <span className="text-sm uppercase tracking-widest font-bold text-slate-500">Total Possibilities</span>
                    <span className="text-4xl md:text-5xl font-black text-white">{result.toLocaleString()}</span>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// ==========================================
// PHASE 3: ADVANCED REPETITIONS & CONSTRAINTS
// ==========================================
const AdvancedRepetitions = () => {
  const [word, setWord] = useState("MISSISSIPPI");
  const [donuts, setDonuts] = useState(5);
  const [flavors, setFlavors] = useState(3);
  
  // Calculate Indistinguishable Permutations
  const calcAnagrams = () => {
     const w = word.toUpperCase().replace(/[^A-Z]/g, '');
     if (w.length === 0) return {total: 0, str: "", dict: {}};
     const counts = {};
     for(let char of w) counts[char] = (counts[char] || 0) + 1;
     
     let num = fact(w.length);
     let den = 1; let denStrArr = [];
     Object.values(counts).forEach(val => {
         if (val > 1) { den *= fact(val); denStrArr.push(`${val}!`); }
     });

     let fStr = `${w.length}!`;
     if (den > 1) fStr += ` / (${denStrArr.join(' × ')})`;
     return { total: num/den, str: fStr, dict: counts, length: w.length };
  };

  const anag = calcAnagrams();

  // Generate a random visual representation for Stars and Bars
  const generateStarsAndBars = () => {
    let result = [];
    let barsLeft = flavors - 1;
    let starsLeft = donuts;
    
    // Distribute randomly
    for (let i = 0; i < donuts + flavors - 1; i++) {
        if (barsLeft === 0) { result.push('🍩'); starsLeft--; }
        else if (starsLeft === 0) { result.push('🍫'); barsLeft--; }
        else {
            if (Math.random() > 0.5) { result.push('🍩'); starsLeft--; }
            else { result.push('🍫'); barsLeft--; }
        }
    }
    return result;
  };

  const visualSB = useMemo(() => generateStarsAndBars(), [donuts, flavors]);

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-emerald-400 tracking-tight">3. Constrained Repetitions 🔠</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          What happens when items in your set look exactly the same? We must mathematically divide out the duplicates, or use "Stars and Bars" to categorize them!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col">
           <FormalDefinition color="emerald" term="Indistinguishable Objects" layman="The MISSISSIPPI Rule" def="If you have 'n' objects, but some are identical, you must divide out the redundant swaps to find the true number of unique permutations." formula="n! / (n₁! n₂!...)" />
           
           <div className="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-xl flex-1 flex flex-col justify-between">
             <div className="mb-6">
                <label className="block text-xs uppercase font-black tracking-widest text-slate-500 mb-2">Type any Word</label>
                <input type="text" value={word} onChange={e => setWord(e.target.value.toUpperCase())} maxLength={12} className="w-full bg-slate-950 border-2 border-slate-700 text-white font-mono text-2xl p-4 rounded-xl focus:outline-none focus:border-emerald-500 text-center tracking-widest shadow-inner" />
             </div>
             
             <div className="flex flex-wrap gap-2 mb-6 justify-center">
                 {Object.entries(anag.dict).map(([char, count]) => (
                     <div key={char} className={`px-3 py-1 rounded-lg font-mono text-sm border ${count > 1 ? 'bg-red-900/30 border-red-500/50 text-red-300' : 'bg-slate-800 border-slate-600 text-slate-400'}`}>
                        {char}: {count}
                     </div>
                 ))}
             </div>

             <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner text-center space-y-2">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Mathematical Reduction</div>
                <div className="font-mono text-emerald-400 font-bold">{anag.str}</div>
                <div className="text-3xl font-black text-white pt-2 border-t border-slate-800 mt-2">{anag.total.toLocaleString()} <span className="text-sm text-slate-500">Unique Anagrams</span></div>
             </div>
           </div>
        </div>

        <div className="flex flex-col">
            <FormalDefinition color="emerald" term="Stars and Bars" layman="The Donut Shop Simulator" def="How to distribute 'r' identical items into 'n' distinct bins. You use (n-1) 'bars' to create the categories, and 'r' 'stars' for the items." formula="C(n+r-1, r)" />
            
            <div className="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-xl flex-1 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2">Donuts (r = {donuts})</label>
                        <input type="range" min="1" max="15" value={donuts} onChange={(e) => setDonuts(parseInt(e.target.value))} className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2">Flavors (n = {flavors})</label>
                        <input type="range" min="1" max="8" value={flavors} onChange={(e) => setFlavors(parseInt(e.target.value))} className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <p className="text-slate-300 text-sm font-medium">To buy {donuts} donuts from {flavors} flavors, we need <strong className="text-emerald-400">{donuts} stars</strong> and <strong className="text-amber-500">{flavors-1} bars</strong> to separate them.</p>
                    <div className="text-2xl md:text-3xl tracking-widest font-mono bg-slate-950 p-4 md:p-6 rounded-xl border border-slate-800 shadow-inner flex flex-wrap justify-center gap-1">
                        {visualSB.map((item, idx) => (
                           <span key={idx} className={item==='🍫' ? 'text-amber-500 px-1' : 'text-emerald-400 drop-shadow-md'}>{item}</span>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500">Every possible arrangement of this string represents a unique purchase combination.</p>
                    
                    <div className="mt-4 bg-emerald-900/20 border border-emerald-500/50 p-4 rounded-xl flex flex-col items-center shadow-inner">
                        <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest mb-1">Total Combinations</span>
                        <span className="font-mono text-emerald-200 mb-1">C({flavors} + {donuts} - 1, {donuts}) = C({flavors+donuts-1}, {donuts})</span>
                        <span className="text-3xl font-black text-emerald-400">{nCr(flavors+donuts-1, donuts).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PHASE 4A: BINOMIAL THEOREM
// ==========================================
const BinomialEngine = () => {
    const [nPow, setNPow] = useState(4);
  
    // Generate Pascal's Triangle (Up to row 7 for visual clarity)
    const triangle = useMemo(() => {
      let tri = [[1]];
      for(let i=1; i<7; i++) {
          let prev = tri[i-1];
          let curr = [1];
          for(let j=1; j<i; j++) curr.push(prev[j-1] + prev[j]);
          curr.push(1);
          tri.push(curr);
      }
      return tri;
    }, []);

    // Generate Binomial Expansion String
    const expandBinomial = (n) => {
        let terms = [];
        for(let k=0; k<=n; k++) {
            let coeff = nCr(n, k);
            let xPow = n - k;
            let yPow = k;
            
            let termStr = "";
            if (coeff > 1) termStr += `<span class="text-white">${coeff}</span>`;
            if (xPow > 0) termStr += `x${xPow > 1 ? `<sup>${xPow}</sup>` : ''}`;
            if (yPow > 0) termStr += `y${yPow > 1 ? `<sup>${yPow}</sup>` : ''}`;
            if (xPow === 0 && yPow === 0) termStr += "1"; // edge case n=0
            
            terms.push(termStr);
        }
        return terms.join(' <span class="text-slate-500">+</span> ');
    };

    return (
      <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
        <header className="text-center space-y-4 mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-blue-400 tracking-tight">4. Polynomial Engine: Binomials 🔺</h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
            Pascal's Triangle visually unlocks the expansion of Binomials (x+y)ⁿ. Let's break down the formulas.
          </p>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <FormalDefinition color="blue" term="Binomial Theorem" layman="The Expansion Engine" def="Provides a fast way to expand (x+y)ⁿ without multiplying it out manually. The coefficients map perfectly to the nth row of Pascal's Triangle." formula="(x+y)ⁿ = Σ C(n,k) xⁿ⁻ᵏ yᵏ" />
            <FormalDefinition color="blue" term="Pascal's Identity" layman="The Triangle Rule" def="Every number in Pascal's triangle is the exact sum of the two numbers directly above it. Mathematically: C(n, r) = C(n-1, r-1) + C(n-1, r)." formula="C(n, r) = C(n-1, r-1) + C(n-1, r)" />
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-center overflow-hidden relative">
             <div className="absolute top-4 left-4 bg-slate-950 px-3 py-1 rounded border border-slate-800 text-xs font-mono text-blue-400">Pascal's Triangle</div>
             <div className="flex flex-col items-center gap-1 font-mono text-sm md:text-base font-bold relative z-10 mt-6">
                {triangle.map((row, n) => (
                    <div key={n} className="flex gap-2">
                        {row.map((val, r) => (
                            <div key={r} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-blue-900/40 text-blue-300 rounded-full border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-all cursor-crosshair group relative shadow-inner">
                                {val}
                                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 text-white text-xs px-3 py-1 rounded-lg border border-slate-700 whitespace-nowrap z-50 pointer-events-none shadow-xl">
                                    C({n}, {r}) = {val}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
             </div>
             <div className="mt-8 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">Hover over any node to see its C(n, r) formula.</div>
          </div>
  
          <div className="lg:col-span-7 flex flex-col gap-6">
             <div className="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-xl flex-1 relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -right-10 -bottom-10 opacity-5 text-9xl pointer-events-none">📈</div>
               
               <div className="mb-6 relative z-10">
                   <label className="block text-[10px] uppercase font-bold text-blue-400 tracking-widest mb-3 text-center">Adjust Power (n = {nPow})</label>
                   <input type="range" min="0" max="6" value={nPow} onChange={(e)=>setNPow(parseInt(e.target.value))} className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
               </div>
               
               <div className="text-center font-mono font-bold text-2xl text-slate-300 mb-4">(x + y)<sup className="text-blue-400">{nPow}</sup></div>
               <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner font-mono text-lg md:text-xl text-blue-300 leading-relaxed text-center break-words" dangerouslySetInnerHTML={{ __html: expandBinomial(nPow) }}>
               </div>

               <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner">
                      <div className="text-[10px] uppercase text-blue-500 font-bold tracking-widest mb-2 border-b border-slate-800 pb-2">General K-th Term</div>
                      <div className="font-mono text-sm text-slate-300 mb-2">T<sub className="text-[8px]">k+1</sub> = C(n,k) · xⁿ⁻ᵏ · yᵏ</div>
                      <div className="text-xs text-slate-500 leading-relaxed">Use this formula to find any specific term without expanding the whole polynomial!</div>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner">
                      <div className="text-[10px] uppercase text-fuchsia-500 font-bold tracking-widest mb-2 border-b border-slate-800 pb-2">The Middle Term</div>
                      <div className="text-sm text-slate-300 space-y-2">
                          <div>If n is <strong className="text-white">Even</strong>: 1 Middle term at <strong className="font-mono text-fuchsia-400">T<sub className="text-[8px]">n/2 + 1</sub></strong></div>
                          <div>If n is <strong className="text-white">Odd</strong>: 2 Middle terms at <strong className="font-mono text-fuchsia-400">T<sub className="text-[8px]">(n+1)/2</sub></strong> and <strong className="font-mono text-fuchsia-400">T<sub className="text-[8px]">(n+1)/2 + 1</sub></strong></div>
                      </div>
                  </div>
               </div>
             </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Solid Problem: Expand (2x - 3y)³</h3>
            <p className="text-slate-400 text-sm mb-4">
              Let's apply the Binomial Theorem formula: <strong>(a+b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ</strong>. 
              Here a = 2x, b = -3y, and n = 3.
            </p>
            
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 font-mono text-sm overflow-x-auto text-blue-200">
                <div className="text-slate-500">// Row 3 of Pascal's Triangle: 1, 3, 3, 1</div>
                <div>(2x - 3y)³ = <span className="text-white">C(3,0)</span>(2x)³(-3y)⁰ + <span className="text-white">C(3,1)</span>(2x)²(-3y)¹ + <span className="text-white">C(3,2)</span>(2x)¹(-3y)² + <span className="text-white">C(3,3)</span>(2x)⁰(-3y)³</div>
                
                <div className="text-slate-500 mt-2">// Substitute combinations and simplify powers...</div>
                <div>= <span className="text-white">(1)</span>(8x³)(1) + <span className="text-white">(3)</span>(4x²)(-3y) + <span className="text-white">(3)</span>(2x)(9y²) + <span className="text-white">(1)</span>(1)(-27y³)</div>
                
                <div className="text-slate-500 mt-2">// Final result</div>
                <div className="text-lg text-blue-400 font-bold">= 8x³ - 36x²y + 54xy² - 27y³</div>
            </div>
            <div className="mt-4 text-xs text-slate-500 leading-relaxed border-l-2 border-blue-500 pl-3">
                <strong>Notice the pattern:</strong> The powers of (2x) start at 3 and go down to 0, while the powers of (-3y) start at 0 and go up to 3. The signs alternate <span className="font-bold text-white">+ - + -</span> precisely because b is negative, causing odd powers to yield a negative result!
            </div>
        </div>
      </div>
    );
};

// ==========================================
// PHASE 4B: MULTINOMIAL THEOREM
// ==========================================
const MultinomialEngine = () => {
    // Interactive state for the Multinomial problem
    const [k1, setK1] = useState(2);
    const [k2, setK2] = useState(3);
    const [k3, setK3] = useState(1);
    const nTotal = k1 + k2 + k3;

    // Calc coefficient
    const calcMulti = () => {
        if (nTotal === 0) return 1;
        const num = fact(nTotal);
        const den = fact(k1) * fact(k2) * fact(k3);
        return num / den;
    };

    return (
        <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
            <header className="text-center space-y-4 mb-8">
                <h2 className="text-3xl md:text-5xl font-black text-cyan-400 tracking-tight">Polynomial Engine: Multinomials 📈</h2>
                <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
                    What happens when you have more than 2 variables? The Binomial Theorem scales up into the Multinomial Theorem!
                </p>
            </header>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <FormalDefinition color="cyan" term="Multinomial Theorem" layman="The Full Equation" def="Expands any sum of m variables raised to the power n." formula="(x₁ + x₂ + ... + xₘ)ⁿ = Σ (n! / (k₁! k₂! ... kₘ!)) x₁ᵏ¹ x₂ᵏ² ... xₘᵏᵐ" />
                <FormalDefinition color="cyan" term="Multinomial Coefficient" layman="The Division of Powers" def="Instead of using combinations C(n,k), we use factorials to divide the total power (n!) by the factorial of each individual variable's power (k₁!, k₂!, etc.)." formula="n! / (k₁! · k₂! · ... · kₘ!)" />
            </div>

            <MentorInsight title="Why does this formula work?" color="cyan">
                Think of the word <strong>MISSISSIPPI</strong> we learned in Phase 3. The formula for indistinguishable objects is exactly the same as the Multinomial coefficient! <br/><br/>
                Finding the coefficient of x²y³z¹ is identical to asking: "How many unique ways can I arrange the letters x, x, y, y, y, z?" The total letters (n=6) goes on top as 6!, and you divide out the duplicates 2! × 3! × 1! on the bottom!
            </MentorInsight>

            <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-10 shadow-2xl max-w-5xl mx-auto">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Interactive Multinomial Solver</h3>
                <p className="text-center text-slate-400 mb-8">Find the coefficient of <strong className="text-cyan-400 font-mono bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/30">x<sup>{k1}</sup> y<sup>{k2}</sup> z<sup>{k3}</sup></strong> in the expansion of <strong className="text-white font-mono">(x + y + z)<sup>{nTotal}</sup></strong></p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-inner">
                        <label className="block text-xs uppercase font-bold text-slate-500 mb-3">Power of X (k₁)</label>
                        <input type="range" min="0" max="6" value={k1} onChange={(e)=>setK1(parseInt(e.target.value))} className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
                        <div className="text-2xl font-black text-cyan-400 mt-2 font-mono">{k1}</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-inner">
                        <label className="block text-xs uppercase font-bold text-slate-500 mb-3">Power of Y (k₂)</label>
                        <input type="range" min="0" max="6" value={k2} onChange={(e)=>setK2(parseInt(e.target.value))} className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
                        <div className="text-2xl font-black text-emerald-400 mt-2 font-mono">{k2}</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-inner">
                        <label className="block text-xs uppercase font-bold text-slate-500 mb-3">Power of Z (k₃)</label>
                        <input type="range" min="0" max="6" value={k3} onChange={(e)=>setK3(parseInt(e.target.value))} className="w-full accent-fuchsia-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
                        <div className="text-2xl font-black text-fuchsia-400 mt-2 font-mono">{k3}</div>
                    </div>
                </div>

                <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-inner flex flex-col md:flex-row items-center justify-around gap-6">
                    <div className="text-center">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Total Power (n)</div>
                        <div className="text-3xl font-black text-white font-mono">{nTotal}</div>
                    </div>
                    
                    <div className="text-3xl font-black text-slate-700 hidden md:block">→</div>

                    <div className="font-mono text-2xl text-cyan-200 font-bold flex flex-col items-center">
                        <span className="border-b-2 border-cyan-500/50 pb-2 mb-2 block w-full text-center px-4">{nTotal}!</span>
                        <span>{k1}! × {k2}! × {k3}!</span>
                    </div>

                    <div className="text-3xl font-black text-slate-700 hidden md:block">=</div>

                    <div className="text-center">
                        <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest mb-2">Final Coefficient</div>
                        <div className="text-5xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">{calcMulti().toLocaleString()}</div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto mt-6 bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">Solid Problem: Coefficient of a³b²c in (2a - b + 3c)⁶</h3>
                <p className="text-slate-400 text-sm mb-4">Unlike the interactive tool which assumes (x+y+z), what if the terms themselves have constants? Like (2a), (-b), and (3c)?</p>
                
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 font-mono text-sm overflow-x-auto text-cyan-100">
                    <div className="text-slate-500">// 1. Determine n and k values based on the required term: a³b²c¹</div>
                    <div>n = 6 <span className="text-slate-600">(Total power)</span></div>
                    <div>k₁ = 3 <span className="text-slate-600">(Target power of a)</span></div>
                    <div>k₂ = 2 <span className="text-slate-600">(Target power of b)</span></div>
                    <div>k₃ = 1 <span className="text-slate-600">(Target power of c)</span></div>
                    
                    <div className="text-slate-500 mt-4">// 2. Setup the full term using the Multinomial Formula</div>
                    <div>Term = <span className="text-white bg-slate-800 px-1 rounded">(6! / (3! · 2! · 1!))</span> · (2a)³ · (-b)² · (3c)¹</div>
                    
                    <div className="text-slate-500 mt-4">// 3. Calculate the factorial fraction</div>
                    <div>Fraction = 720 / (6 · 2 · 1) = <span className="text-white font-bold">60</span></div>
                    
                    <div className="text-slate-500 mt-4">// 4. Expand the inner powers</div>
                    <div>(2a)³ = <span className="text-white font-bold">8a³</span></div>
                    <div>(-b)² = <span className="text-white font-bold">1b²</span> <span className="text-slate-500">(Notice the negative squares out)</span></div>
                    <div>(3c)¹ = <span className="text-white font-bold">3c</span></div>

                    <div className="text-slate-500 mt-4">// 5. Multiply everything together</div>
                    <div>Final Term = 60 · (8a³) · (1b²) · (3c)</div>
                    <div>Final Term = (60 · 8 · 1 · 3) · a³b²c</div>
                    
                    <div className="text-xl text-cyan-400 font-bold mt-4">Coefficient = 1,440</div>
                </div>
            </div>
        </div>
    );
};

// ==========================================
// PHASE 5: P.I.E. & COMPLEMENT METHOD
// ==========================================
const PIEAndComplement = () => {
    // PIN Simulator state
    const [pinLength, setPinLength] = useState(4);
    const pinTotal = Math.pow(10, pinLength);
    const pinUnwanted = Math.pow(9, pinLength);
    const pinResult = pinTotal - pinUnwanted;

    // PIE Student Survey state
    const [students, setStudents] = useState({ total: 100, math: 60, cs: 50, both: 20 });
    const pieUnion = students.math + students.cs - students.both;
    const pieNeither = students.total - pieUnion;
  
    return (
      <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
        <header className="text-center space-y-4 mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-red-400 tracking-tight">5. Problem Solving: Overlaps 🧩</h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
            When sets overlap, simple addition breaks. We must use the <strong>Complement Method</strong> or the <strong>Inclusion-Exclusion Principle (PIE)</strong> to find the true count. Let's solve practical usage problems.
          </p>
        </header>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* COMPLEMENT PROBLEM */}
          <div className="flex flex-col">
             <FormalDefinition color="red" term="The Complement Method" layman="The 'At Least One' Trick" def="Sometimes counting what you WANT directly is too hard. Instead, calculate the TOTAL possible universe, and subtract the exact opposite of what you want (the Unwanted)." formula="|Wanted| = |Universe| - |Unwanted|" />
             
             <div className="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-xl flex-1 flex flex-col justify-between">
                 <div>
                    <h4 className="font-bold text-white mb-2 text-xl tracking-tight">Usage Problem: The PIN Code</h4>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">A website requires a <strong className="text-red-400 font-mono text-base">{pinLength}</strong>-digit PIN (using digits 0-9). How many PINs contain <strong className="text-white">AT LEAST ONE '7'</strong>?</p>
                    
                    <div className="mb-6">
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Adjust PIN Length (N)</label>
                        <input type="range" min="2" max="8" value={pinLength} onChange={(e) => setPinLength(parseInt(e.target.value))} className="w-full accent-red-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
                    </div>
                 </div>
                 
                 <div className="space-y-4 text-sm font-medium text-slate-300">
                     <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner flex justify-between items-center group hover:border-slate-600 transition-colors">
                         <div>
                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">1. The Universe</div>
                            <div className="text-white">Total Possible PINs (10 options)</div>
                            <div className="text-xs text-slate-500 font-mono mt-1">10^{pinLength}</div>
                         </div>
                         <span className="font-mono text-white font-bold text-lg">{pinTotal.toLocaleString()}</span>
                     </div>
                     <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner flex justify-between items-center group hover:border-slate-600 transition-colors">
                         <div>
                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">2. The Unwanted</div>
                            <div className="text-red-300">PINs with EXACTLY ZERO 7s (9 options)</div>
                            <div className="text-xs text-red-400/50 font-mono mt-1">9^{pinLength}</div>
                         </div>
                         <span className="font-mono text-red-400 font-bold text-lg">- {pinUnwanted.toLocaleString()}</span>
                     </div>
                     <div className="bg-red-950/40 p-6 rounded-2xl border border-red-500/50 flex justify-between items-center text-lg shadow-[0_0_15px_rgba(248,113,113,0.15)]">
                         <div>
                            <div className="text-[10px] text-red-300 uppercase font-black tracking-widest mb-1">The Result</div>
                            <div className="font-bold text-white">PINs with ≥1 '7'</div>
                         </div>
                         <span className="font-mono text-red-400 font-black text-2xl drop-shadow-md">{pinResult.toLocaleString()}</span>
                     </div>
                 </div>
             </div>
          </div>
  
          {/* PIE PROBLEM */}
          <div className="flex flex-col h-full">
             <FormalDefinition color="red" term="Inclusion-Exclusion Principle (PIE)" layman="The Double-Counting Fix" def="When counting items across multiple intersecting sets, adding them together overcounts the overlaps. You must systematically add and subtract the intersections to reach the true total." formula="|A∪B| = |A| + |B| - |A∩B|" />
             
             <div className="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-xl flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-white mb-2 text-xl tracking-tight">Usage Problem: The Student Survey</h4>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">In a class of <strong className="text-white">{students.total}</strong> students, <strong className="text-blue-400">{students.math}</strong> like Math, <strong className="text-fuchsia-400">{students.cs}</strong> like CS, and <strong className="text-amber-400">{students.both}</strong> like BOTH. How many students like <strong className="text-red-400 font-bold underline">NEITHER</strong>?</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-inner">
                        <label className="block text-[10px] uppercase font-bold text-blue-500 mb-2">Like Math |A|</label>
                        <input type="number" min="0" value={students.math} onChange={(e)=>setStudents({...students, math: parseInt(e.target.value)||0})} className="w-full bg-slate-900 border border-slate-700 text-white font-mono p-2 rounded text-center focus:border-blue-500 focus:outline-none" />
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-inner">
                        <label className="block text-[10px] uppercase font-bold text-fuchsia-500 mb-2">Like CS |B|</label>
                        <input type="number" min="0" value={students.cs} onChange={(e)=>setStudents({...students, cs: parseInt(e.target.value)||0})} className="w-full bg-slate-900 border border-slate-700 text-white font-mono p-2 rounded text-center focus:border-fuchsia-500 focus:outline-none" />
                    </div>
                    <div className="col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center shadow-inner">
                        <label className="block text-[10px] uppercase font-bold text-amber-500 mb-2">Like Both |A ∩ B|</label>
                        <input type="number" min="0" value={students.both} onChange={(e)=>setStudents({...students, both: parseInt(e.target.value)||0})} className="w-1/2 bg-slate-900 border border-slate-700 text-white font-mono p-2 rounded text-center focus:border-amber-500 focus:outline-none" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner flex justify-between items-center">
                         <div>
                            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Step 1: PIE Union</div>
                            <div className="text-white text-sm">Students who like AT LEAST ONE</div>
                            <div className="text-xs text-slate-500 font-mono mt-1">|A| + |B| - |A ∩ B|</div>
                         </div>
                         <div className="text-right">
                             <div className="text-xs font-mono text-slate-400 mb-1">{students.math} + {students.cs} - {students.both}</div>
                             <span className="font-mono text-white font-bold text-xl">{pieUnion}</span>
                         </div>
                    </div>
                    <div className="bg-red-950/40 p-5 rounded-2xl border border-red-500/50 flex justify-between items-center shadow-[0_0_15px_rgba(248,113,113,0.15)]">
                         <div>
                            <div className="text-[10px] text-red-300 uppercase font-black tracking-widest mb-1">Step 2: The Complement</div>
                            <div className="font-bold text-white text-sm">Students who like NEITHER</div>
                            <div className="text-xs text-red-400/50 font-mono mt-1">Total - Union</div>
                         </div>
                         <div className="text-right">
                             <div className="text-xs font-mono text-red-300/70 mb-1">{students.total} - {pieUnion}</div>
                             <span className="font-mono text-red-400 font-black text-2xl drop-shadow-md">{pieNeither}</span>
                         </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
};

// ==========================================
// PHASE 6: THE ULTIMATE EXAM SUITE
// ==========================================
const InteractiveProver = () => {
  const [activeQ, setActiveQ] = useState('q1');
  const [proofStep, setProofStep] = useState(0);
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  const [shuffleSeed, setShuffleSeed] = useState(0); // Forces re-shuffle

  const examData = useMemo(() => ({
    q1: {
      title: "Case 1: The Binomial K-th Term",
      question: "Find the mathematical coefficient of x³y⁴ in the expansion of (2x - y)⁷.",
      premises: ["Formula: T_(k+1) = C(n,k) a^(n-k) b^k", "n = 7", "a = 2x, b = -y"],
      steps: [
        { expected: 'k = 4', options: ['k = 3', 'k = 4', 'k = 7', 'k = 1'], prompt: 'Step 1: To get y⁴, what must the value of k be? (Hint: b = -y)', result: 'We need (-y)⁴, so k = 4.' },
        { expected: 'C(7,4) * (2x)³ * (-y)⁴', options: ['C(7,3) * (2x)⁴ * (-y)³', 'C(7,4) * (2x)³ * (-y)⁴', 'C(7,4) * (x)³ * (y)⁴', 'C(7,3) * 2x * -y'], prompt: 'Step 2: Plug n=7, k=4, a=2x, b=-y into the formula.', result: 'Substituted: C(7,4) * (2x)³ * (-y)⁴' },
        { expected: '35 * 8 * 1', options: ['21 * 8 * -1', '35 * 6 * 1', '35 * 8 * 1', '35 * 8 * -1'], prompt: 'Step 3: Evaluate the constants. C(7,4) = 35. What is 2³ and (-1)⁴?', result: 'Calculated: 35 * 8 * 1' }
      ],
      conclusion: "35 × 8 = 280. The coefficient of x³y⁴ is 280!"
    },
    q2: {
      title: "Case 2: The Complement Password",
      question: "A website requires a 5-digit password (using digits 0-9). How many passwords contain AT LEAST ONE '9'?",
      premises: ["Complement Rule: Wanted = Total - Unwanted", "Digits allowed: 0-9 (10 options)"],
      steps: [
        { expected: '10⁵', options: ['5¹⁰', '10⁵', 'P(10,5)', 'C(10,5)'], prompt: 'Step 1: Calculate the TOTAL possible universe of 5-digit passwords (repetition allowed).', result: 'Total Universe = 10⁵ = 100,000.' },
        { expected: '9⁵', options: ['10⁵ - 1', '9⁵', '8⁵', 'P(9,5)'], prompt: 'Step 2: Calculate the UNWANTED passwords. (Passwords with exactly zero 9s).', result: 'Unwanted (using 9 digits) = 9⁵ = 59,049.' },
        { expected: '100,000 - 59,049', options: ['100,000 - 59,049', '100,000 - 9', '59,049 - 10,000', '10⁵ - 5'], prompt: 'Step 3: Apply the Complement formula: Total - Unwanted.', result: '100,000 - 59,049' }
      ],
      conclusion: "100,000 - 59,049 = 40,951 passwords contain at least one 9!"
    },
    q3: {
      title: "Case 3: PIE Word Problem",
      question: "In a class of 100 students, 60 like Math, 50 like CS, and 20 like BOTH. How many students like NEITHER?",
      premises: ["PIE Union: |M ∪ CS| = |M| + |CS| - |M ∩ CS|", "Complement: Neither = Total Class - Union"],
      steps: [
        { expected: '60 + 50 - 20', options: ['60 + 50', '60 + 50 + 20', '60 + 50 - 20', '100 - 20'], prompt: 'Step 1: Use PIE to find the number of students who like Math OR CS (The Union).', result: 'Union = 60 + 50 - 20 = 90 students.' },
        { expected: '100 - 90', options: ['100 - 60', '100 - 90', '100 - 50', '90 - 20'], prompt: 'Step 2: Use the Complement rule to find students who like NEITHER.', result: 'Neither = Total (100) - Union (90).' }
      ],
      conclusion: "100 - 90 = 10 students like neither Math nor CS."
    },
    q4: {
      title: "Case 4: Stars & Bars",
      question: "Solve using Stars & Bars: You want to buy 10 identical apples and put them into 4 distinct baskets.",
      premises: ["Formula: C(n+r-1, r)", "r = identical items (apples)", "n = distinct bins (baskets)"],
      steps: [
        { expected: 'r = 10, n = 4', options: ['r = 4, n = 10', 'r = 10, n = 4', 'r = 14, n = 1', 'r = 10, n = 10'], prompt: 'Step 1: Identify your variables. What is r (items) and n (bins)?', result: 'r = 10 (apples), n = 4 (baskets).' },
        { expected: '3 bars', options: ['4 bars', '10 bars', '3 bars', '1 bar'], prompt: 'Step 2: How many "bars" do you need to separate the apples into 4 baskets? (n-1)', result: 'We need 4 - 1 = 3 bars.' },
        { expected: 'C(13, 10)', options: ['C(14, 10)', 'C(10, 4)', 'C(13, 10)', 'P(13, 10)'], prompt: 'Step 3: Plug into C(n+r-1, r).', result: 'C(4+10-1, 10) = C(13, 10).' }
      ],
      conclusion: "C(13, 10) = 286 ways to distribute the apples!"
    }
  }), []); 

  const examKeys = Object.keys(examData);
  const activeCase = examData[activeQ];

  // Dynamic Shuffling of options every time proofStep, activeQ, or shuffleSeed changes!
  const currentOptions = useMemo(() => {
    return shuffleArray(activeCase.steps[proofStep]?.options || []);
  }, [activeQ, proofStep, activeCase.steps, shuffleSeed]);

  const handleCaseSwitch = (q) => { 
      setActiveQ(q); 
      setProofStep(0); 
      setFeedback({ text: '', type: '' }); 
      setShuffleSeed(prev => prev + 1); // Force reshuffle
  };

  const handleProofGuess = (guess) => {
      if (guess === activeCase.steps[proofStep].expected) {
          if (proofStep === activeCase.steps.length - 1) {
              setProofStep(proofStep + 1); setFeedback({ text: 'Proof Successfully Derived!', type: 'success' });
          } else {
              setProofStep(proofStep + 1); setFeedback({ text: 'Valid deduction. Proceed.', type: 'success' });
              setShuffleSeed(prev => prev + 1); // Force reshuffle for next step
          }
      } else { 
          setFeedback({ text: 'Logic Error. Check your math.', type: 'error' }); 
      }
  };

  return (
    <div className="space-y-8 animate-fade-in mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 tracking-tight">Master Prover 🕵️‍♂️</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">Don't fear the math. Deduce complex proofs step-by-step interactively.</p>
      </header>

      <div className="bg-slate-900 border-2 border-fuchsia-500/30 rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 bg-slate-950 pt-4 px-4 overflow-x-auto scrollbar-hide">
            {examKeys.map((q) => (
                <button key={q} onClick={() => handleCaseSwitch(q)} className={`px-8 py-5 font-black tracking-widest uppercase text-sm whitespace-nowrap border-b-4 transition-all ${activeQ === q ? `border-fuchsia-400 text-fuchsia-400 bg-slate-900` : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    {examData[q].title}
                </button>
            ))}
        </div>
        
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-inner">
                <div className="text-white text-base md:text-lg font-bold mb-8 bg-slate-900 p-6 rounded-2xl border-l-4 border-fuchsia-500 shadow-lg">{activeCase.question}</div>
                
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
                        <p className="text-fuchsia-300 mb-8 font-bold bg-fuchsia-900/20 p-5 rounded-xl border border-fuchsia-500/30 text-lg leading-relaxed">{activeCase.steps[proofStep].prompt}</p>
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
  const [quizSeed, setQuizSeed] = useState(0);

  const rawQuestions = useMemo(() => [
    { q: "If you have 4 shirts AND 3 pants, how many outfits can you make? Which rule applies?", opts: ["7 (Sum Rule)", "12 (Product Rule)", "1 (Neither)", "12 (Sum Rule)"], ans: 1, exp: "The Product Rule (AND) multiplies the possibilities: 4 × 3 = 12." },
    { q: "You want to pick a dessert. The menu has 5 Cakes OR 3 Pies. How many choices do you have?", opts: ["15 (Product)", "8 (Sum Rule)", "2 (Product)", "8 (Product)"], ans: 1, exp: "The Sum Rule (OR) adds the possibilities since they don't overlap: 5 + 3 = 8." },
    { q: "What is the key difference between a Permutation and a Combination?", opts: ["Combinations are larger than Permutations.", "Permutations allow repetition, Combinations do not.", "In Permutations order matters, in Combinations order does not matter.", "There is no mathematical difference."], ans: 2, exp: "Permutation = Password (order matters). Combination = Fruit Salad (order doesn't matter)." },
    { q: "The number of ways to arrange the letters in the word 'BOOK' is calculated as 4! / 2! because:", opts: ["There are 4 letters total.", "The two 'O's are indistinguishable, so we divide to remove redundant swaps.", "You can't arrange vowels next to consonants.", "It is a standard combination."], ans: 1, exp: "When objects are identical (like the O's), swapping them creates the exact same word, so we divide by their factorial to avoid double-counting." },
    { q: "Which formula represents 'Combinations with Repetition Allowed' (The Stars and Bars method)?", opts: ["n^r", "C(n, r)", "P(n, r)", "C(n + r - 1, r)"], ans: 3, exp: "C(n+r-1, r) is the classic Stars and Bars formula used when picking 'r' items from 'n' categories with infinite supply." },
    { q: "What is the coefficient of x³y² in the expansion of (x+y)⁵?", opts: ["5", "10", "15", "20"], ans: 1, exp: "Using the Binomial Theorem: C(5, 2) = 10. The coefficient is 10." },
    { q: "If the power n is ODD in a Binomial Expansion (e.g. n=5), how many 'Middle Terms' will there be?", opts: ["0", "1", "2", "3"], ans: 2, exp: "If n is odd, there are n+1 total terms (which is an even number of terms). Thus, there are exactly 2 middle terms!" },
    { q: "In the Multinomial expansion of (x+y+z)⁶, what goes in the numerator to find a specific coefficient?", opts: ["The product of the powers", "3! (for 3 variables)", "6! (The total power n!)", "1"], ans: 2, exp: "The multinomial formula is n! / (k1! k2! ...). The total power n! is always the numerator." },
    { q: "When using the Complement Method to find passwords with 'at least one 7', we calculate:", opts: ["Total Passwords + Passwords with exactly one 7", "Total Passwords - Passwords with NO 7s", "Only Passwords with one 7", "Passwords with all 7s"], ans: 1, exp: "The Complement Trick: Wanted = Universe Total - Unwanted (the ones with exactly NO 7s)." },
    { q: "According to the Inclusion-Exclusion Principle (PIE) for two sets A and B, |A ∪ B| is equal to:", opts: ["|A| + |B|", "|A| × |B|", "|A| + |B| + |A ∩ B|", "|A| + |B| - |A ∩ B|"], ans: 3, exp: "You add the two sets together, and then subtract the intersection exactly once to remove the double-counting." }
  ], []);

  // Guarantee absolute randomization of questions AND options every time the quiz starts
  const questions = useMemo(() => {
    const shuffledQs = shuffleArray([...rawQuestions]);
    return shuffledQs.map(q => {
      const correctText = q.opts[q.ans];
      const shuffledOpts = shuffleArray([...q.opts]);
      const newAnsIndex = shuffledOpts.indexOf(correctText);
      return { ...q, opts: shuffledOpts, ans: newAnsIndex };
    });
  }, [quizSeed, rawQuestions]); 

  const handleStart = () => {
      setQuizSeed(Math.random()); // Force full reshuffle
      setQuizStarted(true);
  };

  const handleCheck = () => { if (selected === null) return; setChecked(true); if (selected === questions[currentQ].ans) setScore(score + 1); };
  const handleNext = () => { if (currentQ < questions.length - 1) { setCurrentQ(currentQ + 1); setSelected(null); setChecked(false); } else setShowResults(true); };

  return (
    <div className="space-y-8 animate-fade-in mx-2 md:mx-0 py-8">
      {!quizStarted ? (
        <div className="bg-gradient-to-br from-violet-900 to-fuchsia-950 rounded-3xl p-10 md:p-16 text-center border-4 border-fuchsia-500/30 shadow-[0_0_50px_rgba(217,70,239,0.2)] max-w-6xl mx-auto">
            <div className="text-7xl mb-8 animate-bounce">🎓</div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Final Boss Fight</h2>
            <p className="text-lg md:text-xl text-fuchsia-200/80 max-w-2xl mx-auto mb-12 font-medium">You have mastered Counting, Constraints, Polynomials, and Overlaps. Prove your mastery across 10 fully randomized conceptual questions.</p>
            <button onClick={handleStart} className="px-10 py-5 bg-fuchsia-500 text-slate-950 text-xl font-black uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(217,70,239,0.6)] hover:bg-fuchsia-400 transition-all hover:scale-105 active:scale-95">Initiate Final Exam 🚀</button>
        </div>
      ) : showResults ? (
        <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center border-2 border-emerald-500 shadow-2xl max-w-6xl mx-auto">
            <div className="text-7xl md:text-8xl mb-8">{score === questions.length ? '🏆' : (score > 6 ? '🎖️' : '💪')}</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Exam Complete!</h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 font-medium">Score: <span className="text-emerald-400 font-black">{score}</span> / {questions.length}</p>
            <button onClick={() => {setQuizStarted(false); setCurrentQ(0); setScore(0); setShowResults(false); setSelected(null); setChecked(false);}} className="px-8 py-4 bg-slate-800 text-white font-black uppercase tracking-widest rounded-full hover:bg-slate-700 transition-all border border-slate-600 shadow-lg active:scale-95">Retake Exam</button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-fuchsia-500/50 rounded-3xl p-8 md:p-12 shadow-2xl max-w-6xl mx-auto">
            <div className="mb-8 md:mb-10 border-b border-slate-800 pb-6 flex justify-between items-center gap-4">
              <span className="text-fuchsia-500 font-black uppercase tracking-widest text-sm">Question {currentQ + 1} of {questions.length}</span>
              <span className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-700 font-mono font-bold text-sm text-white shadow-inner">Score: <span className="text-fuchsia-400">{score}</span></span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-10 leading-relaxed tracking-wide">{questions[currentQ].q}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {questions[currentQ].opts.map((opt, i) => {
                    let c = "p-5 md:p-8 rounded-2xl border-2 text-left font-bold text-lg transition-all ";
                    if (!checked) c += selected === i ? "bg-fuchsia-600/90 border-fuchsia-400 text-white transform scale-[1.03] shadow-[0_0_20px_rgba(217,70,239,0.4)]" : "bg-slate-950 border-slate-700 text-slate-300 hover:border-fuchsia-500/70 hover:bg-slate-900";
                    else c += i === questions[currentQ].ans ? "bg-emerald-900/80 border-emerald-500 text-emerald-300 shadow-inner" : (selected === i ? "bg-red-900/80 border-red-500 text-red-300 opacity-50" : "bg-slate-950 border-slate-800 opacity-30");
                    return <button key={i} onClick={() => !checked && setSelected(i)} disabled={checked} className={c}>{opt}</button>;
                })}
            </div>
            {!checked ? (
                <button onClick={handleCheck} disabled={selected === null} className={`px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-lg w-full md:w-auto transition-all ${selected !== null ? 'bg-fuchsia-500 text-slate-950 shadow-[0_0_20px_rgba(217,70,239,0.4)] hover:bg-fuchsia-400 hover:scale-[1.02]' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>Verify Answer</button>
            ) : (
                <div className="animate-fade-in">
                    <div className={`p-6 rounded-2xl border-2 mb-8 text-lg font-medium shadow-inner ${selected === questions[currentQ].ans ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-300' : 'bg-fuchsia-900/20 border-fuchsia-500/50 text-fuchsia-300'}`}>
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


// ==========================================
// THE ROOT COMPONENT: UNIT 4 MASTER HUB
// ==========================================
export default function Unit4MasterHub() {
  const [activePhase, setActivePhase] = useState('basics'); 
  
  const [activeSubTabs, setActiveSubTabs] = useState({
    basics: 'rules', perms: 'engine', adv: 'reps', polynomial: 'binomial', pie: 'engine', exam: 'prover'
  });

  const handleSubTabChange = (tabId) => setActiveSubTabs(prev => ({ ...prev, [activePhase]: tabId }));

  const PHASES = [
    { id: 'basics', title: '1. Counting Basics', icon: '🔢' },
    { id: 'perms', title: '2. Perms & Combs', icon: '🎲' },
    { id: 'adv', title: '3. Constraints', icon: '🔠' },
    { id: 'polynomial', title: '4. Polynomial Engine', icon: '🔺' },
    { id: 'pie', title: '5. Overlaps (PIE)', icon: '🧩' },
    { id: 'exam', title: '6. Final Exam', icon: '🏆' }
  ];

  const SUB_TABS = {
    basics: [
      { id: 'rules', title: 'Sum vs Product Rules', icon: '⚖️' }
    ],
    perms: [
      { id: 'engine', title: 'The Choose Engine', icon: '🎲' }
    ],
    adv: [
      { id: 'reps', title: 'Indistinguishable & Stars/Bars', icon: '🔠' }
    ],
    polynomial: [
      { id: 'binomial', title: 'Binomial Theorem', icon: '🔺' },
      { id: 'multinomial', title: 'Multinomial Theorem', icon: '📈' }
    ],
    pie: [
      { id: 'engine', title: 'PIE & Complement Logic', icon: '🧩' }
    ],
    exam: [
      { id: 'prover', title: 'Master Prover', icon: '🕵️‍♂️' },
      { id: 'quiz', title: 'Final Boss Quiz', icon: '🎓' }
    ]
  };

  const activeSubTab = activeSubTabs[activePhase];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-xl flex flex-col">
        <div className="px-2 md:px-8 py-3 flex flex-col md:flex-row justify-between items-center gap-3 border-b border-slate-800/50">
            <div className="text-center md:text-left shrink-0">
              <div className="text-[10px] md:text-xs font-bold tracking-widest text-fuchsia-500 uppercase mb-1 flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></span> Unit 4 • Full Masterclass
              </div>
              <h1 className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 tracking-tight">ELEMENTARY COMBINATORICS</h1>
            </div>
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide py-1">
              <nav className="flex flex-nowrap gap-2 justify-start md:justify-end w-max mx-auto md:mx-0 px-2">
                  {PHASES.map(phase => (
                      <button key={phase.id} onClick={() => setActivePhase(phase.id)} className={`whitespace-nowrap px-4 py-2 rounded-xl font-black text-xs md:text-sm transition-all flex items-center gap-2 shrink-0 ${activePhase === phase.id ? 'bg-fuchsia-500 text-slate-900 shadow-[0_0_15px_rgba(217,70,239,0.4)] transform scale-105' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'}`}>
                          <span className="text-lg">{phase.icon}</span> <span>{phase.title}</span>
                      </button>
                  ))}
              </nav>
            </div>
        </div>
        <div className="bg-slate-900/50 py-2">
            <div className="w-full overflow-x-auto scrollbar-hide py-1">
              <nav className="flex flex-nowrap gap-2 justify-start md:justify-center w-max mx-auto px-2">
                  {SUB_TABS[activePhase].map(tab => (
                      <button key={tab.id} onClick={() => handleSubTabChange(tab.id)} className={`whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-xs md:text-sm transition-all flex items-center gap-2 shrink-0 ${activeSubTab === tab.id ? 'bg-slate-700 text-white shadow-md border border-slate-500' : 'text-slate-500 hover:text-slate-300 border border-transparent'}`}>
                          <span>{tab.icon}</span> <span>{tab.title}</span>
                      </button>
                  ))}
              </nav>
            </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-4 md:px-8 py-8 md:py-14 overflow-x-hidden">
        {activePhase === 'basics' && <CountingBasics />}
        {activePhase === 'perms' && <PermsCombsEngine />}
        {activePhase === 'adv' && <AdvancedRepetitions />}
        {activePhase === 'polynomial' && (
           <>
             {activeSubTab === 'binomial' && <BinomialEngine />}
             {activeSubTab === 'multinomial' && <MultinomialEngine />}
           </>
        )}
        {activePhase === 'pie' && <PIEAndComplement />}
        
        {activePhase === 'exam' && (
           <>
             {activeSubTab === 'prover' && <InteractiveProver />}
             {activeSubTab === 'quiz' && <FinalQuiz />}
           </>
        )}
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