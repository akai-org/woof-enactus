import { ApiProperty } from "@nestjs/swagger";
import { PartnerType } from "@prisma/client";
import { IsString, IsNotEmpty, Length, IsEnum } from "class-validator";

export default class CreatePartnerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 64)
  name: string;

  @ApiProperty({
    enum: PartnerType,
  })
  @IsEnum(PartnerType)
  @IsString()
  @IsNotEmpty()
  type: PartnerType;
}
