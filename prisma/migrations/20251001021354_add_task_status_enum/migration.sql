-- CreateEnum
CREATE TYPE "public"."TaskStatusEnum" AS ENUM ('PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "public"."task" ADD COLUMN     "status" "public"."TaskStatusEnum" NOT NULL DEFAULT 'PENDING';
