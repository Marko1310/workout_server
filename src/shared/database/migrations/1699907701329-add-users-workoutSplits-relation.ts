import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699907701329 implements MigrationInterface {
  name = 'Migration1699907701329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_splits" ADD "usersId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" ADD CONSTRAINT "FK_44f8e21c2db4ef40739d32561b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_splits" DROP CONSTRAINT "FK_44f8e21c2db4ef40739d32561b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" DROP COLUMN "usersId"`,
    );
  }
}
