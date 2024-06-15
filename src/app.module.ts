import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassroomModule } from './classroom/classroom.module';
import { SubjectModule } from './subject/subject.module';
import { BeaconModule } from './beacon/beacon.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    BeaconModule,
    ClassroomModule,
    CourseModule,
    StudentModule,
    SubjectModule,
    TeacherModule
  ]
})
export class AppModule {}
