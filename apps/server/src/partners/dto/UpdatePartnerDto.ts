import { PartialType } from "@nestjs/swagger";
import { CreatePartnerDto } from "./CreatePartnerDto";

export default class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}
