import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1700048973093 implements MigrationInterface {
    name = 'Migration1700048973093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracks" ADD "week" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "week"`);
    }

}
