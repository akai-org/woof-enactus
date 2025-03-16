import { ApiProperty } from '@nestjs/swagger';
import { PartnerType } from '@prisma/client';
import { IsString, IsNotEmpty, Length, IsEnum, IsOptional, IsArray } from 'class-validator';

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
  animals: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  visitHours?: string;

  // WorkingHours fields (for openHours)
  @ApiProperty()
  @IsString()
  monday: string;

  @ApiProperty()
  @IsString()
  tuesday: string;

  @ApiProperty()
  @IsString()
  wednesday: string;

  @ApiProperty()
  @IsString()
  thursday: string;

  @ApiProperty()
  @IsString()
  friday: string;

  @ApiProperty()
  @IsString()
  saturday: string;

  @ApiProperty()
  @IsString()
  sunday: string;
}
