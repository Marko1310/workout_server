import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699951263151 implements MigrationInterface {
  name = 'Migration1699951263151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workouts_exercises_exercises" ("workoutsId" integer NOT NULL, "exercisesId" integer NOT NULL, CONSTRAINT "PK_d57f63eed393481ff1200d4c150" PRIMARY KEY ("workoutsId", "exercisesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bfc966116a382a6f6b845ac15d" ON "workouts_exercises_exercises" ("workoutsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13937e69e8ba290d5faafcec75" ON "workouts_exercises_exercises" ("exercisesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts_exercises_exercises" ADD CONSTRAINT "FK_bfc966116a382a6f6b845ac15db" FOREIGN KEY ("workoutsId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts_exercises_exercises" ADD CONSTRAINT "FK_13937e69e8ba290d5faafcec751" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workouts_exercises_exercises" DROP CONSTRAINT "FK_13937e69e8ba290d5faafcec751"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts_exercises_exercises" DROP CONSTRAINT "FK_bfc966116a382a6f6b845ac15db"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_13937e69e8ba290d5faafcec75"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bfc966116a382a6f6b845ac15d"`,
    );
    await queryRunner.query(`DROP TABLE "workouts_exercises_exercises"`);
  }
}
