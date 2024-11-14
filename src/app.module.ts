import { Module } from "@nestjs/common"
import { AuthModule } from "./auth/auth.module"
import { CourseModule } from "./course/course.module"
import { StudentModule } from "./student/student.module"
import { TeacherModule } from "./teacher/teacher.module"
import { SubjectModule } from "./subject/subject.module"
import { BeaconModule } from "./beacon/beacon.module"
import { PrismaModule } from "./prisma/prisma.module"
import { ConfigModule } from "@nestjs/config"
import { SchoolCallModule } from "./school-call/school-call.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    BeaconModule,
    CourseModule,
    SchoolCallModule,
    StudentModule,
    SubjectModule,
    TeacherModule,
  ],
})
export class AppModule {}
