import { ApiProperty } from "@nestjs/swagger";
import { Partner } from "@prisma/client";

export interface GenericResponse {
  ok: boolean;
  data?: unknown;
  message?: string;
  error?: string;
}

export class GetAllPartnersResponse implements GenericResponse {
  @ApiProperty()
  ok: boolean;

  @ApiProperty({ required: false })
  data?: Partner[];

  @ApiProperty({ required: false })
  message?: string | undefined;

  @ApiProperty({ required: false })
  error?: string | undefined;
}
