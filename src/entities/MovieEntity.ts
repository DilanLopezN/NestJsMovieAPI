import { MovieEntity } from "src/core/entities/MovieEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Movie implements MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  duration: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @Column()
  createdAt: Date;
}