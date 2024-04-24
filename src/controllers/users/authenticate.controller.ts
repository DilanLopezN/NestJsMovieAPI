import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { InvalidCredentialsError } from 'src/core/errors/InvalidCredentialsError';

import { UserAlreadyExitsError } from 'src/core/errors/UserAlreadyExitsError';
import { AuthenticateService } from 'src/services/users/authenticate.service';


export class SigninDTO {
  @ApiProperty({required: true})
  email: string;
  @ApiProperty({required: true})
  password: string;
}
@ApiTags("login")
@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthenticateService,
    private jwtService: JwtService
  ) {}

  @Post()
  async createUser(@Res() response, @Body() userData: SigninDTO) {
    try {
      const user =  await this.authServices.execute({email: userData.email, password: userData.password});
       
      const payload = { sub: user.id, username: user.userName };

      return response.status(HttpStatus.OK).json({
        access_token: await this.jwtService.signAsync(payload),
      });

    } catch (error) {
      
      if(error instanceof UserAlreadyExitsError || error instanceof InvalidCredentialsError) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
     
    }
  }


  }
