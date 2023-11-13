import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1699914565441 implements MigrationInterface {
  name = 'Migration1699914565441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workouts" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "workout_name" character varying(300) NOT NULL, "week" integer NOT NULL, "workoutSplitsId" integer, CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_ac4617c801f19eb3b9b99efe469" FOREIGN KEY ("workoutSplitsId") REFERENCES "workout_splits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_ac4617c801f19eb3b9b99efe469"`,
    );
    await queryRunner.query(`DROP TABLE "workouts"`);
  }
}
