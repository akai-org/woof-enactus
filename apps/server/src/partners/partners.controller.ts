import { Controller, Get, Query, Res } from "@nestjs/common";
import { PartnersService } from "./partners.service";
import { Response } from "express";

@Controller("partners")
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get()
  async getAllPartners(
    @Res() res: Response,
    @Query("city") city?: string,
    @Query("type") type?: string,
  ) {
    const result = await this.partnersService.findAll(city, type);
    return res.status(result.ok ? 200 : 400).json(result);
  }
}
