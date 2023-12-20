import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1703024999271 implements MigrationInterface {
  name = 'Migration1703024999271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" RENAME COLUMN "week" TO "workoutsLogId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ALTER COLUMN "workoutsLogId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_bae412db089bd919b4f9bd8b1ee" FOREIGN KEY ("workoutsLogId") REFERENCES "workoutsLog"("workouts_log_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_bae412db089bd919b4f9bd8b1ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ALTER COLUMN "workoutsLogId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" RENAME COLUMN "workoutsLogId" TO "week"`,
    );
  }
}
