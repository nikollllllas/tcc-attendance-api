import { Module } from '@nestjs/common';
import { SchoolCallService } from './school-call.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SchoolCallController } from './school-call.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SchoolCallController],
  providers: [SchoolCallService]
})
export class SchoolCallModule {}
