import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { BeaconService } from './beacon.service';
import { CreateBeaconDto } from './dto/create-beacon.dto';
import { UpdateBeaconDto } from './dto/update-beacon.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('beacons')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Beacon')
export class BeaconController {
  constructor(private readonly beaconService: BeaconService) {}

  @Post()
  @ApiSecurity('token')
  create(@Body() createBeaconDto: CreateBeaconDto) {
    return this.beaconService.create(createBeaconDto);
  }

  @Get()
  @ApiSecurity('token')
  findAll() {
    return this.beaconService.findAll();
  }

  @Get(':id')
  @ApiSecurity('token')
  findOne(@Param('id') id: string) {
    return this.beaconService.findOne(+id);
  }
}
