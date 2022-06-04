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

export interface CoachBooking {
  user_id: number;
  coach_id: number;
  event_type_uuid?: string;
  event_type_name?: string;
  event_start_time?: string;
  event_end_time?: string;
  invitee_uuid?: string;
  invitee_full_name?: string;
  invitee_email?: string;
}
