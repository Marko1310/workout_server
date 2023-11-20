import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1700495425356 implements MigrationInterface {
  name = 'Migration1700495425356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_9e11913ec7e5fbbdef874a126f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "FK_1c2a64d6948f80f1f9b6217618f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" RENAME COLUMN "usersId" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" RENAME COLUMN "usersId" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_6e37f37f422796d689a7b3952cf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "exercises" DROP CONSTRAINT "FK_6e37f37f422796d689a7b3952cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" RENAME COLUMN "userId" TO "usersId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" RENAME COLUMN "userId" TO "usersId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_1c2a64d6948f80f1f9b6217618f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_9e11913ec7e5fbbdef874a126f3" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
