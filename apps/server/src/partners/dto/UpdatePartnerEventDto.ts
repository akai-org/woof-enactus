import { PartialType } from "@nestjs/swagger";
import { CreatePartnerEventDto } from "./CreatePartnerEventDto";

export class UpdatePartnerEventDto extends PartialType(CreatePartnerEventDto) {}
