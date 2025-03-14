import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { PartnersService } from "./partners.service";
import { Response } from "express";
import CreatePartnerDto from "./dto/CreatePartnerDto";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetAllPartnersResponse } from "../types";
import { PartnerType } from "@prisma/client";

@ApiTags("partners")
@Controller("partners")
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  // GET /partners?city=example&type=example
  @ApiResponse({ type: GetAllPartnersResponse })
  @ApiQuery({ name: "city", required: false, example: "Warszawa" })
  @ApiQuery({ name: "type", required: false, example: "SHELTER" })
  @Get()
  async getAllPartners(
    @Res() res: Response,
    @Query("city") city?: string,
    @Query("type") type?: PartnerType,
  ) {
    const result = await this.partnersService.findAll(city, type);
    return res.status(result.ok ? 200 : 400).json(result);
  }

  // GET /partners/:uuid
  @Get(":uuid")
  async getPartnerByUuid(@Param("uuid") uuid: string, @Res() res: Response) {
    const result = await this.partnersService.findOne(uuid);
    return res.status(result.ok ? 200 : 404).json(result);
  }

  @Post()
  async createPartner(@Body() body: CreatePartnerDto, @Res() res: Response) {
    const result = await this.partnersService.create(body);
    return res.status(result.ok ? 201 : 500).json(result);
  }
}
