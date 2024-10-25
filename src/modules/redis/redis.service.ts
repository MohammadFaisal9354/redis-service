import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    try {
      const redisClient = (this.cacheManager.store as any).getClient();
      // Log Redis connection events
      redisClient.on('connect', () => {
        console.log('**** Connected to Redis ****');
      });
      redisClient.on('error', (error: any) => {
        console.log('Error connecting to Redis:', error);
      });
    } catch (err) {
      console.log(err, 'Error catched in redis!');
    }
  }

  async set(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async get(key: string): Promise<string> {
    return await this.cacheManager.get(key);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset();
  }

  async cacheStore(): Promise<string[]> {
    return await this.cacheManager.store.keys();
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectRedis } from '@nestjs-modules/ioredis';
// import { Redis } from 'ioredis';

// @Injectable()
// export class YourService {
//   constructor(@InjectRedis() private readonly redis: Redis) {}

//   // Set a value in Redis
//   async setValue(key: string, value: string) {
//     await this.redis.set(key, value);
//   }

//   // Get a value from Redis
//   async getValue(key: string) {
//     return await this.redis.get(key);
//   }

//   // Delete a key from Redis
//   async deleteKey(key: string) {
//     await this.redis.del(key);
//   }

//   // Check if a key exists
//   async keyExists(key: string) {
//     return await this.redis.exists(key);
//   }

//   // Set a key's expiration time
//   async setExpiration(key: string, seconds: number) {
//     await this.redis.expire(key, seconds);
//   }

//   // Get the time to live for a key
//   async getTTL(key: string) {
//     return await this.redis.ttl(key);
//   }

//   // Increment the integer value of a key by one
//   async increment(key: string) {
//     return await this.redis.incr(key);
//   }

//   // Decrement the integer value of a key by one
//   async decrement(key: string) {
//     return await this.redis.decr(key);
//   }

//   // Insert a value at the head of a list
//   async pushLeft(key: string, value: string) {
//     await this.redis.lpush(key, value);
//   }

//   // Insert a value at the tail of a list
//   async pushRight(key: string, value: string) {
//     await this.redis.rpush(key, value);
//   }

//   // Remove and return the first element of a list
//   async popLeft(key: string) {
//     return await this.redis.lpop(key);
//   }

//   // Remove and return the last element of a list
//   async popRight(key: string) {
//     return await this.redis.rpop(key);
//   }

//   // Set the value of a field in a hash
//   async hashSet(key: string, field: string, value: string) {
//     await this.redis.hset(key, field, value);
//   }

//   // Get the value of a field in a hash
//   async hashGet(key: string, field: string) {
//     return await this.redis.hget(key, field);
//   }

//   // Delete a field from a hash
//   async hashDelete(key: string, field: string) {
//     await this.redis.hdel(key, field);
//   }

//   // Add a member to a set
//   async setAdd(key: string, value: string) {
//     await this.redis.sadd(key, value);
//   }

//   // Get all members of a set
//   async setMembers(key: string) {
//     return await this.redis.smembers(key);
//   }

//   // Remove a member from a set
//   async setRemove(key: string, value: string) {
//     await this.redis.srem(key, value);
//   }

//   // Add a member to a sorted set
//   async sortedSetAdd(key: string, score: number, member: string) {
//     await this.redis.zadd(key, score, member);
//   }

//   // Return a range of members in a sorted set
//   async sortedSetRange(key: string, start: number, stop: number) {
//     return await this.redis.zrange(key, start, stop);
//   }

//   // Remove a member from a sorted set
//   async sortedSetRemove(key: string, member: string) {
//     await this.redis.zrem(key, member);
//   }

//   // Publish a message to a channel
//   async publishMessage(channel: string, message: string) {
//     await this.redis.publish(channel, message);
//   }

//   // Subscribe to a channel
//   async subscribeToChannel(channel: string) {
//     const subscriber = this.redis.duplicate(); // create a new connection for subscribing
//     await subscriber.subscribe(channel);
//     subscriber.on('message', (channel, message) => {
//       console.log(`Received message from ${channel}: ${message}`);
//     });
//   }

//   // Unsubscribe from a channel
//   async unsubscribeFromChannel(channel: string) {
//     const subscriber = this.redis.duplicate(); // create a new connection for unsubscribing
//     await subscriber.unsubscribe(channel);
//   }

//   // Check the connection to the Redis server
//   async ping() {
//     return await this.redis.ping();
//   }

//   // Delete all keys in the current database
//   async flushDatabase() {
//     await this.redis.flushdb();
//   }

//   // Delete all keys in all databases
//   async flushAll() {
//     await this.redis.flushall();
//   }
// }
