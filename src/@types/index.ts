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
  // TODO: change type for markers field
  // markers: [IMarker] | any;

  gender: Gender;
  email_verified: boolean;
  isAdmin: boolean;
}
export interface IMarker {
  latitude: number;
  longitude: number;

  name: string;
  description?: string;

  // ownerID: string;
  // TODO: change type for owner field
  // owner: IUser | any;

  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  label: string;
  value: string;
  isAccept: boolean;
}
