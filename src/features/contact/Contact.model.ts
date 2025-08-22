export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  list?: CONTACT_LIST;
  createdAt: string;
  updatedAt: string;
};

export enum CONTACT_LIST {
  BLACKLIST = 'Blacklist',
  FAMILY = 'Family',
  FRIENDS = 'Friends',
  WORK = 'Work'
};
