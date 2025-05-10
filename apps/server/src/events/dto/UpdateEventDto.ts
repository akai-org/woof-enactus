import { PartialType } from "@nestjs/swagger";
import { CreateEventDto } from "./CreateEventDto";

export class UpdateEventDto extends PartialType(CreateEventDto) {}
