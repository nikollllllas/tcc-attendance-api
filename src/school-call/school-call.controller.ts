import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common'
import { CreateSchoolCallDto } from './dto/create-scholl-call-dto'
import { AuthGuard } from '@nestjs/passport'
import { ApiSecurity, ApiTags } from '@nestjs/swagger'
import { SchoolCallService } from './school-call.service'

@Controller('school-call')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Chamada Escolar')
export class SchoolCallController {
  constructor(private readonly schoolCallService: SchoolCallService) {}

  @Post()
  @ApiSecurity('token')
  async create(@Body() createSchoolCallDto: CreateSchoolCallDto) {
    return this.schoolCallService.create(createSchoolCallDto)
  }

  @Get('list')
  @ApiSecurity('token')
  async findAll() {
    try {
      return await this.schoolCallService.findAll()
    } catch (e) {
      throw new NotFoundException('Error fetching school calls')
    }
  }

  @Get('list/:id')
  @ApiSecurity('token')
  async findOne(@Param('id') id: number) {
    return await this.schoolCallService.findOne(+id)
  }

  @Delete('delete/:id')
  @ApiSecurity('token')
  async delete(@Param('id') id: string) {
    await this.schoolCallService.remove(+id)
    return { message: 'School call deleted.' }
  }
}
