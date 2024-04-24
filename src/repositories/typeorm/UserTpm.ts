import { UserEntity } from "src/core/entities/UserEntity";
import { ObjectId, Repository } from "typeorm";
import { UsersRepository } from "../users/UsersRepository";
import { User } from "src/entities/UserEntity";
import { InjectRepository } from "@nestjs/typeorm";
import { ResourceNotFoundError } from "src/core/errors/ResourceNotFoundError";




export class UserTypeOrmRepository extends Repository<User> implements UsersRepository{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner
    )
  }
 
  async createUser(data: UserEntity): Promise<void> {
    const user = this.create(data);
    await this.save(user);
  }
  
  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.findOne({ where: {email} });
    return user
  }
  async findById(userId: number): Promise<UserEntity> {
    const user = await this.findOne({where: {id: userId} });
    return user
  }

  async findMany(): Promise<UserEntity[]> {
      const users = await this.find()
      return users
  }


  async updateUser(data: UserEntity, userId: number): Promise<UserEntity> {
    const user =  await this.update({id: userId}, data);
    if (user.affected === 0) {
      throw new ResourceNotFoundError('User not found');
    }
    return data
  }

  async removeUser(userId: number): Promise<void> {
    const user =  await this.delete({id: userId});
    if (user.affected === 0) {
      throw new ResourceNotFoundError('User not found');
    }
    
  }

}