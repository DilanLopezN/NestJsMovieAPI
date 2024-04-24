import { UserEntity } from "src/core/entities/UserEntity"
import { ResourceNotFoundError } from "src/core/errors/ResourceNotFoundError"
import { UserTypeOrmRepository } from "src/repositories/typeorm/UserTpm"
import * as bcrypt from 'bcrypt';
import { InvalidCredentialsError } from "src/core/errors/InvalidCredentialsError";
import { Injectable } from "@nestjs/common";
import { SigninDTO } from "src/controllers/users/authenticate.controller";


@Injectable()
export class AuthenticateService {
  constructor( private readonly userRepository: UserTypeOrmRepository) {}

  async execute({email, password}: SigninDTO ): Promise<UserEntity> {
   const user = await this.userRepository.findByEmail(email)

   if(!user) {
    throw new ResourceNotFoundError(user.email)
   }

   const doesPasswordMatch = await bcrypt.compare(password, user.password)

   if(!doesPasswordMatch) {
    throw new InvalidCredentialsError()
   }

   return user

  }
}