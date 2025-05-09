import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
  @ApiProperty({ example: "Adoption Day" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: "Join us for a special adoption event." })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: "https://example.com/image.jpg", required: false })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  partnerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  eventDate: string;
}
