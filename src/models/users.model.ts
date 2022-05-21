export interface User {
  id: string | number;
  name: string;
  email: string;
  employer_id: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface CreateUser {
  name: string;
  email: string;
  employer_id: number;
  password?: string;
}

export interface UpdateUser {
  id: string | number;
  name: string;
  email: string;
  employer_id: number;
}
