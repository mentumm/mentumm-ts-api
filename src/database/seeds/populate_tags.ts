import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex("user_tag").del();
  await knex("tags").del();

  const tags = [
    "1	Career Planning	career-planning	2022-06-17 23:54:39.1322+00	2022-06-17 23:54:39.1322+00	Career Planning	Professional",
    "2	Collaboration	collaboration	2022-06-17 23:56:57.025167+00	2022-06-17 23:56:57.025167+00	Collaboration	Leadership",
    "3	Communication	communication	2022-06-17 23:59:59.70162+00	2022-06-17 23:59:59.70162+00	Communication	Professional",
    "4	Conflict Management	conflict-management	2022-06-18 00:00:22.663765+00	2022-06-18 00:00:22.663765+00	Conflict Management	Leadership",
    "5	Content Development	content-development	2022-06-18 00:00:47.57542+00	2022-06-18 00:00:47.57542+00	Content Development	Professional",
    "6	Customer Care	customer-care	2022-06-18 00:01:35.345407+00	2022-06-18 00:01:35.345407+00	Customer Care	Professional",
    "8	Decision Making	decision-making	2022-06-18 00:04:07.332212+00	2022-06-18 00:04:07.332212+00	Decision Making	Leadership",
    "10	Goal Setting	goal-setting	2022-06-18 00:07:52.66501+00	2022-06-18 00:07:52.66501+00	Goal Setting	Personal",
    "11	Interview Skills	interview-skills	2022-06-18 00:08:16.079046+00	2022-06-18 00:08:16.079046+00	Interview Skills	Leadership",
    "12	Leadership	leadership	2022-06-18 00:09:38.842366+00	2022-06-18 00:09:38.842366+00	Leadership	Leadership",
    "13	Life Coaching	life-coaching	2022-06-18 00:10:31.28493+00	2022-06-18 00:10:31.28493+00	Life Coaching	Personal",
    "14	LinkedIn Marketing	linkedin-marketing	2022-06-18 00:11:02.970614+00	2022-06-18 00:11:02.970614+00	LinkedIn Marketing	Professional",
    "15	Management	management	2022-06-18 00:12:22.202924+00	2022-06-18 00:12:22.202924+00	Management	Leadership",
    "16	Meditation	meditation	2022-06-18 00:12:34.793113+00	2022-06-18 00:12:34.793113+00	Meditation	Personal",
    "17	Mentoring	mentoring	2022-06-18 00:12:48.698236+00	2022-06-18 00:12:48.698236+00	Mentoring	Leadership",
    "18	Negotiation	negotiation	2022-06-18 00:12:59.300153+00	2022-06-18 00:12:59.300153+00	Negotiation	Professional",
    "19	Networking	networking	2022-06-18 00:13:12.034899+00	2022-06-18 00:13:12.034899+00	Networking	Professional",
    "20	Nutrition	nutrition	2022-06-18 00:13:49.746844+00	2022-06-18 00:13:49.746844+00	Nutrition	Personal",
    "21	Onboarding + Training	onboarding-training	2022-06-18 00:14:56.836211+00	2022-06-18 00:14:56.836211+00	Onboarding + Training	Leadership",
    "22	Parenting	parenting	2022-06-18 00:15:13.545928+00	2022-06-18 00:15:13.545928+00	Parenting	Personal",
    "23	Personal Branding	personal-branding	2022-06-18 00:15:32.526063+00	2022-06-18 00:15:32.526063+00	Personal Branding	Personal",
    "24	Personal Finance	personal-finance	2022-06-18 00:18:15.747115+00	2022-06-18 00:18:15.747115+00	Personal Finance	Personal",
    "25	Personal Fitness	personal-fitness	2022-06-18 00:18:30.349411+00	2022-06-18 00:18:30.349411+00	Personal Fitness	Personal",
    "26	Presentation + Public Speaking	presentation-public-speaking	2022-06-18 00:19:09.195334+00	2022-06-18 00:19:09.195334+00	Presentation + Public Speaking	Professional",
    "27	Problem Solving	problem-solving	2022-06-18 00:19:23.187626+00	2022-06-18 00:19:23.187626+00	Problem Solving	Leadership",
    "28	Relationship Management	relationship-management	2022-06-18 00:19:49.20095+00	2022-06-18 00:19:49.20095+00	Relationship Management	Leadership",
    "30	Sales	sales	2022-06-18 00:20:22.383014+00	2022-06-18 00:20:22.383014+00	Sales	Professional",
    "31	Sleep	sleep	2022-06-18 00:20:33.64036+00	2022-06-18 00:20:33.64036+00	Sleep	Personal",
    "32	Strategic Planning	strategic-planning	2022-06-18 00:22:04.989561+00	2022-06-18 00:22:04.989561+00	Strategic Planning	Leadership",
    "33	Stress Management	stress-management	2022-06-18 00:22:20.68055+00	2022-06-18 00:22:20.68055+00	Stress Management	Personal",
    "34	Time Management + Productivity	time-management-productivity	2022-06-18 00:22:59.159534+00	2022-06-18 00:22:59.159534+00	Time Management + Productivity	Professional",
    "35	Work/Life Balance	work-life-balance	2022-06-18 00:23:25.605509+00	2022-06-18 00:23:25.605509+00	Work/Life Balance	Personal",
    "36	Workplace Culture	workplace-culture	2022-06-18 00:23:39.956485+00	2022-06-18 00:23:39.956485+00	Workplace Culture	Leadership",
  ];

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i].split("\t");

    await knex("tags").insert([
      {
        id: tag[0],
        name: tag[1],
        slug: tag[2],
        created_at: tag[3],
        updated_at: tag[4],
        description: tag[5],
        category: tag[6],
        icon: "",
        kind: "expertise",
      },
    ]);
  }

  await knex("style_types").insert([
    {
      id: 37,
      name: "Challenger",
      slug: "challenger",
      description: "Motivate + Inspire",
      color: "#84B0F9",
      icon: "fa-solid fa-rocket",
      kind: "style",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 38,
      name: "Educator",
      slug: "educator",
      description: "Teach + Train",
      color: "#5DBABD",
      icon: "fa-solid fa-hat-wizard",
      kind: "style",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 39,
      name: "Sponsor",
      slug: "sponsor",
      description: "Advocate + Connect",
      color: "#DAC9FF",
      icon: "fa-solid fa-seedling",
      kind: "style",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 40,
      name: "Anchor",
      slug: "anchor",
      description: "Listen + Empathize",
      color: "#8ED6F4",
      icon: "fa-solid fa-anchor",
      kind: "style",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 41,
      name: "Ideator",
      slug: "ideator",
      description: "Brainstorm + Strategize",
      color: "#F99883",
      icon: "fa-solid fa-lightbulb",
      kind: "style",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 42,
      name: "Cheerleader",
      slug: "cheerleader",
      description: "Energize + Reinforce",
      color: "#FF8888",
      icon: "fa-solid fa-fire-flame-curved",
      kind: "style",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 43,
      name: "Protector",
      slug: "protector",
      description: "Support + Protect",
      color: "#93E1E5",
      icon: "fa-solid fa-chess-king",
      kind: "style",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
