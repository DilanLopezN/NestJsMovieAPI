import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from 'src/controllers/movies/movies.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Movie } from 'src/entities/MovieEntity';
import { MoviesTypeOrmRepository } from 'src/repositories/typeorm/MovieTpm'; 
import { MoviesService } from 'src/services/movies/movies.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesTypeOrmRepository], 
  exports: [MoviesService, TypeOrmModule],
})
export class MoviesModule {}
