import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700140009146 implements MigrationInterface {
  name = 'Migration1700140009146';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_splits" DROP CONSTRAINT "FK_44f8e21c2db4ef40739d32561b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_4476fd3f1e1cca7dddb01e7fb26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_41e1600e66c170ba22afbffa95d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_ac4617c801f19eb3b9b99efe469"`,
    );
    await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "usersId"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "workoutsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "workout_splits" ADD CONSTRAINT "FK_44f8e21c2db4ef40739d32561b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_4476fd3f1e1cca7dddb01e7fb26" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_2ff63384d975d05b621c11ae74a" FOREIGN KEY ("workoutsId") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_ac4617c801f19eb3b9b99efe469" FOREIGN KEY ("workoutSplitsId") REFERENCES "workout_splits"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_ac4617c801f19eb3b9b99efe469"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "FK_2ff63384d975d05b621c11ae74a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_4476fd3f1e1cca7dddb01e7fb26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" DROP CONSTRAINT "FK_44f8e21c2db4ef40739d32561b1"`,
    );
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "workoutsId"`);
    await queryRunner.query(`ALTER TABLE "workouts" ADD "usersId" integer`);
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_ac4617c801f19eb3b9b99efe469" FOREIGN KEY ("workoutSplitsId") REFERENCES "workout_splits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_41e1600e66c170ba22afbffa95d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_4476fd3f1e1cca7dddb01e7fb26" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" ADD CONSTRAINT "FK_44f8e21c2db4ef40739d32561b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
