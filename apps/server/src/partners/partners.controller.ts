import { Controller, Get, Param } from "@nestjs/common";
import { PartnersService } from "./partners.service";

@Controller("partners")
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  // GET /partners
  @Get()
  async getAllPartners() {
    return this.partnersService.findAll();
  }

  // GET /partners/:uuid
  @Get(":uuid")
  async getPartnerByUuid(@Param("uuid") uuid: string) {
    return this.partnersService.findOne(uuid);
  }
}
