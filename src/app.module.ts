import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: +process.env.REDIS_EXPIRATION,
      isGlobal: true,
      store: redisStore,
      url: process.env.REDIS_URI,
    }),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
