import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { NOJWTAUTH_KEY } from 'auth/noJwtAuth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const noJwtAuth = this.reflector.getAllAndOverride<boolean>(NOJWTAUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (noJwtAuth) {
      return true;
    }
    return super.canActivate(context);
  }
}
