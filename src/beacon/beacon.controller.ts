import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { BeaconService } from './beacon.service';
import { CreateBeaconDto } from './dto/create-beacon.dto';
import { UpdateBeaconDto } from './dto/update-beacon.dto';

@Controller('beacons')
export class BeaconController {
  constructor(private readonly beaconService: BeaconService) {}

  @Post()
  create(@Body() createBeaconDto: CreateBeaconDto) {
    return this.beaconService.create(createBeaconDto);
  }

  @Get()
  findAll() {
    return this.beaconService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beaconService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeaconDto: UpdateBeaconDto) {
    return this.beaconService.update(+id, updateBeaconDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beaconService.remove(+id);
  }
}
