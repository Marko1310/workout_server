import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1702979783522 implements MigrationInterface {
  name = 'Migration1702979783522';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" RENAME COLUMN "id" TO "sessions_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" RENAME CONSTRAINT "PK_3238ef96f18b355b671619111bc" TO "PK_a60c3d292dd98956f99dcd1fece"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "sessions_id_seq" RENAME TO "sessions_sessions_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" RENAME COLUMN "id" TO "exercises_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" RENAME CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" TO "PK_9686b3c3955752ddc6aa0727be2"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "exercises_id_seq" RENAME TO "exercises_exercises_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" RENAME COLUMN "id" TO "workouts_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" RENAME CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" TO "PK_17897605e099d2b68e91c753a0f"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "workouts_id_seq" RENAME TO "workouts_workouts_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" RENAME COLUMN "id" TO "workout_split_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" RENAME CONSTRAINT "PK_f476bf0290b95cf8bfad7a0aec7" TO "PK_81392eb60c860a9fd2a73fbde04"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "workout_splits_id_seq" RENAME TO "workout_splits_workout_split_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "id" TO "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" TO "PK_96aac72f1574b88752e9fb00089"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "users_id_seq" RENAME TO "users_user_id_seq"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER SEQUENCE "users_user_id_seq" RENAME TO "users_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME CONSTRAINT "PK_96aac72f1574b88752e9fb00089" TO "PK_a3ffb1c0c8416b9fc6f907b7433"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "user_id" TO "id"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "workout_splits_workout_split_id_seq" RENAME TO "workout_splits_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" RENAME CONSTRAINT "PK_81392eb60c860a9fd2a73fbde04" TO "PK_f476bf0290b95cf8bfad7a0aec7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_splits" RENAME COLUMN "workout_split_id" TO "id"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "workouts_workouts_id_seq" RENAME TO "workouts_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" RENAME CONSTRAINT "PK_17897605e099d2b68e91c753a0f" TO "PK_5b2319bf64a674d40237dbb1697"`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" RENAME COLUMN "workouts_id" TO "id"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "exercises_exercises_id_seq" RENAME TO "exercises_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" RENAME CONSTRAINT "PK_9686b3c3955752ddc6aa0727be2" TO "PK_c4c46f5fa89a58ba7c2d894e3c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" RENAME COLUMN "exercises_id" TO "id"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "sessions_sessions_id_seq" RENAME TO "sessions_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" RENAME CONSTRAINT "PK_a60c3d292dd98956f99dcd1fece" TO "PK_3238ef96f18b355b671619111bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" RENAME COLUMN "sessions_id" TO "id"`,
    );
  }
}
