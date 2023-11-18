import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { UsersModule } from '@users-modules/users.module';

@Module({
  imports: [UsersModule],
  controllers: [IdentityController],
  providers: [IdentityService],
})
export class IdentityModule {}
