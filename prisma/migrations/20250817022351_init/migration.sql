-- CreateTable
CREATE TABLE "public"."planning_room" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "planning_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."participant_planning_room" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "planning_room_id" TEXT NOT NULL,

    CONSTRAINT "participant_planning_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."task" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "planning_room_id" TEXT NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "coins" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_uid_key" ON "public"."user"("uid");

-- AddForeignKey
ALTER TABLE "public"."planning_room" ADD CONSTRAINT "planning_room_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."participant_planning_room" ADD CONSTRAINT "participant_planning_room_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."participant_planning_room" ADD CONSTRAINT "participant_planning_room_planning_room_id_fkey" FOREIGN KEY ("planning_room_id") REFERENCES "public"."planning_room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task" ADD CONSTRAINT "task_planning_room_id_fkey" FOREIGN KEY ("planning_room_id") REFERENCES "public"."planning_room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
