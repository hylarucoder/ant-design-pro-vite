export type NoticeType = {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
};

export type ActivitiesType = {
  id: string;
  updatedAt: string;
  user: {
    name: string;
    avatar: string;
  };
  group?: {
    name: string;
    link: string;
  };
  project?: {
    name: string;
    link: string;
  };
  template: string;
};

export type RadarDatum = {
  name: string;
  label: string;
  value: number;
};
