import { Controller, Get, Param } from "@nestjs/common";
import { PartnersService } from "./partners.service";

@Controller("markers")
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  // GET /markers
  @Get()
  async getAllPartners() {
    return this.partnersService.findAll();
  }

  // GET /markers/:uuid
  @Get(":uuid")
  async getPartnerByUuid(@Param("uuid") uuid: string) {
    return this.partnersService.findOne(uuid);
  }
}
