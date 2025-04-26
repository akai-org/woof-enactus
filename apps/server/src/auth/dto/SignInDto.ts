import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 24)
  @ApiProperty()
  username!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password!: string;
}
