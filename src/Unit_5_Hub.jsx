import React, { useState, useMemo, useEffect } from 'react';

// ==========================================
// SHARED UI COMPONENTS (MENTOR'S TOUCH)
// ==========================================
const MentorInsight = ({ title, children, color = "emerald" }) => {
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

const FormalDefinition = ({ term, layman, def, formula, color = "emerald" }) => (
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
// PHASE 1.5: ISOMORPHISM DETECTIVE (NEW)
// ==========================================
const IsomorphismCaseStudy = () => {
  const [step, setStep] = useState(0);

  const nodesG1 = [
    { id: 'a', x: 20, y: 20, deg: 3 }, { id: 'b', x: 80, y: 20, deg: 2 },
    { id: 'c', x: 80, y: 80, deg: 3 }, { id: 'd', x: 20, y: 80, deg: 4 },
    { id: 'e', x: 40, y: 40, deg: 3 }, { id: 'f', x: 60, y: 40, deg: 2 },
    { id: 'g', x: 60, y: 60, deg: 3 }, { id: 'h', x: 40, y: 60, deg: 2 }
  ];
  const edgesG1 = [
    ['a','b'], ['b','c'], ['c','d'], ['d','a'],
    ['e','f'], ['f','g'], ['g','h'], ['h','e'],
    ['a','e'], ['c','g']
  ];

  const nodesG2 = [
    { id: "a'", x: 20, y: 20, deg: 3 }, { id: "b'", x: 80, y: 20, deg: 3 },
    { id: "c'", x: 80, y: 80, deg: 2 }, { id: "d'", x: 20, y: 80, deg: 4 },
    { id: "e'", x: 40, y: 40, deg: 3 }, { id: "f'", x: 60, y: 40, deg: 3 },
    { id: "g'", x: 60, y: 60, deg: 2 }, { id: "h'", x: 40, y: 60, deg: 2 }
  ];
  const edgesG2 = [
    ["a'","b'"], ["b'","c'"], ["c'","d'"], ["d'","a'"],
    ["e'","f'"], ["f'","g'"], ["g'","h'"], ["h'","e'"],
    ["a'","e'"], ["b'","f'"]
  ];

  const renderGraph = (nodes, edges, isG2) => {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-[280px] overflow-visible">
        {/* Self Loop for d / d' */}
        <path d="M 17 84 A 8 8 0 1 0 23 84" fill="none" stroke={step === 3 ? "#ef4444" : (step >= 1 ? "#06b6d4" : "#475569")} strokeWidth={step === 3 ? "3" : "2"} className="transition-all duration-500" />
        
        {/* Edges */}
        {edges.map((edge, i) => {
           const n1 = nodes.find(n => n.id === edge[0]);
           const n2 = nodes.find(n => n.id === edge[1]);
           
           let isHighlightEdge = false;
           if (step === 3) {
               if (!isG2 && (edge.includes('d') && (edge.includes('a') || edge.includes('c')))) isHighlightEdge = true;
               if (isG2 && (edge.includes("d'") && (edge.includes("a'") || edge.includes("c'")))) isHighlightEdge = true;
           }

           return (
             <line key={i} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} 
                stroke={isHighlightEdge ? "#ef4444" : (step >= 1 ? "#06b6d4" : "#475569")} 
                strokeWidth={isHighlightEdge ? "3" : "2"} 
                className="transition-all duration-500"
             />
           )
        })}

        {/* Nodes */}
        {nodes.map(n => {
            let fill = '#1e293b';
            let stroke = step >= 1 ? '#22d3ee' : '#64748b';
            let scale = 1;
            let textFill = '#fff';
            let opacity = 1;

            if (step === 2) {
                fill = '#0891b2'; textFill = '#fff';
            } else if (step === 3) {
                if (!isG2) {
                    if (n.id === 'd') { fill = '#f59e0b'; stroke = '#fef3c7'; scale = 1.3; } 
                    else if (n.id === 'a' || n.id === 'c') { fill = '#ef4444'; stroke = '#fca5a5'; scale = 1.2; } 
                    else { opacity = 0.3; stroke = '#334155'; }
                } else {
                    if (n.id === "d'") { fill = '#f59e0b'; stroke = '#fef3c7'; scale = 1.3; }
                    else if (n.id === "a'" || n.id === "c'") { fill = '#ef4444'; stroke = '#fca5a5'; scale = 1.2; }
                    else { opacity = 0.3; stroke = '#334155'; }
                }
            }

            return (
              <g key={n.id} style={{ transformOrigin: `${n.x}px ${n.y}px`, transform: `scale(${scale})`, opacity: opacity }} className="transition-all duration-500">
                <circle cx={n.x} cy={n.y} r="5" fill={fill} stroke={stroke} strokeWidth="1.5" />
                {step < 2 && <text x={n.x} y={n.y} textAnchor="middle" dy=".3em" fill={textFill} fontSize="4" fontWeight="black" className="font-mono">{n.id}</text>}
                {step >= 2 && <text x={n.x} y={n.y} textAnchor="middle" dy=".3em" fill={textFill} fontSize="5" fontWeight="black" className="font-mono">{n.deg}</text>}
              </g>
            )
        })}
      </svg>
    );
  };

  const stepData = [
    {
       title: "Visual Analysis",
       desc: "At first glance, Graph G1 and Graph G2 look different. G1 has vertical connections between the inner and outer cycles, while G2 has horizontal ones. But are they mathematically identical (Isomorphic)? Let's investigate.",
       btn: "Step 1: Count V & E"
    },
    {
       title: "Step 1: Vertices & Edges",
       desc: "Both graphs have exactly |V| = 8 vertices and |E| = 11 edges. (Don't forget the self-loop at nodes d and d', which counts as 1 edge). Since these match, they pass the first test.",
       btn: "Step 2: Degree Sequence"
    },
    {
       title: "Step 2: The Degree Sequence",
       desc: "Let's count the connections for every node (remembering a self-loop adds 2 to the degree). Both graphs share the exact same sequence: {4, 3, 3, 3, 3, 2, 2, 2}. They pass the second test! Are they isomorphic?",
       btn: "Step 3: Check Adjacency"
    },
    {
       title: "Step 3: The Smoking Gun (Adjacency)",
       desc: "No! Look closely at the unique degree-4 nodes (d and d'). In G1, 'd' connects to neighbors with degrees 3 and 3. In G2, 'd'' connects to neighbors with degrees 3 and 2. The local structures are fundamentally different!",
       btn: "Reset Case"
    }
  ];

  return (
    <div className="mt-12 bg-slate-900 border-2 border-fuchsia-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden animate-fade-in-up">
       <div className="absolute top-0 right-0 bg-fuchsia-600 text-white px-4 py-1 rounded-bl-2xl font-black uppercase tracking-widest text-xs shadow-lg">Case Study</div>
       <h3 className="text-2xl md:text-3xl font-black text-white mb-2">The Isomorphism Trap</h3>
       <p className="text-slate-400 mb-8">Follow the steps to determine if Graph G1 and Graph G2 share the exact same underlying structure.</p>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className={`bg-slate-950 rounded-2xl border ${step === 3 ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-slate-800'} p-4 flex flex-col items-center transition-all duration-500`}>
             <div className="text-cyan-400 font-black tracking-widest uppercase mb-4">Graph G1</div>
             <div className="h-[250px] w-full flex justify-center">
                {renderGraph(nodesG1, edgesG1, false)}
             </div>
             <div className="flex gap-4 mt-4 text-xs font-mono text-slate-500 font-bold">
                 <span className={step >= 1 ? 'text-cyan-300' : ''}>|V| = 8</span>
                 <span className={step >= 1 ? 'text-cyan-300' : ''}>|E| = 11</span>
             </div>
          </div>
          <div className={`bg-slate-950 rounded-2xl border ${step === 3 ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-slate-800'} p-4 flex flex-col items-center transition-all duration-500`}>
             <div className="text-amber-400 font-black tracking-widest uppercase mb-4">Graph G2</div>
             <div className="h-[250px] w-full flex justify-center">
                {renderGraph(nodesG2, edgesG2, true)}
             </div>
             <div className="flex gap-4 mt-4 text-xs font-mono text-slate-500 font-bold">
                 <span className={step >= 1 ? 'text-amber-300' : ''}>|V| = 8</span>
                 <span className={step >= 1 ? 'text-amber-300' : ''}>|E| = 11</span>
             </div>
          </div>
       </div>

       <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center gap-8 shadow-inner">
           <div className="flex-1 animate-fade-in" key={step}>
               <div className="text-xs uppercase font-black tracking-widest text-fuchsia-400 mb-1">Investigation</div>
               <h4 className="text-xl font-bold text-white mb-2">{stepData[step].title}</h4>
               <p className="text-sm text-slate-300 leading-relaxed">{stepData[step].desc}</p>
               {step === 3 && (
                   <div className="mt-4 inline-block bg-red-950/80 border border-red-500 text-red-400 px-4 py-2 rounded-lg font-black tracking-widest text-lg uppercase shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-bounce-in">
                       Verdict: Not Isomorphic
                   </div>
               )}
           </div>
           
           <button 
              onClick={() => setStep(step === 3 ? 0 : step + 1)} 
              className={`shrink-0 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 ${step === 3 ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-fuchsia-500 text-slate-950 hover:bg-fuchsia-400 hover:shadow-fuchsia-500/50'}`}
           >
              {stepData[step].btn}
           </button>
       </div>
    </div>
  )
};

// ==========================================
// PHASE 1: GRAPH BASICS & ISOMORPHISM
// ==========================================
const GraphBasics = () => {
  // 5 Nodes arranged in a pentagon, 1 in center
  const nodes = [
    { id: 'A', x: 50, y: 15 },
    { id: 'B', x: 85, y: 40 },
    { id: 'C', x: 70, y: 85 },
    { id: 'D', x: 30, y: 85 },
    { id: 'E', x: 15, y: 40 },
    { id: 'F', x: 50, y: 50 } // Center
  ];

  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const toggleEdge = (n1, n2) => {
    if (n1 === n2) return; // No self loops for now
    const edgeId1 = `${n1}-${n2}`;
    const edgeId2 = `${n2}-${n1}`;
    
    if (edges.includes(edgeId1) || edges.includes(edgeId2)) {
      setEdges(edges.filter(e => e !== edgeId1 && e !== edgeId2));
    } else {
      setEdges([...edges, edgeId1]);
    }
  };

  const handleNodeClick = (id) => {
    if (!selectedNode) {
      setSelectedNode(id);
    } else {
      toggleEdge(selectedNode, id);
      setSelectedNode(null);
    }
  };

  const getDegree = (id) => {
    return edges.filter(e => e.startsWith(`${id}-`) || e.endsWith(`-${id}`)).length;
  };

  const totalDegrees = nodes.reduce((sum, n) => sum + getDegree(n.id), 0);

  const setCompleteGraph = () => {
    let newEdges = [];
    for (let i=0; i<nodes.length; i++) {
      for (let j=i+1; j<nodes.length; j++) {
        newEdges.push(`${nodes[i].id}-${nodes[j].id}`);
      }
    }
    setEdges(newEdges);
  };

  const setCycleGraph = () => {
    setEdges(['A-B', 'B-C', 'C-D', 'D-E', 'E-A']);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-cyan-400 tracking-tight">1. The Network Builder 🕸️</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          A Graph is just a collection of Data Points (Vertices/Nodes) and Relationships (Edges). Click two nodes to connect or disconnect them.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-7 bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-center">
          <div className="flex justify-between items-center mb-6">
             <div className="text-cyan-400 font-bold uppercase tracking-widest text-sm">Interactive Canvas</div>
             <div className="flex gap-2">
                <button onClick={setCycleGraph} className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded border border-slate-600 hover:text-white transition-all">Cycle (C5)</button>
                <button onClick={setCompleteGraph} className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded border border-slate-600 hover:text-white transition-all">Complete (K6)</button>
                <button onClick={() => setEdges([])} className="text-[10px] bg-slate-800 text-red-400 px-3 py-1 rounded border border-red-900/50 hover:bg-red-900/30 transition-all">Clear</button>
             </div>
          </div>
          
          <div className="bg-slate-950 border border-slate-800 rounded-3xl h-[400px] relative overflow-hidden shadow-inner flex items-center justify-center p-4">
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-[350px] overflow-visible">
              {/* Draw Edges */}
              {edges.map(edge => {
                const [id1, id2] = edge.split('-');
                const n1 = nodes.find(n => n.id === id1);
                const n2 = nodes.find(n => n.id === id2);
                return (
                  <line 
                    key={edge} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} 
                    stroke="#06b6d4" strokeWidth="2" className="drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] transition-all duration-300"
                  />
                );
              })}
              
              {/* Draw Nodes */}
              {nodes.map(n => {
                const isSelected = selectedNode === n.id;
                const deg = getDegree(n.id);
                return (
                  <g key={n.id} onClick={() => handleNodeClick(n.id)} className="cursor-pointer transition-all duration-300 group">
                    <circle 
                      cx={n.x} cy={n.y} r="6" 
                      fill={isSelected ? '#22d3ee' : '#1e293b'} 
                      stroke={isSelected ? '#fff' : '#0891b2'} 
                      strokeWidth={isSelected ? '2' : '1.5'} 
                      className={`transition-all duration-300 ${isSelected ? 'drop-shadow-[0_0_15px_rgba(34,211,238,1)]' : 'group-hover:stroke-cyan-300'}`} 
                    />
                    <text x={n.x} y={n.y} textAnchor="middle" dy=".35em" fill={isSelected ? '#0f172a' : '#fff'} fontSize="5" fontWeight="black" className="pointer-events-none font-mono">{n.id}</text>
                    {deg > 0 && (
                      <g transform={`translate(${n.x + 6}, ${n.y - 6})`}>
                        <circle cx="0" cy="0" r="2.5" fill="#f59e0b" />
                        <text x="0" y="0" textAnchor="middle" dy=".35em" fill="#fff" fontSize="3" fontWeight="bold" className="pointer-events-none font-mono">{deg}</text>
                      </g>
                    )}
                  </g>
                )
              })}
            </svg>
            {selectedNode && (
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-cyan-900/80 text-cyan-200 px-4 py-2 rounded-full text-xs font-bold animate-pulse border border-cyan-500/50 backdrop-blur-sm">
                 Select another node to connect/disconnect.
               </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <FormalDefinition color="cyan" term="Handshaking Lemma" layman="The Party Rule" def="Every edge connects two vertices. Therefore, if you add up the degrees of all vertices, it will ALWAYS be exactly double the number of edges." formula="Σ deg(V) = 2|E|" />
          
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-xl space-y-4">
             <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-slate-400 uppercase font-bold text-xs tracking-widest">Vertices |V|</span>
                <span className="text-2xl font-black text-white">{nodes.length}</span>
             </div>
             <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-slate-400 uppercase font-bold text-xs tracking-widest">Edges |E|</span>
                <span className="text-2xl font-black text-cyan-400">{edges.length}</span>
             </div>
             <div className="flex justify-between items-center bg-cyan-950/30 p-4 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <span className="text-cyan-300 uppercase font-bold text-xs tracking-widest">Sum of Degrees</span>
                <div className="text-right">
                   <span className="text-xs text-cyan-400/50 block font-mono">2 × {edges.length} Edges</span>
                   <span className="text-2xl font-black text-amber-400">{totalDegrees}</span>
                </div>
             </div>
          </div>

          <MentorInsight title="Graph Isomorphism" color="cyan">
            Don't let the drawing trick you! Two graphs are <strong>Isomorphic</strong> if they are exactly the same network, just drawn differently. <br/><br/>
            If you take a square and cross the wires in the middle, it looks like an hourglass. But structurally? It has 4 vertices, 4 edges, and every vertex has a degree of 2. It is still just a square graph (Cycle C4)!
          </MentorInsight>
        </div>
      </div>
      
      {/* Interactive Case Study Integrated Here */}
      <IsomorphismCaseStudy />
      
    </div>
  );
};

// ==========================================
// PHASE 2: TREES & TRAVERSALS
// ==========================================
const TreeEngine = () => {
  const [traversalType, setTraversalType] = useState('none');
  const [activeStep, setActiveStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Binary Tree Structure
  const treeNodes = [
    { id: 'A', x: 50, y: 15, left: 'B', right: 'C' }, // Root
    { id: 'B', x: 25, y: 40, left: 'D', right: 'E' },
    { id: 'C', x: 75, y: 40, left: 'F', right: 'G' },
    { id: 'D', x: 12, y: 70, left: null, right: null },
    { id: 'E', x: 38, y: 70, left: null, right: null },
    { id: 'F', x: 62, y: 70, left: null, right: null },
    { id: 'G', x: 88, y: 70, left: null, right: null },
  ];

  const sequences = {
    none: [],
    preorder: ['A', 'B', 'D', 'E', 'C', 'F', 'G'], // Root, L, R
    inorder: ['D', 'B', 'E', 'A', 'F', 'C', 'G'],  // L, Root, R
    postorder: ['D', 'E', 'B', 'F', 'G', 'C', 'A'] // L, R, Root
  };

  const rules = {
    none: "Select a traversal method to begin.",
    preorder: "ROOT ➔ LEFT ➔ RIGHT (Used to clone a tree)",
    inorder: "LEFT ➔ ROOT ➔ RIGHT (Used in Binary Search Trees to get sorted data)",
    postorder: "LEFT ➔ RIGHT ➔ ROOT (Used to safely delete a tree from bottom up)"
  };

  const currentSeq = sequences[traversalType];

  useEffect(() => {
    let timer;
    if (isPlaying && activeStep < currentSeq.length - 1) {
      timer = setTimeout(() => {
        setActiveStep(s => s + 1);
      }, 800);
    } else if (isPlaying && activeStep >= currentSeq.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, activeStep, currentSeq.length]);

  const startTraversal = (type) => {
    setTraversalType(type);
    setActiveStep(-1);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-emerald-400 tracking-tight">2. Tree Traversal Engine 🌳</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          A Tree is just a connected graph with NO cycles. In Computer Science, knowing how to navigate (traverse) a tree is essential for databases and file systems.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-4 flex flex-col gap-4">
           <FormalDefinition color="emerald" term="Tree Properties" layman="No Loops Allowed" def="A graph is a tree if and only if it is fully connected and contains absolutely zero cycles. If a tree has N vertices, it MUST have exactly N-1 edges." formula="|E| = |V| - 1" />
           
           <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-xl flex-1 flex flex-col">
              <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4">Traversal Algorithms</h3>
              
              <div className="space-y-3 mb-6">
                 <button onClick={() => startTraversal('preorder')} className={`w-full p-4 rounded-xl font-bold transition-all border-2 text-left ${traversalType === 'preorder' ? 'bg-emerald-900/40 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
                    Pre-Order <span className="block text-xs font-mono text-emerald-300/70 mt-1">N L R</span>
                 </button>
                 <button onClick={() => startTraversal('inorder')} className={`w-full p-4 rounded-xl font-bold transition-all border-2 text-left ${traversalType === 'inorder' ? 'bg-amber-900/40 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
                    In-Order <span className="block text-xs font-mono text-amber-300/70 mt-1">L N R</span>
                 </button>
                 <button onClick={() => startTraversal('postorder')} className={`w-full p-4 rounded-xl font-bold transition-all border-2 text-left ${traversalType === 'postorder' ? 'bg-fuchsia-900/40 border-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'}`}>
                    Post-Order <span className="block text-xs font-mono text-fuchsia-300/70 mt-1">L R N</span>
                 </button>
              </div>

              <div className="mt-auto bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">Algorithm Rule</div>
                  <div className="text-sm font-medium text-white leading-relaxed">{rules[traversalType]}</div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-8 bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col relative overflow-hidden">
           <div className="bg-slate-950 border border-slate-800 rounded-3xl h-[350px] relative shadow-inner flex items-center justify-center p-4">
              <svg viewBox="0 0 100 100" className="w-full h-full max-w-[400px] overflow-visible">
                {/* Draw Tree Edges */}
                {treeNodes.map(node => {
                   const children = [];
                   if (node.left) children.push(treeNodes.find(n => n.id === node.left));
                   if (node.right) children.push(treeNodes.find(n => n.id === node.right));
                   
                   return children.map(child => {
                       const isTraversed = activeStep >= 0 && currentSeq.slice(0, activeStep+1).includes(child.id) && currentSeq.slice(0, activeStep+1).includes(node.id);
                       let strokeColor = "#334155";
                       if (isTraversed) {
                           if (traversalType === 'preorder') strokeColor = "#10b981"; // emerald
                           if (traversalType === 'inorder') strokeColor = "#f59e0b"; // amber
                           if (traversalType === 'postorder') strokeColor = "#d946ef"; // fuchsia
                       }

                       return (
                         <line 
                           key={`${node.id}-${child.id}`} x1={node.x} y1={node.y} x2={child.x} y2={child.y} 
                           stroke={strokeColor} strokeWidth={isTraversed ? "3" : "2"} 
                           className={`transition-all duration-500 ${isTraversed ? 'drop-shadow-md' : ''}`}
                         />
                       )
                   });
                })}

                {/* Draw Tree Nodes */}
                {treeNodes.map(n => {
                   const isCurrent = activeStep >= 0 && currentSeq[activeStep] === n.id;
                   const isPast = activeStep >= 0 && currentSeq.indexOf(n.id) < activeStep;
                   
                   let fill = '#1e293b', stroke = '#64748b', scale = 1, shadow = '';
                   if (isCurrent || isPast) {
                       if (traversalType === 'preorder') { fill = '#064e3b'; stroke = '#34d399'; }
                       if (traversalType === 'inorder') { fill = '#78350f'; stroke = '#fbbf24'; }
                       if (traversalType === 'postorder') { fill = '#701a4c'; stroke = '#e879f9'; }
                   }
                   if (isCurrent) {
                       scale = 1.3;
                       shadow = `drop-shadow-[0_0_15px_${stroke}]`;
                       fill = stroke; // Solid fill for current
                   }

                   return (
                     <g key={n.id} style={{ transformOrigin: `${n.x}px ${n.y}px`, transform: `scale(${scale})` }} className={`transition-all duration-500 ${shadow}`}>
                       <circle cx={n.x} cy={n.y} r="6" fill={fill} stroke={stroke} strokeWidth="1.5" className="transition-colors duration-500" />
                       <text x={n.x} y={n.y} textAnchor="middle" dy=".35em" fill={isCurrent ? '#000' : '#fff'} fontSize="5" fontWeight="black" className="pointer-events-none font-mono">{n.id}</text>
                     </g>
                   )
                })}
              </svg>
           </div>

           <div className="mt-6 flex flex-col items-center">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">Traversal Output</div>
              <div className="flex gap-2 flex-wrap justify-center min-h-[3rem]">
                 {currentSeq.map((nodeId, idx) => {
                     const isVisible = idx <= activeStep;
                     let bgColor = 'bg-slate-800', borderColor = 'border-slate-700';
                     if (isVisible) {
                        if (traversalType === 'preorder') { bgColor = 'bg-emerald-900/50'; borderColor = 'border-emerald-500'; }
                        if (traversalType === 'inorder') { bgColor = 'bg-amber-900/50'; borderColor = 'border-amber-500'; }
                        if (traversalType === 'postorder') { bgColor = 'bg-fuchsia-900/50'; borderColor = 'border-fuchsia-500'; }
                     }

                     return (
                         <div key={idx} className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl border-2 font-black text-lg md:text-xl transition-all duration-300 transform ${isVisible ? `${bgColor} ${borderColor} text-white scale-100 opacity-100` : 'bg-slate-950 border-slate-800 text-slate-800 scale-90 opacity-50'}`}>
                             {nodeId}
                         </div>
                     )
                 })}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PHASE 3: SPANNING TREES & PATHS
// ==========================================

const EulerCaseStudy = () => {
  const [step, setStep] = useState(0);

  // The "House with an X" Graph
  const nodes = [
    { id: 'A', x: 20, y: 80, deg: 3 }, { id: 'B', x: 80, y: 80, deg: 3 },
    { id: 'C', x: 80, y: 40, deg: 4 }, { id: 'D', x: 20, y: 40, deg: 4 },
    { id: 'E', x: 50, y: 10, deg: 2 }
  ];
  const edges = [
    'A-B', 'B-C', 'C-D', 'D-A', 
    'A-C', 'B-D', // The X
    'C-E', 'D-E'  // The Roof
  ];
  
  // A valid Euler Path sequence: A -> C -> E -> D -> A -> B -> D -> C -> B
  const pathSequence = ['A-C', 'C-E', 'E-D', 'D-A', 'A-B', 'B-D', 'D-C', 'C-B'];

  const stepData = [
    {
       title: "Visual Analysis: The Mail Carrier",
       desc: "Can we draw this entire house without lifting our pen and without tracing over the same line twice? This is the definition of an Euler Path/Circuit.",
       btn: "Step 1: Check the Degrees"
    },
    {
       title: "Step 1: The Degree Rule",
       desc: "We don't need to guess; we just count! Euler's Theorem says: Look at the degree (number of connections) of every vertex. If every node is EVEN, we have a perfect Circuit. Let's calculate them.",
       btn: "Step 2: Find the Odd Ones"
    },
    {
       title: "Step 2: The Verdict",
       desc: "Ah! Vertices C, D, and E are even. But A and B have a degree of 3 (Odd). Because we have EXACTLY TWO odd vertices, Euler's rule dictates we DO NOT have a Circuit, but we DO have a Path. We must start at one odd node and end at the other.",
       btn: "Step 3: Trace the Path"
    },
    {
       title: "Step 3: The Successful Trace",
       desc: "Watch the path! We start at odd vertex A, and systematically cross every single edge exactly once, magically terminating exactly at the other odd vertex, B. The math never lies.",
       btn: "Reset Case"
    }
  ];

  return (
    <div className="mt-12 bg-slate-900 border-2 border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden animate-fade-in-up">
       <div className="absolute top-0 right-0 bg-amber-600 text-white px-4 py-1 rounded-bl-2xl font-black uppercase tracking-widest text-xs shadow-lg">Case Study 1</div>
       <h3 className="text-2xl md:text-3xl font-black text-amber-400 mb-2">The Euler Detective</h3>
       <p className="text-slate-400 mb-8">Can you cross every line without lifting your pen?</p>

       <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className={`bg-slate-950 rounded-2xl border ${step === 3 ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-slate-800'} p-6 flex flex-col items-center shrink-0 lg:w-[400px] transition-all duration-500`}>
             <div className="h-[250px] w-full flex justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full max-w-[280px] overflow-visible">
                  {/* Edges */}
                  {edges.map((edge, i) => {
                     const [id1, id2] = edge.split('-');
                     const n1 = nodes.find(n => n.id === id1);
                     const n2 = nodes.find(n => n.id === id2);
                     
                     let strokeColor = "#334155";
                     let strokeW = "2";
                     
                     if (step === 3) {
                         const pathIndex = pathSequence.findIndex(p => p === edge || p === `${id2}-${id1}`);
                         if (pathIndex !== -1) { strokeColor = "#f59e0b"; strokeW = "4"; }
                     } else if (step >= 1) {
                         strokeColor = "#475569";
                     }

                     return <line key={i} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke={strokeColor} strokeWidth={strokeW} className="transition-all duration-1000" />;
                  })}

                  {/* Nodes */}
                  {nodes.map(n => {
                      let fill = '#1e293b', stroke = '#64748b', scale = 1, textFill = '#fff';
                      const isOdd = n.deg % 2 !== 0;

                      if (step >= 1) { fill = '#0f172a'; textFill = '#cbd5e1'; }
                      if (step >= 2 && isOdd) { fill = '#ef4444'; stroke = '#fca5a5'; scale = 1.2; textFill = '#fff'; }
                      if (step >= 2 && !isOdd) { fill = '#10b981'; stroke = '#6ee7b7'; }
                      if (step === 3 && isOdd) { fill = '#f59e0b'; stroke = '#fef3c7'; scale = 1.3; textFill = '#000'; }

                      return (
                        <g key={n.id} style={{ transformOrigin: `${n.x}px ${n.y}px`, transform: `scale(${scale})` }} className="transition-all duration-500">
                          <circle cx={n.x} cy={n.y} r="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
                          {step < 1 && <text x={n.x} y={n.y} textAnchor="middle" dy=".3em" fill={textFill} fontSize="5" fontWeight="black" className="font-mono">{n.id}</text>}
                          {step >= 1 && <text x={n.x} y={n.y} textAnchor="middle" dy=".3em" fill={textFill} fontSize="6" fontWeight="black" className="font-mono">{n.deg}</text>}
                        </g>
                      )
                  })}
                </svg>
             </div>
             {step >= 2 && (
                 <div className="mt-4 flex gap-4 text-xs font-bold uppercase tracking-widest">
                    <span className="text-red-400">Odd: 2</span>
                    <span className="text-emerald-400">Even: 3</span>
                 </div>
             )}
          </div>

          <div className="bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-700 flex flex-col justify-center gap-6 shadow-inner flex-1">
             <div className="animate-fade-in" key={step}>
                 <div className="text-xs uppercase font-black tracking-widest text-amber-500 mb-2">Investigation</div>
                 <h4 className="text-2xl font-bold text-white mb-4">{stepData[step].title}</h4>
                 <p className="text-base text-slate-300 leading-relaxed">{stepData[step].desc}</p>
                 {step === 3 && (
                     <div className="mt-6 flex flex-wrap gap-2 text-sm font-mono font-bold text-amber-300">
                        Path: {pathSequence.map(p => p.split('-')[1]).reduce((acc, curr) => acc + ' ➔ ' + curr, 'A')}
                     </div>
                 )}
             </div>
             
             <button onClick={() => setStep(step === 3 ? 0 : step + 1)} className={`mt-auto w-full md:w-auto self-start px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 ${step === 3 ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-amber-500 text-slate-950 hover:bg-amber-400 hover:shadow-amber-500/50'}`}>
                {stepData[step].btn}
             </button>
          </div>
       </div>
    </div>
  )
};

const HamiltonianCaseStudy = () => {
  const [step, setStep] = useState(0);

  // Bipartite Graph K(3,2)
  const nodes = [
    { id: 'L1', x: 20, y: 20, group: 'L' }, { id: 'L2', x: 20, y: 50, group: 'L' }, { id: 'L3', x: 20, y: 80, group: 'L' },
    { id: 'R1', x: 80, y: 35, group: 'R' }, { id: 'R2', x: 80, y: 65, group: 'R' }
  ];
  
  const edges = [
    'L1-R1', 'L1-R2', 'L2-R1', 'L2-R2', 'L3-R1', 'L3-R2'
  ];

  const stepData = [
    {
       title: "Visual Analysis: The Salesperson",
       desc: "Here we have a dense graph. Every node on the left connects to every node on the right (A Bipartite Graph). The Goal: Start at L1, visit EVERY single vertex exactly once, and return to L1.",
       btn: "Step 1: The Coloring Strategy"
    },
    {
       title: "Step 1: Exposing the Structure",
       desc: "Because the left nodes only talk to the right nodes (and never to each other), we can color the left set RED and the right set BLUE. To travel this graph, you MUST alternate: Red ➔ Blue ➔ Red ➔ Blue.",
       btn: "Step 2: Try to Trace It"
    },
    {
       title: "Step 2: The Bottleneck",
       desc: "Let's attempt a cycle: Start Red (L1) ➔ Blue (R1) ➔ Red (L2) ➔ Blue (R2) ➔ Red (L3)... Uh oh. We are currently at L3. We have visited 5 nodes. We need to go back to the start (L1) to complete the cycle.",
       btn: "Step 3: The Impossible Math"
    },
    {
       title: "Step 3: The Verdict",
       desc: "It is mathematically impossible! Because we have 3 Red nodes and only 2 Blue nodes, the alternating pattern breaks. A Bipartite graph CANNOT have a Hamiltonian Cycle unless both sets have the exact same number of vertices. Looks can be deceiving!",
       btn: "Reset Case"
    }
  ];

  return (
    <div className="mt-12 bg-slate-900 border-2 border-fuchsia-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden animate-fade-in-up">
       <div className="absolute top-0 right-0 bg-fuchsia-600 text-white px-4 py-1 rounded-bl-2xl font-black uppercase tracking-widest text-xs shadow-lg">Case Study 2</div>
       <h3 className="text-2xl md:text-3xl font-black text-fuchsia-400 mb-2">The Hamiltonian Trap</h3>
       <p className="text-slate-400 mb-8">Can you visit every data point exactly once and return home?</p>

       <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className={`bg-slate-950 rounded-2xl border ${step === 3 ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-slate-800'} p-6 flex flex-col items-center shrink-0 lg:w-[400px] transition-all duration-500`}>
             <div className="h-[250px] w-full flex justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full max-w-[280px] overflow-visible">
                  {/* Edges */}
                  {edges.map((edge, i) => {
                     const [id1, id2] = edge.split('-');
                     const n1 = nodes.find(n => n.id === id1);
                     const n2 = nodes.find(n => n.id === id2);
                     
                     let strokeColor = "#334155";
                     let strokeW = "2";
                     
                     if (step >= 2) {
                         const pathSequence = ['L1-R1', 'R1-L2', 'L2-R2', 'R2-L3'];
                         const isPath = pathSequence.includes(edge) || pathSequence.includes(`${id2}-${id1}`);
                         if (isPath) { strokeColor = "#d946ef"; strokeW = "4"; }
                         else { strokeColor = "#1e293b"; }
                     }

                     return <line key={i} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke={strokeColor} strokeWidth={strokeW} className="transition-all duration-1000" />;
                  })}

                  {/* Nodes */}
                  {nodes.map(n => {
                      let fill = '#1e293b', stroke = '#64748b', scale = 1, textFill = '#fff';

                      if (step >= 1) {
                          if (n.group === 'L') { fill = '#7f1d1d'; stroke = '#ef4444'; }
                          else { fill = '#1e3a8a'; stroke = '#3b82f6'; }
                      }
                      
                      if (step >= 2) {
                          if (n.id === 'L3') { fill = '#f59e0b'; stroke = '#fef3c7'; scale = 1.4; textFill = '#000'; } // Stuck node
                          else { scale = 1.1; }
                      }

                      return (
                        <g key={n.id} style={{ transformOrigin: `${n.x}px ${n.y}px`, transform: `scale(${scale})` }} className="transition-all duration-500">
                          <circle cx={n.x} cy={n.y} r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
                          <text x={n.x} y={n.y} textAnchor="middle" dy=".3em" fill={textFill} fontSize="4" fontWeight="black" className="font-mono">{n.id}</text>
                        </g>
                      )
                  })}
                </svg>
             </div>
             {step >= 1 && (
                 <div className="mt-4 flex gap-4 text-xs font-bold uppercase tracking-widest animate-fade-in">
                    <span className="text-red-400">Left Set (3)</span>
                    <span className="text-blue-400">Right Set (2)</span>
                 </div>
             )}
          </div>

          <div className="bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-700 flex flex-col justify-center gap-6 shadow-inner flex-1">
             <div className="animate-fade-in" key={step}>
                 <div className="text-xs uppercase font-black tracking-widest text-fuchsia-500 mb-2">Investigation</div>
                 <h4 className="text-2xl font-bold text-white mb-4">{stepData[step].title}</h4>
                 <p className="text-base text-slate-300 leading-relaxed">{stepData[step].desc}</p>
                 {step >= 2 && (
                     <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono font-bold text-fuchsia-300">
                        Path: <span className="text-red-400">L1</span> ➔ <span className="text-blue-400">R1</span> ➔ <span className="text-red-400">L2</span> ➔ <span className="text-blue-400">R2</span> ➔ <span className="text-amber-400 bg-amber-900/30 px-2 py-1 rounded">L3 (STUCK!)</span>
                     </div>
                 )}
             </div>
             
             <button onClick={() => setStep(step === 3 ? 0 : step + 1)} className={`mt-auto w-full md:w-auto self-start px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 ${step === 3 ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-fuchsia-500 text-slate-950 hover:bg-fuchsia-400 hover:shadow-fuchsia-500/50'}`}>
                {stepData[step].btn}
             </button>
          </div>
       </div>
    </div>
  )
};


const PathAndSpanning = () => {
  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-amber-400 tracking-tight">3. Routes & Spanning Trees 🗺️</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          From routing internet packets to minimizing physical wire costs, graph optimization is a trillion-dollar industry.
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
         <div className="bg-slate-900 border-2 border-amber-500/30 p-8 rounded-3xl shadow-xl flex flex-col">
            <h3 className="text-2xl font-black text-amber-400 mb-2">Euler Circuit</h3>
            <p className="text-slate-400 text-sm mb-6">"The Mail Carrier Problem"</p>
            
            <div className="flex-1 space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <strong className="text-white block mb-1">Goal:</strong>
                    <span className="text-slate-300 text-sm">Cross every single <strong className="text-amber-400">EDGE</strong> exactly once, and return to start.</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <strong className="text-white block mb-1">The Magic Rule (Euler's Theorem):</strong>
                    <span className="text-slate-300 text-sm">An Euler Circuit ONLY exists if <strong>EVERY vertex has an EVEN degree</strong>. (You need a way in, and a way out, every time).</span>
                </div>
            </div>
         </div>

         <div className="bg-slate-900 border-2 border-fuchsia-500/30 p-8 rounded-3xl shadow-xl flex flex-col">
            <h3 className="text-2xl font-black text-fuchsia-400 mb-2">Hamiltonian Cycle</h3>
            <p className="text-slate-400 text-sm mb-6">"The Traveling Salesperson Problem"</p>
            
            <div className="flex-1 space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <strong className="text-white block mb-1">Goal:</strong>
                    <span className="text-slate-300 text-sm">Visit every single <strong className="text-fuchsia-400">VERTEX</strong> exactly once, and return to start.</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <strong className="text-white block mb-1">The Hard Truth:</strong>
                    <span className="text-slate-300 text-sm">Unlike Euler, there is NO simple magic rule for Hamiltonian cycles! It is an NP-Complete problem. We rely on complex approximations (Dirac's/Ore's Theorems).</span>
                </div>
            </div>
         </div>
      </div>

      <MentorInsight title="Minimal Spanning Trees (MST)" color="amber">
        Imagine you are an engineer tasked with connecting 5 cities with fiber optic cables. Cables cost money per mile. You want to connect all cities (Spanning) without creating wasteful loops (Tree), using the absolute minimum wire possible (Minimal).
        <br/><br/>
        <strong>Kruskal's Algorithm:</strong> Sort all cables by price. Buy the absolute cheapest one anywhere on the map. Keep buying the cheapest ones, skipping any that create a loop, until everything is connected!
        <br/>
        <strong>Prim's Algorithm:</strong> Start at one city. Look at the cables attached to you. Pick the cheapest one. Now look at all cables attached to your new growing network. Pick the cheapest one. Repeat!
      </MentorInsight>

      <div className="max-w-4xl mx-auto">
          <FormalDefinition color="cyan" term="Euler's Formula for Planar Graphs" layman="The Flat Graph Law" def="If you can draw a connected graph on a piece of paper WITHOUT any edges crossing each other, it is a Planar Graph. For all planar graphs, the relationship between Vertices (V), Edges (E), and Regions/Faces (F) is always mathematically locked." formula="V - E + F = 2" />
      </div>

      {/* Injecting the two new case studies at the bottom of the section */}
      <EulerCaseStudy />
      <HamiltonianCaseStudy />

    </div>
  );
};

// ==========================================
// PHASE 4: MINIMAL SPANNING TREES (NEW)
// ==========================================
const MSTAlgorithms = () => {
  const [algo, setAlgo] = useState('kruskal');
  const [step, setStep] = useState(0);

  // =====================================
  // KRUSKAL'S DATA (From User Image 2)
  // =====================================
  const kruskalNodes = [
    { id: '0', x: 15, y: 50 }, { id: '1', x: 35, y: 20 }, { id: '2', x: 55, y: 20 }, 
    { id: '3', x: 75, y: 20 }, { id: '4', x: 90, y: 50 }, { id: '5', x: 75, y: 80 }, 
    { id: '6', x: 55, y: 80 }, { id: '7', x: 35, y: 80 }, { id: '8', x: 55, y: 50 }
  ];

  const kruskalEdges = [
    { id: '7-6', n1: '7', n2: '6', w: 1 }, { id: '2-8', n1: '2', n2: '8', w: 2 },
    { id: '6-5', n1: '6', n2: '5', w: 2 }, { id: '0-1', n1: '0', n2: '1', w: 4 },
    { id: '2-5', n1: '2', n2: '5', w: 4 }, { id: '8-6', n1: '8', n2: '6', w: 6 },
    { id: '2-3', n1: '2', n2: '3', w: 7 }, { id: '7-8', n1: '7', n2: '8', w: 7 },
    { id: '0-7', n1: '0', n2: '7', w: 8 }, { id: '1-2', n1: '1', n2: '2', w: 8 },
    { id: '3-4', n1: '3', n2: '4', w: 9 }, { id: '5-4', n1: '5', n2: '4', w: 10 },
    { id: '1-7', n1: '1', n2: '7', w: 11 }, { id: '3-5', n1: '3', n2: '5', w: 14 }
  ];

  const kruskalSteps = [
    { msg: "Step 0: The Global Sort. Kruskal's lists EVERY edge in the world from cheapest to most expensive: [1, 2, 2, 4, 4, 6, 7, 7, 8, 8, 9, 10, 11, 14].", edges: [], highlight: null, rejected: [] },
    { msg: "Step 1: Pick the absolute cheapest globally. (7,6) costs 1. Add it to our network.", edges: ['7-6'], highlight: '7-6', rejected: [] },
    { msg: "Step 2: Next cheapest is (2,8) costing 2. It's completely disconnected from our first edge, but Kruskal doesn't care! We add it.", edges: ['7-6', '2-8'], highlight: '2-8', rejected: [] },
    { msg: "Step 3: Next is (6,5) costing 2. No cycles formed. Added.", edges: ['7-6', '2-8', '6-5'], highlight: '6-5', rejected: [] },
    { msg: "Step 4: Next is (0,1) costing 4. Another disconnected island! Added.", edges: ['7-6', '2-8', '6-5', '0-1'], highlight: '0-1', rejected: [] },
    { msg: "Step 5: Next is (2,5) costing 4. This joins two of our islands. Safe.", edges: ['7-6', '2-8', '6-5', '0-1', '2-5'], highlight: '2-5', rejected: [] },
    { msg: "Step 6: Cycle Alert! Next is (8,6) costing 6. If we add this, we form a closed loop (8-2-5-6). Trees CANNOT have loops. Reject it!", edges: ['7-6', '2-8', '6-5', '0-1', '2-5'], highlight: null, rejected: ['8-6'] },
    { msg: "Step 7: Next is (2,3) costing 7. Safe to add.", edges: ['7-6', '2-8', '6-5', '0-1', '2-5', '2-3'], highlight: '2-3', rejected: ['8-6'] },
    { msg: "Step 8: Cycle Alert! Next is (7,8) costing 7. Adding this creates a massive loop (7-6-5-2-8). Reject it!", edges: ['7-6', '2-8', '6-5', '0-1', '2-5', '2-3'], highlight: null, rejected: ['8-6', '7-8'] },
    { msg: "Step 9: Next is (0,7) costing 8. This safely connects the left island to the main network.", edges: ['7-6', '2-8', '6-5', '0-1', '2-5', '2-3', '0-7'], highlight: '0-7', rejected: ['8-6', '7-8'] },
    { msg: "Step 10: Cycle Alert! Next is (1,2) costing 8. Adding this closes the outer left loop (1-0-7-6-5-2). Reject!", edges: ['7-6', '2-8', '6-5', '0-1', '2-5', '2-3', '0-7'], highlight: null, rejected: ['8-6', '7-8', '1-2'] },
    { msg: "Step 11: Next is (3,4) costing 9. Safe to add.", edges: ['7-6', '2-8', '6-5', '0-1', '2-5', '2-3', '0-7', '3-4'], highlight: '3-4', rejected: ['8-6', '7-8', '1-2'] },
    { msg: "Complete! We connected all 9 nodes using exactly 8 edges. Total optimal cost is 37. Remaining expensive edges are discarded.", edges: ['7-6', '2-8', '6-5', '0-1', '2-5', '2-3', '0-7', '3-4'], highlight: null, rejected: ['8-6', '7-8', '1-2', '5-4', '1-7', '3-5'] }
  ];

  // =====================================
  // PRIM'S DATA (From User Image 1)
  // =====================================
  const primNodes = [
    { id: 'a', x: 25, y: 25 }, { id: 'b', x: 10, y: 50 }, { id: 'c', x: 25, y: 75 }, 
    { id: 'd', x: 45, y: 25 }, { id: 'e', x: 45, y: 75 }, { id: 'f', x: 55, y: 50 }, 
    { id: 'g', x: 70, y: 30 }, { id: 'h', x: 75, y: 75 }, { id: 'i', x: 90, y: 50 }
  ];

  const primEdges = [
    { id: 'a-b', n1: 'a', n2: 'b', w: 1 }, { id: 'a-c', n1: 'a', n2: 'c', w: 6 },
    { id: 'a-d', n1: 'a', n2: 'd', w: 5 }, { id: 'b-c', n1: 'b', n2: 'c', w: 6 },
    { id: 'c-f', n1: 'c', n2: 'f', w: 3 }, { id: 'c-e', n1: 'c', n2: 'e', w: 7 },
    { id: 'd-f', n1: 'd', n2: 'f', w: 2 }, { id: 'd-g', n1: 'd', n2: 'g', w: 10 },
    { id: 'e-h', n1: 'e', n2: 'h', w: 12 }, { id: 'f-h', n1: 'f', n2: 'h', w: 8 },
    { id: 'g-h', n1: 'g', n2: 'h', w: 7 }, { id: 'g-i', n1: 'g', n2: 'i', w: 3 },
    { id: 'h-i', n1: 'h', n2: 'i', w: 8 }
  ];

  const primSteps = [
    { msg: "Step 0: The Viral Growth. Prim's starts at a single random node. Let's start at 'a'. The immediate 'Frontier' edges leaving 'a' are [a-b(1), a-d(5), a-c(6)].", mstNodes: ['a'], edges: [], highlight: null, frontier: ['a-b', 'a-c', 'a-d'], rejected: [] },
    { msg: "Step 1: Expand to the cheapest frontier. a-b(1) is the cheapest way out. Welcome node 'b' to our network!", mstNodes: ['a', 'b'], edges: ['a-b'], highlight: 'a-b', frontier: ['a-d', 'a-c', 'b-c'], rejected: [] },
    { msg: "Step 2: Network is {a,b}. The cheapest edge leaving our territory is a-d(5). Welcome node 'd'!", mstNodes: ['a', 'b', 'd'], edges: ['a-b', 'a-d'], highlight: 'a-d', frontier: ['a-c', 'b-c', 'd-f', 'd-g'], rejected: [] },
    { msg: "Step 3: Network is {a,b,d}. The cheapest edge leaving our territory is d-f(2). Welcome node 'f'!", mstNodes: ['a', 'b', 'd', 'f'], edges: ['a-b', 'a-d', 'd-f'], highlight: 'd-f', frontier: ['a-c', 'b-c', 'd-g', 'c-f', 'f-h'], rejected: [] },
    { msg: "Step 4: Network is {a,b,d,f}. Cheapest leaving edge is c-f(3). Welcome node 'c'! Notice edges a-c(6) and b-c(6) are now internal loop hazards, discard them.", mstNodes: ['a', 'b', 'd', 'f', 'c'], edges: ['a-b', 'a-d', 'd-f', 'c-f'], highlight: 'c-f', frontier: ['d-g', 'f-h', 'c-e'], rejected: ['a-c', 'b-c'] },
    { msg: "Step 5: Network is {a,b,d,f,c}. Cheapest frontier is c-e(7). Welcome node 'e'!", mstNodes: ['a', 'b', 'd', 'f', 'c', 'e'], edges: ['a-b', 'a-d', 'd-f', 'c-f', 'c-e'], highlight: 'c-e', frontier: ['d-g', 'f-h', 'e-h'], rejected: ['a-c', 'b-c'] },
    { msg: "Step 6: Network is {a,b,d,f,c,e}. Cheapest way out is f-h(8). Welcome node 'h'! The edge e-h(12) is now an internal loop hazard (discard).", mstNodes: ['a', 'b', 'd', 'f', 'c', 'e', 'h'], edges: ['a-b', 'a-d', 'd-f', 'c-f', 'c-e', 'f-h'], highlight: 'f-h', frontier: ['d-g', 'g-h', 'h-i'], rejected: ['a-c', 'b-c', 'e-h'] },
    { msg: "Step 7: Network is {a,b,d,f,c,e,h}. Cheapest frontier is g-h(7). Welcome node 'g'! The edge d-g(10) is a loop hazard (discard).", mstNodes: ['a', 'b', 'd', 'f', 'c', 'e', 'h', 'g'], edges: ['a-b', 'a-d', 'd-f', 'c-f', 'c-e', 'f-h', 'g-h'], highlight: 'g-h', frontier: ['h-i', 'g-i'], rejected: ['a-c', 'b-c', 'e-h', 'd-g'] },
    { msg: "Step 8: Cheapest frontier is g-i(3). Welcome node 'i'! All nodes are enveloped. MST is complete with cost 36.", mstNodes: ['a', 'b', 'd', 'f', 'c', 'e', 'h', 'g', 'i'], edges: ['a-b', 'a-d', 'd-f', 'c-f', 'c-e', 'f-h', 'g-h', 'g-i'], highlight: null, frontier: [], rejected: ['a-c', 'b-c', 'e-h', 'd-g', 'h-i'] }
  ];

  // Dynamic assignment based on selected algorithm
  const graphNodes = algo === 'kruskal' ? kruskalNodes : primNodes;
  const graphEdges = algo === 'kruskal' ? kruskalEdges : primEdges;
  const steps = algo === 'kruskal' ? kruskalSteps : primSteps;
  const currentStep = steps[step];

  // Calculate total cost of current MST edges
  const totalCost = currentStep.edges.reduce((sum, edgeId) => {
      const edge = graphEdges.find(e => e.id === edgeId || `${e.n2}-${e.n1}` === edgeId);
      return sum + (edge ? edge.w : 0);
  }, 0);

  // Handlers
  const handleAlgoSwitch = (newAlgo) => {
      setAlgo(newAlgo);
      setStep(0);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-emerald-400 tracking-tight">4. Minimal Spanning Trees 🌲</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          The art of connecting an entire network with the absolute minimum cost, avoiding all loops.
        </p>
      </header>

      <MentorInsight title="The Philosophy of Connection" color="emerald">
        Below are the two actual problems you uploaded! Toggle between the algorithms. <br/><br/>
        <strong>Kruskal's Graph:</strong> Notice how Kruskal grabs the cheap `(0,1)` and `(6,5)` edges early, creating disconnected "islands" that only merge together at the very end.<br/>
        <strong>Prim's Graph:</strong> Notice how Prim's algorithm starts at `a` and slowly infects adjacent nodes, refusing to build any wires that aren't physically connected to its main territory.
      </MentorInsight>

      <div className="bg-slate-900 border border-slate-700 p-6 md:p-10 rounded-3xl shadow-xl flex flex-col relative">
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-10 border-b border-slate-800 pb-8">
          <button 
            onClick={() => handleAlgoSwitch('kruskal')} 
            className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 ${algo === 'kruskal' ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-slate-950 text-slate-500 border border-slate-800 hover:text-white'}`}
          >
            Kruskal's Problem (Global)
          </button>
          <button 
            onClick={() => handleAlgoSwitch('prim')} 
            className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 ${algo === 'prim' ? 'bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-slate-950 text-slate-500 border border-slate-800 hover:text-white'}`}
          >
            Prim's Problem (Local)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="text-xs uppercase font-black tracking-widest text-slate-500 mb-2">Live Execution Log</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {algo === 'kruskal' ? "Sorting all edges globally..." : "Expanding the local frontier..."}
              </h3>
              
              <div className={`p-6 rounded-2xl border-2 mb-8 text-base md:text-xl font-medium leading-relaxed shadow-inner min-h-[140px] flex items-center ${algo === 'kruskal' ? 'bg-cyan-900/20 border-cyan-500/50 text-cyan-200' : 'bg-amber-900/20 border-amber-500/50 text-amber-200'}`}>
                {currentStep.msg}
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest transition-all ${step === 0 ? 'bg-slate-950 text-slate-700 cursor-not-allowed' : 'bg-slate-800 text-white hover:bg-slate-700 active:scale-95 border border-slate-600'}`}>
                 ⬅ Prev
              </button>
              <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1} className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest transition-all ${step === steps.length - 1 ? 'bg-slate-950 text-slate-700 cursor-not-allowed' : 'bg-emerald-500 text-slate-900 hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] active:scale-95'}`}>
                 Next ➡
              </button>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col items-center shadow-inner relative">
             <div className="absolute top-4 left-4 flex flex-col gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-700/50 backdrop-blur-sm z-10">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase"><span className="w-3 h-1 bg-emerald-500 rounded"></span> In MST</div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase"><span className="w-3 h-1 bg-blue-500 rounded"></span> Active Check</div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase"><span className="w-3 h-0.5 bg-red-500 rounded border-t border-dashed border-red-500"></span> Rejected (Loop)</div>
                {algo === 'prim' && <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase"><span className="w-3 h-0.5 bg-amber-500 rounded border-t border-dashed border-amber-500"></span> Frontier Edge</div>}
             </div>

             {/* NEW: TOTAL COST BADGE - SHOWN ONLY AT THE FINAL STEP */}
             {step === steps.length - 1 && (
                 <div className="absolute top-4 right-4 bg-emerald-900/90 text-emerald-300 px-5 py-3 rounded-xl border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] flex flex-col items-center animate-bounce-in z-10 backdrop-blur-md">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Total MST Cost</span>
                    <span className="text-3xl font-black font-mono">{totalCost}</span>
                 </div>
             )}

             <div className="h-[350px] w-full flex justify-center mt-4">
                <svg viewBox="0 0 100 100" className="w-full h-full max-w-[350px] overflow-visible">
                  {/* Edges */}
                  {graphEdges.map(edge => {
                     const isMST = currentStep.edges.includes(edge.id) || currentStep.edges.includes(`${edge.n2}-${edge.n1}`);
                     const isHighlight = currentStep.highlight === edge.id || currentStep.highlight === `${edge.n2}-${edge.n1}`;
                     const isRejected = currentStep.rejected?.includes(edge.id) || currentStep.rejected?.includes(`${edge.n2}-${edge.n1}`);
                     const isFrontier = currentStep.frontier?.includes(edge.id) || currentStep.frontier?.includes(`${edge.n2}-${edge.n1}`);

                     let strokeColor = "#334155";
                     let strokeWidth = "2";
                     let strokeDash = "";
                     let opacity = "0.5";

                     if (isHighlight) { strokeColor = "#3b82f6"; strokeWidth = "4"; opacity = "1"; }
                     else if (isMST) { strokeColor = "#10b981"; strokeWidth = "3"; opacity = "1"; }
                     else if (isRejected) { strokeColor = "#ef4444"; strokeWidth = "1.5"; strokeDash = "2 2"; opacity = "0.8"; }
                     else if (isFrontier) { strokeColor = "#f59e0b"; strokeWidth = "2"; strokeDash = "2 2"; opacity = "1"; }

                     const n1 = graphNodes.find(n => n.id === edge.n1);
                     const n2 = graphNodes.find(n => n.id === edge.n2);
                     
                     return (
                       <g key={edge.id} style={{ opacity: opacity }} className="transition-all duration-500">
                         <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke={strokeColor} strokeWidth={strokeWidth} strokeDasharray={strokeDash} className="transition-all duration-500" />
                         {/* Edge Weight Badge */}
                         <circle cx={(n1.x+n2.x)/2} cy={(n1.y+n2.y)/2} r="3.5" fill="#0f172a" stroke={strokeColor} strokeWidth="0.5" className="transition-all duration-500" />
                         <text x={(n1.x+n2.x)/2} y={(n1.y+n2.y)/2} textAnchor="middle" dy=".3em" fill="#f8fafc" fontSize="3" fontWeight="bold" className="font-mono">{edge.w}</text>
                       </g>
                     )
                  })}

                  {/* Nodes */}
                  {graphNodes.map(node => {
                     const isInMST = algo === 'prim' ? currentStep.mstNodes?.includes(node.id) : currentStep.edges.some(e => e.includes(node.id));
                     const isStartNode = algo === 'prim' && node.id === 'a' && step === 0;

                     let fill = '#1e293b';
                     let stroke = '#475569';
                     
                     if (isInMST || isStartNode) { fill = '#064e3b'; stroke = '#10b981'; }

                     return (
                        <g key={node.id} className="transition-all duration-500">
                          <circle cx={node.x} cy={node.y} r="4.5" fill={fill} stroke={stroke} strokeWidth="1.5" className="transition-all duration-500" />
                          <text x={node.x} y={node.y} textAnchor="middle" dy=".3em" fill="#fff" fontSize="4" fontWeight="black" className="font-mono">{node.id}</text>
                        </g>
                     )
                  })}
                </svg>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PHASE 5: GRAPH COLORING
// ==========================================
const GraphColoring = () => {
  // A planar graph that requires 4 colors to show coloring
  const nodes = [
    { id: '1', x: 50, y: 15 },
    { id: '2', x: 20, y: 50 },
    { id: '3', x: 80, y: 50 },
    { id: '4', x: 50, y: 85 },
    { id: '5', x: 50, y: 50 } // Center
  ];

  const edges = [
    ['1','2'], ['1','3'], ['2','4'], ['3','4'], // Outer diamond
    ['1','5'], ['2','5'], ['3','5'], ['4','5']  // Inner spokes
  ];

  const colors = [
    { id: 'red', hex: '#ef4444' },
    { id: 'blue', hex: '#3b82f6' },
    { id: 'green', hex: '#10b981' },
    { id: 'yellow', hex: '#eab308' }
  ];

  const [nodeColors, setNodeColors] = useState({});
  const [activeColor, setActiveColor] = useState(colors[0].id);

  const handleColorNode = (id) => {
    setNodeColors({ ...nodeColors, [id]: activeColor });
  };

  // Validation
  let isValid = true;
  let conflicts = [];
  edges.forEach(([n1, n2]) => {
      if (nodeColors[n1] && nodeColors[n2] && nodeColors[n1] === nodeColors[n2]) {
          isValid = false;
          conflicts.push(`${n1}-${n2}`);
      }
  });

  const coloredCount = Object.keys(nodeColors).length;
  const isComplete = coloredCount === nodes.length;
  const isSuccess = isComplete && isValid;

  return (
    <div className="space-y-8 animate-fade-in font-sans mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-fuchsia-400 tracking-tight">5. Chromatic Numbers 🎨</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">
          Graph coloring is used for conflict resolution (e.g., scheduling university exams so no student has two at once). Rule: Two connected nodes CANNOT share the same color.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-5 flex flex-col gap-6">
           <FormalDefinition color="fuchsia" term="Chromatic Number (χ)" layman="The Minimum Palette" def="The absolute minimum number of colors required to color a graph such that no two adjacent vertices share the same color." />
           <FormalDefinition color="fuchsia" term="The Four-Color Theorem" layman="The Map Maker's Rule" def="Any planar graph (a map drawn on a flat surface without crossing lines) can be colored using NO MORE than 4 colors." />

           <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-xl">
              <h3 className="text-white font-bold mb-4">Select Paint Color</h3>
              <div className="flex gap-4 mb-6">
                 {colors.map(c => (
                     <button 
                        key={c.id} 
                        onClick={() => setActiveColor(c.id)}
                        className={`w-12 h-12 rounded-full border-4 transition-all transform active:scale-90 ${activeColor === c.id ? 'scale-110 shadow-lg' : 'opacity-50 hover:opacity-100'}`}
                        style={{ backgroundColor: c.hex, borderColor: activeColor === c.id ? '#fff' : c.hex }}
                     />
                 ))}
              </div>
              <button onClick={() => setNodeColors({})} className="w-full bg-slate-950 text-slate-400 border border-slate-800 py-3 rounded-xl font-bold hover:bg-slate-800 hover:text-white transition-all">
                Reset Graph
              </button>
           </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-xl flex flex-col relative overflow-hidden">
           
           <div className={`bg-slate-950 border rounded-3xl h-[400px] relative shadow-inner flex items-center justify-center p-4 transition-all duration-500 ${!isValid ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : (isSuccess ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-slate-800')}`}>
              <svg viewBox="0 0 100 100" className="w-full h-full max-w-[350px] overflow-visible">
                {edges.map(edge => {
                  const [id1, id2] = edge;
                  const n1 = nodes.find(n => n.id === id1);
                  const n2 = nodes.find(n => n.id === id2);
                  const isConflict = conflicts.includes(`${id1}-${id2}`) || conflicts.includes(`${id2}-${id1}`);
                  
                  return (
                    <line 
                      key={`${id1}-${id2}`} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} 
                      stroke={isConflict ? "#ef4444" : "#334155"} strokeWidth={isConflict ? "4" : "2"} 
                      className={`transition-all duration-300 ${isConflict ? 'animate-pulse drop-shadow-[0_0_5px_red]' : ''}`}
                    />
                  );
                })}
                
                {nodes.map(n => {
                  const colorId = nodeColors[n.id];
                  const hex = colorId ? colors.find(c => c.id === colorId).hex : '#1e293b';
                  const isConflict = conflicts.some(c => c.includes(n.id));

                  return (
                    <g key={n.id} onClick={() => handleColorNode(n.id)} className="cursor-pointer transition-all duration-300 hover:scale-110" style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
                      <circle 
                        cx={n.x} cy={n.y} r="8" 
                        fill={hex} 
                        stroke={isConflict ? '#ef4444' : (colorId ? '#fff' : '#64748b')} 
                        strokeWidth="2" 
                        className={`transition-all duration-300 ${colorId ? 'drop-shadow-md' : ''} ${isConflict ? 'animate-pulse' : ''}`} 
                      />
                      <text x={n.x} y={n.y} textAnchor="middle" dy=".35em" fill={colorId ? '#000' : '#fff'} fontSize="6" fontWeight="black" className="pointer-events-none font-mono">{n.id}</text>
                    </g>
                  )
                })}
              </svg>

              {isSuccess && (
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-emerald-900/90 text-emerald-300 px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-bounce-in backdrop-blur-md">
                    Valid Coloring!
                  </div>
              )}
              {!isValid && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-900/90 text-red-200 px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse backdrop-blur-md">
                    Conflict Detected!
                  </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PHASE 5: THE ULTIMATE EXAM SUITE
// ==========================================
const InteractiveProver = () => {
  const [activeQ, setActiveQ] = useState('q1');
  const [proofStep, setProofStep] = useState(0);
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  const [shuffleSeed, setShuffleSeed] = useState(0); 

  const examData = useMemo(() => ({
    q1: {
      title: "Case 1: Handshaking Verification",
      question: "A graph has 4 vertices with degrees 2, 3, 3, and 4. How many edges does this graph have?",
      premises: ["Formula: Sum of Degrees = 2 * |E|", "Degrees: 2, 3, 3, 4"],
      steps: [
        { expected: '12', options: ['10', '12', '8', '24'], prompt: 'Step 1: Calculate the Sum of all the degrees.', result: 'Sum = 2 + 3 + 3 + 4 = 12.' },
        { expected: '2 * |E|', options: ['|E| / 2', '|V| - 1', '2 * |E|', '|E|²'], prompt: 'Step 2: According to the Handshaking Lemma, the Sum of Degrees is equal to what?', result: 'Sum of Degrees = 2 * |E|.' },
        { expected: '6', options: ['6', '12', '24', '4'], prompt: 'Step 3: Solve for |E|. 12 = 2 * |E|.', result: '|E| = 6.' }
      ],
      conclusion: "The graph has exactly 6 edges."
    },
    q2: {
      title: "Case 2: Kruskal's MST Algorithm",
      question: "You have edges A-B (Cost 4), B-C (Cost 1), A-C (Cost 2), and C-D (Cost 3). Which edge do you pick FIRST in Kruskal's?",
      premises: ["Kruskal's Rule: Always pick the globally cheapest edge first, ignoring any that create cycles."],
      steps: [
        { expected: 'Sort by Cost', options: ['Pick random', 'Start at A', 'Sort by Cost', 'Find highest degree'], prompt: 'Step 1: What is the very first step to execute Kruskal\'s Algorithm?', result: 'Edges sorted: (B-C:1), (A-C:2), (C-D:3), (A-B:4)' },
        { expected: 'B-C (1)', options: ['A-B (4)', 'A-C (2)', 'B-C (1)', 'C-D (3)'], prompt: 'Step 2: Which is the cheapest edge available?', result: 'Selected B-C (Cost 1).' },
        { expected: 'A-C (2)', options: ['C-D (3)', 'A-C (2)', 'A-B (4)', 'None'], prompt: 'Step 3: What is the NEXT cheapest edge? Does it create a cycle with B-C?', result: 'Selected A-C (Cost 2). No cycle formed.' }
      ],
      conclusion: "Kruskal's always builds up from the absolute cheapest connections possible!"
    },
    q3: {
      title: "Case 3: Euler's Planar Formula",
      question: "A connected planar graph has 6 vertices and 9 edges. How many distinct regions (faces) does it divide the plane into?",
      premises: ["Euler's Formula: V - E + F = 2", "V = 6", "E = 9"],
      steps: [
        { expected: '6 - 9 + F = 2', options: ['6 + 9 - F = 2', '6 - 9 + F = 2', '9 - 6 + F = 2', 'V * E = F'], prompt: 'Step 1: Substitute the given values into Euler\'s Planar Formula.', result: '6 - 9 + F = 2' },
        { expected: '-3', options: ['3', '-3', '15', '0'], prompt: 'Step 2: Simplify the known numbers (6 - 9).', result: 'We get: -3 + F = 2.' },
        { expected: '5', options: ['5', '1', '-1', '11'], prompt: 'Step 3: Solve for F. F = 2 + 3.', result: 'F = 5.' }
      ],
      conclusion: "The graph creates exactly 5 regions (including the infinite outside region)!"
    },
    q4: {
      title: "Case 4: Euler Circuit Logic",
      question: "A graph has vertices A, B, C, D, E. Their degrees are 2, 4, 2, 4, and 3. Does it have an Euler Circuit?",
      premises: ["Euler Circuit Rule: EVERY vertex must have an EVEN degree."],
      steps: [
        { expected: 'No, vertex E is odd (3)', options: ['Yes, mostly even', 'No, vertex E is odd (3)', 'Yes, sum is 15', 'Cannot be determined'], prompt: 'Step 1: Check the degrees. Does this graph satisfy the absolute rule for Euler Circuits?', result: 'Vertex E has degree 3 (Odd).' },
        { expected: 'Euler Path only', options: ['Euler Circuit', 'Hamiltonian Cycle', 'Euler Path only', 'Nothing'], prompt: 'Step 2: If a graph has exactly TWO odd vertices, what does it have? (Wait, we only have ONE odd vertex here... impossible by Handshaking lemma!). Let\'s assume another vertex was 3.', result: 'A graph with exactly two odd vertices has an Euler PATH, not a circuit.' }
      ],
      conclusion: "Wait! A graph can NEVER have exactly ONE odd vertex (Sum must be even). Trick question exposed!"
    }
  }), []); 

  const examKeys = Object.keys(examData);
  const activeCase = examData[activeQ];

  const currentOptions = useMemo(() => {
    return shuffleArray(activeCase.steps[proofStep]?.options || []);
  }, [activeQ, proofStep, activeCase.steps, shuffleSeed]);

  const handleCaseSwitch = (q) => { 
      setActiveQ(q); 
      setProofStep(0); 
      setFeedback({ text: '', type: '' }); 
      setShuffleSeed(prev => prev + 1); 
  };

  const handleProofGuess = (guess) => {
      if (guess === activeCase.steps[proofStep].expected) {
          if (proofStep === activeCase.steps.length - 1) {
              setProofStep(proofStep + 1); setFeedback({ text: 'Proof Successfully Derived!', type: 'success' });
          } else {
              setProofStep(proofStep + 1); setFeedback({ text: 'Valid deduction. Proceed.', type: 'success' });
              setShuffleSeed(prev => prev + 1); 
          }
      } else { 
          setFeedback({ text: 'Logic Error. Rethink the graph rule.', type: 'error' }); 
      }
  };

  return (
    <div className="space-y-8 animate-fade-in mx-2 md:mx-0 pb-12">
      <header className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 tracking-tight">Master Prover 🕵️‍♂️</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-2">Deduce complex graph theorems step-by-step interactively.</p>
      </header>

      <div className="bg-slate-900 border-2 border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 bg-slate-950 pt-4 px-4 overflow-x-auto scrollbar-hide">
            {examKeys.map((q) => (
                <button key={q} onClick={() => handleCaseSwitch(q)} className={`px-8 py-5 font-black tracking-widest uppercase text-sm whitespace-nowrap border-b-4 transition-all ${activeQ === q ? `border-cyan-400 text-cyan-400 bg-slate-900` : 'border-transparent text-slate-500 hover:text-slate-300'}`}>
                    {examData[q].title}
                </button>
            ))}
        </div>
        
        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-inner">
                <div className="text-white text-base md:text-lg font-bold mb-8 bg-slate-900 p-6 rounded-2xl border-l-4 border-cyan-500 shadow-lg">{activeCase.question}</div>
                
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
                        <p className="text-cyan-300 mb-8 font-bold bg-cyan-900/20 p-5 rounded-xl border border-cyan-500/30 text-lg leading-relaxed">{activeCase.steps[proofStep].prompt}</p>
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
    { q: "What defines two graphs as being 'Isomorphic'?", opts: ["They have the same number of vertices and edges, with identical connection structures.", "They are drawn to look exactly identical visually.", "They are both planar.", "They have the exact same edge lengths."], ans: 0, exp: "Isomorphism ignores visual layout. It strictly cares that the fundamental network structure (who is connected to who) maps 1-to-1." },
    { q: "A tree graph with 50 vertices must have exactly how many edges?", opts: ["50", "49", "51", "25"], ans: 1, exp: "A tree always has exactly |V| - 1 edges. So 50 - 1 = 49 edges." },
    { q: "Which tree traversal algorithm processes the ROOT node first, before its left and right children? (N-L-R)", opts: ["In-Order", "Post-Order", "Pre-Order", "Level-Order"], ans: 2, exp: "Pre-Order hits the Node (Root) first, then Left, then Right." },
    { q: "What is the primary difference between Kruskal's and Prim's Algorithms for Minimal Spanning Trees?", opts: ["Kruskal's is for directed graphs, Prim's for undirected.", "Kruskal's sorts all edges globally by cost, Prim's grows outward from a single starting vertex.", "Prim's is faster on small graphs.", "There is no difference in approach."], ans: 1, exp: "Kruskal's takes a global approach (sorting all edges). Prim's takes a localized, viral growth approach from a starting node." },
    { q: "According to Euler's rule, a connected graph has an Euler Circuit ONLY IF:", opts: ["Every vertex has an even degree.", "It has exactly two odd vertices.", "It is a complete graph.", "It is planar."], ans: 0, exp: "To trace every edge and return to start, you must enter and exit every vertex. Thus, all degrees must be even." },
    { q: "Unlike Euler Circuits, checking for a Hamiltonian Cycle (visiting every vertex exactly once) is:", opts: ["Solved by simply counting degrees.", "Only possible on trees.", "An NP-Complete problem with no simple universal formula.", "Solved using Kuratowski's theorem."], ans: 2, exp: "Hamiltonian cycles are notoriously difficult to calculate universally. It's the basis of the NP-Complete 'Traveling Salesperson Problem'." },
    { q: "Kuratowski's Theorem states a graph is NON-planar if it contains a subgraph homeomorphic to:", opts: ["K5 or K3,3", "C4 or K4", "Any tree", "An Euler circuit"], ans: 0, exp: "K5 (Complete graph on 5 nodes) and K3,3 (Utility graph) are the fundamental building blocks of non-planarity." },
    { q: "What does the Four-Color Theorem state?", opts: ["All graphs can be colored with 4 colors.", "Any PLANAR graph can be colored using at most 4 colors such that no adjacent regions share a color.", "Trees require 4 colors.", "You must use exactly 4 colors."], ans: 1, exp: "The theorem specifically applies to Planar graphs (like maps on a flat piece of paper). They need a maximum of 4 colors." },
    { q: "If you add up the degrees of every vertex in a graph, the result is ALWAYS:", opts: ["An odd number.", "Exactly double the number of edges.", "Equal to the number of vertices.", "Zero."], ans: 1, exp: "The Handshaking Lemma: Since every edge connects two vertices, it adds 2 to the total degree count." },
    { q: "Which of the following is NOT a property of a Tree?", opts: ["It is fully connected.", "It has no cycles.", "Adding any new edge creates a cycle.", "It must contain an Euler Circuit."], ans: 3, exp: "A tree cannot contain an Euler Circuit, because trees have no cycles at all! And Euler circuits are entirely composed of loops." }
  ], []);

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
      setQuizSeed(Math.random()); 
      setQuizStarted(true);
  };

  const handleCheck = () => { if (selected === null) return; setChecked(true); if (selected === questions[currentQ].ans) setScore(score + 1); };
  const handleNext = () => { if (currentQ < questions.length - 1) { setCurrentQ(currentQ + 1); setSelected(null); setChecked(false); } else setShowResults(true); };

  return (
    <div className="space-y-8 animate-fade-in mx-2 md:mx-0 py-8">
      {!quizStarted ? (
        <div className="bg-gradient-to-br from-cyan-900 to-blue-950 rounded-3xl p-10 md:p-16 text-center border-4 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] max-w-6xl mx-auto">
            <div className="text-7xl mb-8 animate-bounce">🎓</div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Final Boss Fight</h2>
            <p className="text-lg md:text-xl text-cyan-200/80 max-w-2xl mx-auto mb-12 font-medium">You have mastered the Network Engine: Trees, Spanning, Paths, and Coloring. Prove your mastery across 10 randomized conceptual questions.</p>
            <button onClick={handleStart} className="px-10 py-5 bg-cyan-500 text-slate-950 text-xl font-black uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95">Initiate Final Exam 🚀</button>
        </div>
      ) : showResults ? (
        <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center border-2 border-emerald-500 shadow-2xl max-w-6xl mx-auto">
            <div className="text-7xl md:text-8xl mb-8">{score === questions.length ? '🏆' : (score > 6 ? '🎖️' : '💪')}</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Exam Complete!</h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 font-medium">Score: <span className="text-emerald-400 font-black">{score}</span> / {questions.length}</p>
            <button onClick={() => {setQuizStarted(false); setCurrentQ(0); setScore(0); setShowResults(false); setSelected(null); setChecked(false);}} className="px-8 py-4 bg-slate-800 text-white font-black uppercase tracking-widest rounded-full hover:bg-slate-700 transition-all border border-slate-600 shadow-lg active:scale-95">Retake Exam</button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-8 md:p-12 shadow-2xl max-w-6xl mx-auto">
            <div className="mb-8 md:mb-10 border-b border-slate-800 pb-6 flex justify-between items-center gap-4">
              <span className="text-cyan-500 font-black uppercase tracking-widest text-sm">Question {currentQ + 1} of {questions.length}</span>
              <span className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-700 font-mono font-bold text-sm text-white shadow-inner">Score: <span className="text-cyan-400">{score}</span></span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-10 leading-relaxed tracking-wide">{questions[currentQ].q}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {questions[currentQ].opts.map((opt, i) => {
                    let c = "p-5 md:p-8 rounded-2xl border-2 text-left font-bold text-lg transition-all ";
                    if (!checked) c += selected === i ? "bg-cyan-600/90 border-cyan-400 text-white transform scale-[1.03] shadow-[0_0_20px_rgba(6,182,212,0.4)]" : "bg-slate-950 border-slate-700 text-slate-300 hover:border-cyan-500/70 hover:bg-slate-900";
                    else c += i === questions[currentQ].ans ? "bg-emerald-900/80 border-emerald-500 text-emerald-300 shadow-inner" : (selected === i ? "bg-red-900/80 border-red-500 text-red-300 opacity-50" : "bg-slate-950 border-slate-800 opacity-30");
                    return <button key={i} onClick={() => !checked && setSelected(i)} disabled={checked} className={c}>{opt}</button>;
                })}
            </div>
            {!checked ? (
                <button onClick={handleCheck} disabled={selected === null} className={`px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-lg w-full md:w-auto transition-all ${selected !== null ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-400 hover:scale-[1.02]' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>Verify Answer</button>
            ) : (
                <div className="animate-fade-in">
                    <div className={`p-6 rounded-2xl border-2 mb-8 text-lg font-medium shadow-inner ${selected === questions[currentQ].ans ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-300' : 'bg-cyan-900/20 border-cyan-500/50 text-cyan-300'}`}>
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
// THE ROOT COMPONENT: UNIT 5 MASTER HUB
// ==========================================
export default function Unit5MasterHub() {
  const [activePhase, setActivePhase] = useState('basics'); 
  
  const [activeSubTabs, setActiveSubTabs] = useState({
    basics: 'engine', trees: 'traversals', paths: 'routes', mst: 'algorithms', color: 'engine', exam: 'prover'
  });

  const handleSubTabChange = (tabId) => setActiveSubTabs(prev => ({ ...prev, [activePhase]: tabId }));

  const PHASES = [
    { id: 'basics', title: '1. Graphs & Isomorphism', icon: '🕸️' },
    { id: 'trees', title: '2. Trees & Traversals', icon: '🌳' },
    { id: 'paths', title: '3. Paths & Spanning', icon: '🗺️' },
    { id: 'mst', title: '4. Minimal Spanning Trees', icon: '🌲' },
    { id: 'color', title: '5. Graph Coloring', icon: '🎨' },
    { id: 'exam', title: '6. Final Exam', icon: '🏆' }
  ];

  const SUB_TABS = {
    basics: [
      { id: 'engine', title: 'The Network Builder', icon: '🕸️' }
    ],
    trees: [
      { id: 'traversals', title: 'Traversal Simulator', icon: '🌳' }
    ],
    paths: [
      { id: 'routes', title: 'Euler & Hamilton', icon: '🗺️' }
    ],
    mst: [
      { id: 'algorithms', title: 'Kruskal & Prim', icon: '🌲' }
    ],
    color: [
      { id: 'engine', title: 'Chromatic Solver', icon: '🎨' }
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
              <div className="text-[10px] md:text-xs font-bold tracking-widest text-cyan-500 uppercase mb-1 flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> Unit 5 • Full Masterclass
              </div>
              <h1 className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">THE NETWORK ENGINE</h1>
            </div>
            <div className="w-full md:w-auto overflow-x-auto scrollbar-hide py-1">
              <nav className="flex flex-nowrap gap-2 justify-start md:justify-end w-max mx-auto md:mx-0 px-2">
                  {PHASES.map(phase => (
                      <button key={phase.id} onClick={() => setActivePhase(phase.id)} className={`whitespace-nowrap px-4 py-2 rounded-xl font-black text-xs md:text-sm transition-all flex items-center gap-2 shrink-0 ${activePhase === phase.id ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.4)] transform scale-105' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700'}`}>
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
        {activePhase === 'basics' && <GraphBasics />}
        {activePhase === 'trees' && <TreeEngine />}
        {activePhase === 'paths' && <PathAndSpanning />}
        {activePhase === 'mst' && <MSTAlgorithms />}
        {activePhase === 'color' && <GraphColoring />}
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