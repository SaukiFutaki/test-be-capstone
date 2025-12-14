// Interface untuk data demografi
export interface Demografi {
  usia: number;
  kota: "Jakarta" | "Surabaya" | "Bandung" | "Medan" | "Lainnya";
  status: "Menikah" | "Lajang";
}

// Interface utama untuk data Nasabah
export interface Nasabah {
  id: number;
  nama: string;
  skorProbabilitas: number; // 0.00 hingga 1.00 (probabilitas berlangganan)
  statusBerlangganan: "Ya" | "Tidak";
  demografi: Demografi;
  informasiRelevan: string; // Detail singkat untuk tampilan
}

export type JobType =
  | "admin."
  | "blue-collar"
  | "entrepreneur"
  | "housemaid"
  | "management"
  | "retired"
  | "self-employed"
  | "services"
  | "student"
  | "technician"
  | "unemployed"
  | "unknown";
export type MaritalStatus = "divorced" | "married" | "single" | "unknown";
export type EducationLevel =
  | "basic.4y"
  | "basic.6y"
  | "basic.9y"
  | "high.school"
  | "illiterate"
  | "professional.course"
  | "university.degree"
  | "unknown";
export type ContactType = "cellular" | "telephone" | "unknown";
export type Month =
  | "jan"
  | "feb"
  | "mar"
  | "apr"
  | "may"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct"
  | "nov"
  | "dec";
export type POutcome = "failure" | "nonexistent" | "success" | "other";
export type Binary = "yes" | "no";

export interface NasabahMarketing {
  name?: string;
  id: string;
  userId: string;
  age: number;
  job: string;
  marital: string;
  education: string;
  default: boolean; // Disesuaikan
  balance?: number; // Jika properti balance tidak ada di data, jadikan opsional
  housing: boolean; // Disesuaikan
  loan: boolean; // Disesuaikan
  contact: string;
  last_contact_day: string; // Disesuaikan jika dayOfWeek memang string
  last_contact_month: string;
  duration: number;
  campaign_contacts: number; // number of contacts performed during this campaign (Integer)
  pdays: number; // number of days passed after previous contact (-1 means not contacted) (Integer)
  previous_contacts: number; // number of contacts performed before this campaign (Integer)
  poutcome: POutcome; // outcome of the previous marketing campaign (Categorical)
  subscribed_term_deposit: Binary; // TARGET: has the client subscribed a term deposit? (Binary)
}

export type PredictionData = {
  id: number;
  user_id: string;
  age: number;
  job: string;
  marital: string;
  education: string;
  has_credit_in_default: string;
  balance: number;
  housing: string;
  loan: string;
  contact: string;
  month: string;
  day_of_week: string;
  duration: number;
  campaign: number;
  pdays: number;
  previous: number;
  poutcome: string;
  emp_var_rate: number;
  cons_price_idx: number;
  cons_conf_idx: number;
  euribor3m: number;
  nr_employed: number;
  y: string | null;
  prediction_result: string;
  prediction_probability: number;
  created_at: string;
  updated_at: string;
};
