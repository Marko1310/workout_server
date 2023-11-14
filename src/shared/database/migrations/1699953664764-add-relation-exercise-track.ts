import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699953664764 implements MigrationInterface {
  name = 'Migration1699953664764';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tracks" ADD "exercisesId" integer`);
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_4476fd3f1e1cca7dddb01e7fb26" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_4476fd3f1e1cca7dddb01e7fb26"`,
    );
    await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "exercisesId"`);
  }
}
