export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  EMPTY = '',
}

export interface IUser {
  email: string;
  username: string;

  name: string;
  family_name: string;
  avatar?: string;

  gender: Gender;
}
