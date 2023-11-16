import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700133034217 implements MigrationInterface {
  name = 'Migration1700133034217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "FK_1c2a64d6948f80f1f9b6217618f"`,
    );
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "usersId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "exercises" ADD "usersId" integer`);
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_1c2a64d6948f80f1f9b6217618f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
