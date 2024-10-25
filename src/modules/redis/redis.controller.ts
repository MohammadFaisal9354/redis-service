import {
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ParseBoolPipe,
  Patch,
  Delete,
  Body,
  ParseEnumPipe,
  UseInterceptors,
  UploadedFile,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}
  @Get()
  getAllData() {
    this.redisService.set('faisal', new Date().toISOString());

    return this.redisService.get('faisal');
  }

  @Post()
  setdata() {
    this.redisService.set('faisal', new Date().toISOString());
  }
}
