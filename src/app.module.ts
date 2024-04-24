import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { MoviesModule } from './modules/movies/movies.module';
import { MoviesService } from './services/movies/movies.service';
import { MoviesController } from './controllers/movies/movies.controller';
import { AuthController } from './controllers/users/authenticate.controller';
import { MoviesTypeOrmRepository } from './repositories/typeorm/MovieTpm';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from './middleware/jwt.verify';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';



@Module({
  imports: [DatabaseModule, UsersModule, MoviesModule, JwtModule.register({
    secret: 'mks-challenge', 
    signOptions: { expiresIn: '1h' }, 
  }), CacheModule.register({
    isGlobal: true,
    store: redisStore,
    host: 'localhost',
    port: 6379,
  })],
  controllers: [AppController, AuthController, MoviesController],
  providers: [AppService, MoviesService, MoviesTypeOrmRepository],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/movies*'); // Aplica o middleware a todas as rotas
  }
}
