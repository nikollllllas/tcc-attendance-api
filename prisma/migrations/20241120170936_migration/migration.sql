/*
  Warnings:

  - You are about to drop the column `classroomId` on the `Beacon` table. All the data in the column will be lost.
  - You are about to drop the column `classroomId` on the `SchoolCall` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `SchoolCall` table. All the data in the column will be lost.
  - You are about to drop the `Classroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudentCourses` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[subjectId,createdAt]` on the table `SchoolCall` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Beacon" DROP CONSTRAINT "Beacon_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "SchoolCall" DROP CONSTRAINT "SchoolCall_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "_StudentCourses" DROP CONSTRAINT "_StudentCourses_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudentCourses" DROP CONSTRAINT "_StudentCourses_B_fkey";

-- DropIndex
DROP INDEX "SchoolCall_subjectId_classroomId_createdAt_key";

-- AlterTable
ALTER TABLE "Beacon" DROP COLUMN "classroomId";

-- AlterTable
ALTER TABLE "SchoolCall" DROP COLUMN "classroomId",
DROP COLUMN "studentId";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "courseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Classroom";

-- DropTable
DROP TABLE "_StudentCourses";

-- CreateIndex
CREATE UNIQUE INDEX "SchoolCall_subjectId_createdAt_key" ON "SchoolCall"("subjectId", "createdAt");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
