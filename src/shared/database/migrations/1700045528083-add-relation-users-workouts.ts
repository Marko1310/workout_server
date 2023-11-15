import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700045528083 implements MigrationInterface {
  name = 'Migration1700045528083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workouts" ADD "usersId" integer`);
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_41e1600e66c170ba22afbffa95d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_41e1600e66c170ba22afbffa95d"`,
    );
    await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "usersId"`);
  }
}
