import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  Length,
  IsPostalCode,
  IsPhoneNumber,
  IsUrl,
  IsEnum,
} from "class-validator";

enum PartnerType {
  VET = "VET",
  ORG = "ORG",
  SHOP = "SHOP",
  SHELTER = "SHELTER",
}

export default class CreatePartnerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 64)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street?: string;

  @ApiProperty()
  @IsString()
  @IsPostalCode("PL")
  @IsNotEmpty()
  postal?: string;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber("PL")
  @IsNotEmpty()
  phone?: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  website?: string;

  @ApiProperty({
    enum: PartnerType,
  })
  @IsEnum(PartnerType)
  @IsString()
  @IsNotEmpty()
  type: PartnerType;
}
