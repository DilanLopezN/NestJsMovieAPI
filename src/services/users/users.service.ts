import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/entities/UserEntity';
import { ResourceNotFoundError } from 'src/core/errors/ResourceNotFoundError';
import { UserAlreadyExitsError } from 'src/core/errors/UserAlreadyExitsError';
import * as bcrypt from 'bcrypt';
import { UserTypeOrmRepository } from 'src/repositories/typeorm/UserTpm';

@Injectable()
export class UserService {
  constructor( 
    private readonly userRepository: UserTypeOrmRepository
  ) {}

   async createUser(data: UserEntity): Promise<void> {
    const hashedPassword = await bcrypt.hash(data.password, 6)

    const UserAlreadyExits = await this.userRepository.findByEmail(data.email)

    if(UserAlreadyExits) {
      throw new UserAlreadyExitsError(data.email)
    }

     await this.userRepository.createUser({
      ...data,
      password: hashedPassword
    });
   } 

   async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new ResourceNotFoundError(email)
    }

    return user
   }

   async findById(id: number): Promise<UserEntity> {
    const user =  await this.userRepository.findById(id);

    if(!user) {
      throw new ResourceNotFoundError(id.toString())
    }

    return user
   }

   async updateUser(data: UserEntity, userId: number): Promise<UserEntity> {
   
    try {
      const hashedPassword = await bcrypt.hash(data.password, 6)

     const user =  await this.userRepository.updateUser({
        ...data,
        password: hashedPassword
      }, userId)

      return user

    } catch (error) {
       // lançando exceção do repositorio para o controller
        throw error
    }
    
   }


   async removeUser(userId: number): Promise<void> {
      try {
        await this.userRepository.removeUser(userId)
      } catch (error) {
        throw error
      }
   }


   async findMany(): Promise<UserEntity[]> {
     const users = await this.userRepository.findMany();
     return users
   }

}
