export interface Workshop {
  id: number;
  name: string;
  slug: string;
  vimeo_id: string;
  workbook_url: string;
  thumbnail_url: string;
  hidden: 1 | 0;
  created_at: Date;
  updated_at: Date;
}
