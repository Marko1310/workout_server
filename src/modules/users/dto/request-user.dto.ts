import { Permission } from 'shared/auth/authorization';

export type RequestUserDto = {
  id: number;
  permissions: Permission[];
};
