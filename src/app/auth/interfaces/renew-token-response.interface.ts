import { User } from './user.interface';

// seria conveniente tener 1 Mapper para mapear la response del back y asi, si cambia, SOLO debo Modificar el Mapper y NO todo el Codigo
export interface RenewTokenResponse {
  token: string;
  user: User;
}
