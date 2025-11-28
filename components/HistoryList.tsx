import React from 'react';
import { PatientData } from '../types';

interface HistoryListProps {
  records: PatientData[];
  onDelete: (id: string) => void;
  onClose: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ records, onDelete, onClose }) => {
  return (
    <div className="space-y-4 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800">Histórico</h2>
        <button onClick={onClose} className="text-medical-600 font-medium">Voltar</button>
      </div>
      
      {records.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
          <p className="text-slate-500">Nenhum registro salvo.</p>
        </div>
      ) : (
        records.map((record) => (
          <div key={record.id} className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-slate-800">{record.name}</h3>
                <p className="text-xs text-slate-500">Atendimento: {record.mrn}</p>
                <p className="text-xs text-slate-400">{new Date(record.date).toLocaleDateString()} {new Date(record.date).toLocaleTimeString()}</p>
              </div>
              <button 
                onClick={() => onDelete(record.id)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Delete"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm font-semibold text-medical-700">SAPS 3: {record.totalScore}</span>
              <span className="text-sm font-semibold text-slate-700">Mortalidade: {record.mortality.toFixed(1)}%</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryList;