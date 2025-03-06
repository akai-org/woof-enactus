import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { PartnersService } from "./partners.service";
import { Response } from "express";
import CreatePartnerDto from "./dto/CreatePartnerDto";

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

  @Post()
  createPartner(@Body() body: CreatePartnerDto, @Res() res: Response) {
    return this.partnersService.create(body, res);
  }
}
