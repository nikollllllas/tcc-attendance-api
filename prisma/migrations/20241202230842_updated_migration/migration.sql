/*
  Warnings:

  - You are about to drop the column `cpf` on the `SchoolCall` table. All the data in the column will be lost.
  - Added the required column `proximityUUID` to the `SchoolCall` table without a default value. This is not possible if the table is not empty.
  - Made the column `subjectId` on table `SchoolCall` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SchoolCall" DROP CONSTRAINT "SchoolCall_subjectId_fkey";

-- DropIndex
DROP INDEX "SchoolCall_subjectId_createdAt_key";

-- AlterTable
ALTER TABLE "SchoolCall" DROP COLUMN "cpf",
ADD COLUMN     "proximityUUID" TEXT NOT NULL,
ALTER COLUMN "subjectId" SET NOT NULL;

-- AlterTable
ALTER TABLE "_CourseSubjects" ADD CONSTRAINT "_CourseSubjects_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CourseSubjects_AB_unique";

-- AlterTable
ALTER TABLE "_StudentSchoolCalls" ADD CONSTRAINT "_StudentSchoolCalls_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_StudentSchoolCalls_AB_unique";

-- AlterTable
ALTER TABLE "_StudentSubjects" ADD CONSTRAINT "_StudentSubjects_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_StudentSubjects_AB_unique";

-- AlterTable
ALTER TABLE "_TeacherSubjects" ADD CONSTRAINT "_TeacherSubjects_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TeacherSubjects_AB_unique";

-- AddForeignKey
ALTER TABLE "SchoolCall" ADD CONSTRAINT "SchoolCall_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
