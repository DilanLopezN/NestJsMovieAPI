import { ApiProperty } from "@nestjs/swagger";

export class UserEntity {
  id?: number;

  @ApiProperty({required: true})
  userName: string;

  @ApiProperty({required: true, uniqueItems: true})
  email: string;

  @ApiProperty({required: true})
  password: string;
}