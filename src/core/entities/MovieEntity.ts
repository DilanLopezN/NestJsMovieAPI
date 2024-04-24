import { ApiProperty } from "@nestjs/swagger";

export class MovieEntity {
  @ApiProperty({required: true})
  title: string;
  
  @ApiProperty({required: true})
  duration: string;

  @ApiProperty({required: true})
  description: string;


  @ApiProperty({required: true, description: "Identificador unico para facilitar encontrar filme será convertido em um slug\n ex: 'V de vingança' = 'v-de-vingança' "})
  slug: string;

  @ApiProperty({required: false, description: "Valor alto atribuido pelo back-end, não necessário envio"})
  createdAt: Date;
}