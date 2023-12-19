import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1702986853570 implements MigrationInterface {
  name = 'Migration1702986853570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_ac4617c801f19eb3b9b99efe469"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" RENAME COLUMN "workoutSplitsId" TO "programsId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "programs" ("createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "programs_id" SERIAL NOT NULL, "programs_name" character varying(300) NOT NULL, "days" integer NOT NULL, "userId" integer, CONSTRAINT "PK_aaa6b0b3eaa95ebfcf7fe5a42f7" PRIMARY KEY ("programs_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_62aa8556e59bbc5ba63e2c08c6a" FOREIGN KEY ("programsId") REFERENCES "programs"("programs_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "programs" ADD CONSTRAINT "FK_a99b3ca19aedd64a3f069cdeac2" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE "workout_splits"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "programs" DROP CONSTRAINT "FK_a99b3ca19aedd64a3f069cdeac2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" DROP CONSTRAINT "FK_62aa8556e59bbc5ba63e2c08c6a"`,
    );
    await queryRunner.query(`DROP TABLE "programs"`);
    await queryRunner.query(
      `ALTER TABLE "workouts" RENAME COLUMN "programsId" TO "workoutSplitsId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_ac4617c801f19eb3b9b99efe469" FOREIGN KEY ("workoutSplitsId") REFERENCES "workout_splits"("workout_split_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
