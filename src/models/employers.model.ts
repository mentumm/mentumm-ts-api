export interface Employer {
  id: string | number;
  name: string;
  max_employees: number;
  invitation_code: string;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date;
}

export interface CreateEmployer {
  name: string;
  max_employees: number;
  invitation_code: string;
}

export interface UpdateEmployer {
  id: string | number;
  name: string;
  max_employees: number;
  invitation_code: string;
}
