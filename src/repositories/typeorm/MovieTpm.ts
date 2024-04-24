import {  Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ResourceNotFoundError } from "src/core/errors/ResourceNotFoundError";
import { MoviesRepository } from "../movies/MoviesRepository";
import { Movie } from "src/entities/MovieEntity";
import { MovieEntity } from "src/core/entities/MovieEntity";




export class MoviesTypeOrmRepository extends Repository<Movie> implements MoviesRepository{
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>
  ) {
    super(
      moviesRepository.target,
      moviesRepository.manager,
      moviesRepository.queryRunner
    )
  }
  async createMovie(data: MovieEntity): Promise<void> {
    const movie = this.create(data);
    await this.save(movie);
  }
 async updateMovie(data: MovieEntity, movieId: number): Promise<MovieEntity> {
    const movie =  await this.update({id: movieId}, data);
    if (movie.affected === 0) {
      throw new ResourceNotFoundError('Movie not found');
    }
    return data
  }

  async findByTitle(title: string): Promise<MovieEntity> {
    const movie = await this.findOne({ where: {title} });
    return movie
  }
  async findBySlug(slug: string): Promise<MovieEntity> { 
    const movie = await this.findOne({ where: {slug} });
    return movie
  }
  async findMany(page: number = 1): Promise<{
    movies: MovieEntity[]
    page: number;
    totalPages: number
  }>  {
    const pageSize: number = 20
    const skip = (page - 1) * pageSize;
    const totalMovies = await this.count()
    const totalPages =  Math.ceil(totalMovies / pageSize);

    const movies = await this.find({take: pageSize, skip: skip});
    return {
      movies,
      totalPages,
      page
    }
  }
  async removeMovie(movieId: number): Promise<void> {
    const movie =  await this.delete({id: movieId});
    if (movie.affected === 0) {
      throw new ResourceNotFoundError('Movie not found');
    }
  }
  
 


}