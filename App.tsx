
import React, { useState, useEffect, useMemo } from 'react';
import { SAPS3_VARIABLES, CATEGORIES } from './constants';
import { Saps3Variable, CalculationResult, PatientData } from './types';
import InputSection from './components/InputSection';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';

const App: React.FC = () => {
  // State
  const [patientName, setPatientName] = useState('');
  const [patientMrn, setPatientMrn] = useState('');
  // Selections now store the value ID (string) instead of points directly
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [view, setView] = useState<'calculator' | 'history'>('calculator');
  const [history, setHistory] = useState<PatientData[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('saps3_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    
    // Default initialization removed to ensure all variables start unselected
  }, []);

  // Save history effect
  useEffect(() => {
    localStorage.setItem('saps3_history', JSON.stringify(history));
  }, [history]);

  // Handle Input Change with Toggle Logic
  const handleSelectionChange = (id: string, value: string) => {
    setSelections(prev => {
      const current = prev[id];
      // Check if user clicked the already selected option
      if (current === value) {
        // Toggle OFF: Remove the key from selections
        const newSelections = { ...prev };
        delete newSelections[id];
        return newSelections;
      }
      
      // Standard selection change
      return { ...prev, [id]: value };
    });
  };

  // Calculation Logic
  const result: CalculationResult = useMemo(() => {
    // 1. Calculate Score by looking up points for each selected value
    // Base score starts at 16 per user requirement
    let score = 16;
    
    Object.entries(selections).forEach(([varId, selectedValue]) => {
      // Logic: If 'no_surgery' is selected in surgical_status, ignore 'surgery_location' points
      if (varId === 'surgery_location' && selections['surgical_status'] === 'no_surgery') {
        return;
      }

      const variable = SAPS3_VARIABLES.find(v => v.id === varId);
      if (variable) {
        const option = variable.options.find(o => o.value === selectedValue);
        if (option) {
          score += option.points;
        }
      }
    });
    
    // 2. Calculate Mortality
    // Formula: x = -32.6659 + ln(Score + 20.5958) * 7.3068
    // Mort% = (e^x / (1 + e^x)) * 100
    
    const x = -32.6659 + Math.log(score + 20.5958) * 7.3068;
    const probability = Math.exp(x) / (1 + Math.exp(x));
    const mortality = probability * 100;

    return {
      score,
      mortality
    };
  }, [selections]);

  // Actions
  const handleSave = () => {
    if (!patientName.trim()) {
      alert("Por favor, insira o nome do paciente.");
      return;
    }
    
    const newRecord: PatientData = {
      id: Date.now().toString(),
      name: patientName,
      mrn: patientMrn,
      date: new Date().toISOString(),
      selections: { ...selections },
      totalScore: result.score,
      mortality: result.mortality
    };

    setHistory(prev => [newRecord, ...prev]);
    alert("Registro salvo com sucesso!");
  };

  const handleDelete = (id: string) => {
    if(window.confirm("Tem certeza que deseja excluir este registro?")) {
      setHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleShare = async () => {
    const text = `SAPS 3 Report\nPaciente: ${patientName || 'N/A'}\nAtendimento: ${patientMrn || 'N/A'}\nScore: ${result.score}\nMortalidade Estimada: ${result.mortality.toFixed(1)}%\nData: ${new Date().toLocaleDateString()}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SAPS 3 Resultado',
          text: text,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback
      alert("Texto copiado para área de transferência:\n\n" + text);
      navigator.clipboard.writeText(text);
    }
  };

  // Group variables by category
  const variablesByCategory = useMemo(() => {
    const grouped: Record<string, Saps3Variable[]> = {
      'Admission': [],
      'Physiology': [],
      'Comorbidities': [],
      'Reasons': []
    };
    SAPS3_VARIABLES.forEach(v => {
      if (grouped[v.category]) {
        grouped[v.category].push(v);
      }
    });
    return grouped;
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans pb-32">
      {/* Header */}
      <header className="bg-medical-700 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-lg font-bold">SAPS 3 Calc</h1>
          </div>
          <button 
            onClick={() => setView(view === 'calculator' ? 'history' : 'calculator')}
            className="text-sm bg-medical-800 hover:bg-medical-900 px-3 py-1.5 rounded transition-colors"
          >
            {view === 'calculator' ? 'Histórico' : 'Calculadora'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-3 py-6">
        
        {view === 'history' ? (
          <HistoryList 
            records={history} 
            onDelete={handleDelete}
            onClose={() => setView('calculator')} 
          />
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Patient Info Card */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-4">Dados do Paciente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-shadow"
                    placeholder="Nome do Paciente"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Atendimento (ID)</label>
                  <input
                    type="text"
                    value={patientMrn}
                    onChange={(e) => setPatientMrn(e.target.value)}
                    className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-shadow"
                    placeholder="Número do Registro"
                  />
                </div>
              </div>
            </div>

            {/* Instruction Banner */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r shadow-sm">
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>Instruções:</strong> Selecione os valores fisiológicos piores observados na primeira hora de admissão na UTI. Para variáveis não medidas, assuma valores normais.
              </p>
            </div>

            {/* Variable Sections */}
            {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map((catKey) => {
              let variablesToShow = variablesByCategory[catKey];

              // Conditionally hide surgery location if "no surgery" is selected
              if (catKey === 'Admission' && selections['surgical_status'] === 'no_surgery') {
                variablesToShow = variablesToShow.filter(v => v.id !== 'surgery_location');
              }

              return (
                <InputSection
                  key={catKey}
                  title={CATEGORIES[catKey]}
                  variables={variablesToShow}
                  selections={selections}
                  onChange={handleSelectionChange}
                />
              );
            })}

            {/* Privacy Disclaimer */}
            <div className="text-center text-xs text-slate-400 py-4 max-w-lg mx-auto">
              <p>Os dados são processados localmente no seu dispositivo. Nenhuma informação é enviada para servidores externos.</p>
            </div>
          </div>
        )}
      </main>

      {/* Floating Result Footer */}
      {view === 'calculator' && (
        <ResultCard 
          result={result} 
          onSave={handleSave} 
          onShare={handleShare}
          canSave={!!patientName}
        />
      )}
    </div>
  );
};

export default App;
