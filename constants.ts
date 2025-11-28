
import { Saps3Variable } from './types';

// Simplified Acute Physiology Score 3 (SAPS 3) Data Structure
// Organized according to the provided document layout.

export const SAPS3_VARIABLES: Saps3Variable[] = [
  // --- SECTION 1: Características do Paciente e Admissão (Page 1) ---
  {
    id: 'age',
    label: 'Idade, em anos',
    category: 'Admission',
    options: [
      { value: '<40', label: '< 40', points: 0 },
      { value: '40-59', label: '40 - 59', points: 5 },
      { value: '60-69', label: '60 - 69', points: 9 },
      { value: '70-74', label: '70 - 74', points: 13 },
      { value: '75-79', label: '75 - 79', points: 15 },
      { value: '>=80', label: '≥ 80', points: 18 },
    ],
  },
  {
    id: 'los_hospital',
    label: 'Tempo de internação antes da admissão na UTI, em dias',
    category: 'Admission',
    options: [
      { value: '<14days', label: '< 14', points: 0 },
      { value: '14-27days', label: '14 - 27', points: 6 },
      { value: '>=28days', label: '≥ 28', points: 7 },
    ],
  },
  {
    id: 'location',
    label: 'Localização intrahospitalar antes da admissão na UTI',
    category: 'Admission',
    options: [
      { value: 'or_recovery', label: 'Centro Cirúrgico / Recup.', points: 0 },
      { value: 'er', label: 'Pronto Socorro', points: 5 },
      { value: 'other_icu', label: 'Outras UTIs', points: 7 },
      { value: 'ward', label: 'Outra ala', points: 8 },
    ],
  },
  {
    id: 'vasoactive',
    label: 'Utilização das principais opções terapêuticas antes da admissão na UTI',
    category: 'Admission',
    options: [
      { value: 'none', label: 'Outro/nenhum', points: 0 },
      { value: 'vasoactive_drugs', label: 'drogas vasoativas', points: 3 },
    ],
  },
  {
    id: 'planned_admission',
    label: 'Internação em UTI, planejada ou não planejada',
    category: 'Admission',
    options: [
      { value: 'planned', label: 'Planejado', points: 0 },
      { value: 'unplanned', label: 'Não planejado', points: 3 },
    ],
  },
  {
    id: 'surgical_status',
    label: 'Estado cirúrgico na admissão à UTI',
    category: 'Admission',
    options: [
      { value: 'scheduled', label: 'Cirurgia agendada', points: 0 },
      { value: 'no_surgery', label: 'Sem cirurgia', points: 5 },
      { value: 'emergency', label: 'Cirurgia de emergência', points: 6 },
    ],
  },
  {
    id: 'surgery_location',
    label: 'Local anatômico da cirurgia',
    category: 'Admission',
    options: [
      { value: 'transplant', label: 'Cirurgia de transplante', points: -11 },
      { value: 'trauma', label: 'Cirurgia de trauma', points: -8 },
      { value: 'cardiac_cabg', label: 'Cirurgia cardíaca: Revascularização do miocárdio sem reparo valvar', points: -6 },
      { value: 'other', label: 'Outras cirurgias', points: 0 },
      { value: 'neuro_stroke', label: 'Neurocirurgia: acidente vascular cerebral', points: 5 },
    ],
  },
  {
    id: 'infection',
    label: 'Infecção aguda na admissão à UTI',
    category: 'Admission',
    options: [
      { value: 'none', label: 'Outro/nenhum', points: 0 },
      { value: 'nosocomial', label: 'Nosocomial', points: 4 },
      { value: 'respiratory', label: 'Respiratório', points: 5 },
    ],
  },

  // --- SECTION 2: Variáveis Fisiológicas (Page 2 & 3) ---
  {
    id: 'gcs',
    label: 'Escala/Pontuação de Coma de Glasgow',
    category: 'Physiology',
    options: [
      { value: '>=13', label: '≥ 13', points: 0 },
      { value: '7-12', label: '7 - 12', points: 2 },
      { value: '6', label: '6', points: 7 },
      { value: '5', label: '5', points: 10 },
      { value: '3-4', label: '3 - 4', points: 15 },
    ],
  },
  {
    id: 'bilirubin',
    label: 'Bilirrubina total, mg/dL (µmol/L)',
    category: 'Physiology',
    options: [
      { value: '<2', label: '< 2 mg/dL', points: 0 },
      { value: '2-5.9', label: '2 - 5,9 mg/dL', points: 4 },
      { value: '>=6', label: '≥ 6 mg/dL', points: 5 },
    ],
  },
  {
    id: 'temp',
    label: 'Temperatura corporal, °C (°F)',
    category: 'Physiology',
    options: [
      { value: '>=35', label: '≥ 35 °C (≥ 95 °F)', points: 0 },
      { value: '<35', label: '< 35 °C (< 95 °F)', points: 7 },
    ],
  },
  {
    id: 'creatinine',
    label: 'Creatinina, mg/dL (µmol/L)',
    category: 'Physiology',
    options: [
      { value: '<1.2', label: '< 1,2 mg/dL', points: 0 },
      { value: '1.2-1.9', label: '1,2 - 1,9 mg/dL', points: 2 },
      { value: '2.0-3.4', label: '2 - 3,4 mg/dL', points: 7 },
      { value: '>=3.5', label: '≥ 3,5 mg/dL', points: 8 },
    ],
  },
  {
    id: 'heart_rate',
    label: 'Frequência cardíaca, batimentos/minuto',
    category: 'Physiology',
    options: [
      { value: '<120', label: '< 120', points: 0 },
      { value: '120-159', label: '120 - 159', points: 5 },
      { value: '>=160', label: '≥ 160', points: 7 },
    ],
  },
  {
    id: 'leukocytes',
    label: 'Leucócitos, G/L',
    category: 'Physiology',
    options: [
      { value: '<15', label: '< 15', points: 0 },
      { value: '>=15', label: '≥ 15', points: 2 },
    ],
  },
  {
    id: 'ph',
    label: 'pH',
    category: 'Physiology',
    options: [
      { value: '>7.25', label: '> 7,25', points: 0 },
      { value: '<=7.25', label: '≤ 7,25', points: 3 },
    ],
  },
  {
    id: 'platelets',
    label: 'Plaquetas, G/L',
    category: 'Physiology',
    options: [
      { value: '>=100', label: '≥ 100', points: 0 },
      { value: '50-99', label: '50 - 99', points: 5 },
      { value: '20-49', label: '20 - 49', points: 8 },
      { value: '<20', label: '< 20', points: 13 },
    ],
  },
  {
    id: 'sbp',
    label: 'Pressão arterial sistólica, mmHg',
    category: 'Physiology',
    options: [
      { value: '>=120', label: '≥ 120', points: 0 },
      { value: '70-119', label: '70 - 119', points: 3 },
      { value: '40-69', label: '40 - 69', points: 8 },
      { value: '<40', label: '< 40', points: 11 },
    ],
  },
  {
    id: 'oxygenation',
    label: 'Oxigenação',
    category: 'Physiology',
    options: [
      { value: 'pao2_ge_60_no_mv', label: 'PaO₂ ≥ 60 e sem ventilação mecânica', points: 0 },
      { value: 'pao2_lt_60_no_mv', label: 'PaO₂ < 60 e sem ventilação mecânica', points: 5 },
      { value: 'pf_ge_100_mv', label: 'PaO₂/FiO₂ ≥ 100 e MV', points: 7 },
      { value: 'pf_lt_100_mv', label: 'PaO₂/FiO₂ < 100 e MV', points: 11 },
    ],
  },

  // --- SECTION 3: Comorbidities (Page 3) ---
  {
    id: 'comorb_cancer_therapy',
    label: 'terapia contra o câncer\nQuimioterapia, imunossupressão, radioterapia, tratamento com esteroides',
    category: 'Comorbidities',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 3 },
    ],
  },
  {
    id: 'comorb_heart_failure',
    label: 'Insuficiência cardíaca crônica (NYHA IV)',
    category: 'Comorbidities',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 6 },
    ],
  },
  {
    id: 'comorb_hematologic',
    label: 'Câncer hematológico',
    category: 'Comorbidities',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 6 },
    ],
  },
  {
    id: 'comorb_cirrhosis',
    label: 'Cirrose',
    category: 'Comorbidities',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 8 },
    ],
  },
  {
    id: 'comorb_aids',
    label: 'AIDS',
    category: 'Comorbidities',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 8 },
    ],
  },
  {
    id: 'comorb_metastatic',
    label: 'Câncer metastático',
    category: 'Comorbidities',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 11 },
    ],
  },

  // --- SECTION 4: Reasons (Page 4) ---
  {
    id: 'reason_cardio_neuro_combo',
    label: 'Cardiovascular/neurológico\nSe ambas as causas estiverem presentes, apenas o pior valor (-4) será contabilizado; selecione "Neurológico: convulsões"',
    category: 'Reasons',
    options: [
      { value: 'none', label: 'Nenhum', points: 0 },
      { value: 'rhythm', label: 'Cardiovascular: distúrbios do ritmo cardíaco', points: -5 },
      { value: 'seizures', label: 'Neurológico: convulsões', points: -4 },
    ],
  },
  {
    id: 'reason_shock_hypo',
    label: 'Cardiovascular: choque hemorrágico hipovolêmico, choque não hemorrágico hipovolêmico',
    category: 'Reasons',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 3 },
    ],
  },
  {
    id: 'reason_shock_septic',
    label: 'Cardiovascular: choque séptico',
    category: 'Reasons',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 5 },
    ],
  },
  {
    id: 'reason_shock_anaphy',
    label: 'Cardiovascular: choque anafilático, choque misto e choque indefinido',
    category: 'Reasons',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 5 },
    ],
  },
  {
    id: 'reason_neuro_coma',
    label: 'Neurológico: coma, estupor, paciente obnubilado, distúrbios de vigilância, confusão, agitação, delírio',
    category: 'Reasons',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 4 },
    ],
  },
  {
    id: 'reason_neuro_focal',
    label: 'Neurológico: déficit neurológico focal',
    category: 'Reasons',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 7 },
    ],
  },
  {
    id: 'reason_neuro_mass',
    label: 'Neurológico: efeito de massa intracraniana',
    category: 'Reasons',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 10 },
    ],
  },
  {
    id: 'reason_digestive_acute',
    label: 'Digestivo: abdômen agudo, outros',
    category: 'Reasons',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 3 },
    ],
  },
  {
    id: 'reason_digestive_pancreatitis',
    label: 'Digestivo: pancreatite grave',
    category: 'Reasons',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 9 },
    ],
  },
  {
    id: 'reason_hepatic_failure',
    label: 'Hepático: insuficiência hepática',
    category: 'Reasons',
    options: [
      { value: 'no', label: 'Não', points: 0 },
      { value: 'yes', label: 'Sim', points: 6 },
    ],
  },
];

export const CATEGORIES = {
  'Admission': 'Características do Paciente e Admissão',
  'Physiology': 'Variáveis Fisiológicas',
  'Comorbidities': 'Comorbidades',
  'Reasons': 'Motivo(s) para internação na UTI',
};
