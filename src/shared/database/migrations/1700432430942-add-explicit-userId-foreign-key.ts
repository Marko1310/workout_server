import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700432430942 implements MigrationInterface {
  name = 'Migration1700432430942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_splits" DROP CONSTRAINT "FK_44f8e21c2db4ef40739d32561b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" RENAME COLUMN "usersId" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" ADD CONSTRAINT "FK_07c12ca2547328b1353119e0c5e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_splits" DROP CONSTRAINT "FK_07c12ca2547328b1353119e0c5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" RENAME COLUMN "userId" TO "usersId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" ADD CONSTRAINT "FK_44f8e21c2db4ef40739d32561b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
