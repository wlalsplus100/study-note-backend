// src/project/project.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll(@Query('owner') ownerId?: number) {
    if (ownerId) {
      return this.projectService.findByOwner(ownerId);
    }
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectService.remove(id);
  }
}
