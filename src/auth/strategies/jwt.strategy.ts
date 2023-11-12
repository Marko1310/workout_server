import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.get('app.jwt.secret'),
    });
  }

  private static cookieExtractor(req: Request): string | null {
    const access_token = req.cookies ? req.cookies.access_token : null;
    return access_token;
  }

  async validate(payload: any) {
    return {
      id: payload.subject,
      permissions: payload.permissions,
    };
  }
}
