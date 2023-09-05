import { User } from './user.interface';

export interface RegisterResponse {
  token: string;
  user: User;
}
