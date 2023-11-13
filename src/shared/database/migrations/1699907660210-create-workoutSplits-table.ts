import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1699907660210 implements MigrationInterface {
    name = 'Migration1699907660210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workout_splits" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "workout_split_name" character varying(300) NOT NULL, "days" integer NOT NULL, CONSTRAINT "PK_f476bf0290b95cf8bfad7a0aec7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "workout_splits"`);
    }

}
