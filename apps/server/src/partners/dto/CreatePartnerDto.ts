import { ApiProperty } from "@nestjs/swagger";
import { PartnerType } from "@prisma/client";
import {
  IsString,
  IsNotEmpty,
  Length,
  IsEnum,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
} from "class-validator";

export class CreatePartnerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(2, 64)
  name: string;

  @ApiProperty({ enum: PartnerType })
  @IsEnum(PartnerType)
  type: PartnerType;

  // Profile fields
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  getToInfo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  postal?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  animals: [string];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  visitHours?: string;

  // WorkingHours fields (for openHours)
  @ApiProperty()
  @IsOptional()
  @IsString()
  monday?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tuesday?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  wednesday?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  thursday?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  friday?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  saturday?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sunday?: string;
}
