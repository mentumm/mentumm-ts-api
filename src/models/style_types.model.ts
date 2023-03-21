export interface StyleType {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserStyleType {
  user_id: number;
  style_type_id: number;
  created_at: Date;
  updated_at?: Date;
}
