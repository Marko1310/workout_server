import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700396983212 implements MigrationInterface {
  name = 'Migration1700396983212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sessions" ADD "usersId" integer`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "usersId" integer`);
    await queryRunner.query(`ALTER TABLE "workouts" ADD "usersId" integer`);
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_9e11913ec7e5fbbdef874a126f3" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_1c2a64d6948f80f1f9b6217618f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_41e1600e66c170ba22afbffa95d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_41e1600e66c170ba22afbffa95d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "FK_1c2a64d6948f80f1f9b6217618f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_9e11913ec7e5fbbdef874a126f3"`,
    );
    await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "usersId"`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "usersId"`);
    await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "usersId"`);
  }
}
