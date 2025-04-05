import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  Res,
} from "@nestjs/common";
import { PartnersService } from "./partners.service";
import { Response } from "express";
import { CreatePartnerDto } from "./dto/CreatePartnerDto";
import UpdatePartnerDto from "./dto/UpdatePartnerDto";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetAllPartnersResponse } from "../types";
import { PartnerType } from "@prisma/client";

@ApiTags("partners")
@Controller("partners")
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  // GET /partners?city=example&type=example
  @ApiResponse({ type: GetAllPartnersResponse })
  @ApiQuery({ name: "city", required: false })
  @ApiQuery({ name: "type", required: false, example: "SHELTER" })
  @ApiQuery({ name: "name", required: false })
  @ApiQuery({ name: "street", required: false })
  @Get()
  async getAllPartners(
    @Res() res: Response,
    @Query("name") name?: string,
    @Query("city") city?: string,
    @Query("street") street?: string,
    @Query("type") type?: PartnerType,
  ) {
    const result = await this.partnersService.findAll(name, city, street, type);
    return res.status(result.ok ? 200 : 400).json(result);
  }

  // GET /partners/:slug
  @Get(":slug")
  async getPartnerBySlug(@Param("slug") slug: string, @Res() res: Response) {
    const result = await this.partnersService.findOne(slug);
    return res.status(result.ok ? 200 : 404).json(result);
  }

  // POST /partners
  @Post()
  async createPartner(@Body() body: CreatePartnerDto, @Res() res: Response) {
    const result = await this.partnersService.create(body);
    return res.status(result.ok ? 201 : 500).json(result);
  }

  // PUT /partners/:slug
  @Put(":slug")
  async updatePartner(
    @Param("slug") slug: string,
    @Body() body: UpdatePartnerDto,
    @Res() res: Response,
  ) {
    const result = await this.partnersService.update(slug, body);
    return res.status(result.ok ? 200 : 500).json(result);
  }

  // DELETE /partners/:uuid
  @Delete(":slug")
  async deletePartner(@Param("slug") slug: string, @Res() res: Response) {
    const result = await this.partnersService.delete(slug);
    return res.status(result.ok ? 200 : 500).json(result);
  }

  // GET /partners/profile/:uuid
  @Get("profile/:slug")
  async getPartnerWithProfile(@Param("slug") slug: string) {
    return this.partnersService.findOneWithProfile(slug);
  }
}
