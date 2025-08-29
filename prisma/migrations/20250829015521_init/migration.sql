/*
  Warnings:

  - A unique constraint covering the columns `[user_id,planning_room_id]` on the table `participant_planning_room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `participant_planning_room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."participant_planning_room" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "participant_planning_room_user_id_planning_room_id_key" ON "public"."participant_planning_room"("user_id", "planning_room_id");
