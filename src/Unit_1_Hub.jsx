import React, { useState } from 'react';

// ==========================================
// MODULE 1: THE TRUTH SANDBOX (CONNECTIVES)
// ==========================================
function TruthSandbox() {
  const [p, setP] = useState(true);
  const [q, setQ] = useState(false);
  const [activeOp, setActiveOp] = useState('implication');

  const calculateResult = () => {
    switch (activeOp) {
      case 'conjunction': return p && q;
      case 'disjunction': return p || q;
      case 'negation': return !p; 
      case 'implication': return !p || q; 
      case 'biconditional': return p === q;
      default: return false;
    }
  };

  const translations = {
    conjunction: { name: "Conjunction (AND)", symbol: "P ∧ Q", code: "const result = p && q;", english: "I need BOTH to be true. 'It is raining AND I brought an umbrella.' If either one is false, the whole statement is a lie.", color: "border-blue-500", bg: "bg-blue-500/10", text: "text-blue-400" },
    disjunction: { name: "Disjunction (OR)", symbol: "P ∨ Q", code: "const result = p || q;", english: "I just need AT LEAST ONE to be true. As long as it's raining, OR I have an umbrella (or both), we are good.", color: "border-purple-500", bg: "bg-purple-500/10", text: "text-purple-400" },
    negation: { name: "Negation (NOT P)", symbol: "~P", code: "const result = !p;", english: "The opposite day operator. It just flips the truth. If it is raining (True), then 'It is NOT raining' is False.", color: "border-pink-500", bg: "bg-pink-500/10", text: "text-pink-400" },
    implication: { name: "Implication (IF P THEN Q)", symbol: "P → Q", code: "const result = !p || q;", english: "A PROMISE: 'IF it rains, THEN I will bring an umbrella.' The only way I break my promise (False) is if it DOES rain, and I FORGET my umbrella.", color: "border-emerald-500", bg: "bg-emerald-500/10", text: "text-emerald-400" },
    biconditional: { name: "Biconditional (P IFF Q)", symbol: "P ↔ Q", code: "const result = p === q;", english: "The 'Twins' operator. P and Q are tied together. They both must be True, or they both must be False.", color: "border-amber-500", bg: "bg-amber-500/10", text: "text-amber-400" }
  };
  const t = translations[activeOp];

  return (
    <div className="space-y-8 animate-fade-in font-sans">
        <header className="text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-sm font-bold tracking-widest text-emerald-400 mb-2">
            UNIT 1: MATHEMATICAL LOGIC
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            The Truth Sandbox
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Mathematical Logic isn't about memorizing tables. It's about rules for promises and conditions. Toggle the facts below and see how the logic reacts.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-3xl border-4 transition-all duration-300 ${p ? 'border-cyan-500 bg-cyan-900/20' : 'border-slate-700 bg-slate-800'}`}>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-300">Statement <span className="text-cyan-400 text-2xl">P</span></h3>
                    <div className="text-4xl">{p ? '🌧️' : '☀️'}</div>
                </div>
                <p className="text-2xl font-medium mb-6">"It is raining."</p>
                <button onClick={() => setP(!p)} className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${p ? 'bg-cyan-500 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
                    {p ? 'TRUE (It is raining)' : 'FALSE (It is not raining)'}
                </button>
            </div>

            <div className={`p-6 rounded-3xl border-4 transition-all duration-300 ${activeOp === 'negation' ? 'opacity-30 grayscale pointer-events-none' : ''} ${q ? 'border-purple-500 bg-purple-900/20' : 'border-slate-700 bg-slate-800'}`}>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-300">Statement <span className="text-purple-400 text-2xl">Q</span></h3>
                    <div className="text-4xl">{q ? '☂️' : '🤷‍♂️'}</div>
                </div>
                <p className="text-2xl font-medium mb-6">"I have an umbrella."</p>
                <button onClick={() => setQ(!q)} className={`w-full py-4 rounded-xl font-bold text-xl transition-all ${q ? 'bg-purple-500 text-slate-900 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
                    {q ? 'TRUE (I have it)' : 'FALSE (I forgot it)'}
                </button>
            </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-2xl flex flex-wrap gap-3 justify-center border border-slate-700">
            {Object.keys(translations).map(key => (
                <button key={key} onClick={() => setActiveOp(key)} className={`px-5 py-3 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeOp === key ? `bg-slate-700 text-white border-2 ${translations[key].color}` : 'bg-slate-900 border-2 border-transparent text-slate-400 hover:bg-slate-700'}`}>
                    <span className="text-xl">{translations[key].symbol.split(' ')[1] || '~'}</span>
                    {translations[key].name.split(' ')[0]}
                </button>
            ))}
        </div>

        <div className={`border-2 rounded-3xl overflow-hidden transition-all duration-500 ${t.color} ${t.bg}`}>
            <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-8 p-6 md:p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs uppercase font-bold tracking-widest text-slate-400 bg-slate-900 px-3 py-1 rounded-full">Active Connective</span>
                        <h2 className={`text-2xl font-bold ${t.text}`}>{t.name}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                            <span className="text-xs uppercase text-slate-500 font-bold tracking-widest block mb-2">Textbook Math</span>
                            <div className="text-3xl font-mono font-bold text-white tracking-widest">{t.symbol}</div>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                            <span className="text-xs uppercase text-slate-500 font-bold tracking-widest block mb-2">Developer Logic</span>
                            <div className="text-sm font-mono text-green-400">{t.code}</div>
                        </div>
                    </div>
                    <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/50">
                        <span className="text-xs uppercase text-slate-500 font-bold tracking-widest block mb-2">Semantic English</span>
                        <p className="text-lg leading-relaxed text-slate-200">{t.english}</p>
                    </div>
                </div>
                <div className="md:col-span-4 bg-slate-900 flex flex-col items-center justify-center p-8 border-t md:border-t-0 md:border-l border-slate-800 relative overflow-hidden">
                    <span className="text-sm uppercase text-slate-500 font-bold tracking-widest mb-4 z-10">Evaluated Result</span>
                    <div className={`text-6xl md:text-7xl font-black z-10 transition-all duration-500 ${calculateResult() ? 'text-green-400 drop-shadow-[0_0_30px_rgba(74,222,128,0.8)]' : 'text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]'}`}>
                        {calculateResult() ? 'TRUE' : 'FALSE'}
                    </div>
                    <div className={`absolute inset-0 opacity-20 transition-all duration-500 ${calculateResult() ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
            </div>
        </div>
    </div>
  );
}

// ==========================================
// MODULE 2: NORMAL FORMS
// ==========================================
function NormalFormsPlayground() {
  const [p, setP] = useState(true);  
  const [q, setQ] = useState(false); 
  const [r, setR] = useState(true);  

  const [mode, setMode] = useState('DNF');

  const isDNF = mode.includes('DNF');
  const isPrincipal = mode.startsWith('P');

  const dnfClauses = [
    { id: 1, items: [{ text: 'P', val: p, name: 'Ticket' }, { text: 'Q', val: q, name: 'VIP' }] }, 
    { id: 2, items: [{ text: '~P', val: !p, name: 'No Ticket' }, { text: 'R', val: r, name: 'ID' }] }, 
    { id: 3, items: [{ text: 'Q', val: q, name: 'VIP' }, { text: '~R', val: !r, name: 'No ID' }] } 
  ];

  const cnfClauses = [
    { id: 1, items: [{ text: 'P', val: p, name: 'Ticket' }, { text: 'Q', val: q, name: 'VIP' }] },
    { id: 2, items: [{ text: '~P', val: !p, name: 'No Ticket' }, { text: 'R', val: r, name: 'ID' }] },
    { id: 3, items: [{ text: 'Q', val: q, name: 'VIP' }, { text: '~R', val: !r, name: 'No ID' }] }
  ];

  const pdnfClauses = [
    { id: 1, items: [{ text: 'P', val: p, name: 'Ticket' }, { text: 'Q', val: q, name: 'VIP' }, { text: 'R', val: r, name: 'ID' }] },
    { id: 2, items: [{ text: '~P', val: !p, name: 'No Ticket' }, { text: '~Q', val: !q, name: 'Not VIP' }, { text: 'R', val: r, name: 'ID' }] },
    { id: 3, items: [{ text: 'P', val: p, name: 'Ticket' }, { text: '~Q', val: !q, name: 'Not VIP' }, { text: '~R', val: !r, name: 'No ID' }] }
  ];

  const pcnfClauses = [
    { id: 1, items: [{ text: 'P', val: p, name: 'Ticket' }, { text: 'Q', val: q, name: 'VIP' }, { text: 'R', val: r, name: 'ID' }] },
    { id: 2, items: [{ text: '~P', val: !p, name: 'No Ticket' }, { text: '~Q', val: !q, name: 'Not VIP' }, { text: 'R', val: r, name: 'ID' }] },
    { id: 3, items: [{ text: 'P', val: p, name: 'Ticket' }, { text: '~Q', val: !q, name: 'Not VIP' }, { text: '~R', val: !r, name: 'No ID' }] }
  ];

  const getActiveClauses = () => {
    switch(mode) {
        case 'DNF': return dnfClauses;
        case 'CNF': return cnfClauses;
        case 'PDNF': return pdnfClauses;
        case 'PCNF': return pcnfClauses;
        default: return dnfClauses;
    }
  };

  const activeClauses = getActiveClauses();

  const evaluateClause = (clause, evaluateAsDNF) => {
    if (evaluateAsDNF) return clause.items.every(item => item.val);
    else return clause.items.some(item => item.val);
  };

  const evaluateOverall = () => {
    if (isDNF) return activeClauses.some(clause => evaluateClause(clause, true));
    else return activeClauses.every(clause => evaluateClause(clause, false));
  };

  const overallResult = evaluateOverall();

  const getModeStyles = () => {
    if (isDNF) return { color: 'pink', border: 'border-pink-500', bg: 'bg-pink-500', text: 'text-pink-400', lightBg: 'bg-pink-900/10' };
    return { color: 'blue', border: 'border-blue-500', bg: 'bg-blue-500', text: 'text-blue-400', lightBg: 'bg-blue-900/10' };
  };

  const styles = getModeStyles();

  return (
    <div className="space-y-8 animate-fade-in font-sans">
        <header className="text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-sm font-bold tracking-widest text-pink-400 mb-2">
            UNIT 1: NORMAL FORMS
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500">
            The Logic Circuit Board
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explore standard forms vs. the strict "Principal" forms where completeness is mandatory.
          </p>
        </header>

        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-center">
                <div className="text-slate-400 font-bold mb-2 uppercase tracking-widest text-sm">Statement P</div>
                <button onClick={() => setP(!p)} className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all flex flex-col items-center gap-2 w-32 ${p ? 'bg-cyan-500 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
                    <span className="text-3xl">🎫</span>{p ? 'TRUE' : 'FALSE'}
                </button>
            </div>
            <div className="text-center">
                <div className="text-slate-400 font-bold mb-2 uppercase tracking-widest text-sm">Statement Q</div>
                <button onClick={() => setQ(!q)} className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all flex flex-col items-center gap-2 w-32 ${q ? 'bg-purple-500 text-slate-900 shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
                    <span className="text-3xl">🌟</span>{q ? 'TRUE' : 'FALSE'}
                </button>
            </div>
            <div className="text-center">
                <div className="text-slate-400 font-bold mb-2 uppercase tracking-widest text-sm">Statement R</div>
                <button onClick={() => setR(!r)} className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all flex flex-col items-center gap-2 w-32 ${r ? 'bg-emerald-500 text-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
                    <span className="text-3xl">🪪</span>{r ? 'TRUE' : 'FALSE'}
                </button>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <button onClick={() => setMode('DNF')} className={`p-4 rounded-xl font-bold transition-all border-2 ${mode === 'DNF' ? 'bg-pink-500 border-pink-500 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
                DNF (Standard)
            </button>
            <button onClick={() => setMode('PDNF')} className={`p-4 rounded-xl font-bold transition-all border-2 ${mode === 'PDNF' ? 'bg-pink-500 border-pink-500 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
                PDNF (Principal)
            </button>
            <button onClick={() => setMode('CNF')} className={`p-4 rounded-xl font-bold transition-all border-2 ${mode === 'CNF' ? 'bg-blue-500 border-blue-500 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
                CNF (Standard)
            </button>
            <button onClick={() => setMode('PCNF')} className={`p-4 rounded-xl font-bold transition-all border-2 ${mode === 'PCNF' ? 'bg-blue-500 border-blue-500 text-white shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}>
                PCNF (Principal)
            </button>
        </div>

        <div className={`p-8 rounded-3xl border-4 transition-all duration-500 ${styles.border} ${styles.lightBg}`}>
            <div className="mb-8 text-center space-y-3">
                <h2 className="text-2xl font-bold text-white mb-2">
                    {mode === 'DNF' && 'Disjunctive Normal Form'}
                    {mode === 'PDNF' && 'Principal Disjunctive Normal Form (Sum of Minterms)'}
                    {mode === 'CNF' && 'Conjunctive Normal Form'}
                    {mode === 'PCNF' && 'Principal Conjunctive Normal Form (Product of Maxterms)'}
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    {isDNF 
                        ? 'PARALLEL PATHS: You just need ONE entire card to be fully true to complete the circuit.'
                        : 'SECURITY CHECKPOINTS: You must pass EVERY card to complete the circuit.'}
                </p>
                {isPrincipal && (
                    <div className="inline-block bg-amber-500/20 border border-amber-500 text-amber-300 px-4 py-2 rounded-lg font-bold text-sm animate-pulse">
                        ⚠️ PRINCIPAL RULE ACTIVE: Look closely! Every single clause now contains P, Q, and R. 
                    </div>
                )}
            </div>

            <div className={`flex flex-col md:flex-row gap-6 justify-center items-stretch ${!isDNF ? 'items-center' : ''}`}>
                {activeClauses.map((clause, index) => {
                    const isClauseTrue = evaluateClause(clause, isDNF);
                    return (
                        <React.Fragment key={clause.id}>
                            <div className={`flex-1 p-6 rounded-2xl border-2 transition-all duration-300 relative
                                ${isClauseTrue ? 'border-green-500 bg-green-900/20 shadow-[0_0_30px_rgba(34,197,94,0.15)]' : 'border-slate-700 bg-slate-800/80 opacity-70'}`}
                            >
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 px-3 border border-slate-700 rounded-full text-xs font-bold text-slate-400 tracking-widest whitespace-nowrap">
                                    {isPrincipal ? (isDNF ? 'Minterm (AND)' : 'Maxterm (OR)') : (isDNF ? 'AND Group' : 'OR Group')}
                                </div>
                                <div className="flex flex-col gap-3">
                                    {clause.items.map((item, i) => (
                                        <React.Fragment key={i}>
                                            <div className={`p-3 rounded-lg flex justify-between items-center border transition-all
                                                ${item.val ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}
                                            >
                                                <span className="font-mono font-bold text-lg">{item.text}</span>
                                                <span className="text-sm opacity-80">{item.name}</span>
                                            </div>
                                            {i < clause.items.length - 1 && (
                                                <div className="text-center text-slate-500 font-bold text-sm">
                                                    {isDNF ? 'AND (∧)' : 'OR (∨)'}
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className={`mt-4 pt-4 border-t border-slate-700 text-center font-bold text-lg
                                    ${isClauseTrue ? 'text-green-400' : 'text-slate-500'}`}>
                                    {isClauseTrue ? '✓ Clause True' : '✗ Clause False'}
                                </div>
                            </div>
                            
                            {/* The Connective between clauses */}
                            {index < activeClauses.length - 1 && (
                                <div className="hidden md:flex flex-col justify-center items-center px-4">
                                    <div className="w-12 h-1 bg-slate-700"></div>
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl border-4 bg-slate-800 ${styles.border} ${styles.text}`}>
                                        {isDNF ? 'OR' : 'AND'}
                                    </div>
                                    <div className="w-12 h-1 bg-slate-700"></div>
                                </div>
                            )}
                            
                            {/* Mobile connective */}
                            {index < activeClauses.length - 1 && (
                                <div className="md:hidden flex justify-center py-4">
                                    <div className={`px-6 py-2 rounded-full font-bold border-2 bg-slate-800 ${styles.border} ${styles.text}`}>
                                        {isDNF ? 'OR (∨)' : 'AND (∧)'}
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Final Outcome */}
            <div className="mt-12 text-center">
                <div className="inline-block relative max-w-[95%] md:max-w-full">
                    <div className={`absolute inset-0 blur-2xl transition-all duration-700 ${overallResult ? 'bg-green-500 opacity-40' : 'bg-red-500 opacity-20'}`}></div>
                    <div className={`relative px-4 md:px-12 py-6 rounded-3xl border-4 transition-all duration-500 backdrop-blur-sm
                        ${overallResult ? 'border-green-400 bg-green-900/30' : 'border-red-500 bg-red-900/30'}`}
                    >
                        <h3 className="text-sm uppercase tracking-widest text-slate-400 font-bold mb-2">Final Circuit Output</h3>
                        <div className={`text-2xl sm:text-3xl md:text-5xl font-black ${overallResult ? 'text-green-400' : 'text-red-500'}`}>
                            {overallResult ? 'CIRCUIT COMPLETE (TRUE)' : 'CIRCUIT BROKEN (FALSE)'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

// ==========================================
// MODULE 3: INFERENCE DETECTIVE BOARD
// ==========================================
function InferencePlayground() {
  const [activeRule, setActiveRule] = useState('modus_ponens');
  const [evidenceGathered, setEvidenceGathered] = useState(false);

  const rules = {
    modus_ponens: {
      name: 'Modus Ponens', nickname: 'The Direct Cause', math: 'P → Q, P ⊢ Q',
      code: 'if (pCausesQ && pIsTrue) { return qIsTrue; }',
      p1: { symbol: 'P → Q', text: 'IF it is raining, THEN the ground is wet.', icon: '🌧️ ➡️ 🌊' },
      p2: { symbol: 'P', text: 'Look outside! It IS raining.', icon: '🌧️' },
      conclusion: { symbol: 'Q', text: 'Therefore, the ground MUST be wet.', icon: '🌊' },
      explanation: 'The most basic form of logic. If you know a rule is true (P causes Q), and the trigger happens (P), the result (Q) is guaranteed.',
      color: 'blue'
    },
    modus_tollens: {
      name: 'Modus Tollens', nickname: 'The Reverse Alibi', math: 'P → Q, ~Q ⊢ ~P',
      code: 'if (pCausesQ && !qIsTrue) { return !pIsTrue; }',
      p1: { symbol: 'P → Q', text: 'IF the dog ate the steak, THEN the dog is not hungry.', icon: '🥩 ➡️ 🐶💤' },
      p2: { symbol: '~Q', text: 'The dog is begging for food (It IS hungry).', icon: '🐶🍖' },
      conclusion: { symbol: '~P', text: 'Therefore, the dog DID NOT eat the steak.', icon: '🚫🥩' },
      explanation: 'Working backwards! If P always causes Q, but Q didn\'t happen... then P couldn\'t have happened either. A perfect detective tool.',
      color: 'purple'
    },
    hypothetical_syllogism: {
      name: 'Hypothetical Syllogism', nickname: 'The Chain Reaction', math: 'P → Q, Q → R ⊢ P → R',
      code: 'if (pCausesQ && qCausesR) { return pCausesR; }',
      p1: { symbol: 'P → Q', text: 'IF I oversleep, THEN I miss the bus.', icon: '😴 ➡️ 🚌💨' },
      p2: { symbol: 'Q → R', text: 'IF I miss the bus, THEN I am late for class.', icon: '🚌💨 ➡️ ⏰⚠️' },
      conclusion: { symbol: 'P → R', text: 'Therefore, IF I oversleep, THEN I am late for class.', icon: '😴 ➡️ ⏰⚠️' },
      explanation: 'Cutting out the middleman. If Event A causes Event B, and Event B causes Event C, then A indirectly causes C. This is how algorithms chain functions together.',
      color: 'emerald'
    },
    disjunctive_syllogism: {
      name: 'Disjunctive Syllogism', nickname: 'Process of Elimination', math: 'P ∨ Q, ~P ⊢ Q',
      code: 'if ((p || q) && !p) { return q; }',
      p1: { symbol: 'P ∨ Q', text: 'The keys are EITHER in my pocket OR on the table.', icon: '👖 ❓ 🪑' },
      p2: { symbol: '~P', text: 'I checked my pocket. They are NOT there.', icon: '🚫👖' },
      conclusion: { symbol: 'Q', text: 'Therefore, the keys MUST be on the table.', icon: '🪑🔑' },
      explanation: 'Sherlock Holmes logic: "When you have eliminated the impossible, whatever remains, however improbable, must be the truth." If it has to be A or B, and it\'s not A, it\'s B.',
      color: 'amber'
    }
  };

  const currentCase = rules[activeRule];

  const getColorClasses = (color) => {
    const map = {
      blue: { border: 'border-blue-500', bg: 'bg-blue-500/20', text: 'text-blue-400', button: 'bg-blue-600 hover:bg-blue-500 text-white' },
      purple: { border: 'border-purple-500', bg: 'bg-purple-500/20', text: 'text-purple-400', button: 'bg-purple-600 hover:bg-purple-500 text-white' },
      emerald: { border: 'border-emerald-500', bg: 'bg-emerald-500/20', text: 'text-emerald-400', button: 'bg-emerald-600 hover:bg-emerald-500 text-white' },
      amber: { border: 'border-amber-500', bg: 'bg-amber-500/20', text: 'text-amber-400', button: 'bg-amber-600 hover:bg-amber-500 text-white' }
    };
    return map[color];
  };

  const styles = getColorClasses(currentCase.color);

  const handleRuleChange = (key) => {
    setActiveRule(key);
    setEvidenceGathered(false); 
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
        <header className="text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-sm font-bold tracking-widest text-indigo-400 mb-2">
            UNIT 1: THEORY OF INFERENCE
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            The Inference Detective Board
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A valid argument is a solid chain of evidence. Select a mathematical rule of inference below to see how logical deductions are made without truth tables.
          </p>
        </header>

        <div className="flex flex-wrap gap-4 justify-center">
          {Object.entries(rules).map(([key, rule]) => (
            <button
              key={key}
              onClick={() => handleRuleChange(key)}
              className={`px-6 py-4 rounded-xl font-bold transition-all border-2 text-left flex flex-col items-start
                ${activeRule === key 
                  ? `${getColorClasses(rule.color).border} ${getColorClasses(rule.color).bg} ${getColorClasses(rule.color).text} shadow-lg` 
                  : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              <span className="text-xs uppercase tracking-widest opacity-70 mb-1">{rule.nickname}</span>
              <span className="text-lg">{rule.name}</span>
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-0 border-2 rounded-2xl overflow-hidden ${styles.border}`}>
            <div className="bg-slate-900 p-4 border-b md:border-b-0 md:border-r border-slate-700">
                <span className="text-xs uppercase font-bold tracking-widest text-slate-500 block mb-1">Mathematical Form</span>
                <div className={`text-2xl font-mono font-bold ${styles.text}`}>{currentCase.math}</div>
            </div>
            <div className="bg-slate-900 p-4 border-b md:border-b-0 md:border-r border-slate-700">
                <span className="text-xs uppercase font-bold tracking-widest text-slate-500 block mb-1">Developer Logic</span>
                <div className="text-sm font-mono text-green-400 overflow-x-auto whitespace-nowrap">{currentCase.code}</div>
            </div>
            <div className="bg-slate-800 p-4 flex items-center">
                <p className="text-sm text-slate-300 leading-relaxed font-medium">{currentCase.explanation}</p>
            </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-50"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-6">
                    <h3 className="text-xl font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center">
                        <span className="mr-2">📁</span> The Evidence (Premises)
                    </h3>
                    <div className="bg-slate-900 p-6 rounded-2xl border-l-4 border-slate-600 shadow-md transform transition hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-2">
                            <span className="bg-slate-800 text-slate-400 text-xs font-mono px-2 py-1 rounded">Premise 1</span>
                            <span className={`font-mono font-bold text-lg ${styles.text}`}>{currentCase.p1.symbol}</span>
                        </div>
                        <div className="text-4xl mb-3">{currentCase.p1.icon}</div>
                        <p className="text-lg font-medium text-white">{currentCase.p1.text}</p>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl border-l-4 border-slate-600 shadow-md transform transition hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-2">
                            <span className="bg-slate-800 text-slate-400 text-xs font-mono px-2 py-1 rounded">Premise 2</span>
                            <span className={`font-mono font-bold text-lg ${styles.text}`}>{currentCase.p2.symbol}</span>
                        </div>
                        <div className="text-4xl mb-3">{currentCase.p2.icon}</div>
                        <p className="text-lg font-medium text-white">{currentCase.p2.text}</p>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col justify-center items-center py-8">
                    {!evidenceGathered ? (
                        <button 
                            onClick={() => setEvidenceGathered(true)}
                            className={`px-6 py-6 rounded-full font-bold text-lg shadow-xl transition-all hover:scale-105 active:scale-95 animate-pulse ${styles.button}`}
                        >
                            Deduce Fact 🔎
                        </button>
                    ) : (
                        <div className={`flex flex-col items-center animate-fade-in text-3xl ${styles.text}`}>
                            <div>⊢</div>
                            <div className="h-16 w-1 border-l-2 border-dashed my-2 border-current"></div>
                            <div>↓</div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-5">
                    <div className={`transition-all duration-700 ease-in-out transform ${evidenceGathered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'}`}>
                        <h3 className="text-xl font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center">
                            <span className="mr-2">⚖️</span> The Verdict (Conclusion)
                        </h3>
                        
                        <div className={`bg-slate-900 p-8 rounded-3xl border-2 shadow-[0_0_40px_rgba(0,0,0,0.5)] ${styles.border}`}>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${styles.bg} ${styles.text}`}>Valid Deduction</span>
                                <span className={`font-mono font-bold text-2xl ${styles.text}`}>∴ {currentCase.conclusion.symbol}</span>
                            </div>
                            <div className="text-6xl mb-6 text-center animate-bounce">{currentCase.conclusion.icon}</div>
                            <p className="text-2xl font-bold text-white text-center leading-tight">
                                {currentCase.conclusion.text}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

// ==========================================
// MODULE 4: PREDICATE SANDBOX
// ==========================================
function PredicateSandbox() {
  const robots = [
    { id: 1, name: 'Unit-Alpha', status: 'online', isFlying: true, type: 'drone', icon: '🛸' },
    { id: 2, name: 'Unit-Beta', status: 'online', isFlying: false, type: 'rover', icon: '🚜' },
    { id: 3, name: 'Unit-Gamma', status: 'offline', isFlying: false, type: 'rover', icon: '🪫' },
    { id: 4, name: 'Unit-Delta', status: 'online', isFlying: true, type: 'drone', icon: '🛸' }
  ];

  const [quantifier, setQuantifier] = useState('universal');
  const [predicate, setPredicate] = useState('isOnline');

  const predicates = {
    isOnline: { name: 'isOnline(x)', desc: 'Robot x is currently online.', test: (r) => r.status === 'online', color: 'emerald' },
    isFlying: { name: 'isFlying(x)', desc: 'Robot x has flying capabilities.', test: (r) => r.isFlying === true, color: 'cyan' },
    isRover: { name: 'isRover(x)', desc: 'Robot x is a ground-based rover.', test: (r) => r.type === 'rover', color: 'amber' }
  };

  const activePred = predicates[predicate];
  const evaluateOverall = () => {
    if (quantifier === 'universal') return robots.every(activePred.test);
    else return robots.some(activePred.test);
  };
  const overallResult = evaluateOverall();

  const getColorClasses = (color) => {
    const map = {
      emerald: { border: 'border-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/20' },
      cyan: { border: 'border-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/20' },
      amber: { border: 'border-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/20' }
    };
    return map[color];
  };
  const styles = getColorClasses(activePred.color);

  return (
    <div className="space-y-8 animate-fade-in font-sans">
        <header className="text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-sm font-bold tracking-widest text-fuchsia-400 mb-2">
            UNIT 1: PREDICATE CALCULUS
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-orange-400">
            The Quantifier Sandbox
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Static statements aren't enough for data. We need to evaluate groups. Toggle the Quantifiers (All vs Some) and Predicates (Functions) to test our Robot Server.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
                <h3 className="text-slate-400 font-bold mb-4 uppercase tracking-widest text-sm border-b border-slate-700 pb-2">1. Select Quantifier</h3>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => setQuantifier('universal')}
                        className={`p-4 rounded-xl flex items-center gap-4 transition-all border-2
                            ${quantifier === 'universal' ? 'border-fuchsia-500 bg-fuchsia-500/10 text-white' : 'border-slate-700 hover:border-slate-500 text-slate-400'}`}
                    >
                        <div className="text-4xl font-serif text-fuchsia-400">∀</div>
                        <div className="text-left">
                            <div className="font-bold text-lg">Universal (For All)</div>
                            <div className="text-sm opacity-80 font-mono">robots.every(robot =&gt; ...)</div>
                        </div>
                    </button>
                    <button 
                        onClick={() => setQuantifier('existential')}
                        className={`p-4 rounded-xl flex items-center gap-4 transition-all border-2
                            ${quantifier === 'existential' ? 'border-orange-500 bg-orange-500/10 text-white' : 'border-slate-700 hover:border-slate-500 text-slate-400'}`}
                    >
                        <div className="text-4xl font-serif text-orange-400">∃</div>
                        <div className="text-left">
                            <div className="font-bold text-lg">Existential (There Exists)</div>
                            <div className="text-sm opacity-80 font-mono">robots.some(robot =&gt; ...)</div>
                        </div>
                    </button>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
                <h3 className="text-slate-400 font-bold mb-4 uppercase tracking-widest text-sm border-b border-slate-700 pb-2">2. Select Predicate P(x)</h3>
                <div className="flex flex-col gap-3">
                    {Object.keys(predicates).map(key => (
                        <button 
                            key={key}
                            onClick={() => setPredicate(key)}
                            className={`p-3 rounded-xl flex items-center justify-between transition-all border-2
                                ${predicate === key ? `${getColorClasses(predicates[key].color).border} ${getColorClasses(predicates[key].color).bg} text-white` : 'border-slate-700 hover:border-slate-500 text-slate-400'}`}
                        >
                            <span className="font-mono font-bold">{predicates[key].name}</span>
                            <span className="text-sm">{predicates[key].desc}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden text-center shadow-lg">
            <div className="bg-slate-800 py-3 text-xs uppercase tracking-widest font-bold text-slate-400 border-b border-slate-700">
                The Logical Formula
            </div>
            <div className="p-6 flex flex-col md:flex-row justify-center items-center gap-6">
                <div className="text-5xl font-serif flex items-center gap-4">
                    <span className={quantifier === 'universal' ? 'text-fuchsia-400' : 'text-orange-400'}>
                        {quantifier === 'universal' ? '∀x' : '∃x'}
                    </span> 
                    <span className={styles.text}>{activePred.name}</span>
                </div>
                <div className="text-xl text-slate-400 font-medium max-w-md border-l-2 border-slate-700 pl-6">
                    "{quantifier === 'universal' ? 'For EVERY robot x in the server' : 'There exists AT LEAST ONE robot x in the server'} such that {activePred.desc.toLowerCase().replace('.', '')}."
                </div>
            </div>
        </div>

        <div className={`p-8 rounded-3xl border-4 transition-all duration-500 bg-slate-800 ${overallResult ? 'border-green-500/50' : 'border-red-500/50'}`}>
            <h3 className="text-xl font-bold text-slate-300 uppercase tracking-widest mb-6 text-center">
                Domain of Discourse (The Server)
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {robots.map((robot) => {
                    const passesTest = activePred.test(robot);
                    return (
                        <div key={robot.id} className={`relative p-6 rounded-2xl border-2 flex flex-col items-center transition-all duration-300 transform
                            ${passesTest ? `border-green-500 bg-green-900/20 scale-105 shadow-[0_0_20px_rgba(34,197,94,0.2)]` : 'border-slate-700 bg-slate-900 opacity-60'}`}
                        >
                            <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white border-2 border-slate-900 shadow-md
                                ${passesTest ? 'bg-green-500' : 'bg-red-500'}`}>
                                {passesTest ? '✓' : '✗'}
                            </div>
                            <div className="text-5xl mb-3">{robot.icon}</div>
                            <div className="font-mono font-bold text-sm text-slate-300 mb-2">{robot.name}</div>
                            
                            <div className="text-xs space-y-1 w-full text-left bg-slate-800 p-2 rounded text-slate-400 font-mono">
                                <div>status: <span className={robot.status === 'online' ? 'text-emerald-400' : 'text-red-400'}>{robot.status}</span></div>
                                <div>fly: <span className={robot.isFlying ? 'text-cyan-400' : 'text-slate-500'}>{robot.isFlying.toString()}</span></div>
                                <div>type: <span className="text-amber-400">{robot.type}</span></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-10 flex flex-col items-center">
                <div className={`px-12 py-4 rounded-full border-4 font-black text-3xl shadow-2xl transition-all duration-500
                    ${overallResult ? 'bg-green-900/80 border-green-400 text-green-300' : 'bg-red-900/80 border-red-500 text-red-300'}`}
                >
                    {overallResult ? 'STATEMENT IS TRUE' : 'STATEMENT IS FALSE'}
                </div>
                <div className="mt-4 text-slate-400 font-medium text-center max-w-lg">
                    {overallResult 
                        ? (quantifier === 'universal' ? "Because EVERY robot passed the test." : "Because AT LEAST ONE robot passed the test.")
                        : (quantifier === 'universal' ? "Because AT LEAST ONE robot FAILED the test. (A counter-example exists!)" : "Because NO robot passed the test.")}
                </div>
            </div>
        </div>
    </div>
  );
}

// ==========================================
// MODULE 5: MACRO-MICRO SCOPE & QUIZ
// ==========================================
function MacroMicroScope() {
  const [activeRule, setActiveRule] = useState('UI');
  const [isZooming, setIsZooming] = useState(false);
  
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [proofStep, setProofStep] = useState(0);
  const [feedback, setFeedback] = useState({ text: '', type: '' });

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const rules = {
    UI: { id: 'UI', name: 'Universal Instantiation', math: '∀x P(x) ⊢ P(c)', code: 'if (robots.every(isOnline)) { return isOnline(alpha); }', english: 'Zooming IN: If a rule applies to absolutely EVERYONE, pick ANY specific robot (Alpha) and it applies to them.', fromIcon: '🤖🤖🤖🤖', toIcon: '🤖 (Alpha)', color: 'fuchsia', type: 'Macro to Micro' },
    EG: { id: 'EG', name: 'Existential Generalization', math: 'P(c) ⊢ ∃x P(x)', code: 'if (isOnline(alpha)) { return robots.some(isOnline); }', english: 'Zooming OUT: If ONE specific robot (Alpha) is online, conclude that "AT LEAST ONE" robot in the server is online.', fromIcon: '🤖 (Alpha)', toIcon: '❓🤖❓🤖', color: 'orange', type: 'Micro to Macro' },
    EI: { id: 'EI', name: 'Existential Instantiation', math: '∃x P(x) ⊢ P(c) [c = NEW name]', code: 'if (robots.some(hasVirus)) { const suspect1 = robots.find(hasVirus); }', english: 'The Detective: SOME robot has a virus. Assign a temporary placeholder ("Suspect C") to represent them.', fromIcon: '⚠️🤖⚠️🤖', toIcon: '🕵️ (Suspect C)', color: 'amber', type: 'Macro to Micro (Unknown)' },
    UG: { id: 'UG', name: 'Universal Generalization', math: 'P(c) [c = arbitrary] ⊢ ∀x P(x)', code: 'function test(c) { return isValid(c); }', english: 'The Proof Maker: Prove it for a completely generic, random robot "c", and it logically applies to EVERY robot.', fromIcon: '⚪ (Generic C)', toIcon: '✅✅✅✅', color: 'emerald', type: 'Micro (Generic) to Macro' }
  };

  const currentRule = rules[activeRule];

  const getColors = (color) => {
    const map = {
      fuchsia: { border: 'border-fuchsia-500', text: 'text-fuchsia-400', bg: 'bg-fuchsia-500', lightBg: 'bg-fuchsia-900/20' },
      orange: { border: 'border-orange-500', text: 'text-orange-400', bg: 'bg-orange-500', lightBg: 'bg-orange-900/20' },
      amber: { border: 'border-amber-500', text: 'text-amber-400', bg: 'bg-amber-500', lightBg: 'bg-amber-900/20' },
      emerald: { border: 'border-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500', lightBg: 'bg-emerald-900/20' }
    };
    return map[color];
  };

  const styles = getColors(currentRule.color);

  const triggerZoom = (key) => {
    if (key === activeRule) return;
    setIsZooming(true);
    setActiveRule(key);
    setTimeout(() => setIsZooming(false), 500);
  };

  const proofCases = [
    {
      id: 'case1', title: 'Case #001: The Flying Drone', focus: 'UI', color: 'text-fuchsia-400',
      scenario: 'All drones fly. Alpha is a drone. Prove mathematically that Alpha flies.',
      premises: [{ text: '∀x (Drone(x) → Fly(x))', reason: 'Premise 1 (All drones fly)' }, { text: 'Drone(Alpha)', reason: 'Premise 2 (Alpha is a drone)' }],
      steps: [
        { expected: 'UI', options: ['EG', 'UI', 'EI', 'UG'], prompt: 'Step 1: Remove the Universal Quantifier (∀x) from Premise 1 so we can talk specifically about Alpha.', result: 'Drone(Alpha) → Fly(Alpha)', ruleName: 'UI (on 1)' },
        { expected: 'Modus Ponens', options: ['Modus Tollens', 'Modus Ponens', 'Conjunction', 'Disjunctive Syl.'], prompt: 'Step 2: We know "Drone(Alpha)" and "Drone(Alpha) → Fly(Alpha)". What rule proves "Fly(Alpha)"?', result: 'Fly(Alpha)', ruleName: 'Modus Ponens (on 2, 3)' }
      ]
    },
    {
      id: 'case2', title: 'Case #002: The Camera Evidence', focus: 'EG', color: 'text-orange-400',
      scenario: 'Beta is a rover. Beta has a camera. Prove that "At least one rover has a camera".',
      premises: [{ text: 'Rover(Beta)', reason: 'Premise 1 (Beta is a rover)' }, { text: 'Camera(Beta)', reason: 'Premise 2 (Beta has a camera)' }],
      steps: [
        { expected: 'Conjunction (Conj)', options: ['Modus Ponens', 'Conjunction (Conj)', 'Addition', 'Simplification'], prompt: 'Step 1: We need to combine Premise 1 and 2 into a single statement using an AND (∧).', result: 'Rover(Beta) ∧ Camera(Beta)', ruleName: 'Conjunction (on 1, 2)' },
        { expected: 'EG', options: ['EG', 'UI', 'EI', 'UG'], prompt: 'Step 2: We proved a specific robot (Beta) fits both criteria. What rule lets us generalize this to "∃x"?', result: '∃x (Rover(x) ∧ Camera(x))', ruleName: 'EG (on 3)' }
      ]
    },
    {
      id: 'case3', title: 'Case #003: The Anonymous Hacker', focus: 'EI', color: 'text-amber-400',
      scenario: 'Someone hacked the server. Hackers always leave traces. Prove that SOMEONE left a trace.',
      premises: [{ text: '∃x Hacker(x)', reason: 'Premise 1 (Someone is a hacker)' }, { text: '∀x (Hacker(x) → Trace(x))', reason: 'Premise 2 (All hackers leave traces)' }],
      steps: [
        { expected: 'EI', options: ['EG', 'UI', 'EI', 'UG'], prompt: 'Step 1: We know SOMEONE hacked it (Premise 1). Assign them a temporary placeholder name "c" (Suspect C).', result: 'Hacker(c)', ruleName: 'EI (on 1) [c is a new suspect]' },
        { expected: 'UI', options: ['EG', 'UI', 'EI', 'UG'], prompt: 'Step 2: Apply the universal rule (Premise 2) specifically to our new Suspect "c".', result: 'Hacker(c) → Trace(c)', ruleName: 'UI (on 2)' },
        { expected: 'Modus Ponens', options: ['Modus Tollens', 'Modus Ponens', 'Conjunction', 'Disjunctive Syl.'], prompt: 'Step 3: Combine "Hacker(c)" and "Hacker(c) → Trace(c)" to prove Suspect c left a trace.', result: 'Trace(c)', ruleName: 'Modus Ponens (on 3, 4)' },
        { expected: 'EG', options: ['EG', 'UI', 'EI', 'UG'], prompt: 'Step 4: We proved Suspect c left a trace. Now turn this back into the general statement "Someone left a trace (∃x)".', result: '∃x Trace(x)', ruleName: 'EG (on 5)' }
      ]
    },
    {
      id: 'case4', title: 'Case #004: The Battery Law', focus: 'UG', color: 'text-emerald-400',
      scenario: 'Every robot requires power. If it requires power, it has a battery. Prove EVERY robot has a battery.',
      premises: [{ text: '∀x Power(x)', reason: 'Premise 1 (All need power)' }, { text: '∀x (Power(x) → Battery(x))', reason: 'Premise 2 (Power implies battery)' }],
      steps: [
        { expected: 'UI', options: ['EG', 'UI', 'EI', 'UG'], prompt: 'Step 1: Pick a completely random, generic robot "c". Apply Premise 1 to it.', result: 'Power(c)', ruleName: 'UI (on 1) [c is an arbitrary robot]' },
        { expected: 'UI', options: ['EG', 'UI', 'EI', 'UG'], prompt: 'Step 2: Now apply Premise 2 to that exact same generic robot "c".', result: 'Power(c) → Battery(c)', ruleName: 'UI (on 2)' },
        { expected: 'Modus Ponens', options: ['Modus Tollens', 'Modus Ponens', 'Conjunction', 'Disjunctive Syl.'], prompt: 'Step 3: Combine lines 3 and 4 to prove that our generic robot "c" has a battery.', result: 'Battery(c)', ruleName: 'Modus Ponens (on 3, 4)' },
        { expected: 'UG', options: ['EG', 'UI', 'EI', 'UG'], prompt: 'Step 4: Since we proved "c" has a battery, and "c" was completely random... what rule lets us say ALL robots have batteries?', result: '∀x Battery(x)', ruleName: 'UG (on 5)' }
      ]
    }
  ];

  const activeCase = proofCases[activeCaseIndex];

  const handleCaseSwitch = (index) => {
      setActiveCaseIndex(index);
      setProofStep(0);
      setFeedback({ text: '', type: '' });
  };

  const handleProofGuess = (guess) => {
      const currentExpected = activeCase.steps[proofStep].expected;

      if (guess === currentExpected) {
          if (proofStep === activeCase.steps.length - 1) {
              setProofStep(proofStep + 1);
              setFeedback({ text: 'Excellent! Case completely solved!', type: 'success' });
          } else {
              setProofStep(proofStep + 1);
              setFeedback({ text: 'Correct deduction! Proceed to the next step.', type: 'success' });
          }
      } else {
          setFeedback({ text: 'Incorrect deduction. Review the premises and try again.', type: 'error' });
      }
  };

  const quizQuestions = [
    { question: "In Statement Calculus, if Statement P is False, and Statement Q is True, what is the overall truth value of P → Q (Implication)?", options: ["False", "True", "Cannot be determined", "Depends on normal form"], correct: 1, explanation: "True! Remember the 'Promise' mental model. If the condition (P) didn't happen, the promise wasn't broken. An implication is only False when P is True and Q is False." },
    { question: "What strict rule makes a Normal Form a 'Principal' Normal Form (like PDNF or PCNF)?", options: ["It must only use the AND operator.", "It must evaluate to True for every input.", "Every clause MUST contain every single variable in the domain.", "It can only have a maximum of two clauses."], correct: 2, explanation: "Correct! Principal Normal Forms are canonical (unique). To achieve this, every minterm (or maxterm) must include every variable (e.g., P, Q, and R), either normal or negated." },
    { question: "Which Rule of Inference matches this structure: P → Q, ~Q ⊢ ~P ?", options: ["Modus Ponens", "Disjunctive Syllogism", "Hypothetical Syllogism", "Modus Tollens"], correct: 3, explanation: "Modus Tollens (The Reverse Alibi). If P causes Q, and we know Q did NOT happen, then P could not have possibly happened." },
    { question: "You have the premise: ∃x Hacker(x). You want to use Existential Instantiation (EI) to investigate. What is the CRITICAL rule you must follow?", options: ["You must assign it to a known entity, like 'User5'.", "You must invent a completely new, fake placeholder name (like 'c').", "You must change the ∃ to a ∀.", "You must first prove that Modus Ponens applies."], correct: 1, explanation: "Exactly! Because we only know 'someone' exists (we don't know who), we cannot arbitrarily pin it on a known person. We must use a new placeholder 'c' (Suspect C)." },
    { question: "If you successfully prove a trait for a completely generic, arbitrary robot 'c' without knowing any specific details about it, what rule allows you to conclude ALL robots have this trait?", options: ["Existential Generalization (EG)", "Universal Instantiation (UI)", "Universal Generalization (UG)", "Existential Instantiation (EI)"], correct: 2, explanation: "Universal Generalization (UG). If a proof works for a totally arbitrary 'x', it logically works for 'For All x' (∀x)." }
  ];

  const handleQuizAnswer = (index) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(index);
  };

  const checkQuizAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerChecked(true);
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  return (
    <div className="space-y-16 animate-fade-in font-sans">
        
        {/* --- TOP SECTION (Scope Visualizer) --- */}
        <header className="text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-slate-700 text-sm font-bold tracking-widest text-white mb-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            UNIT 1 FINALE: PREDICATE INFERENCE
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-emerald-400">
            The Macro-Micro Scope
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            How do we legally move between statements about "EVERYONE", "SOMEONE", and "SPECIFIC PEOPLE"? Select a rule of inference below to see the logical zoom in action.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(rules).map((rule) => {
            const ruleStyles = getColors(rule.color);
            const isActive = activeRule === rule.id;
            return (
              <button key={rule.id} onClick={() => triggerZoom(rule.id)}
                className={`p-5 rounded-2xl text-left transition-all border-2 duration-300 relative overflow-hidden
                  ${isActive ? `${ruleStyles.border} ${ruleStyles.lightBg} transform scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]` : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                {isActive && <div className={`absolute top-0 left-0 w-full h-1 ${ruleStyles.bg}`}></div>}
                <div className={`text-sm font-bold tracking-widest uppercase mb-1 ${isActive ? ruleStyles.text : 'text-slate-500'}`}>{rule.id}</div>
                <div className="font-bold text-lg mb-2 text-white">{rule.name}</div>
                <div className="text-xs font-mono bg-slate-900/50 p-2 rounded text-center opacity-80">{rule.math}</div>
              </button>
            );
          })}
        </div>

        <div className={`p-8 md:p-12 rounded-3xl border-4 transition-all duration-500 relative overflow-hidden shadow-2xl ${styles.border} ${styles.lightBg}`}>
            <div className="absolute top-4 right-6 text-sm font-bold tracking-widest uppercase opacity-50 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-ping bg-current"></span> {currentRule.type} Scope Active
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-6">
                <div className={`md:col-span-5 flex flex-col items-center text-center transition-all duration-500 ${isZooming ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'}`}>
                    <div className={`text-6xl mb-6 drop-shadow-lg ${styles.text}`}>{currentRule.fromIcon}</div>
                    <div className="font-mono text-xl font-bold bg-slate-900 px-6 py-3 rounded-xl border border-slate-700 shadow-inner">{currentRule.math.split('⊢')[0].trim()}</div>
                </div>
                <div className={`md:col-span-2 flex flex-col items-center justify-center transition-all duration-500 ${isZooming ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold border-4 ${styles.border} ${styles.bg} text-slate-900 shadow-[0_0_30px_rgba(255,255,255,0.2)]`}>⊢</div>
                </div>
                <div className={`md:col-span-5 flex flex-col items-center text-center transition-all duration-500 ${isZooming ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
                    <div className={`text-6xl mb-6 drop-shadow-lg ${styles.text}`}>{currentRule.toIcon}</div>
                    <div className="font-mono text-xl font-bold bg-slate-900 px-6 py-3 rounded-xl border border-slate-700 shadow-inner">{currentRule.math.split('⊢')[1].trim()}</div>
                </div>
            </div>
        </div>

        {/* --- SECTION: APPLIED PREDICATE PROOFS (4 CASES) --- */}
        <div className="bg-slate-800 border-2 border-slate-600 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-0 bg-slate-900 px-4 md:px-6 py-2 rounded-b-xl border-b-2 border-x-2 border-slate-600 font-bold tracking-widest uppercase text-amber-400 shadow-lg z-10 w-max max-w-[90%] text-center text-xs md:text-sm">
                Applied Proofs: The Master Detective
            </div>

            <div className="flex border-b border-slate-700 bg-slate-900/50 pt-16 md:pt-14 px-4 overflow-x-auto">
                {proofCases.map((c, idx) => (
                    <button 
                        key={c.id} 
                        onClick={() => handleCaseSwitch(idx)}
                        className={`px-6 py-4 font-bold tracking-wider uppercase text-sm whitespace-nowrap border-b-4 transition-all
                            ${activeCaseIndex === idx ? `border-current ${c.color} bg-slate-800` : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
                    >
                        {c.focus} Focus
                    </button>
                ))}
            </div>
            
            <div className="p-8 md:p-12">
                <div className="mb-8 border-l-4 pl-4 border-slate-500">
                    <h2 className={`text-2xl font-bold mb-2 ${activeCase.color}`}>{activeCase.title}</h2>
                    <p className="text-slate-300 text-lg">{activeCase.scenario}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-700 font-mono text-sm md:text-base shadow-inner">
                        <h3 className="text-emerald-400 border-b border-slate-700 pb-2 mb-4 uppercase tracking-widest text-xs">// Known Evidence (Premises)</h3>
                        
                        <div className="space-y-4">
                            {activeCase.premises.map((p, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 rounded hover:bg-slate-800/50 transition-colors">
                                    <div className="flex gap-4">
                                        <span className="text-slate-500 font-bold w-4">{idx + 1}.</span>
                                        <span className="text-white">{p.text}</span>
                                    </div>
                                    <span className="text-slate-500 text-xs mt-1 sm:mt-0 ml-8 sm:ml-0">{p.reason}</span>
                                </div>
                            ))}
                            
                            <div className="my-6 border-t border-dashed border-slate-700"></div>
                            <h3 className="text-amber-400 border-b border-slate-700 pb-2 mb-4 uppercase tracking-widest text-xs">// Logical Deductions</h3>

                            {activeCase.steps.map((step, idx) => {
                                const stepNumber = activeCase.premises.length + idx + 1;
                                const isRevealed = proofStep > idx;
                                
                                return (
                                    <div key={idx} className="relative">
                                        {isRevealed ? (
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg bg-emerald-900/10 border border-emerald-500/30 animate-fade-in mb-2">
                                                <div className="flex gap-4">
                                                    <span className="text-slate-500 font-bold w-4">{stepNumber}.</span>
                                                    <span className="text-emerald-300 font-bold">{step.result}</span>
                                                </div>
                                                <span className="text-emerald-500/80 text-xs mt-1 sm:mt-0 ml-8 sm:ml-0 font-bold">{step.ruleName}</span>
                                            </div>
                                        ) : proofStep === idx ? (
                                            <div className="flex gap-4 text-slate-500 p-3 bg-slate-800/50 rounded-lg animate-pulse border border-slate-700 mb-2">
                                                <span className="w-4 font-bold">{stepNumber}.</span>
                                                <span>[ Waiting for deduction... ]</span>
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        {proofStep < activeCase.steps.length ? (
                            <div className="bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-xl animate-fade-in">
                                <h4 className={`text-xl font-bold mb-4 ${activeCase.color}`}>Action Required</h4>
                                <p className="text-slate-300 mb-8 leading-relaxed text-lg border-l-2 border-slate-600 pl-4">{activeCase.steps[proofStep].prompt}</p>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    {activeCase.steps[proofStep].options.map(opt => (
                                        <button 
                                            key={opt}
                                            onClick={() => handleProofGuess(opt)} 
                                            className="p-4 bg-slate-900 hover:bg-slate-700 rounded-xl border border-slate-600 font-bold text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center animate-bounce-in bg-green-500/10 p-8 rounded-3xl border-2 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                                <div className="text-6xl mb-6">🎉🕵️‍♂️</div>
                                <h4 className="text-3xl font-bold text-green-400 mb-4">Case Closed!</h4>
                                <p className="text-green-200/80 text-lg leading-relaxed">You successfully utilized <strong className="text-white">{activeCase.focus}</strong> to complete the mathematical proof.</p>
                                <button onClick={() => handleCaseSwitch(activeCaseIndex === 3 ? 0 : activeCaseIndex + 1)} className="mt-8 px-8 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-500 transition-all shadow-lg hover:shadow-green-500/20 active:scale-95">
                                    {activeCaseIndex === 3 ? 'Restart Cases' : 'Next Case File ➡️'}
                                </button>
                            </div>
                        )}

                        {feedback.text && proofStep < activeCase.steps.length && (
                            <div className={`mt-6 p-4 rounded-xl text-sm font-bold tracking-wide animate-fade-in text-center shadow-lg
                                ${feedback.type === 'success' ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700' : 'bg-red-900/50 text-red-400 border border-red-700'}`}>
                                {feedback.text}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* --- SECTION: THE FINAL BOSS (UNIT 1 EXAM) --- */}
        <div className="pt-8 mb-12">
            {!quizStarted ? (
                <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-12 text-center border-4 border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                    <div className="text-6xl mb-6 animate-bounce">🎓</div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Unit 1: The Final Boss</h2>
                    <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-10">
                        You've built the circuits, mapped the normal forms, and solved the quantifier cases. 
                        It is time to prove your absolute mastery of Mathematical Logic. 
                    </p>
                    <button 
                        onClick={() => setQuizStarted(true)}
                        className="px-10 py-5 bg-purple-500 text-white text-xl font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:bg-purple-400 transition-all transform hover:scale-105 active:scale-95"
                    >
                        Initiate Final Exam 🚀
                    </button>
                </div>
            ) : showResults ? (
                <div className="bg-slate-800 rounded-3xl p-12 text-center border-2 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.2)] animate-fade-in">
                    <div className="text-7xl mb-6">{score === quizQuestions.length ? '🏆' : '🎖️'}</div>
                    <h2 className="text-4xl font-black text-white mb-2">Unit 1 Complete!</h2>
                    <p className="text-xl text-slate-300 mb-8">You scored <span className="text-emerald-400 font-bold text-3xl">{score}</span> out of <span className="text-white text-3xl">{quizQuestions.length}</span>.</p>
                    
                    {score === quizQuestions.length ? (
                        <div className="bg-emerald-900/30 border border-emerald-500/50 p-6 rounded-xl max-w-2xl mx-auto mb-10">
                            <p className="text-emerald-300 text-lg font-bold">Flawless Victory!</p>
                            <p className="text-emerald-200 mt-2">You possess a fearless, professional-level understanding of Mathematical Logic. You are more than ready for Unit 2.</p>
                        </div>
                    ) : (
                        <div className="bg-amber-900/30 border border-amber-500/50 p-6 rounded-xl max-w-2xl mx-auto mb-10">
                            <p className="text-amber-300 text-lg font-bold">Great Effort!</p>
                            <p className="text-amber-200 mt-2">You have a very strong grasp of the foundations. Review the interactive sandboxes above for the concepts that tricked you, and you'll be unstoppable.</p>
                        </div>
                    )}

                    <div className="flex gap-4 justify-center">
                        <button onClick={restartQuiz} className="px-6 py-3 bg-slate-700 text-white font-bold rounded-full hover:bg-slate-600 transition-all">
                            Retake Exam
                        </button>
                        <button className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition-all">
                            Proceed to Unit 2: Set Theory ➡️
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-slate-800 border-2 border-purple-500/50 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
                    <div className="w-full bg-slate-900 h-2">
                        <div 
                            className="bg-gradient-to-r from-fuchsia-500 to-purple-500 h-2 transition-all duration-500"
                            style={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                        ></div>
                    </div>
                    
                    <div className="p-8 md:p-12">
                        <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                            <span className="text-purple-400 font-bold tracking-widest uppercase text-sm">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                            <span className="text-slate-400 font-mono text-sm">Score: <span className="text-white font-bold">{score}</span></span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                            {quizQuestions[currentQuestion].question}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {quizQuestions[currentQuestion].options.map((option, index) => {
                                const isSelected = selectedAnswer === index;
                                const isCorrect = index === quizQuestions[currentQuestion].correct;
                                
                                let btnClass = "p-6 rounded-xl border-2 text-left font-bold text-lg transition-all ";
                                
                                if (!isAnswerChecked) {
                                    btnClass += isSelected 
                                        ? "bg-purple-600 border-purple-400 text-white shadow-lg transform scale-[1.02]" 
                                        : "bg-slate-900 border-slate-700 text-slate-300 hover:border-purple-500 hover:bg-slate-800";
                                } else {
                                    if (isCorrect) {
                                        btnClass += "bg-emerald-900/80 border-emerald-500 text-emerald-300";
                                    } else if (isSelected && !isCorrect) {
                                        btnClass += "bg-red-900/80 border-red-500 text-red-300 opacity-50";
                                    } else {
                                        btnClass += "bg-slate-900 border-slate-800 text-slate-600 opacity-30";
                                    }
                                }

                                return (
                                    <button 
                                        key={index}
                                        onClick={() => handleQuizAnswer(index)}
                                        disabled={isAnswerChecked}
                                        className={btnClass}
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center mr-4 text-sm font-mono opacity-70">
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            {option}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="min-h-[120px]">
                            {!isAnswerChecked ? (
                                <button 
                                    onClick={checkQuizAnswer}
                                    disabled={selectedAnswer === null}
                                    className={`px-8 py-4 rounded-xl font-bold text-lg w-full md:w-auto transition-all
                                        ${selectedAnswer !== null ? 'bg-purple-500 text-white shadow-lg hover:bg-purple-400' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                                >
                                    Check Answer
                                </button>
                            ) : (
                                <div className="animate-fade-in">
                                    <div className={`p-6 rounded-xl border mb-6
                                        ${selectedAnswer === quizQuestions[currentQuestion].correct ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-amber-900/20 border-amber-500/50'}`}>
                                        <h4 className={`font-bold mb-2 ${selectedAnswer === quizQuestions[currentQuestion].correct ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            {selectedAnswer === quizQuestions[currentQuestion].correct ? 'Correct!' : 'Not quite.'}
                                        </h4>
                                        <p className="text-slate-300 leading-relaxed">{quizQuestions[currentQuestion].explanation}</p>
                                    </div>
                                    <button 
                                        onClick={nextQuestion}
                                        className="px-8 py-4 bg-white text-slate-900 font-black rounded-xl w-full md:w-auto hover:bg-slate-200 transition-all shadow-lg"
                                    >
                                        {currentQuestion < quizQuestions.length - 1 ? 'Next Question ➡️' : 'See Final Results 🏆'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT (THE NAVIGATOR)
// ==========================================
export default function Unit1MasterHub() {
  const [activeTab, setActiveTab] = useState('connectives');

  const tabs = [
    { id: 'connectives', label: '1. Connectives', icon: '⚖️' },
    { id: 'normalForms', label: '2. Normal Forms', icon: '🔌' },
    { id: 'inference', label: '3. Statement Calc.', icon: '🕵️' },
    { id: 'quantifiers', label: '4. Quantifiers', icon: '🌐' },
    { id: 'proofs', label: '5. Proofs & Exam', icon: '🏆' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-[60px] z-50 shadow-xl flex flex-col">
        <div className="px-2 md:px-8 py-3 flex flex-col md:flex-row justify-between items-center gap-3 border-b border-slate-800/50">
            <div className="text-center md:text-left shrink-0">
              <div className="text-[10px] md:text-xs font-bold tracking-widest text-cyan-500 uppercase mb-1 flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> Unit 1 • Full Masterclass
              </div>
              <h1 className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">THE LOGIC ENGINE</h1>
            </div>
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide py-1">
              <nav className="flex flex-nowrap gap-2 justify-start md:justify-end w-max mx-auto md:mx-0 px-2">
                  {tabs.map(tab => (
                      <button 
                          key={tab.id} 
                          onClick={() => setActiveTab(tab.id)} 
                          className={`whitespace-nowrap px-4 py-2 rounded-xl font-black text-xs md:text-sm transition-all flex items-center gap-2 shrink-0 ${activeTab === tab.id ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.4)] transform scale-105' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'}`}
                      >
                          <span className="text-lg">{tab.icon}</span> <span>{tab.label}</span>
                      </button>
                  ))}
              </nav>
            </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {activeTab === 'connectives' && <TruthSandbox />}
        {activeTab === 'normalForms' && <NormalFormsPlayground />}
        {activeTab === 'inference' && <InferencePlayground />}
        {activeTab === 'quantifiers' && <PredicateSandbox />}
        {activeTab === 'proofs' && <MacroMicroScope />}
      </main>
    </div>
  );
}
