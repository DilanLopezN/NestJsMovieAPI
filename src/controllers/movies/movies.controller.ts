import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieEntity } from 'src/core/entities/MovieEntity';
import { MoviesService } from 'src/services/movies/movies.service';


@ApiTags("movies")
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post() 
  async createMovie(@Res() response, @Body() movieData: MovieEntity ) {
    try {
      await this.moviesService.createMovie(movieData)
      return response.status(HttpStatus.CREATED).json({
        message: "Movie created successfully",
      })
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    }

    @Put(":movieId") 
    async updateMovie(@Res() response, @Body() movieData: MovieEntity, @Param("movieId") movieId: string) {
      try {
       const movie =  await this.moviesService.updateMovie(movieData, Number(movieId))
        return response.status(HttpStatus.OK).json({
          message: "Movie Updated successfully",
          movie
        })
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
      }

    
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(60 * 2) // cacheado por 2 minutos
    @Get('all/:page')
    async  findManyUsers(@Res() response, @Param("page") page: string) {
     try {
      const moviesData = await this.moviesService.findMany(Number(page));

      return response.status(HttpStatus.OK).json({
        page: moviesData.actualPage,
        totalPages: moviesData.totalPages,
        movies: moviesData.movies
   
      })
     } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }

   @Get(':title')
    async  findByTitle(@Res() response, @Param("title") title: string) {
     try {
      const movie = await this.moviesService.findByTitle(title);

      return response.status(HttpStatus.OK).json({
        movie
   
      })
     } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }
 
   @Delete(":movieId")
    async removeMovie(@Res() response, @Param("movieId") movieId: string) {
      try {
          await this.moviesService.removeMovie(Number(movieId))
          return response.status(HttpStatus.NO_CONTENT).json({
            message: 'Removed'
          })
      } catch (error) {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }








  }


