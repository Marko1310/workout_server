import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700488212221 implements MigrationInterface {
  name = 'Migration1700488212221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_41e1600e66c170ba22afbffa95d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" RENAME COLUMN "usersId" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_65ff5fd1913246288adad5dc75a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_65ff5fd1913246288adad5dc75a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" RENAME COLUMN "userId" TO "usersId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_41e1600e66c170ba22afbffa95d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
