import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsEnum } from 'class-validator';
import { GoodsState } from '@prisma/client';

export class CreateNeededGoodsDto {
  @ApiProperty({ example: "Food supplies" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, example: "Need these urgently" })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ required: false, example: 0 })
  @IsOptional()
  @IsInt()
  amountCurrent?: number;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(0)
  amountMax: number;

  @ApiProperty({ required: false, example: "kg" })
  @IsOptional()
  @IsString()
  amountUnit?: string;

  @ApiProperty({ enum: GoodsState, example: GoodsState.LOW })
  @IsEnum(GoodsState)
  state: GoodsState;

  @ApiProperty({ required: false, example: "Low stock" })
  @IsOptional()
  @IsString()
  stateInfo?: string;

  @ApiProperty({ example: 1, description: "ID of the partner" })
  @IsInt()
  partnerId: number;
}
