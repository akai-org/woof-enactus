import { ApiProperty } from "@nestjs/swagger";
import { Partner } from "@prisma/client";

export class GenericResponse<T = unknown> {
  @ApiProperty({
    required: true,
    description:
      "Jeżeli zapytanie było poprawne i znaleziono żądany zasób to jest ustawione na TRUE. W każdym innym przypadku FALSE.",
  })
  ok: boolean;

  @ApiProperty({
    required: false,
    description: "Zawiera żądany zasób, jeśli taki istnieje",
  })
  data?: T;

  @ApiProperty({
    required: false,
    description: "Zawiera wiadomość o błędzie",
  })
  message?: string;

  @ApiProperty({
    required: false,
    description: "Zawiera szczegółowy opis błędu, dostępne tylko na devie",
  })
  error?: string;
}

export class GetAllPartnersResponse extends GenericResponse<Partner[]> {}
