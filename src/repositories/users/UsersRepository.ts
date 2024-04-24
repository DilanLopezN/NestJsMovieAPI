import { UserEntity } from "src/core/entities/UserEntity"

export interface UsersRepository {
  createUser(data: UserEntity): Promise<void>
  updateUser(data: UserEntity, userId: number): Promise<UserEntity | null>
  findByEmail(email: string): Promise<UserEntity | null>
  findById(userId: number): Promise<UserEntity | null>
  findMany(): Promise<UserEntity[]> 
  removeUser(userId: number): Promise<void>

}