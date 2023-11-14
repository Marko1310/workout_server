import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1699953301118 implements MigrationInterface {
    name = 'Migration1699953301118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tracks" ("id" SERIAL NOT NULL, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "set" integer NOT NULL, "weight" integer NOT NULL, "reps" integer NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tracks"`);
    }

}
