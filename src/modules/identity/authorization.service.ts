import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { Role, Users } from '@entities/users.entity';
import { Injectable } from '@nestjs/common';
import { packRules } from '@casl/ability/extra';
import { AppAbility } from 'shared/auth/authorization';

@Injectable()
export class AuthorizationService {
  async getPermission(identity: Users) {
    if ((identity.role = Role.ADMIN)) {
      const rules = this.getAdminPermissions();
      return packRules(rules);
    }
    if ((identity.role = Role.USER)) {
      const rules = this.getUserPermissions(identity);
      return packRules(rules);
    }
    const { rules } = new AbilityBuilder(createMongoAbility);
    return packRules(rules);
  }

  private getAdminPermissions() {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    can('manage', 'all');

    const ability = build();
    return ability.rules;
  }

  private getUserPermissions(identity: Users) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    can('read', 'Identity', { id: identity.id });
    can('create', 'Workout-Split');
    can('read', 'Workout-Split', { usersId: identity.id });
    can('delete', 'Workout-Split', { usersId: identity.id });

    const ability = build();
    return ability.rules;
  }
}
