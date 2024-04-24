import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/core/entities/UserEntity';
import { ResourceNotFoundError } from 'src/core/errors/ResourceNotFoundError';
import { UserAlreadyExitsError } from 'src/core/errors/UserAlreadyExitsError';
import { UserService } from 'src/services/users/users.service';

@ApiTags("users")
@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UserService) {}

  @Post()
  async createUser(@Res() response, @Body() userData: UserEntity) {
    try {
       await this.userServices.createUser(userData)
        return response.status(HttpStatus.CREATED).json({
          message: "User created successfully",
        })
    } catch (error) {
      if(error instanceof UserAlreadyExitsError) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findByEmail(@Query('email') email: string) {
    try {
      const user = await this.userServices.findByEmail(email);
      return user

    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
     }
  
  }

  @Put()
  async updateUser(@Res() response, @Body() userData: UserEntity) {
      try {
       
        const user = await this.userServices.updateUser(userData, userData.id);
        return response.status(HttpStatus.CREATED).json({
          message: "User updated successfully",
          data: user
        })

      } catch (error) {

        if(error instanceof ResourceNotFoundError) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  @Delete (':userId')
  async removeUser(@Res() response, @Param() params: { userId: string}) {
    try {
    await this.userServices.removeUser(Number(params.userId));
      return response.status(HttpStatus.NO_CONTENT).json({
        message: "User removed successfully",
      })
    } catch (error) {
      console.log(error)
      if(error instanceof ResourceNotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }


    @Get('all')
    async  findManyUsers(@Res() response) {
     try {
      const users = await this.userServices.findMany()

      return response.status(HttpStatus.CREATED).json({
        message: "User updated successfully",
        data: users
      })
     } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }

  }




 
  

