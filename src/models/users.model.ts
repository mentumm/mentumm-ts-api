export interface User {
  id: string | number;
  first_name: string;
  last_name: string;
  email: string;
  employer_id: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  password: string;
  reset_password_token: string;
  reset_password_expiration: Date;
  last_sign_in: Date;
  bio?: string;
  photo_url?: string;
  booking_url?: string;
  linkedin_url: string;
  location?: string; // deprecated
  legacy_coach_id?: string | number; // only for this initial migration, should not really be used outside of migrations
  city?: string;
  state?: string;
  role: "coach" | "user";
}

export interface CreateUser {
  first_name: string;
  last_name: string;
  email: string;
  employer_id: number;
  password?: string;
  role: "coach" | "user";
}

export interface RegisterUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  invite_code: string;
}

export interface UpdateUser {
  id: string | number;
  first_name: string;
  last_name: string;
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
