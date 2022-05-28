export interface User {
  id: string | number;
  name: string;
  email: string;
  employer_id: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  password: string;
  reset_password_token: string;
  reset_password_expiration: Date;
  last_sign_in: Date;
}

export interface CreateUser {
  name: string;
  email: string;
  employer_id: number;
  password?: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  invite_code: string;
}

export interface UpdateUser {
  id: string | number;
  name: string;
  email: string;
  employer_id: number;
}
