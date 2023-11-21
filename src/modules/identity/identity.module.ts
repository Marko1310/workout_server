import { Module } from '@nestjs/common';
import { UsersModule } from '@users-modules/users.module';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { AuthorizationService } from './authorization.service';

@Module({
  imports: [UsersModule],
  controllers: [IdentityController],
  providers: [IdentityService, AuthorizationService],
})
export class IdentityModule {}
