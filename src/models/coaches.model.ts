export interface Coach {
  id: string | number;
  name: string;
  bio: string | null;
  photo_url: string | null;
  booking_link: string;
  linkedin_url: string | null;
  location: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface CreateCoach {
  name: string;
  bio?: string | null;
  photo_url?: string | null;
  booking_link: string;
  linkedin_url?: string | null;
  location?: string | null;
}

export interface UpdateCoach {
  id: string | number;
  name: string;
  bio?: string;
  photo_url?: string;
  booking_link: string;
  linkedin_url?: string;
  location?: string;
}

export interface CoachRating {
  user_id: string | number;
  coach_id: string | number;
  rating_overall: number;
  rating_listening: number;
  additional_comments?: string | null;
  primary_topic: string;
  user_learned: boolean;
  user_would_book_again: boolean;
  user_coach_id?: number | null;
}
