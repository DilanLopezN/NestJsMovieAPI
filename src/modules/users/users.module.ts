import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/users/users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserTypeOrmRepository } from 'src/repositories/typeorm/UserTpm';
import { UserService } from 'src/services/users/users.service';
import { User } from 'src/entities/UserEntity';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticateService } from 'src/services/users/authenticate.service';
import { AuthController } from 'src/controllers/users/authenticate.controller';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [UsersController, AuthController],
  providers: [UserService, UserTypeOrmRepository, AuthenticateService],
  exports: [UserService, TypeOrmModule, AuthenticateService],
})
export class UsersModule {}
