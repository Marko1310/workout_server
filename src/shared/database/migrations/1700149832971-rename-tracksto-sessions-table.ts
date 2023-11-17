import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700149832971 implements MigrationInterface {
  name = 'Migration1700149832971';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "set" integer NOT NULL, "weight" integer NOT NULL, "reps" integer NOT NULL, "week" integer NOT NULL, "exercisesId" integer, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_51efb664ec9ffb8d0e89bef2c2f" FOREIGN KEY ("exercisesId") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_51efb664ec9ffb8d0e89bef2c2f"`,
    );
    await queryRunner.query(`DROP TABLE "sessions"`);
  }
}
