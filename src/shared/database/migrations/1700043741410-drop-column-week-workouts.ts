import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700043741410 implements MigrationInterface {
  name = 'Migration1700043741410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "week"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD "week" integer NOT NULL`,
    );
  }
}
