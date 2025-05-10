import { PartialType } from "@nestjs/swagger";
import { CreateNeededGoodsDto } from "./CreateNeededGoodsDto";

export class UpdateNeededGoodsDto extends PartialType(CreateNeededGoodsDto) {}
