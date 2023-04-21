export interface Tag {
  id: string | number;
  kind: string;
  color: string;
  name: string;
  description: string;
  slug: string;
  created_at: Date;
  updated_at?: Date;
}

export interface CreateTag {
  name: string;
  description?: string | null;
  slug: string;
}

export interface UpdateTag {
  id: string;
  name: string;
  description?: string | null;
  slug: string;
  updated_at: string;
}

export interface UserTag {
  user_id: number;
  tag_id: number;
  created_at: Date;
  updated_at?: Date;
}
