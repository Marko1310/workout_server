import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700048861025 implements MigrationInterface {
  name = 'Migration1700048861025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD "week" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "week"`);
  }
}
