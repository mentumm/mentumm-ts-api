export interface Workshop {
  id: number;
  name: string;
  vimeo_id: string;
  workbook_url: string;
  year: number;
  month: number;
  hidden: 1 | 0;
  created_at: Date;
  updated_at: Date;
}
