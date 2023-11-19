import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { UsersModule } from '@users-modules/users.module';
import { AuthorizationService } from './authorization.service';

@Module({
  imports: [UsersModule],
  controllers: [IdentityController],
  providers: [IdentityService, AuthorizationService],
})
export class IdentityModule {}
