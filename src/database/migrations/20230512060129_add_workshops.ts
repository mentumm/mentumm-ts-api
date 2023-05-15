import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const queries = [
    "TRUNCATE workshops",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (8, 'Delivering Feedback', '825618156\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Delivering-Feedback.Participant.pdf', 0, '2023-05-12 05:46:00.434055+00', '2023-05-12 05:46:00.434055+00', 'https://mentumm.com/wp-content/uploads/2023/05/Delivering-Feedback.jpg', 'delivering-feedback');",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (9, 'Resolving Conflict', '825656128\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Resolving-Conflict.Participant.pdf', 0, '2023-05-12 05:46:22.424974+00', '2023-05-12 05:46:22.424974+00', 'https://mentumm.com/wp-content/uploads/2023/05/Resolving-Conflict.jpg', 'resolving-conflict');",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (10, 'Managing Change', '825647817\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Managing-Change.Participant.pdf', 0, '2023-05-12 05:46:48.891482+00', '2023-05-12 05:46:48.891482+00', 'https://mentumm.com/wp-content/uploads/2023/05/Managing-Change.jpg', 'managing-change');",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (2, 'Manging Priorities', '825651917\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Managing-Priorities.Participant.pdf', 0, '2023-05-12 05:44:03.487564+00', '2023-05-12 05:44:03.487564+00', 'https://mentumm.com/wp-content/uploads/2023/05/Managing-Priorities.jpg', 'manging-priorities');",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (3, 'Effective Delegation', '825627382\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Effective-Delegation.Participant.pdf', 0, '2023-05-12 05:44:20.781644+00', '2023-05-12 05:44:20.781644+00', 'https://mentumm.com/wp-content/uploads/2023/05/Effective-Delegation.jpg', 'effective-delegation');",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (4, 'Setting Goals', '825658285\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Setting-Goals.Participant.pdf', 0, '2023-05-12 05:43:41.21184+00', '2023-05-12 05:43:41.21184+00', 'https://mentumm.com/wp-content/uploads/2023/05/Setting-Goals.jpg', 'setting-goals');",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (5, 'Driving Engagement', '825624342\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Driving-Engagement.Participant.pdf', 0, '2023-05-12 05:44:44.079324+00', '2023-05-12 05:44:44.079324+00', 'https://mentumm.com/wp-content/uploads/2023/05/Driving-Engagement.jpg', 'driving-engagement');",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (6, 'Coaching Conversations', '825614275\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Coaching-Conversations.Participant.pdf', 0, '2023-05-12 05:45:18.033339+00', '2023-05-12 05:45:18.033339+00', 'https://mentumm.com/wp-content/uploads/2023/05/Coaching-Conversations.jpg', 'coaching-conversations');",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (7, 'Team Execution', '825661979\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Team-Execution.Participant.pdf', 0, '2023-05-12 05:45:35.449342+00', '2023-05-12 05:45:35.449342+00', 'https://mentumm.com/wp-content/uploads/2023/05/Team-Execution-1.jpg', 'team-execution');",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (11, 'Managing Performance', '825649270\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Managing-Performance.Participant.pdf', 0, '2023-05-12 05:47:07.316583+00', '2023-05-12 05:47:07.316583+00', 'https://mentumm.com/wp-content/uploads/2023/05/Managing-Performance.jpg', 'managing-performance');",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (12, 'Emotional Intelligence', '825632299\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Emotional-Intelligence.Participant.pdf', 0, '2023-05-12 05:47:21.352058+00', '2023-05-12 05:47:21.352058+00', 'https://mentumm.com/wp-content/uploads/2023/05/Effective-Delegation-1.jpg', 'emotional-intelligence');",
    "INSERT INTO workshops (id, name, vimeo_id, workbook_url, hidden, created_at, updated_at, thumbnail_url, slug) VALUES (1, 'Building Relationships', '825595386\\?h=b3ebb98cf5', 'https://mentumm.com/wp-content/uploads/2023/05/FILLABLE-Building-Relationships.Participant.pdf', 0, '2023-05-12 05:37:30.152214+00', '2023-05-12 05:37:30.152214+00', 'https://mentumm.com/wp-content/uploads/2023/05/Building-Relationships.jpg', 'building-relationships');",
  ];

  for (let i = 0; i < queries.length; i++) {
    await knex.raw(queries[i]);
  }
}

export async function down(knex: Knex): Promise<void> {}
