import React from 'react';
import { CalculationResult } from '../types';

interface ResultCardProps {
  result: CalculationResult | null;
  onSave: () => void;
  onShare: () => void;
  canSave: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onSave, onShare, canSave }) => {
  if (!result) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 md:p-6 z-50 animate-slide-up">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex-1 w-full flex justify-around md:justify-start gap-8">
          <div className="text-center md:text-left">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">SAPS 3 Score</p>
            <p className="text-3xl font-bold text-medical-700">{result.score}</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Mortalidade Est.</p>
            <p className={`text-3xl font-bold ${result.mortality > 50 ? 'text-red-600' : 'text-emerald-600'}`}>
              {result.mortality.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={onShare}
            className="flex-1 md:flex-none bg-white text-medical-600 border border-medical-600 hover:bg-medical-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
          >
            Compartilhar
          </button>
          <button
            onClick={onSave}
            disabled={!canSave}
            className={`flex-1 md:flex-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white transition-colors shadow-lg shadow-medical-500/30 ${
              canSave 
                ? 'bg-medical-600 hover:bg-medical-700' 
                : 'bg-slate-400 cursor-not-allowed'
            }`}
          >
            {canSave ? 'Salvar' : 'Salvo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;