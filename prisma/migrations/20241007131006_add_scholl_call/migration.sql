-- CreateTable
CREATE TABLE "SchoolCall" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "subjectId" INTEGER,
    "classroomId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchoolCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudentSchoolCalls" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SchoolCall_subjectId_classroomId_createdAt_key" ON "SchoolCall"("subjectId", "classroomId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentSchoolCalls_AB_unique" ON "_StudentSchoolCalls"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentSchoolCalls_B_index" ON "_StudentSchoolCalls"("B");

-- AddForeignKey
ALTER TABLE "SchoolCall" ADD CONSTRAINT "SchoolCall_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolCall" ADD CONSTRAINT "SchoolCall_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentSchoolCalls" ADD CONSTRAINT "_StudentSchoolCalls_A_fkey" FOREIGN KEY ("A") REFERENCES "SchoolCall"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentSchoolCalls" ADD CONSTRAINT "_StudentSchoolCalls_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
