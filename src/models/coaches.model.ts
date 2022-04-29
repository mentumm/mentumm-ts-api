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
