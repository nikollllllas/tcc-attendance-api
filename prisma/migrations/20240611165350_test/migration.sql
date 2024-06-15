/*
  Warnings:

  - You are about to drop the column `studentId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[academicalRegister]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_subjectId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "studentId",
DROP COLUMN "subjectId";

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "subjectId";

-- CreateTable
CREATE TABLE "_CourseSubjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_StudentCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_StudentSubjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TeacherSubjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseSubjects_AB_unique" ON "_CourseSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseSubjects_B_index" ON "_CourseSubjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentCourses_AB_unique" ON "_StudentCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentCourses_B_index" ON "_StudentCourses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentSubjects_AB_unique" ON "_StudentSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentSubjects_B_index" ON "_StudentSubjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeacherSubjects_AB_unique" ON "_TeacherSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_TeacherSubjects_B_index" ON "_TeacherSubjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Student_academicalRegister_key" ON "Student"("academicalRegister");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_cpf_key" ON "Teacher"("cpf");

-- AddForeignKey
ALTER TABLE "_CourseSubjects" ADD CONSTRAINT "_CourseSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseSubjects" ADD CONSTRAINT "_CourseSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentCourses" ADD CONSTRAINT "_StudentCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentCourses" ADD CONSTRAINT "_StudentCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentSubjects" ADD CONSTRAINT "_StudentSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentSubjects" ADD CONSTRAINT "_StudentSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherSubjects" ADD CONSTRAINT "_TeacherSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeacherSubjects" ADD CONSTRAINT "_TeacherSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
