export interface Tag {
  id: string | number;
  name: string;
  description: string;
  slug: string;
  created_at: Date;
  updated_at?: Date;
  // deleted_at?: Date | null;
}

export interface CreateTag {
  name: string;
  description?: string | null;
  slug: string;
}

export interface CoachTag {
  coach_id: number;
  tag_id: number;
  created_at: Date;
  updated_at?: Date;
}
