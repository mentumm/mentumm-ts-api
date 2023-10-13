export interface RegisterClientAdmin {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  invite_code: string;
  is_test?: boolean;
}

export interface ClientAdmin {
  id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  role?: string;
  is_test?: boolean;
}