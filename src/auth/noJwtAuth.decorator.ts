import { SetMetadata } from '@nestjs/common';

export const NOJWTAUTH_KEY = 'noJwtAuth';
export const NoJwtAuth = () => SetMetadata(NOJWTAUTH_KEY, true);
