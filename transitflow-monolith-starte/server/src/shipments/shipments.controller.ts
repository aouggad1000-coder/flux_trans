import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';

@Controller('api/shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Get()
  async findAll() {
    return this.shipmentsService.findAll();
  }

  @Post()
  async create(@Body() body: any) {
    return this.shipmentsService.create(body);
  }

  @Post(':id/milestones')
  async addMilestone(@Param('id') id: string, @Body() body: any) {
    return this.shipmentsService.addMilestone(id, body);
  }
}
