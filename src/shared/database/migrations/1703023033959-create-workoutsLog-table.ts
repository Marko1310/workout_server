import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1703023033959 implements MigrationInterface {
    name = 'Migration1703023033959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workoutsLog" ("createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "workouts_log_id" SERIAL NOT NULL, "week" integer NOT NULL, "workoutsId" integer, "userId" integer, CONSTRAINT "PK_d72f0e9afc49c340df2abd05685" PRIMARY KEY ("workouts_log_id"))`);
        await queryRunner.query(`ALTER TABLE "workoutsLog" ADD CONSTRAINT "FK_e0aa31bfbf88a19b0257b9d50a1" FOREIGN KEY ("workoutsId") REFERENCES "workouts"("workouts_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workoutsLog" ADD CONSTRAINT "FK_3b5f6d9fb5f32da80556fffb1be" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workoutsLog" DROP CONSTRAINT "FK_3b5f6d9fb5f32da80556fffb1be"`);
        await queryRunner.query(`ALTER TABLE "workoutsLog" DROP CONSTRAINT "FK_e0aa31bfbf88a19b0257b9d50a1"`);
        await queryRunner.query(`DROP TABLE "workoutsLog"`);
    }

}
