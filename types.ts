
export interface Saps3Option {
  label: string;
  points: number;
  value: string;
}

export interface Saps3Variable {
  id: string;
  label: string;
  category: 'Admission' | 'Physiology' | 'Comorbidities' | 'Reasons';
  subcategory?: string;
  options: Saps3Option[];
}

export interface PatientData {
  id: string;
  name: string;
  mrn: string; // Medical Record Number (Atendimento)
  date: string;
  selections: Record<string, string>; // map variable ID to selected option VALUE (string)
  totalScore: number;
  mortality: number;
}

export interface CalculationResult {
  score: number;
  mortality: number;
}
