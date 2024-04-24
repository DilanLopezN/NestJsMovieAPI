import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/core/entities/UserEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User implements UserEntity {
  @PrimaryGeneratedColumn()
  id: number

 
  @Column()
  userName: string

  @Column({unique: true})
  email: string

  @Column()
  password: string

}