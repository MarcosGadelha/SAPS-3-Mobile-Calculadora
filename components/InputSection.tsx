import React from 'react';
import { Saps3Variable } from '../types';

interface InputSectionProps {
  title: string;
  variables: Saps3Variable[];
  selections: Record<string, string>;
  onChange: (id: string, value: string) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ title, variables, selections, onChange }) => {
  return (
    <div className="mb-6 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <h3 className="font-bold text-slate-700 text-lg">{title}</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {variables.map((variable, index) => {
           // Determine if we need to show a subcategory header
           const prevSub = index > 0 ? variables[index - 1].subcategory : undefined;
           const currSub = variable.subcategory;
           const showSubheader = currSub && (index === 0 || currSub !== prevSub);

           return (
            <React.Fragment key={variable.id}>
              {showSubheader && (
                <div className="bg-slate-100 px-4 py-2 border-y border-slate-200">
                  <span className="font-bold text-slate-500 text-sm uppercase tracking-wide">{currSub}</span>
                </div>
              )}
              <div className="p-4 flex flex-col md:flex-row md:items-start gap-3 md:gap-6">
                <div className="md:w-5/12 pt-1">
                  <label className="text-slate-800 font-semibold text-sm md:text-base block">
                    {variable.label}
                  </label>
                </div>
                
                <div className="md:w-7/12 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {variable.options.map((opt) => {
                     const isSelected = selections[variable.id] === opt.value;
                     return (
                      <button
                        key={opt.value}
                        onClick={() => onChange(variable.id, opt.value)}
                        className={`
                          relative flex flex-col items-center justify-center p-2.5 rounded-md border text-center transition-all duration-200 select-none
                          ${isSelected 
                            ? 'bg-teal-600 border-teal-600 text-white shadow-md ring-1 ring-teal-600' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                          }
                        `}
                      >
                        <span className="text-sm font-medium leading-tight mb-0.5">{opt.label}</span>
                        <span className={`text-xs font-bold ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                           {opt.points >= 0 ? '+' : ''}{opt.points}
                        </span>
                      </button>
                     );
                  })}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default InputSection;