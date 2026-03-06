/*
  Warnings:

  - The primary key for the `_CourseSubjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_StudentSubjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_TeacherSubjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_CourseSubjects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_StudentSubjects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_TeacherSubjects` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_CourseSubjects" DROP CONSTRAINT "_CourseSubjects_AB_pkey";

-- AlterTable
ALTER TABLE "_StudentSubjects" DROP CONSTRAINT "_StudentSubjects_AB_pkey";

-- AlterTable
ALTER TABLE "_TeacherSubjects" DROP CONSTRAINT "_TeacherSubjects_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_CourseSubjects_AB_unique" ON "_CourseSubjects"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentSubjects_AB_unique" ON "_StudentSubjects"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherSubjects_AB_unique" ON "_TeacherSubjects"("A", "B");
