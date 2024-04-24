import { Injectable } from '@nestjs/common';
import { MovieEntity } from 'src/core/entities/MovieEntity';
import { Slug } from 'src/core/entities/value-objects/slug';
import { MoviesTypeOrmRepository } from 'src/repositories/typeorm/MovieTpm';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesTypeOrmRepository
  ) {}

  async findBySlug(slug: string): Promise<MovieEntity> {
    const movie =  await this.moviesRepository.findBySlug(slug);
    return movie
  }

  async findByTitle(title: string): Promise<MovieEntity> {
    const movie = await this.moviesRepository.findByTitle(title);
    return movie
  }

  async findMany(page: number): Promise<{
    movies: MovieEntity[],
    totalPages: number
    actualPage: number;
  }> {
    const moviesData = await this.moviesRepository.findMany(page);
    return {
      movies: moviesData.movies,
      actualPage: moviesData.page,
      totalPages: moviesData.totalPages
    }
  }

  async createMovie(data: MovieEntity): Promise<void> {

    const slugFormatted = Slug.createFromText(data.slug);

    await this.moviesRepository.createMovie({
      ...data,
      slug: slugFormatted.value,
      createdAt: new Date()
    })

  }

  async updateMovie(data: MovieEntity, movieId: number): Promise<MovieEntity> {
    const movie = await this.moviesRepository.updateMovie({
      ...data,
      slug: Slug.createFromText(data.slug).value
    }, movieId)
    return movie
  }

  async removeMovie(movieId: number): Promise<void> {
    await this.moviesRepository.removeMovie(movieId)
  }


}
