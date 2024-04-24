import { MovieEntity } from "src/core/entities/MovieEntity"

export interface MoviesRepository {
  createMovie(data: MovieEntity): Promise<void>
  updateMovie(data: MovieEntity, userId: number): Promise<MovieEntity | null>
  findByTitle(email: string): Promise<MovieEntity | null>
  findBySlug(slug: string): Promise<MovieEntity | null>
  findMany(): Promise<{
    movies: MovieEntity[]
    page: number;
    totalPages: number
  }> 
  removeMovie(movieId: number): Promise<void>
}