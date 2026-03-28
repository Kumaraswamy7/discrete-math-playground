import React, { useState, useMemo } from 'react';

// ==========================================
// GLOBAL DATA CONSTANTS
// ==========================================
const UNIVERSAL_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ALL_FRUITS = [
  { id: 'apple', icon: '🍎', label: 'Apple' },
  { id: 'banana', icon: '🍌', label: 'Banana' },
  { id: 'grape', icon: '🍇', label: 'Grape' },
  { id: 'watermelon', icon: '🍉', label: 'Watermelon' },
  { id: 'kiwi', icon: '🥝', label: 'Kiwi' },
  { id: 'carrot', icon: '🥕', label: 'Carrot' },
  { id: 'broccoli', icon: '🥦', label: 'Broccoli' },
  { id: 'lemon', icon: '🍋', label: 'Lemon' },
];
const ALL_FRUIT_IDS = ALL_FRUITS.map(f => f.id);
const setToString = (arr) => `{${arr.sort((a,b)=>a-b).join(', ')}}`;

// ==========================================
// PHASE 1: SET THEORY MASTERCLASS
// ==========================================
const SetsBasics = () => {
  const [rule, setRule] = useState('even');

  const generateRosterData = () => {
    switch(rule) {
      case 'even': return { elements: UNIVERSAL_NUMBERS.filter(x => x % 2 === 0), type: 'Finite', card: 5 };
      case 'odd': return { elements: UNIVERSAL_NUMBERS.filter(x => x % 2 !== 0), type: 'Finite', card: 5 };
      case 'prime': return { elements: [2, 3, 5, 7], type: 'Finite', card: 4 }; 
      case 'greater5': return { elements: UNIVERSAL_NUMBERS.filter(x => x > 5), type: 'Finite', card: 5 };
      case 'infinite_fractions': return { elements: ['1/2', '1/3', '2/3', '1/4', '3/4', '...'], type: 'Infinite', card: '∞' };
      default: return { elements: [], type: 'Finite', card: 0 };
    }
  };

  const rosterData = generateRosterData();

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0">
      <header className="text-center space-y-4 mb-6 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-cyan-400 px-2">1. Definition & Notation Sandbox 📝</h2>
        <p className="text-slate-400 max-w-2xl mx-auto px-4 text-sm md:text-base">
          A Set is a collection of distinct objects drawn from a larger "Universal Set". We define them by listing them (Roster) or stating a logical rule (Set-Builder).
        </p>
      </header>

      <div className="bg-slate-900 border border-slate-700 p-4 md:p-6 rounded-2xl text-center shadow-lg">
          <span className="text-xs uppercase text-slate-500 font-bold tracking-widest mb-2 block">🌌 The Universal Set (U)</span>
          <div className="text-lg sm:text-xl md:text-2xl font-mono text-slate-300 break-words">
              U = {'{'} {UNIVERSAL_NUMBERS.map((n, i) => (
                  <span key={n} className={rosterData.elements.includes(n) ? 'text-cyan-400 font-black scale-110 md:scale-125 inline-block transition-all' : 'opacity-50 transition-all'}>
                      {n}{i < UNIVERSAL_NUMBERS.length - 1 ? ', ' : ''}
                  </span>
              ))} {'}'}
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-slate-800 p-5 md:p-8 rounded-3xl border-2 border-cyan-500/30 shadow-xl">
          <h3 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">⚙️ Set-Builder Notation (The Rule)</h3>
          <div className="space-y-3">
             <button onClick={() => setRule('even')} className={`w-full p-3 md:p-4 rounded-xl text-left font-mono text-xs md:text-sm transition-all border-2 ${rule === 'even' ? 'bg-cyan-900/40 border-cyan-500 text-cyan-300 shadow-lg transform scale-[1.02]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}>S = {'{'} x ∈ U | x is exactly divisible by 2 {'}'}</button>
             <button onClick={() => setRule('odd')} className={`w-full p-3 md:p-4 rounded-xl text-left font-mono text-xs md:text-sm transition-all border-2 ${rule === 'odd' ? 'bg-cyan-900/40 border-cyan-500 text-cyan-300 shadow-lg transform scale-[1.02]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}>S = {'{'} x ∈ U | x is NOT divisible by 2 {'}'}</button>
             <button onClick={() => setRule('prime')} className={`w-full p-3 md:p-4 rounded-xl text-left font-mono text-xs md:text-sm transition-all border-2 ${rule === 'prime' ? 'bg-cyan-900/40 border-cyan-500 text-cyan-300 shadow-lg transform scale-[1.02]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}>S = {'{'} x ∈ U | x has exactly 2 distinct factors {'}'}</button>
             <button onClick={() => setRule('greater5')} className={`w-full p-3 md:p-4 rounded-xl text-left font-mono text-xs md:text-sm transition-all border-2 ${rule === 'greater5' ? 'bg-cyan-900/40 border-cyan-500 text-cyan-300 shadow-lg transform scale-[1.02]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}>S = {'{'} x ∈ U | x &gt; 5 {'}'}</button>
             <div className="pt-4 mt-4 border-t border-slate-700 relative">
                 <div className="absolute -top-3 left-4 bg-slate-800 px-2 text-[10px] md:text-xs font-bold text-amber-500 uppercase tracking-widest">⚠️ Tricky Constraint</div>
                 <button onClick={() => setRule('infinite_fractions')} className={`w-full p-3 md:p-4 rounded-xl text-left font-mono text-xs md:text-sm transition-all border-2 ${rule === 'infinite_fractions' ? 'bg-amber-900/40 border-amber-500 text-amber-300 shadow-lg transform scale-[1.02]' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-amber-500/50'}`}>
                   S = {'{'} x ∈ ℚ | 0 &lt; x &lt; 1 {'}'}
                 </button>
             </div>
          </div>
        </div>

        <div className="bg-slate-800 p-5 md:p-8 rounded-3xl border-2 border-slate-700 shadow-xl flex flex-col justify-center relative overflow-hidden">
          <h3 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">🖨️ Roster Method (The Output)</h3>
          <div className={`text-xl sm:text-2xl md:text-4xl font-black text-white bg-slate-900 p-6 md:p-8 rounded-2xl border text-center tracking-widest shadow-inner break-words ${rule === 'infinite_fractions' ? 'border-amber-500/50' : 'border-slate-600'}`}>
            {'{'} <span className={rule === 'infinite_fractions' ? 'text-amber-400' : 'text-cyan-400'}>{rosterData.elements.join(', ')}</span> {'}'}
          </div>
          <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-6">
             <div className="bg-slate-900 border-slate-700 px-4 py-2 md:px-6 md:py-3 rounded-xl border text-center flex-1">
                <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Cardinality |S|</div>
                <div className={`text-xl md:text-3xl font-bold ${rule === 'infinite_fractions' ? 'text-amber-400 font-serif' : 'text-white'}`}>{rosterData.card}</div>
             </div>
             <div className="bg-slate-900 border-slate-700 px-4 py-2 md:px-6 md:py-3 rounded-xl border text-center flex-1">
                <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Set Type</div>
                <div className={`text-xl md:text-2xl font-bold ${rule === 'infinite_fractions' ? 'text-amber-400' : 'text-white'}`}>{rosterData.type}</div>
             </div>
          </div>

          {rule === 'infinite_fractions' && (
              <div className="mt-4 md:mt-6 text-xs md:text-sm text-amber-300/80 text-center animate-fade-in bg-amber-900/20 p-3 rounded-lg border border-amber-500/20">
                  <strong>Notice:</strong> Because there are infinitely many fractions between 0 and 1, we cannot list them all. The set is strictly <strong>Infinite</strong>.
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SetsOperations = () => {
  const [setA, setAState] = useState(['apple', 'banana', 'grape', 'carrot']);
  const [setB, setBState] = useState(['banana', 'grape', 'watermelon', 'kiwi']);
  const [activeOperation, setActiveOperation] = useState('none');

  const toggleFruit = (id, targetSet) => {
      if (targetSet === 'A') setAState(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
      else setBState(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const result = useMemo(() => {
    switch (activeOperation) {
      case 'union': return [...new Set([...setA, ...setB])];
      case 'intersection': return setA.filter(x => setB.includes(x));
      case 'differenceA': return setA.filter(x => !setB.includes(x));
      case 'differenceB': return setB.filter(x => !setA.includes(x));
      case 'complementA': return ALL_FRUIT_IDS.filter(x => !setA.includes(x)); 
      case 'complementB': return ALL_FRUIT_IDS.filter(x => !setB.includes(x)); 
      default: return [];
    }
  }, [setA, setB, activeOperation]);

  const getElementData = (id) => ALL_FRUITS.find(e => e.id === id);

  const translations = {
    none: { math: "A, B", code: "const A = [...]; const B = [...];", english: "Select an operation below to see how Sets interact!", color: "border-slate-500 text-slate-400" },
    union: { math: "A ∪ B", code: "const union = [...new Set([...A, ...B])];", english: "Union: Combine everything together! But remember, sets don't allow duplicates.", color: "border-blue-500 text-blue-400" },
    intersection: { math: "A ∩ B", code: "const int = A.filter(x => B.includes(x));", english: "Intersection: The VIP club. To get in here, an item MUST be present in BOTH Set A and Set B.", color: "border-purple-500 text-purple-400" },
    differenceA: { math: "A - B", code: "const diffA = A.filter(x => !B.includes(x));", english: "Difference (A minus B): Give me everything that is strictly in Set A, but throw away anything that Set B also has.", color: "border-emerald-500 text-emerald-400" },
    differenceB: { math: "B - A", code: "const diffB = B.filter(x => !A.includes(x));", english: "Difference (B minus A): Give me everything that is strictly in Set B, but throw away anything that Set A also has.", color: "border-amber-500 text-amber-400" },
    complementA: { math: "A'", code: "const compA = U.filter(x => !A.includes(x));", english: "Complement of A: Give me absolutely everything in the Universal Market EXCEPT the items in Set A.", color: "border-cyan-500 text-cyan-400" },
    complementB: { math: "B'", code: "const compB = U.filter(x => !B.includes(x));", english: "Complement of B: Give me absolutely everything in the Universal Market EXCEPT the items in Set B.", color: "border-fuchsia-500 text-fuchsia-400" }
  };

  const t = translations[activeOperation];

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0">
      <header className="text-center space-y-4">
        <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Fearless Operations Playground 🍎</h2>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">Build Set A and Set B, then run operations to visually see the math in action.</p>
      </header>

      <div className="bg-slate-800 p-4 md:p-6 rounded-3xl border border-slate-700 shadow-xl">
          <h3 className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">🛒 Universal Market (U)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-3 md:p-4 rounded-xl border border-slate-600 text-center">
                  <div className="text-[10px] md:text-xs uppercase text-emerald-400 font-bold tracking-widest mb-3">Add to Set A</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                      {ALL_FRUITS.map(f => (
                          <button key={`addA-${f.id}`} onClick={() => toggleFruit(f.id, 'A')} className={`text-xl md:text-2xl w-10 h-10 rounded-lg transition-all ${setA.includes(f.id) ? 'bg-emerald-500/20 border-2 border-emerald-500 transform scale-110' : 'bg-slate-800 border border-slate-700 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}`}>{f.icon}</button>
                      ))}
                  </div>
              </div>
              <div className="bg-slate-900 p-3 md:p-4 rounded-xl border border-slate-600 text-center">
                  <div className="text-[10px] md:text-xs uppercase text-amber-400 font-bold tracking-widest mb-3">Add to Set B</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                      {ALL_FRUITS.map(f => (
                          <button key={`addB-${f.id}`} onClick={() => toggleFruit(f.id, 'B')} className={`text-xl md:text-2xl w-10 h-10 rounded-lg transition-all ${setB.includes(f.id) ? 'bg-amber-500/20 border-2 border-amber-500 transform scale-110' : 'bg-slate-800 border border-slate-700 opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}`}>{f.icon}</button>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      <div className={`bg-slate-800 rounded-2xl p-5 md:p-6 border-2 transition-all duration-300 ${t.color} shadow-lg relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl hidden sm:block">💡</div>
          <h2 className="text-lg md:text-xl font-bold mb-4 uppercase tracking-wider text-slate-300">The Translation Engine</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                  <span className="text-[10px] md:text-xs uppercase text-slate-500 font-bold tracking-widest">Textbook Math</span>
                  <div className="text-2xl md:text-3xl font-mono font-bold tracking-widest text-white">{t.math}</div>
              </div>
              <div className="space-y-2">
                  <span className="text-[10px] md:text-xs uppercase text-slate-500 font-bold tracking-widest">Developer Logic</span>
                  <div className="text-xs md:text-sm font-mono bg-slate-900 p-3 rounded-lg text-green-400 overflow-x-auto">{t.code}</div>
              </div>
              <div className="space-y-2 md:border-l border-slate-700 md:pl-6">
                  <span className="text-[10px] md:text-xs uppercase text-slate-500 font-bold tracking-widest">Plain English</span>
                  <div className="text-xs md:text-sm leading-relaxed font-medium text-slate-300">{t.english}</div>
              </div>
          </div>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
        <button onClick={() => setActiveOperation('union')} className={`px-4 md:px-5 py-2 rounded-full font-bold text-xs md:text-sm transition-all ${activeOperation === 'union' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>A ∪ B (Union)</button>
        <button onClick={() => setActiveOperation('intersection')} className={`px-4 md:px-5 py-2 rounded-full font-bold text-xs md:text-sm transition-all ${activeOperation === 'intersection' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>A ∩ B (Intersection)</button>
        <button onClick={() => setActiveOperation('differenceA')} className={`px-4 md:px-5 py-2 rounded-full font-bold text-xs md:text-sm transition-all ${activeOperation === 'differenceA' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>A - B (Diff)</button>
        <button onClick={() => setActiveOperation('differenceB')} className={`px-4 md:px-5 py-2 rounded-full font-bold text-xs md:text-sm transition-all ${activeOperation === 'differenceB' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>B - A (Diff)</button>
        <button onClick={() => setActiveOperation('complementA')} className={`px-4 md:px-5 py-2 rounded-full font-bold text-xs md:text-sm transition-all border border-cyan-500/50 ${activeOperation === 'complementA' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>A' (Comp A)</button>
        <button onClick={() => setActiveOperation('complementB')} className={`px-4 md:px-5 py-2 rounded-full font-bold text-xs md:text-sm transition-all border border-fuchsia-500/50 ${activeOperation === 'complementB' ? 'bg-fuchsia-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>B' (Comp B)</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className={`p-4 md:p-6 rounded-2xl border-4 transition-all duration-300 ${['differenceA', 'union', 'complementB'].includes(activeOperation) ? 'border-emerald-500 bg-emerald-900/20' : 'border-slate-700 bg-slate-800'}`}>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-emerald-400 border-b border-emerald-900 pb-2">Set A</h3>
              <div className="flex flex-wrap gap-2 md:gap-3 min-h-[4rem]">
                  {setA.length === 0 && <div className="text-slate-500 font-mono text-sm flex items-center">∅ Empty Set</div>}
                  {setA.map(id => {
                      const item = getElementData(id);
                      const isHighlighted = result.includes(id) && activeOperation !== 'none';
                      const isDimmed = activeOperation !== 'none' && !isHighlighted;
                      return (
                          <div key={`A-${id}`} className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-2xl md:text-3xl transition-all duration-500 ${isHighlighted ? 'bg-white shadow-lg scale-110 rotate-3' : 'bg-slate-700'} ${isDimmed ? 'opacity-30 grayscale' : 'opacity-100'}`}>{item.icon}</div>
                      )
                  })}
              </div>
          </div>
          <div className={`p-4 md:p-6 rounded-2xl border-4 transition-all duration-300 ${['differenceB', 'union', 'complementA'].includes(activeOperation) ? 'border-amber-500 bg-amber-900/20' : 'border-slate-700 bg-slate-800'}`}>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-amber-400 border-b border-amber-900 pb-2">Set B</h3>
              <div className="flex flex-wrap gap-2 md:gap-3 min-h-[4rem]">
                  {setB.length === 0 && <div className="text-slate-500 font-mono text-sm flex items-center">∅ Empty Set</div>}
                  {setB.map(id => {
                      const item = getElementData(id);
                      const isHighlighted = result.includes(id) && activeOperation !== 'none';
                      const isDimmed = activeOperation !== 'none' && !isHighlighted;
                      return (
                          <div key={`B-${id}`} className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-2xl md:text-3xl transition-all duration-500 ${isHighlighted ? 'bg-white shadow-lg scale-110 -rotate-3' : 'bg-slate-700'} ${isDimmed ? 'opacity-30 grayscale' : 'opacity-100'}`}>{item.icon}</div>
                      )
                  })}
              </div>
          </div>
      </div>

      {activeOperation !== 'none' && (
          <div className="p-6 md:p-8 bg-slate-800 rounded-3xl border border-slate-700 text-center animate-fade-in-up shadow-2xl">
              <h3 className="text-lg md:text-xl font-bold text-slate-400 uppercase tracking-widest mb-6">Resulting Set</h3>
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                  {result.length > 0 ? (
                      result.map((id, idx) => (
                          <div key={`result-${id}`} className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl md:text-5xl animate-bounce" style={{ animationDelay: `${idx * 100}ms` }}>{getElementData(id).icon}</div>
                      ))
                  ) : (
                      <div className="text-slate-500 text-lg md:text-xl font-mono">{'{ }'} (∅ Empty)</div>
                  )}
              </div>
          </div>
      )}
    </div>
  );
};

const SetsPowerSet = () => {
  const [subsetEmojis, setSubsetEmojis] = useState(['🍎', '🍌']);
  const allEmojis = ['🍎', '🍌', '🍇', '🍉', '🥝'];
  const setTypeExamples = [
    {
      title: 'Empty Set',
      notation: 'A = �',
      example: '{ }',
      detail: 'No fruits are selected, so the set has zero elements.',
      accent: 'border-slate-500/50 text-slate-300'
    },
    {
      title: 'Singleton Set',
      notation: 'A = {apple}',
      example: '🍎',
      detail: 'A set with exactly one fruit is called a singleton set.',
      accent: 'border-cyan-500/40 text-cyan-300'
    },
    {
      title: 'Finite Set',
      notation: 'A = {apple, banana, grape}',
      example: '🍎 🍌 🍇',
      detail: 'A fruit basket with countable items is a finite set.',
      accent: 'border-emerald-500/40 text-emerald-300'
    },
    {
      title: 'Equal Sets',
      notation: 'A = B',
      example: '🍎 🍌 = 🍌 🍎',
      detail: 'Order does not matter. If the fruits match, the two sets are equal.',
      accent: 'border-fuchsia-500/40 text-fuchsia-300'
    }
  ];


  const toggleEmoji = (emoji) => {
      if (subsetEmojis.includes(emoji)) {
          setSubsetEmojis(subsetEmojis.filter(e => e !== emoji));
      } else {
          if (subsetEmojis.length >= 5) return;
          setSubsetEmojis([...subsetEmojis, emoji]);
      }
  };

  const powerSet = useMemo(() => {
      return subsetEmojis.reduce((subsets, value) => subsets.concat(subsets.map(set => [value, ...set])), [[]]).sort((a, b) => a.length - b.length);
  }, [subsetEmojis]);

  const bitString = allEmojis.map(e => subsetEmojis.includes(e) ? '1' : '0');

  return (
    <div className="space-y-12 animate-fade-in font-sans mx-2 md:mx-0">
       <header className="text-center space-y-4 mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-amber-400">3. Subsets & Power Sets 𝒫(S) ♾️</h2>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
          What is the mathematical difference between a Subset and a Proper Subset? Let's explore definitions, and then generate exponential Power Sets.
        </p>
      </header>

      <div className="bg-slate-800 p-5 md:p-8 rounded-3xl border border-slate-700 shadow-xl">
          <h3 className="text-lg md:text-2xl font-bold text-white mb-6 md:mb-8 text-center tracking-widest uppercase">Subset (⊆) vs Proper Subset (⊂)</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-slate-900 p-5 md:p-6 rounded-2xl border-2 border-slate-600 text-center flex flex-col h-full">
                 <div className="text-[10px] md:text-sm font-bold text-slate-300 mb-6 border-b border-slate-700 pb-2 uppercase tracking-widest">Regular Subset (A ⊆ B)</div>
                 <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 flex-1">
                    <div className="bg-slate-800 p-3 md:p-4 rounded-xl border border-slate-700 w-full md:w-auto">
                      <div className="text-2xl md:text-3xl mb-2 tracking-widest">🍎🍌🍇</div>
                      <div className="text-[10px] md:text-xs font-mono text-slate-400">Set B (Parent)</div>
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-slate-500 rotate-90 md:rotate-0">⊇</div>
                    <div className="bg-slate-800 p-3 md:p-4 rounded-xl border border-slate-700 w-full md:w-auto">
                      <div className="text-2xl md:text-3xl mb-2 tracking-widest">🍎🍌🍇</div>
                      <div className="text-[10px] md:text-xs font-mono text-slate-400">Set A (Subset)</div>
                    </div>
                 </div>
                 <div className="text-xs md:text-sm text-slate-400 mt-6 bg-slate-800/50 p-3 rounded-lg border border-slate-700">Every item in A is in B. <strong className="text-white">They are allowed to be exactly equal!</strong></div>
              </div>
              <div className="bg-slate-900 p-5 md:p-6 rounded-2xl border-2 border-emerald-500/50 text-center shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col h-full">
                 <div className="text-[10px] md:text-sm font-bold text-emerald-400 mb-6 border-b border-emerald-900 pb-2 uppercase tracking-widest">Proper Subset (A ⊂ B)</div>
                 <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 flex-1">
                    <div className="bg-slate-800 p-3 md:p-4 rounded-xl border border-slate-700 w-full md:w-auto">
                      <div className="text-2xl md:text-3xl mb-2 tracking-widest">🍎🍌🍇</div>
                      <div className="text-[10px] md:text-xs font-mono text-emerald-500">Set B (Parent)</div>
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)] rotate-90 md:rotate-0">⊃</div>
                    <div className="bg-slate-800 p-3 md:p-4 rounded-xl border border-emerald-500/30 w-full md:w-auto">
                      <div className="text-2xl md:text-3xl mb-2 tracking-widest">🍎🍌<span className="opacity-0">🍇</span></div>
                      <div className="text-[10px] md:text-xs font-mono text-emerald-500">Set A (Proper Subset)</div>
                    </div>
                 </div>
                 <div className="text-xs md:text-sm text-emerald-200 mt-6 bg-emerald-900/20 p-3 rounded-lg border border-emerald-500/30">Every item in A is in B... <strong className="text-emerald-400">BUT Set A must be strictly smaller than B (A ≠ B).</strong></div>
              </div>
          </div>
      </div>

      <div className="bg-slate-800 p-5 md:p-8 rounded-3xl border border-slate-700 shadow-xl">
          <h3 className="text-lg md:text-2xl font-bold text-white mb-3 text-center tracking-widest uppercase">Types of Sets with Fruits</h3>
          <p className="text-sm md:text-base text-slate-400 text-center max-w-3xl mx-auto mb-8">
            Using the same fruit examples, we can quickly recognize common set types without changing the current Power Set content.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {setTypeExamples.map((setType) => (
                  <div key={setType.title} className={`rounded-2xl border bg-slate-900 p-5 md:p-6 shadow-lg ${setType.accent}`}>
                      <div className="flex items-center justify-between gap-4 mb-4">
                          <h4 className="text-lg md:text-xl font-bold text-white">{setType.title}</h4>
                          <span className="text-xs md:text-sm font-mono uppercase tracking-widest opacity-80">{setType.notation}</span>
                      </div>
                      <div className="bg-slate-950 rounded-xl border border-slate-700 px-4 py-5 text-center text-2xl md:text-3xl tracking-widest mb-4">
                          {setType.example}
                      </div>
                      <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                          {setType.detail}
                      </p>
                  </div>
              ))}
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-slate-800 p-6 md:p-8 rounded-3xl border-2 border-slate-700 shadow-xl flex flex-col">
              <h3 className="text-slate-400 font-bold mb-4 uppercase tracking-widest text-xs md:text-sm text-center">Build Your Base Set (S)</h3>
              <div className="text-center text-[10px] md:text-xs text-amber-400 mb-6 font-bold bg-amber-900/20 p-2 rounded-lg border border-amber-500/30 inline-block w-full">Constraint: Max 5 elements</div>
              
              <div className="flex justify-center gap-2 md:gap-4 mb-8">
                  {allEmojis.map(e => (
                      <button key={e} onClick={() => toggleEmoji(e)} className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl font-bold text-xl md:text-3xl transition-all transform active:scale-95 ${subsetEmojis.includes(e) ? 'bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-110' : 'bg-slate-900 border border-slate-700 opacity-50 grayscale hover:grayscale-0 hover:opacity-100'}`}>{e}</button>
                  ))}
              </div>
              
              <div className="bg-slate-900 p-4 md:p-6 rounded-xl border border-slate-700 text-center shadow-inner mb-6">
                  <div className="text-lg md:text-2xl font-black text-white mb-2 tracking-widest">S = {'{'} {subsetEmojis.join(' ')} {'}'}</div>
                  <div className="text-xs md:text-sm text-slate-400 font-bold uppercase tracking-widest">Cardinality |S| = {subsetEmojis.length}</div>
              </div>

              <div className="mt-auto bg-slate-900 p-4 md:p-6 rounded-xl border border-cyan-500/30">
                  <div className="flex justify-between items-center mb-4">
                      <div className="text-[10px] md:text-xs uppercase text-slate-500 font-bold tracking-widest text-left">Live Computer Memory (Bits)</div>
                      <div className="text-[10px] md:text-xs text-cyan-400 font-mono">U = {'{🍎,🍌,🍇,🍉,🥝}'}</div>
                  </div>
                  <div className="flex gap-2 justify-center mb-3">
                      {bitString.map((bit, i) => (
                          <div key={i} className={`w-8 h-10 flex items-center justify-center rounded font-mono font-bold text-lg md:text-xl transition-all duration-300
                              ${bit === '1' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'bg-slate-800 text-slate-600 border border-slate-700'}`}>
                              {bit}
                          </div>
                      ))}
                  </div>
                  <div className="text-xs md:text-sm text-slate-400 font-mono text-center">int bitmask = 0b{bitString.join('')};</div>
              </div>
          </div>

          <div className="bg-slate-800 p-6 md:p-8 rounded-3xl border-2 border-amber-500/50 shadow-xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-8xl hidden sm:block">♾️</div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 relative z-10 gap-3 md:gap-4">
                  <span className="text-xl md:text-2xl font-bold text-amber-400">Power Set 𝒫(S)</span>
                  <span className="bg-amber-900/50 border border-amber-500/50 text-amber-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold shadow-inner font-mono text-[10px] md:text-sm">2<sup>{subsetEmojis.length}</sup> = {powerSet.length} Subsets</span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 mb-4 relative z-10">Generates EVERY possible subset combination, including the Empty Set (∅) and the Set itself.</p>
              <div className="flex-1 bg-slate-950 p-4 md:p-6 rounded-xl border border-slate-700 overflow-y-auto max-h-[250px] md:max-h-[300px] custom-scrollbar">
                  <div className="flex flex-wrap gap-2 md:gap-3">
                      {powerSet.map((subset, i) => (
                          <div key={i} className="px-2 py-1 md:px-3 md:py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm md:text-lg shadow-md hover:border-amber-500 hover:bg-slate-700 transition-colors tracking-widest">
                              {'{'}{subset.length === 0 ? <span className="text-slate-500 font-mono text-xs md:text-sm">∅ Empty</span> : subset.join(' ')}{'}'}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

const SetsLaws = () => {
  const [activeLaw, setActiveLaw] = useState('demorgan');
  const U = ['🍎', '🍌', '🍇', '🍉', '🥝'];
  const A = ['🍎', '🍌'];
  const B = ['🍌', '🍇'];
  const C = ['🍇', '🍉'];

  const getLawData = () => {
      switch(activeLaw) {
          case 'idempotent': return { name: "Idempotent", formula: "A ∪ A = A", lhsSteps: [{ label: "Set A", val: setToString(A) }, { label: "A ∪ A", val: setToString([...new Set([...A, ...A])]), highlight: true }], rhsSteps: [{ label: "Set A", val: setToString(A), highlight: true }] };
          case 'commutative': return { name: "Commutative", formula: "A ∪ B = B ∪ A", lhsSteps: [{ label: "A", val: setToString(A) }, { label: "B", val: setToString(B) }, { label: "A ∪ B", val: setToString([...new Set([...A, ...B])]), highlight: true }], rhsSteps: [{ label: "B", val: setToString(B) }, { label: "A", val: setToString(A) }, { label: "B ∪ A", val: setToString([...new Set([...B, ...A])]), highlight: true }] };
          case 'associative': 
              const unionBC = [...new Set([...B, ...C])]; const unionAB = [...new Set([...A, ...B])];
              return { name: "Associative", formula: "A ∪ (B ∪ C) = (A ∪ B) ∪ C", lhsSteps: [{ label: "(B ∪ C)", val: setToString(unionBC) }, { label: "A ∪ (B ∪ C)", val: setToString([...new Set([...A, ...unionBC])]), highlight: true }], rhsSteps: [{ label: "(A ∪ B)", val: setToString(unionAB) }, { label: "(A ∪ B) ∪ C", val: setToString([...new Set([...unionAB, ...C])]), highlight: true }] };
          case 'distributive':
              const intBC = B.filter(x => C.includes(x)); const A_u_B = [...new Set([...A, ...B])]; const A_u_C = [...new Set([...A, ...C])];
              return { name: "Distributive", formula: "A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)", lhsSteps: [{ label: "(B ∩ C)", val: setToString(intBC) }, { label: "A ∪ (B ∩ C)", val: setToString([...new Set([...A, ...intBC])]), highlight: true }], rhsSteps: [{ label: "(A ∪ B)", val: setToString(A_u_B) }, { label: "(A ∪ C)", val: setToString(A_u_C) }, { label: "(A ∪ B) ∩ (A ∪ C)", val: setToString(A_u_B.filter(x => A_u_C.includes(x))), highlight: true }] };
          case 'demorgan':
              const A_u_B_dem = [...new Set([...A, ...B])]; const comp_A_u_B = U.filter(x => !A_u_B_dem.includes(x)); const compA = U.filter(x => !A.includes(x)); const compB = U.filter(x => !B.includes(x));
              return { name: "De Morgan's", formula: "(A ∪ B)' = A' ∩ B'", lhsSteps: [{ label: "(A ∪ B)", val: setToString(A_u_B_dem) }, { label: "(A ∪ B)' [Not in U]", val: setToString(comp_A_u_B), highlight: true }], rhsSteps: [{ label: "A'", val: setToString(compA) }, { label: "B'", val: setToString(compB) }, { label: "A' ∩ B'", val: setToString(compA.filter(x => compB.includes(x))), highlight: true }] };
          case 'identity': return { name: "Identity", formula: "A ∩ U = A", lhsSteps: [{ label: "A", val: setToString(A) }, { label: "U (Universe)", val: setToString(U) }, { label: "A ∩ U", val: setToString(A.filter(x => U.includes(x))), highlight: true }], rhsSteps: [{ label: "Set A", val: setToString(A), highlight: true }] };
          default: return null;
      }
  };

  const lawData = getLawData();
  const bitA = "11000", bitB = "01100", bitwiseUnion = "11100", bitwiseIntersection = "01000";
  
  return (
    <div className="space-y-12 animate-fade-in font-sans mx-2 md:mx-0">
      <header className="text-center space-y-4 mb-6 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-400">4. Laws & Computer Representation ⚖️</h2>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">Set theory has strict algebraic laws that always hold true. Test the visual prover below to see how LHS always perfectly matches RHS.</p>
      </header>

      <div className="bg-slate-800 p-4 md:p-8 rounded-3xl border-2 border-emerald-500/30 shadow-2xl">
          <h3 className="text-lg md:text-2xl font-bold text-white mb-6 text-center tracking-widest uppercase">The Visual Law Prover</h3>
          <div className="flex justify-center gap-3 md:gap-4 mb-8 flex-wrap">
              <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-700 text-xs md:text-sm shadow-inner"><span className="text-slate-500 font-bold">U=</span> {setToString(U)}</div>
              <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-700 text-xs md:text-sm shadow-inner"><span className="text-cyan-500 font-bold">A=</span> {setToString(A)}</div>
              <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-700 text-xs md:text-sm shadow-inner"><span className="text-pink-500 font-bold">B=</span> {setToString(B)}</div>
              <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-700 text-xs md:text-sm shadow-inner"><span className="text-amber-500 font-bold">C=</span> {setToString(C)}</div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10">
              {['idempotent', 'commutative', 'associative', 'distributive', 'demorgan', 'identity'].map(l => (
                  <button key={l} onClick={() => setActiveLaw(l)} className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full font-bold uppercase text-[10px] md:text-xs tracking-wider transition-all border-2 ${activeLaw === l ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg scale-105' : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>{l}</button>
              ))}
          </div>

          <div className="bg-slate-900 p-4 md:p-8 rounded-2xl border border-slate-700 text-center mb-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-mono text-emerald-400 mb-6 md:mb-8 tracking-widest bg-black/30 py-3 md:py-4 px-2 rounded-xl border border-emerald-500/20 shadow-inner break-words">
                  {lawData.formula}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
                  <div className="hidden md:flex absolute inset-0 justify-center items-center pointer-events-none">
                      <div className="bg-emerald-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-xl md:text-2xl z-10 border-4 border-slate-900 shadow-lg">≡</div>
                      <div className="w-0.5 h-full bg-slate-800 absolute"></div>
                  </div>
                  <div className="bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-600 shadow-lg">
                      <h4 className="text-sm md:text-lg font-bold text-slate-300 mb-4 uppercase tracking-widest border-b border-slate-700 pb-2">Left Hand Side</h4>
                      <div className="space-y-3 text-left">
                          {lawData.lhsSteps.map((s, i) => (
                              <div key={i} className={`p-3 rounded-lg ${s.highlight ? 'bg-emerald-900/30 border border-emerald-500/50 mt-4 shadow-inner' : 'bg-slate-900 border border-slate-700'}`}>
                                  <div className="text-[10px] md:text-xs text-slate-500 font-bold mb-1 uppercase">{s.label}</div>
                                  <div className="text-lg md:text-2xl tracking-widest">{s.val}</div>
                              </div>
                          ))}
                      </div>
                  </div>
                  <div className="bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-600 shadow-lg">
                      <h4 className="text-sm md:text-lg font-bold text-slate-300 mb-4 uppercase tracking-widest border-b border-slate-700 pb-2">Right Hand Side</h4>
                      <div className="space-y-3 text-left">
                          {lawData.rhsSteps.map((s, i) => (
                              <div key={i} className={`p-3 rounded-lg ${s.highlight ? 'bg-emerald-900/30 border border-emerald-500/50 mt-4 shadow-inner' : 'bg-slate-900 border border-slate-700'}`}>
                                  <div className="text-[10px] md:text-xs text-slate-500 font-bold mb-1 uppercase">{s.label}</div>
                                  <div className="text-lg md:text-2xl tracking-widest">{s.val}</div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
              <div className="mt-6 md:mt-8 text-sm md:text-xl font-black text-green-400 bg-green-900/20 py-3 md:py-4 px-4 md:px-8 rounded-xl inline-block border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)] animate-pulse">PROOF COMPLETE: LHS exactly matches RHS!</div>
          </div>
      </div>

      <div className="bg-slate-800 p-5 md:p-8 rounded-3xl border border-slate-700 shadow-xl">
          <h3 className="text-xl md:text-2xl font-bold text-blue-400 mb-4 md:mb-6 text-center uppercase tracking-widest">Computer Representation (Bit-Strings)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4 font-mono text-xs md:text-sm bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-700">
                  <div className="flex justify-between bg-slate-800 p-3 rounded-lg border border-slate-600 items-center">
                      <span className="text-slate-400">Set A: {'{🍎, 🍌}'}</span><span className="text-cyan-300 font-bold text-base md:text-lg tracking-[0.2em]">{bitA}</span>
                  </div>
                  <div className="flex justify-between bg-slate-800 p-3 rounded-lg border border-slate-600 items-center">
                      <span className="text-slate-400">Set B: {'{🍌, 🍇}'}</span><span className="text-pink-300 font-bold text-base md:text-lg tracking-[0.2em]">{bitB}</span>
                  </div>
              </div>
              <div className="space-y-4">
                  <div className="bg-slate-900 p-4 rounded-2xl border border-green-500/30 text-center shadow-lg">
                      <div className="text-[10px] md:text-xs text-slate-500 mb-2 uppercase font-bold tracking-widest">Union (Bitwise OR `|`)</div>
                      <div className="text-2xl md:text-3xl font-mono font-bold text-green-400 tracking-[0.2em]">{bitwiseUnion}</div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-2xl border border-purple-500/30 text-center shadow-lg">
                      <div className="text-[10px] md:text-xs text-slate-500 mb-2 uppercase font-bold tracking-widest">Intersection (Bitwise AND `&`)</div>
                      <div className="text-2xl md:text-3xl font-mono font-bold text-purple-400 tracking-[0.2em]">{bitwiseIntersection}</div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};


// ==========================================
// PHASE 2: RELATIONS MASTERCLASS
// ==========================================
const RelationsPhase = ({ activeTab }) => {
  const nodes = [0, 1, 2];
  const nodeNames = ['A', 'B', 'C'];
  const [matrix, setMatrix] = useState([[true, false, false], [false, true, false], [false, false, true]]);

  const toggleRelation = (row, col) => {
    const newMatrix = matrix.map(r => [...r]);
    newMatrix[row][col] = !newMatrix[row][col];
    setMatrix(newMatrix);
  };

  const isReflexive = useMemo(() => nodes.every(i => matrix[i][i] === true), [matrix]);
  const isSymmetric = useMemo(() => {
    for (let i of nodes) for (let j of nodes) if (matrix[i][j] !== matrix[j][i]) return false;
    return true; 
  }, [matrix]);
  const isAntiSymmetric = useMemo(() => {
    for (let i of nodes) for (let j of nodes) if (i !== j && matrix[i][j] === true && matrix[j][i] === true) return false; 
    return true;
  }, [matrix]);
  const isTransitive = useMemo(() => {
    for (let i of nodes) for (let j of nodes) for (let k of nodes) if (matrix[i][j] === true && matrix[j][k] === true) if (matrix[i][k] === false) return false; 
    return true;
  }, [matrix]);

  const isEquivalence = isReflexive && isSymmetric && isTransitive;
  const isPoset = isReflexive && isAntiSymmetric && isTransitive;

  const getRelationSet = () => {
    const pairs = [];
    for (let i of nodes) for (let j of nodes) if (matrix[i][j]) pairs.push(`(${nodeNames[i]}, ${nodeNames[j]})`);
    return pairs.length > 0 ? `{ ${pairs.join(', ')} }` : '∅ (Empty Relation)';
  };

  const properties = [
    { id: 'reflexive', name: 'Reflexive', math: '∀a ∈ A, aRa', state: isReflexive, color: 'blue', english: 'Self-Love: Every single node must point to itself.', gridRule: 'The main diagonal (top-left to bottom-right) must be fully checked.' },
    { id: 'symmetric', name: 'Symmetric', math: 'aRb ⟹ bRa', state: isSymmetric, color: 'fuchsia', english: 'Mutual Friendship: If A points to B, B MUST point back to A. No one-sided relationships.', gridRule: 'The grid must be a perfect mirror reflection across the main diagonal.' },
    { id: 'antisymmetric', name: 'Anti-symmetric', math: '(aRb ∧ bRa) ⟹ a=b', state: isAntiSymmetric, color: 'amber', english: 'Strict Hierarchy: If A points to B, B CANNOT point back to A (unless A=B).', gridRule: 'If you check a box off the diagonal, its mirror opposite MUST remain unchecked.' },
    { id: 'transitive', name: 'Transitive', math: '(aRb ∧ bRc) ⟹ aRc', state: isTransitive, color: 'emerald', english: 'The Network Effect: If A connects to B, and B connects to C, A MUST connect to C directly.', gridRule: 'Every multi-step path must have a direct shortcut checked.' }
  ];

  const getColorClasses = (color, isActive) => {
    const map = {
      blue: isActive ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-700 text-slate-500',
      fuchsia: isActive ? 'bg-fuchsia-500/20 border-fuchsia-500 text-fuchsia-400' : 'bg-slate-900 border-slate-700 text-slate-500',
      amber: isActive ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-900 border-slate-700 text-slate-500',
      emerald: isActive ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-500'
    };
    return map[color];
  };

  return (
    <>
      {activeTab === '1_properties' && (
        <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0">
          <header className="text-center space-y-4 mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">The Relation Matrix Builder</h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto px-2">A "Relation" simply defines who connects to whom. Click the cells in the Adjacency Matrix below to create a custom network.</p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              <div className="xl:col-span-5 bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col items-center relative overflow-hidden">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-6 uppercase tracking-widest text-center">Adjacency Matrix</h3>
                  <div className="flex">
                      <div className="flex flex-col justify-end gap-2 pr-3 md:pr-4 pb-2 mt-8 md:mt-10">
                          {nodeNames.map(name => <div key={`y-${name}`} className="h-14 md:h-16 flex items-center justify-end font-bold text-slate-400 text-lg md:text-xl">{name}</div>)}
                      </div>
                      <div>
                          <div className="flex gap-2 mb-3 md:mb-4 pl-2">
                              {nodeNames.map(name => <div key={`x-${name}`} className="w-14 md:w-16 text-center font-bold text-slate-400 text-lg md:text-xl">{name}</div>)}
                          </div>
                          <div className="bg-slate-800 p-3 md:p-4 rounded-xl border border-slate-700 flex flex-col gap-2 relative shadow-inner">
                              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30 z-0">
                                  <svg width="100%" height="100%" className="absolute inset-0"><line x1="8%" y1="8%" x2="92%" y2="92%" stroke="#475569" strokeWidth="4" strokeDasharray="8 8" /></svg>
                              </div>
                              {nodes.map(row => (
                                  <div key={`row-${row}`} className="flex gap-2 z-10">
                                      {nodes.map(col => (
                                          <button key={`cell-${row}-${col}`} onClick={() => toggleRelation(row, col)} className={`w-14 h-14 md:w-16 md:h-16 rounded-xl font-black text-2xl transition-all transform active:scale-95 flex items-center justify-center border-2 ${matrix[row][col] ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-105' : (row === col ? 'bg-slate-900 border-slate-500 border-dashed text-slate-700 hover:bg-slate-700' : 'bg-slate-900 border-slate-700 text-slate-700 hover:bg-slate-700')}`}>
                                              {matrix[row][col] ? '✓' : ''}
                                          </button>
                                      ))}
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
                  <div className="mt-8 bg-slate-950 p-4 md:p-6 rounded-xl border border-slate-800 w-full shadow-inner">
                      <span className="text-[10px] md:text-xs uppercase text-slate-500 font-bold tracking-widest block mb-2">Set Notation (R =)</span>
                      <div className="font-mono text-sm md:text-base text-blue-300 leading-relaxed">{getRelationSet()}</div>
                  </div>
              </div>

              <div className="xl:col-span-7 flex flex-col gap-4 md:gap-5 justify-center">
                  {properties.map(prop => (
                      <div key={prop.id} className={`p-4 md:p-6 rounded-2xl border-2 transition-all duration-500 relative overflow-hidden ${getColorClasses(prop.color, prop.state)}`}>
                          <div className={`absolute top-1/2 -translate-y-1/2 right-6 text-6xl font-black opacity-10 hidden sm:block ${prop.state ? 'text-current' : 'hidden'}`}>✓</div>
                          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 relative z-10">
                              <div className={`w-full md:w-32 py-2 md:py-3 rounded-lg font-black text-center text-sm tracking-widest uppercase border-2 shadow-inner transition-all ${prop.state ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-red-500/10 border-red-500/50 text-red-500/70'}`}>
                                  {prop.state ? 'TRUE' : 'FALSE'}
                              </div>
                              <div className="flex-1">
                                  <div className="flex flex-wrap items-baseline gap-2 md:gap-3 mb-1">
                                      <h3 className="text-lg md:text-xl font-bold">{prop.name}</h3>
                                      <span className="font-mono text-[10px] md:text-xs opacity-80 bg-black/30 px-2 py-1 rounded-md">{prop.math}</span>
                                  </div>
                                  <p className="text-xs md:text-sm font-medium mb-3 leading-relaxed text-slate-300">{prop.english}</p>
                                  <p className="text-[10px] md:text-xs font-bold font-mono opacity-80 bg-black/20 p-2 rounded border border-white/10">👉 Grid Rule: {prop.gridRule}</p>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      )}

      {activeTab === '2_classification' && (
        <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0">
          <header className="text-center space-y-4 mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-500">Equivalence vs. Partial Order</h2>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto px-2">The only difference between them is whether they are <strong>Symmetric</strong> or <strong>Anti-Symmetric</strong>.</p>
          </header>

          <div className="bg-slate-800 p-6 md:p-8 rounded-3xl border-2 border-slate-700 shadow-2xl mb-12 relative overflow-hidden">
              <div className="text-center mt-4 mb-8">
                  <div className="text-xl md:text-2xl font-mono text-white mb-2 bg-slate-900 py-3 px-6 rounded-xl border border-slate-600 inline-block shadow-inner">{getRelationSet()}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className={`p-6 md:p-8 rounded-2xl border-4 text-center transition-all duration-500 relative flex flex-col justify-center ${isEquivalence ? 'bg-gradient-to-br from-indigo-900/80 to-purple-900/80 border-purple-400 shadow-[0_0_30px_rgba(192,38,211,0.3)] transform md:scale-105' : 'bg-slate-900 border-slate-700 opacity-60 grayscale'}`}>
                      {isEquivalence && <div className="absolute top-4 right-4 text-3xl animate-bounce">🏆</div>}
                      <div className="text-xs uppercase font-bold tracking-widest mb-2 opacity-80 text-purple-300">Classification 1</div>
                      <div className={`text-2xl md:text-3xl font-black mb-4 ${isEquivalence ? 'text-white' : 'text-slate-500'}`}>Equivalence Relation</div>
                      <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm font-mono font-bold">
                          <span className={`px-2 py-1 rounded ${isReflexive ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-400 line-through'}`}>Reflexive</span><span className="text-slate-500">+</span>
                          <span className={`px-2 py-1 rounded ${isSymmetric ? 'bg-fuchsia-500/20 text-fuchsia-300' : 'bg-red-500/20 text-red-400 line-through'}`}>Symmetric</span><span className="text-slate-500">+</span>
                          <span className={`px-2 py-1 rounded ${isTransitive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-400 line-through'}`}>Transitive</span>
                      </div>
                  </div>

                  <div className={`p-6 md:p-8 rounded-2xl border-4 text-center transition-all duration-500 relative flex flex-col justify-center ${isPoset ? 'bg-gradient-to-br from-amber-900/80 to-emerald-900/80 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)] transform md:scale-105' : 'bg-slate-900 border-slate-700 opacity-60 grayscale'}`}>
                      {isPoset && <div className="absolute top-4 right-4 text-3xl animate-bounce">📈</div>}
                      <div className="text-xs uppercase font-bold tracking-widest mb-2 opacity-80 text-amber-300">Classification 2</div>
                      <div className={`text-2xl md:text-3xl font-black mb-4 ${isPoset ? 'text-white' : 'text-slate-500'}`}>Partial Order (Poset)</div>
                      <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm font-mono font-bold">
                          <span className={`px-2 py-1 rounded ${isReflexive ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-400 line-through'}`}>Reflexive</span><span className="text-slate-500">+</span>
                          <span className={`px-2 py-1 rounded ${isAntiSymmetric ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-400 line-through'}`}>Anti-Symmetric</span><span className="text-slate-500">+</span>
                          <span className={`px-2 py-1 rounded ${isTransitive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-400 line-through'}`}>Transitive</span>
                      </div>
                  </div>
              </div>

              {(!isEquivalence && !isPoset) && (
                  <div className="text-center text-amber-400 text-sm md:text-base font-bold animate-pulse mt-4 bg-amber-900/20 p-4 rounded-xl border border-amber-500/30">
                      Go back to the "Properties & Matrix" tab and click the grid until one of these lights up!
                  </div>
              )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <div className="bg-slate-800 p-6 md:p-8 rounded-3xl border border-purple-500/30 shadow-xl">
                <h3 className="text-xl font-bold text-purple-400 mb-4 border-b border-slate-700 pb-2">Why Equivalence Matters</h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                    Equivalence relations behave exactly like the <strong>Equals Sign (=)</strong>. 
                    They group data into "Equivalence Classes" where every item in the class is treated as identical for a specific purpose.
                </p>
                <div className="space-y-3">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                        <div className="font-bold text-white text-sm mb-1">Example: "Has the same birthday as"</div>
                        <div className="text-xs text-slate-400 font-mono">
                            - I have the same birthday as myself (Reflexive).<br/>
                            - If I share yours, you share mine (Symmetric).<br/>
                            - If A shares with B, and B shares with C, A shares with C (Transitive).
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-6 md:p-8 rounded-3xl border border-amber-500/30 shadow-xl">
                <h3 className="text-xl font-bold text-amber-400 mb-4 border-b border-slate-700 pb-2">Why Posets Matter</h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                    Partial Orders (Posets) behave exactly like the <strong>Less Than or Equal To Sign (≤)</strong>. 
                    They are used in computer science to sort data, build prerequisite charts, or create corporate hierarchies.
                </p>
                <div className="space-y-3">
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                        <div className="font-bold text-white text-sm mb-1">Example: "Is a prerequisite for"</div>
                        <div className="text-xs text-slate-400 font-mono">
                            - A class is its own prerequisite (Reflexive).<br/>
                            - If CS101 is required for CS102, CS102 CANNOT be required for CS101 (Anti-Symmetric).<br/>
                            - If CS101 → CS102, and CS102 → CS201, then CS101 → CS201 (Transitive).
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ==========================================
// PHASE 3: FUNCTIONS MASTERCLASS
// ==========================================
const FuncTypes = () => {
  const DOMAIN = ['1️⃣', '2️⃣', '3️⃣'];
  const [codomainSize, setCodomainSize] = useState(3);
  const CODOMAIN_OPTIONS = ['🍎', '🍌', '🍇', '🍉', '🥝'].slice(0, codomainSize);
  const [mapping, setMapping] = useState({ '1️⃣': '🍎', '2️⃣': '🍌', '3️⃣': '🍇' });
  const [selectedInput, setSelectedInput] = useState(null);

  const handleDomainClick = (input) => setSelectedInput(input === selectedInput ? null : input);
  const handleCodomainClick = (output) => { if (selectedInput) { setMapping({ ...mapping, [selectedInput]: output }); setSelectedInput(null); } };
  const removeMapping = (input) => { const newMap = { ...mapping }; delete newMap[input]; setMapping(newMap); };

  const mappedInputs = Object.keys(mapping);
  const mappedOutputs = Object.values(mapping);
  
  const isFunction = mappedInputs.length === DOMAIN.length;
  const uniqueOutputs = new Set(mappedOutputs);
  const isInjective = isFunction && uniqueOutputs.size === mappedOutputs.length;
  const isSurjective = isFunction && uniqueOutputs.size === CODOMAIN_OPTIONS.length;
  const isBijective = isInjective && isSurjective;

  return (
    <div className="space-y-8 animate-fade-in mx-2 md:mx-0">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-cyan-400">1. The Function Builder ⚙️</h2>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto px-2">A function maps inputs (Domain) to outputs (Codomain).</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-slate-800 p-6 md:p-8 rounded-3xl border-2 border-slate-700 shadow-xl relative">
          <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest">Mapping f(x) = y</h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-widest hidden sm:inline">Codomain Size:</span>
              <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                {[2, 3, 4, 5].map(size => (
                  <button key={size} onClick={() => { setCodomainSize(size); setMapping({}); }} className={`px-3 py-1 rounded-md text-sm font-bold transition-all ${codomainSize === size ? 'bg-cyan-500 text-white' : 'text-slate-500 hover:text-white'}`}>{size}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-stretch gap-4 md:gap-12 relative min-h-[300px]">
            <div className="flex flex-col items-center gap-4 w-1/3 z-10">
              <div className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-2">Domain (X)</div>
              {DOMAIN.map(input => {
                const isMapped = mapping[input];
                const isSelected = selectedInput === input;
                return (
                  <div key={input} className="flex flex-col items-center">
                    <button onClick={() => handleDomainClick(input)} className={`w-16 h-16 rounded-2xl text-4xl flex items-center justify-center transition-all transform active:scale-95 border-4 ${isSelected ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-110' : (isMapped ? 'bg-slate-700 border-cyan-500/50' : 'bg-slate-900 border-slate-600 hover:border-cyan-400')}`}>{input}</button>
                    {isMapped && <button onClick={() => removeMapping(input)} className="text-[10px] text-red-400 mt-2 hover:text-red-300 font-bold uppercase tracking-wider">Unmap</button>}
                  </div>
                )
              })}
            </div>

            <div className="flex-1 flex flex-col justify-center items-center pointer-events-none">
              {DOMAIN.map(input => {
                if (!mapping[input]) return null;
                return (
                  <div key={`conn-${input}`} className="w-full flex items-center justify-between text-slate-500 mb-6 bg-slate-900/50 py-2 px-4 rounded-full border border-slate-700/50">
                    <span className="text-xl">{input}</span>
                    <div className="flex-1 h-0.5 bg-cyan-500/50 mx-4 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-cyan-500/50"></div></div>
                    <span className="text-xl">{mapping[input]}</span>
                  </div>
                )
              })}
              {selectedInput && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-900/80 text-cyan-300 px-4 py-2 rounded-full text-sm font-bold animate-pulse border border-cyan-500/50 shadow-lg text-center w-3/4">
                  Select a target on the right ➡️
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-4 w-1/3 z-10">
              <div className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest mb-2">Codomain (Y)</div>
              {CODOMAIN_OPTIONS.map(output => {
                const hits = mappedOutputs.filter(o => o === output).length;
                return (
                  <div key={output} className="flex flex-col items-center relative">
                    <button onClick={() => handleCodomainClick(output)} className={`w-16 h-16 rounded-2xl text-4xl flex items-center justify-center transition-all transform active:scale-95 border-4 ${selectedInput ? 'bg-fuchsia-500/20 border-fuchsia-400 cursor-pointer hover:bg-fuchsia-500/40 animate-pulse' : (hits > 0 ? 'bg-slate-700 border-fuchsia-500/50' : 'bg-slate-900 border-slate-600')}`}>{output}</button>
                    {hits > 0 && <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 border-slate-800 ${hits > 1 ? 'bg-red-500 text-white' : 'bg-fuchsia-500 text-white'}`}>{hits}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className={`p-5 rounded-2xl border-2 transition-all ${isFunction ? 'bg-slate-800 border-emerald-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-lg text-white">Valid Function?</h4>
              <div className={`font-black tracking-widest ${isFunction ? 'text-emerald-400' : 'text-red-400'}`}>{isFunction ? 'YES' : 'NO'}</div>
            </div>
            <p className="text-xs text-slate-400">Rule: Every input in the Domain MUST have exactly one output.</p>
          </div>
          <div className={`p-5 rounded-2xl border-2 transition-all ${!isFunction ? 'opacity-50 grayscale' : (isInjective ? 'bg-cyan-900/20 border-cyan-500 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-500')}`}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-lg text-white">Injective (One-to-One)</h4>
              <div className={`font-black tracking-widest ${isInjective ? 'text-cyan-400' : 'text-slate-500'}`}>{isInjective ? 'YES' : 'NO'}</div>
            </div>
            <p className="text-xs opacity-80 mb-2">Rule: No two inputs can map to the same output.</p>
            {!isInjective && isFunction && <div className="text-xs text-red-400 font-bold mt-2">Failed: Look at the red badges. An output is being hit multiple times!</div>}
          </div>
          <div className={`p-5 rounded-2xl border-2 transition-all ${!isFunction ? 'opacity-50 grayscale' : (isSurjective ? 'bg-fuchsia-900/20 border-fuchsia-500 text-fuchsia-300' : 'bg-slate-800 border-slate-700 text-slate-500')}`}>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-lg text-white">Surjective (Onto)</h4>
              <div className={`font-black tracking-widest ${isSurjective ? 'text-fuchsia-400' : 'text-slate-500'}`}>{isSurjective ? 'YES' : 'NO'}</div>
            </div>
            <p className="text-xs opacity-80 mb-2">Rule: Every element in the Codomain must be mapped to. (No unmapped fruits).</p>
            {!isSurjective && isFunction && <div className="text-xs text-red-400 font-bold mt-2">Failed: There are unmapped fruits in the Codomain!</div>}
          </div>
          <div className={`p-6 rounded-2xl border-4 text-center transition-all transform ${isBijective ? 'bg-gradient-to-r from-cyan-900 to-fuchsia-900 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-105' : 'bg-slate-900 border-slate-700 opacity-50'}`}>
            <div className="text-xs uppercase font-bold tracking-widest text-slate-300 mb-1">Ultimate Status</div>
            <div className={`text-2xl font-black ${isBijective ? 'text-white' : 'text-slate-500'}`}>BIJECTIVE FUNCTION</div>
            {isBijective && <div className="text-xs text-emerald-300 mt-2 font-bold">Perfect Pairing! Every input has a unique output, and nothing is left over.</div>}
          </div>
        </div>
      </div>
      <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-2xl mt-8">
          <h4 className="text-amber-400 font-bold mb-2 flex items-center gap-2"><span>🦉</span> The Pigeonhole Principle</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            Try setting the Codomain Size to <strong>2</strong>. Can you make an Injective function? <strong>No!</strong> You have 3 numbers (pigeons) but only 2 fruits (holes). At least one fruit MUST be hit twice. <br/><br/>
            Try setting the Codomain Size to <strong>4</strong>. Can you make a Surjective function? <strong>No!</strong> You only have 3 arrows to shoot, so you can never hit 4 targets. <br/>
            <strong>Bijective functions only exist when Domain Size = Codomain Size!</strong>
          </p>
      </div>
    </div>
  );
};

const FuncInverse = () => {
  const [isBijectiveMode, setIsBijectiveMode] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  const bijectiveDomain = ['1️⃣', '2️⃣', '3️⃣'];
  const bijectiveMap = { '1️⃣': '🍎', '2️⃣': '🍌', '3️⃣': '🍇' };
  const nonBijectiveDomain = ['1️⃣', '2️⃣', '3️⃣'];
  const nonBijectiveMap = { '1️⃣': '🍎', '2️⃣': '🍎', '3️⃣': '🍌' }; 

  const currentDomain = isBijectiveMode ? bijectiveDomain : nonBijectiveDomain;
  const currentMap = isBijectiveMode ? bijectiveMap : nonBijectiveMap;
  const fullCodomain = ['🍎', '🍌', '🍇'];

  return (
    <div className="space-y-8 animate-fade-in mx-2 md:mx-0">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-fuchsia-400">2. Inverse Functions f⁻¹(x) 🔄</h2>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto px-2">An inverse function exactly reverses the mapping. It turns outputs back into inputs. But this is <strong>only mathematically legal if the original function is Bijective.</strong></p>
      </header>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button onClick={() => {setIsBijectiveMode(true); setIsFlipped(false);}} className={`px-6 py-3 rounded-xl font-bold text-sm border-2 transition-all ${isBijectiveMode ? 'bg-fuchsia-600 border-fuchsia-400 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>Test Bijective Function</button>
        <button onClick={() => {setIsBijectiveMode(false); setIsFlipped(false);}} className={`px-6 py-3 rounded-xl font-bold text-sm border-2 transition-all ${!isBijectiveMode ? 'bg-amber-600 border-amber-400 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>Test Non-Bijective Function</button>
      </div>

      <div className="bg-slate-800 p-6 md:p-10 rounded-3xl border-2 border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white font-mono flex items-center gap-4">
              <span className={`px-4 py-2 rounded-lg transition-colors ${!isFlipped ? 'bg-cyan-500 text-slate-900' : 'bg-slate-900 text-slate-500'}`}>f(x)</span> 
              <span className="text-slate-600">↔</span> 
              <span className={`px-4 py-2 rounded-lg transition-colors ${isFlipped ? 'bg-fuchsia-500 text-white' : 'bg-slate-900 text-slate-500'}`}>f⁻¹(x)</span>
            </h3>
          </div>
          <button onClick={() => setIsFlipped(!isFlipped)} className="bg-white text-slate-900 px-6 py-3 rounded-full font-black uppercase tracking-widest hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 flex items-center gap-2">
            <span className={`transform transition-transform duration-500 text-xl ${isFlipped ? '-rotate-180' : ''}`}>🔄</span> Invert Mapping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-600 shadow-inner">
                <div className="text-xs uppercase font-bold text-slate-500 tracking-widest mb-6 border-b border-slate-700 pb-2">
                    {isFlipped ? 'Inverted Mapping Rules (Y → X)' : 'Original Mapping Rules (X → Y)'}
                </div>
                <div className="space-y-4">
                    {!isFlipped && currentDomain.map(input => (
                        <div key={`orig-${input}`} className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700">
                            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-2xl shadow-inner border border-cyan-500/30">{input}</div>
                            <div className="flex-1 flex justify-center items-center text-slate-500 font-bold"><span className="text-cyan-400">────➔</span></div>
                            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-2xl shadow-inner border border-fuchsia-500/30">{currentMap[input]}</div>
                        </div>
                    ))}
                    {isFlipped && fullCodomain.map(output => {
                        const mappedInputs = Object.keys(currentMap).filter(k => currentMap[k] === output);
                        const hasNoOutput = mappedInputs.length === 0;
                        const hasMultipleOutputs = mappedInputs.length > 1;
                        const isError = hasNoOutput || hasMultipleOutputs;

                        return (
                            <div key={`inv-${output}`} className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${isError ? 'bg-red-900/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse' : 'bg-slate-800 border-slate-700'}`}>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-inner border ${isError ? 'bg-red-950 border-red-500' : 'bg-slate-900 border-fuchsia-500/30'}`}>{output}</div>
                                <div className="flex-1 flex flex-col justify-center items-center">
                                    <span className={isError ? "text-red-400 font-bold" : "text-fuchsia-400 font-bold"}>────➔</span>
                                    {hasNoOutput && <span className="text-[10px] text-red-400 font-bold uppercase mt-1">No Output!</span>}
                                    {hasMultipleOutputs && <span className="text-[10px] text-red-400 font-bold uppercase mt-1">Multiple Outputs!</span>}
                                </div>
                                <div className="flex gap-2">
                                    {hasNoOutput ? (
                                        <div className="w-12 h-12 bg-red-950/50 rounded-lg flex items-center justify-center text-sm font-mono text-red-400 border border-red-500/50">∅</div>
                                    ) : (
                                        mappedInputs.map(input => (
                                            <div key={`inv-res-${input}`} className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-inner border ${hasMultipleOutputs ? 'bg-red-950 border-red-500' : 'bg-slate-900 border-cyan-500/30'}`}>{input}</div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex flex-col justify-center">
                {isFlipped ? (
                    isBijectiveMode ? (
                        <div className="bg-emerald-900/20 p-8 rounded-3xl border-2 border-emerald-500/50 animate-fade-in-up shadow-xl">
                            <div className="text-5xl mb-4">✅</div>
                            <h4 className="text-emerald-400 font-extrabold text-2xl mb-4">Valid Inverse Function!</h4>
                            <p className="text-slate-300 leading-relaxed text-lg">Because the original function was Bijective, reversing the rules creates a perfect new function. Every fruit (now the Domain) maps to exactly one number (now the Codomain).</p>
                        </div>
                    ) : (
                        <div className="bg-red-900/20 p-8 rounded-3xl border-2 border-red-500/50 animate-fade-in-up shadow-xl">
                            <div className="text-5xl mb-4">❌</div>
                            <h4 className="text-red-400 font-extrabold text-2xl mb-4">INVALID Inverse Function!</h4>
                            <p className="text-slate-300 leading-relaxed text-base mb-6">Look at the red mapping rules! When we flip a Non-Bijective function, it breaks the absolute laws of what a function is:</p>
                            <ul className="text-sm md:text-base text-slate-300 space-y-4">
                                <li className="bg-slate-900/50 p-4 rounded-xl border border-red-500/30"><strong className="text-white block mb-1">1. Fails Total Function:</strong> 🍇 has no arrow leaving it! It is completely undefined in our new domain.</li>
                                <li className="bg-slate-900/50 p-4 rounded-xl border border-red-500/30"><strong className="text-white block mb-1">2. Fails Uniqueness:</strong> 🍎 tries to map to TWO different outputs (1️⃣ and 2️⃣). A function machine can only ever return one output per input!</li>
                            </ul>
                        </div>
                    )
                ) : (
                    <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-700 text-center flex flex-col items-center justify-center h-full">
                        <div className="text-4xl mb-4 opacity-50">🤔</div>
                        <h4 className="text-slate-300 font-bold text-xl mb-2">Ready to Invert</h4>
                        <p className="text-slate-500 text-sm max-w-sm">Click "Invert Mapping" above to test if these rules survive being reversed.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

const FuncComp = () => {
  const X = [1, 2, 3];
  const Y = ['🍎', '🍌', '🍇'];
  const Z = ['🔴', '🟡', '🟣'];
  const f = { 1: '🍎', 2: '🍌', 3: '🍇' };
  const g = { '🍎': '🔴', '🍌': '🟡', '🍇': '🟣' };
  const [selectedX, setSelectedX] = useState(null);

  return (
    <div className="space-y-8 animate-fade-in mx-2 md:mx-0">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-emerald-400">3. Composition g ◦ f 🔗</h2>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto px-2">Function composition means chaining machines together. The output of <strong>f(x)</strong> immediately becomes the input for <strong>g(y)</strong>. Click a starting number below to trace the data flow.</p>
      </header>

      <div className="bg-slate-800 p-8 rounded-3xl border-2 border-slate-700 shadow-xl overflow-x-auto">
        <div className="min-w-[600px] flex justify-between items-center relative py-12">
          <div className="flex flex-col items-center gap-6 z-10 w-1/4">
            <div className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-2 bg-slate-900 px-4 py-1 rounded-full">Set X</div>
            {X.map(x => (
              <button key={`x-${x}`} onClick={() => setSelectedX(x)} className={`w-16 h-16 rounded-xl text-3xl font-black transition-all transform active:scale-95 border-4 ${selectedX === x ? 'bg-cyan-500 border-white text-white shadow-[0_0_20px_rgba(34,211,238,0.8)] scale-110' : 'bg-slate-900 border-cyan-500/30 text-cyan-300 hover:border-cyan-400'}`}>
                {x}
              </button>
            ))}
          </div>
          <div className="absolute left-[12%] right-[50%] h-full pointer-events-none flex flex-col justify-center gap-14 opacity-30 px-8">
             {X.map(x => <div key={`line-f-${x}`} className={`h-1 w-full transition-all duration-500 ${selectedX === x ? 'bg-cyan-400 shadow-[0_0_10px_cyan]' : 'bg-slate-600'}`}></div>)}
          </div>
          <div className="flex flex-col items-center gap-6 z-10 w-1/4">
            <div className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest mb-2 bg-slate-900 px-4 py-1 rounded-full">Set Y</div>
            {Y.map(y => (
                <div key={`y-${y}`} className={`w-16 h-16 rounded-xl text-4xl flex items-center justify-center transition-all duration-500 border-4 ${selectedX && f[selectedX] === y ? 'bg-fuchsia-500 border-white shadow-[0_0_20px_rgba(217,70,239,0.8)] scale-110' : 'bg-slate-900 border-fuchsia-500/30 text-fuchsia-300'}`}>
                  {y}
                </div>
            ))}
          </div>
          <div className="absolute left-[50%] right-[12%] h-full pointer-events-none flex flex-col justify-center gap-14 opacity-30 px-8">
             {Y.map(y => {
               const xForThisY = parseInt(Object.keys(f).find(key => f[key] === y));
               return <div key={`line-g-${y}`} className={`h-1 w-full transition-all duration-500 ${selectedX === xForThisY ? 'bg-fuchsia-400 shadow-[0_0_10px_fuchsia] delay-150' : 'bg-slate-600'}`}></div>
             })}
          </div>
          <div className="flex flex-col items-center gap-6 z-10 w-1/4">
            <div className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-2 bg-slate-900 px-4 py-1 rounded-full">Set Z</div>
            {Z.map(z => {
              const yForThisZ = Object.keys(g).find(key => g[key] === z);
              const xForThisY = parseInt(Object.keys(f).find(key => f[key] === yForThisZ));
              return (
                <div key={`z-${z}`} className={`w-16 h-16 rounded-xl text-3xl flex items-center justify-center transition-all duration-500 border-4 ${selectedX === xForThisY ? 'bg-amber-500 border-white shadow-[0_0_20px_rgba(245,158,11,0.8)] scale-110 delay-300' : 'bg-slate-900 border-amber-500/30 text-amber-300'}`}>
                  {z}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl text-center shadow-lg transition-all min-h-[120px] flex items-center justify-center">
          {selectedX ? (
            <div className="font-mono text-xl md:text-2xl animate-fade-in-up flex flex-wrap justify-center items-center gap-4">
              <span className="text-white bg-slate-800 px-4 py-2 rounded-lg border border-slate-600">g( f(<span className="text-cyan-400">{selectedX}</span>) )</span>
              <span className="text-slate-500">→</span>
              <span className="text-white bg-slate-800 px-4 py-2 rounded-lg border border-slate-600">g( <span className="text-fuchsia-400">{f[selectedX]}</span> )</span>
              <span className="text-slate-500">→</span>
              <span className="text-amber-400 font-black text-3xl drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] bg-slate-800 px-4 py-2 rounded-lg border border-amber-500">{g[f[selectedX]]}</span>
            </div>
          ) : (
            <div className="text-slate-500 font-mono">Select a number in Set X to trace the composition...</div>
          )}
      </div>
    </div>
  );
};

const FunctionsPhase = ({ activeTab }) => {
  return (
    <>
      {activeTab === '1_types' && <FuncTypes />}
      {activeTab === '2_inverse' && <FuncInverse />}
      {activeTab === '3_comp' && <FuncComp />}
    </>
  );
};


// ==========================================
// PHASE 4: THE ULTIMATE EXAM SUITE
// ==========================================

// Helper to shuffle arrays for the Prover options
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const InteractiveProver = () => {
  const [activeQ, setActiveQ] = useState('q1');
  const [proofStep, setProofStep] = useState(0);
  const [feedback, setFeedback] = useState({ text: '', type: '' });

  // Use memo to ensure shuffled options don't re-shuffle on every render/click
  const examData = useMemo(() => ({
    q1: {
      title: "Q1: De Morgan's Law Verification",
      question: "If A={6,2,4}, B={2,3,4} and U={2,3,4,5,6,7}, verify (A∪B)' = A'∩B'",
      premises: [`U = {2, 3, 4, 5, 6, 7}`, `A = {2, 4, 6}`, `B = {2, 3, 4}`],
      steps: [
        { expected: '{2, 3, 4, 6}', options: shuffleArray(['{6}', '{2, 4}', '{2, 3, 4, 6}', '{2, 3, 4, 5, 6, 7}']), prompt: 'Step 1 (LHS): Calculate (A ∪ B)', result: 'A ∪ B = {2, 3, 4, 6}' },
        { expected: '{5, 7}', options: shuffleArray(['{2}', '{5, 7}', '{3, 5}', '∅']), prompt: 'Step 2 (LHS): Calculate the complement (A ∪ B)\'. What is in U but not in A ∪ B?', result: '(A ∪ B)\' = {5, 7}' },
        { expected: '{3, 5, 7}', options: shuffleArray(['{3, 5, 7}', '{5, 7}', '∅', '{2, 3, 4}']), prompt: 'Step 3 (RHS): Calculate A\'. What is in U but not in A?', result: 'A\' = {3, 5, 7}' },
        { expected: '{5, 6, 7}', options: shuffleArray(['{2, 4, 6}', '{5, 6, 7}', 'U', '{5, 7}']), prompt: 'Step 4 (RHS): Calculate B\'. What is in U but not in B?', result: 'B\' = {5, 6, 7}' },
        { expected: '{5, 7}', options: shuffleArray(['{3, 5, 6, 7}', '∅', '{5}', '{5, 7}']), prompt: 'Step 5 (RHS): Finally, intersect A\' and B\'. What do {3, 5, 7} and {5, 6, 7} have in common?', result: 'A\' ∩ B\' = {5, 7}' }
      ],
      conclusion: "LHS {5, 7} perfectly matches RHS {5, 7}. De Morgan's Law is verified!"
    },
    q2: {
      title: "Q2: Empty Set Proof",
      question: "Let A and B be sets. Show that: A ∩ (B - A) = ∅",
      premises: [`A = {2, 4, 6}`, `B = {2, 3, 4}`],
      steps: [
        { expected: '{3}', options: shuffleArray(['{6}', '{3}', '{2, 4}', '∅']), prompt: 'Step 1: Calculate (B - A). What is strictly in B but NOT in A?', result: '(B - A) = {3}' },
        { expected: '∅', options: shuffleArray(['{2, 4}', '∅', '{3}', '{2, 3, 4, 6}']), prompt: 'Step 2: Calculate A ∩ (B - A). What does A={2, 4, 6} have in common with {3}?', result: 'A ∩ (B - A) = ∅' }
      ],
      conclusion: "Since (B - A) explicitly removes all elements of A, they can never share elements. Proven!"
    },
    q3: {
      title: "Q3: Relation Transitivity",
      question: "Relation R = {(i,j) : |i - j| = 2} on set {1,2,3,4,5,6}. Is R transitive?",
      premises: ["Formula: |i - j| = 2", "Set = {1,2,3,4,5,6}"],
      steps: [
        { expected: '(1,3) & (3,1)', options: shuffleArray(['(1,2) & (2,3)', '(1,3) only', '∅', '(1,3) & (3,1)']), prompt: 'Step 1: Which of these pairs belong to R? (Remember absolute value makes negatives positive)', result: 'Both (1,3) and (3,1) are in R.' },
        { expected: '(3,5)', options: shuffleArray(['(3,6)', '(3,4)', '(3,5)', '(3,2)']), prompt: 'Step 2: If we start a transitive chain at 1 ➔ 3, where can 3 go next? Find (3, x) where |3-x|=2.', result: 'Chain found: (1,3) and (3,5)' },
        { expected: 'No', options: shuffleArray(['Yes', 'Sometimes', 'No', 'Cannot be determined']), prompt: 'Step 3: Transitivity says if (1,3) and (3,5) exist, then (1,5) MUST exist. Does |1 - 5| = 2?', result: '|1 - 5| = |-4| = 4. It does NOT equal 2.' }
      ],
      conclusion: "Because the direct path (1,5) is missing, the relation is NOT transitive."
    },
    q4: {
      title: "Q4: Function Composition",
      question: "Let f(x) = 3x + 2 and g(x) = x² + 1. Specify: f ◦ g (which means f(g(x)))",
      premises: ["f(x) = 3x + 2", "g(x) = x² + 1"],
      steps: [
        { expected: 'f(x² + 1)', options: shuffleArray(['g(3x + 2)', 'f(x² + 1)', 'f(x) * g(x)', '3x² + 2']), prompt: 'Step 1: Substitute the inner function g(x) into f.', result: 'We need to calculate f(x² + 1)' },
        { expected: '3(x² + 1) + 2', options: shuffleArray(['(3x + 2)² + 1', '3x² + 1 + 2', '3(x² + 1) + 2', '3x + 2(x² + 1)']), prompt: 'Step 2: Plug (x² + 1) into every "x" inside the f(x) formula.', result: 'f(x² + 1) = 3(x² + 1) + 2' },
        { expected: '3x² + 5', options: shuffleArray(['3x² + 3', '9x² + 5', 'x² + 3', '3x² + 5']), prompt: 'Step 3: Distribute the 3 and simplify.', result: '3x² + 3 + 2 = 3x² + 5' }
      ],
      conclusion: "Composition Complete! f(g(x)) = 3x² + 5"
    },
    q5: {
      title: "Q5: Equivalence Union Tricks",
      question: "Prove or disprove: If R and S are equivalence relations, R ∪ S is an equivalence relation.",
      premises: ["R is Equivalence (Reflexive, Symmetric, Transitive)", "S is Equivalence"],
      steps: [
        { expected: 'Reflexive & Symmetric', options: shuffleArray(['Transitive Only', 'Reflexive & Symmetric', 'None', 'All Three']), prompt: 'Step 1: R ∪ S will inherently inherit two properties simply by combining all pairs. Which two?', result: 'It inherits Reflexive and Symmetric properties.' },
        { expected: 'Create a counterexample', options: shuffleArray(['Assume it is true', 'Draw a Venn Diagram', 'Give up', 'Create a counterexample']), prompt: 'Step 2: However, Transitivity often breaks during a union. How do we disprove a mathematical statement?', result: 'We must create a specific counterexample.' },
        { expected: '(1,3)', options: shuffleArray(['(1,2)', '(2,3)', '(1,3)', '(3,3)']), prompt: 'Step 3: Let R have (1,2) and S have (2,3). R ∪ S now contains (1,2) and (2,3). For transitivity to hold, what MUST be in R ∪ S?', result: '(1,3) MUST exist.' },
        { expected: 'No', options: shuffleArray(['Yes', 'No', 'Maybe', 'Always']), prompt: 'Step 4: Since (1,2) came exclusively from R, and (2,3) came exclusively from S, is there any guarantee that (1,3) exists in either?', result: 'No! The chain breaks.' }
      ],
      conclusion: "Therefore, R ∪ S is NOT necessarily an equivalence relation because transitivity can fail."
    },
    q6: {
      title: "Q6: Relation Composition S ◦ R",
      question: "R = {(a,c)...}, S = {(c,d)...}. Find S ◦ R",
      premises: ["R = {(a,c)}", "S = {(c,d)}", "Find S ◦ R"],
      steps: [
        { expected: 'Apply R first', options: shuffleArray(['Apply S first', 'Apply both simultaneously', 'Apply R first', 'Multiply them']), prompt: 'Step 1: S ◦ R reads from right-to-left. Which relation do we trace first?', result: 'We trace R first.' },
        { expected: 'c', options: shuffleArray(['a', 'd', 'c', 'b']), prompt: 'Step 2: Starting at "a" in relation R, where does the path lead?', result: 'a ➔ c' },
        { expected: 'd', options: shuffleArray(['d', 'a', 'c', 'b']), prompt: 'Step 3: Now take "c" and plug it into relation S. Where does it lead?', result: 'c ➔ d' },
        { expected: '(a,d)', options: shuffleArray(['(c,c)', '(a,d)', '(d,a)', '(a,c)']), prompt: 'Step 4: What is the final connected pair from the start to the end?', result: 'The path is (a,d)' }
      ],
      conclusion: "S ◦ R maps 'a' directly to 'd'. Result: {(a,d)}."
    },
    q7: {
      title: "Q7: Symmetric Inverse",
      question: "Prove a relation R is symmetric iff R = R⁻¹",
      premises: ["R is Symmetric: (a,b) ∈ R ⟹ (b,a) ∈ R", "Inverse R⁻¹: (a,b) ∈ R ⟹ (b,a) ∈ R⁻¹"],
      steps: [
        { expected: '(b,a) ∈ R', options: shuffleArray(['(a,b) ∈ R', '(b,a) ∈ R', '(a,a) ∈ R', '∅']), prompt: 'Step 1: Assume R is symmetric. If (a,b) is in R, what else MUST be in R?', result: 'Symmetric means (b,a) is also in R.' },
        { expected: '(a,b) ∈ R⁻¹', options: shuffleArray(['(b,a) ∈ R⁻¹', '(a,b) ∈ R', '(a,b) ∈ R⁻¹', '(a,a) ∈ R']), prompt: 'Step 2: By the strict definition of an inverse, if (b,a) is in R, what MUST be in R⁻¹?', result: 'The reverse (a,b) is in R⁻¹.' },
        { expected: 'R = R⁻¹', options: shuffleArray(['R ⊂ R⁻¹', 'R = R⁻¹', 'R ∩ R⁻¹ = ∅', 'R ≠ R⁻¹']), prompt: 'Step 3: If every (a,b) in R is also exactly in R⁻¹, what is their relationship?', result: 'They are exactly equal: R = R⁻¹.' }
      ],
      conclusion: "Proven! A symmetric relation is identical to its own inverse."
    },
    q8: {
      title: "Q8: Bijective Proof",
      question: "Determine if f(x) = -3x² + 7 is a bijection from ℝ to ℝ.",
      premises: ["f(x) = -3x² + 7", "Domain = ℝ, Codomain = ℝ"],
      steps: [
        { expected: '4', options: shuffleArray(['10', '4', '-4', '7']), prompt: 'Step 1: Calculate f(1). What is -3(1)² + 7?', result: 'f(1) = 4' },
        { expected: '4', options: shuffleArray(['-4', '10', '4', '7']), prompt: 'Step 2: Calculate f(-1). What is -3(-1)² + 7?', result: 'f(-1) = 4' },
        { expected: 'No', options: shuffleArray(['Yes', 'No', 'Maybe', 'Always']), prompt: 'Step 3: We have two DIFFERENT inputs (1 and -1) giving the EXACT SAME output (4). Is this Injective (One-to-One)?', result: 'No! It fails the Injective property.' },
        { expected: 'No', options: shuffleArray(['Yes', 'No', 'Sometimes', 'Always']), prompt: 'Step 4: If a function fails to be Injective, can it be Bijective?', result: 'No. Bijective requires BOTH Injective and Surjective.' }
      ],
      conclusion: "Since f(1) = f(-1), the function is a parabola and fails to be a Bijection."
    },
    q9: {
      title: "Q9: Congruence Modulo m",
      question: "Show a ≡ b (mod m) is an equivalence relation.",
      premises: ["Definition: a ≡ b means (a - b) = k*m for some integer k"],
      steps: [
        { expected: '0', options: shuffleArray(['1', '0', 'm', 'k']), prompt: 'Step 1 (Reflexive): To prove a ≡ a, we test (a - a). What is (a - a)?', result: '(a - a) = 0.' },
        { expected: 'Yes', options: shuffleArray(['No', 'Yes', 'Never', 'Sometimes']), prompt: 'Step 2: Does m divide 0? (Can we write 0 = k*m?)', result: 'Yes! 0 = 0*m. So it is Reflexive.' },
        { expected: '(b - a) = (-k)*m', options: shuffleArray(['(b - a) = k*m', '(b - a) = (-k)*m', '(b - a) = m', '(a - b) = -k*m']), prompt: 'Step 3 (Symmetric): Assume a ≡ b, meaning (a - b) = k*m. What happens if we multiply by -1?', result: 'We get (b - a) = (-k)*m. Since -k is an integer, it is Symmetric.' },
        { expected: '(a - c) = (k+j)*m', options: shuffleArray(['(a - c) = k*m', '(b - c) = j*m', '(a - c) = (k+j)*m', '(a + c) = m']), prompt: 'Step 4 (Transitive): If (a - b) = k*m and (b - c) = j*m, what do we get if we add the two equations?', result: '(a - b) + (b - c) = (k+j)*m. The b cancels out, leaving (a - c). Transitive!' }
      ],
      conclusion: "Since it is Reflexive, Symmetric, and Transitive, Congruence Modulo m is an Equivalence Relation!"
    },
    q10: {
      title: "Q10: Cartesian Product",
      question: "If A = {a, b}, B = {1, 2, 3}, find (A × B) ∩ (B × A)",
      premises: ["A = {a, b}", "B = {1, 2, 3}", "Cartesian Product A × B creates ordered pairs (x,y)"],
      steps: [
        { expected: '(a,1)', options: shuffleArray(['(1,a)', '(a,1)', '(a,b)', '(1,2)']), prompt: 'Step 1: Which of these is a valid ordered pair in (A × B)?', result: '(a,1) is in A × B.' },
        { expected: '(1,a)', options: shuffleArray(['(a,1)', '(a,b)', '(1,a)', '(1,2)']), prompt: 'Step 2: Which of these is a valid ordered pair in (B × A)?', result: '(1,a) is in B × A.' },
        { expected: 'No', options: shuffleArray(['Yes', 'No', 'Sometimes', 'Always']), prompt: 'Step 3: Is the ordered pair (a,1) exactly equal to (1,a)?', result: 'No! Order matters in Cartesian Products.' },
        { expected: '∅', options: shuffleArray(['{(a,1), (1,a)}', 'A ∪ B', '∅', 'A ∩ B']), prompt: 'Step 4: Therefore, what is the Intersection (overlap) of (A × B) and (B × A)?', result: 'They share zero elements. The intersection is ∅.' }
      ],
      conclusion: "Because A and B are distinct sets, their Cartesian products are completely disjoint."
    }
  }), []); // Empty dependency array ensures options are shuffled ONCE when component mounts

  const examKeys = Object.keys(examData);
  const activeCase = examData[activeQ];
  const handleCaseSwitch = (q) => { setActiveQ(q); setProofStep(0); setFeedback({ text: '', type: '' }); };
  const handleNextCase = () => {
    const currentIndex = examKeys.indexOf(activeQ);
    const nextKey = examKeys[(currentIndex + 1) % examKeys.length];
    handleCaseSwitch(nextKey);
  };
  const handleProofGuess = (guess) => {
      if (guess === activeCase.steps[proofStep].expected) {
          if (proofStep === activeCase.steps.length - 1) {
              setProofStep(proofStep + 1); setFeedback({ text: 'Excellent! Proof successfully derived.', type: 'success' });
          } else {
              setProofStep(proofStep + 1); setFeedback({ text: 'Correct deduction! Proceed.', type: 'success' });
          }
      } else { setFeedback({ text: 'Incorrect logical step. Try again.', type: 'error' }); }
  };

  return (
    <div className="space-y-8 animate-fade-in mx-2 md:mx-0">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Interactive Exam Prover 🕵️‍♂️</h2>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto px-2">You are the solver. Select an exam question and deduce the mathematical steps yourself.</p>
      </header>

      <div className="bg-slate-800 border-2 border-slate-600 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex border-b border-slate-700 bg-slate-900/50 pt-4 px-4 overflow-x-auto scrollbar-hide">
            {Object.keys(examData).map((q) => (
                <button key={q} onClick={() => handleCaseSwitch(q)} className={`px-6 py-4 font-bold tracking-wider uppercase text-sm whitespace-nowrap border-b-4 transition-all ${activeQ === q ? `border-cyan-400 text-cyan-400 bg-slate-800` : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    {q.toUpperCase()}
                </button>
            ))}
        </div>
        
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-inner">
                <h3 className="text-cyan-400 font-bold mb-4 text-lg border-b border-slate-700 pb-2">{activeCase.title}</h3>
                <div className="text-white text-sm md:text-base font-medium mb-6 bg-black/30 p-4 rounded-lg border-l-4 border-cyan-500">{activeCase.question}</div>
                
                <h4 className="text-xs uppercase text-slate-500 font-bold tracking-widest mb-3">Given Premises:</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeCase.premises.map((p, i) => <span key={i} className="bg-slate-800 px-3 py-1 rounded font-mono text-sm text-slate-300 border border-slate-600">{p}</span>)}
                </div>

                <h4 className="text-xs uppercase text-amber-400 font-bold tracking-widest mb-3">Your Deductions:</h4>
                <div className="space-y-3">
                  {activeCase.steps.map((step, idx) => (
                      <div key={idx}>
                          {proofStep > idx ? (
                              <div className="p-3 rounded-lg bg-emerald-900/20 border border-emerald-500/30 text-emerald-300 font-mono text-sm md:text-base animate-fade-in">✓ {step.result}</div>
                          ) : proofStep === idx ? (
                              <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-500 font-mono text-sm animate-pulse">[ Waiting for deduction... ]</div>
                          ) : null}
                      </div>
                  ))}
                </div>
            </div>

            <div className="flex flex-col justify-center">
                {proofStep < activeCase.steps.length ? (
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-600 shadow-xl animate-fade-in">
                        <h4 className="text-lg font-bold mb-4 text-white">Action Required</h4>
                        <p className="text-cyan-300 mb-6 font-medium bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">{activeCase.steps[proofStep].prompt}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {activeCase.steps[proofStep].options.map(opt => (
                                <button key={opt} onClick={() => handleProofGuess(opt)} className="p-4 bg-slate-900 hover:bg-slate-700 rounded-xl border border-slate-500 font-mono font-bold text-slate-300 hover:text-white transition-all active:scale-95 shadow-md text-sm">
                                    {opt}
                                </button>
                            ))}
                        </div>
                        {feedback.text && <div className={`mt-4 p-3 rounded font-bold text-sm text-center ${feedback.type === 'success' ? 'text-emerald-400 bg-emerald-900/30' : 'text-red-400 bg-red-900/30'}`}>{feedback.text}</div>}
                    </div>
                ) : (
                    <div className="text-center bg-emerald-900/20 p-8 rounded-3xl border-2 border-emerald-500/50 animate-bounce-in">
                        <div className="text-6xl mb-4">🏆</div>
                        <h4 className="text-2xl font-black text-emerald-400 mb-4">Proof Completed!</h4>
                        <p className="text-emerald-200/80 font-medium leading-relaxed">{activeCase.conclusion}</p>
                        <button
                            onClick={handleNextCase}
                            className="mt-6 px-6 py-3 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-400 transition-all shadow-lg active:scale-95"
                        >
                            {examKeys.indexOf(activeQ) === examKeys.length - 1 ? 'Restart from Q1' : 'Next Question'}
                        </button>
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

  const questions = [
    { q: "If Set A = {1, 2} and Set B = {3, 4}, what is the Cardinality of their Cartesian Product |A × B|?", opts: ["2", "4", "6", "8"], ans: 1, exp: "Correct! |A| = 2 and |B| = 2. The cardinality of a Cartesian product is |A| * |B| = 4." },
    { q: "Which property requires the main diagonal of an Adjacency Matrix to be completely filled with 1s?", opts: ["Symmetric", "Transitive", "Reflexive", "Anti-Symmetric"], ans: 2, exp: "Reflexive! Every element must relate to itself, which forms the solid main diagonal." },
    { q: "A Partial Order (Poset) is defined by three properties: Reflexive, Transitive, and...", opts: ["Symmetric", "Anti-Symmetric", "Asymmetric", "Equivalence"], ans: 1, exp: "Anti-Symmetric! Unlike an Equivalence relation (which is symmetric/equal), a Poset creates a strict hierarchy (like ≤)." },
    { q: "If a function maps every distinct input to a totally distinct output (no two arrows hit the same target), it is called:", opts: ["Surjective (Onto)", "Injective (1-to-1)", "Bijective", "Inverse"], ans: 1, exp: "Injective (One-to-One). No two inputs map to the same output." },
    { q: "The Power Set of a Set with 5 elements contains how many subsets?", opts: ["5", "10", "25", "32"], ans: 3, exp: "32! The formula for a Power Set is 2^n. 2^5 = 32." }
  ];

  const handleCheck = () => { if (selected === null) return; setChecked(true); if (selected === questions[currentQ].ans) setScore(score + 1); };
  const handleNext = () => { if (currentQ < questions.length - 1) { setCurrentQ(currentQ + 1); setSelected(null); setChecked(false); } else setShowResults(true); };

  return (
    <div className="space-y-8 animate-fade-in mx-2 md:mx-0 py-8">
      {!quizStarted ? (
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 md:p-12 text-center border-4 border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
            <div className="text-6xl mb-6 animate-bounce">🎓</div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Unit 2: Final Boss</h2>
            <p className="text-sm md:text-lg text-purple-200 max-w-2xl mx-auto mb-10">You have mastered Sets, Relations, Posets, and Functions. Prove your ultimate mastery.</p>
            <button onClick={() => setQuizStarted(true)} className="px-8 py-4 md:px-10 md:py-5 bg-purple-500 text-white text-lg md:text-xl font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:bg-purple-400 transition-all hover:scale-105 active:scale-95">Initiate Final Exam 🚀</button>
        </div>
      ) : showResults ? (
        <div className="bg-slate-800 rounded-3xl p-8 md:p-12 text-center border-2 border-emerald-500">
            <div className="text-6xl md:text-7xl mb-6">{score === questions.length ? '🏆' : '🎖️'}</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Unit 2 Complete!</h2>
            <p className="text-lg md:text-xl text-slate-300 mb-8">Score: <span className="text-emerald-400 font-bold">{score}</span> / {questions.length}</p>
            <div className="flex gap-4 justify-center">
                <button onClick={() => {setQuizStarted(false); setCurrentQ(0); setScore(0); setShowResults(false); setSelected(null); setChecked(false);}} className="px-6 py-3 bg-slate-700 text-white font-bold rounded-full hover:bg-slate-600 transition-all">Retake</button>
            </div>
        </div>
      ) : (
        <div className="bg-slate-800 border-2 border-purple-500/50 rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="mb-6 md:mb-8 border-b border-slate-700 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <span className="text-purple-400 font-bold uppercase tracking-widest text-xs md:text-sm">Question {currentQ + 1} of {questions.length}</span>
              <span className="bg-slate-900 px-3 py-1 rounded border border-slate-700 font-mono text-sm">Score: {score}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">{questions[currentQ].q}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {questions[currentQ].opts.map((opt, i) => {
                    let c = "p-4 md:p-6 rounded-xl border-2 text-left font-bold text-base md:text-lg transition-all ";
                    if (!checked) c += selected === i ? "bg-purple-600 border-purple-400 text-white transform scale-[1.02]" : "bg-slate-900 border-slate-700 text-slate-300 hover:border-purple-500 hover:bg-slate-800";
                    else c += i === questions[currentQ].ans ? "bg-emerald-900/80 border-emerald-500 text-emerald-300" : (selected === i ? "bg-red-900/80 border-red-500 text-red-300 opacity-50" : "bg-slate-900 border-slate-800 opacity-30");
                    return <button key={i} onClick={() => !checked && setSelected(i)} disabled={checked} className={c}>{opt}</button>;
                })}
            </div>
            {!checked ? (
                <button onClick={handleCheck} disabled={selected === null} className={`px-8 py-4 rounded-xl font-bold text-base md:text-lg w-full md:w-auto transition-all ${selected !== null ? 'bg-purple-500 text-white shadow-lg hover:bg-purple-400' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>Check Answer</button>
            ) : (
                <div className="animate-fade-in">
                    <div className={`p-4 rounded-xl border mb-6 text-sm md:text-base ${selected === questions[currentQ].ans ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-300' : 'bg-amber-900/20 border-amber-500/50 text-amber-300'}`}>{questions[currentQ].exp}</div>
                    <button onClick={handleNext} className="px-8 py-4 bg-white text-slate-900 font-black rounded-xl w-full md:w-auto hover:bg-slate-200 transition-all shadow-lg">{currentQ < questions.length - 1 ? 'Next Question ➡️' : 'See Results 🏆'}</button>
                </div>
            )}
        </div>
      )}
    </div>
  );
};

const ExamPhase = ({ activeTab }) => {
  return (
    <>
      {activeTab === 'interactive_proofs' && <InteractiveProver />}
      {activeTab === 'final_quiz' && <FinalQuiz />}
    </>
  );
};

// ==========================================
// THE ROOT COMPONENT: UNIT 2 MASTER HUB
// ==========================================
export default function Unit2MasterHub() {
  // THE BUG FIX: Default state is now 'sets'
  const [activePhase, setActivePhase] = useState('sets'); 
  
  const [activeSubTabs, setActiveSubTabs] = useState({
    sets: '1_basics', relations: '1_properties', functions: '1_types', exam: 'interactive_proofs'
  });

  const handleSubTabChange = (tabId) => setActiveSubTabs(prev => ({ ...prev, [activePhase]: tabId }));

  const PHASES = [
    { id: 'sets', title: '1. Set Theory', icon: '🍎' },
    { id: 'relations', title: '2. Relations', icon: '🧮' },
    { id: 'functions', title: '3. Functions', icon: '⚙️' },
    { id: 'exam', title: '4. Exam & Quiz', icon: '🏆' }
  ];

  const SUB_TABS = {
    sets: [
      { id: '1_basics', title: 'Notation', icon: '📝' }, { id: '2_ops', title: 'Operations', icon: '🍎' },
      { id: '3_subsets', title: 'Power Sets', icon: '♾️' }, { id: '4_laws', title: 'Laws & Code', icon: '⚖️' }
    ],
    relations: [
      { id: '1_properties', title: 'Matrix', icon: '🧮' }, { id: '2_classification', title: 'Equivalence', icon: '⚖️' }
    ],
    functions: [
      { id: '1_types', title: 'Types', icon: '⚙️' }, { id: '2_inverse', title: 'Inverse', icon: '🔄' }, { id: '3_comp', title: 'Composition', icon: '🔗' }
    ],
    exam: [
      { id: 'interactive_proofs', title: 'Interactive Prover (Q1-Q10)', icon: '🕵️‍♂️' }, 
      { id: 'final_quiz', title: 'Final Boss Quiz', icon: '🎓' }
    ]
  };

  const activeSubTab = activeSubTabs[activePhase];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-xl flex flex-col">
        <div className="px-2 md:px-8 py-3 flex flex-col md:flex-row justify-between items-center gap-3 border-b border-slate-800/50">
            <div className="text-center md:text-left shrink-0">
              <div className="text-[10px] md:text-xs font-bold tracking-widest text-emerald-500 uppercase mb-1">Unit 2 • Full Masterclass</div>
              <h1 className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tracking-tight">THE DISCRETE DATA HUB</h1>
            </div>
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide py-1">
              <nav className="flex flex-nowrap gap-2 justify-start md:justify-end w-max mx-auto md:mx-0 px-2">
                  {PHASES.map(phase => (
                      <button key={phase.id} onClick={() => setActivePhase(phase.id)} className={`whitespace-nowrap px-4 py-2 rounded-xl font-black text-xs md:text-sm transition-all flex items-center gap-2 shrink-0 ${activePhase === phase.id ? 'bg-emerald-500 text-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.4)] transform scale-105' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'}`}>
                          <span>{phase.icon}</span> <span>{phase.title}</span>
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

      <main className="flex-1 max-w-6xl mx-auto w-full px-2 sm:px-4 md:px-8 py-6 md:py-12 overflow-x-hidden">
        {activePhase === 'sets' && (
          <>
            {activeSubTab === '1_basics' && <SetsBasics />}
            {activeSubTab === '2_ops' && <SetsOperations />}
            {activeSubTab === '3_subsets' && <SetsPowerSet />}
            {activeSubTab === '4_laws' && <SetsLaws />}
          </>
        )}
        {activePhase === 'relations' && <RelationsPhase activeTab={activeSubTab} />}
        {activePhase === 'functions' && (
          <>
            {activeSubTab === '1_types' && <FuncTypes />}
            {activeSubTab === '2_inverse' && <FuncInverse />}
            {activeSubTab === '3_comp' && <FuncComp />}
          </>
        )}
        {activePhase === 'exam' && <ExamPhase activeTab={activeSubTab} />}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
