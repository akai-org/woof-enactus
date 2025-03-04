import { Controller, Get, Param, Res } from "@nestjs/common";
import { PartnersService } from "./partners.service";
import type { Response } from "express";

@Controller("partners")
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  // GET /partners
  @Get()
  async getAllPartners(@Res() res: Response) {
    return this.partnersService.findAll(res);
  }

  // GET /partners/:uuid
  @Get(":uuid")
  async getPartnerByUuid(@Param("uuid") uuid: string, @Res() res: Response) {
    return this.partnersService.findOne(uuid, res);
  }
}
