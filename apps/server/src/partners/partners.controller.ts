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
  UseGuards,
  Patch,
} from "@nestjs/common";
import { PartnersService } from "./partners.service";
import { Response } from "express";
import { CreatePartnerDto } from "./dto/CreatePartnerDto";
import UpdatePartnerDto from "./dto/UpdatePartnerDto";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetAllPartnersResponse } from "../types";
import { PartnerAccount, PartnerType } from "@prisma/client";
import { CreateNeededGoodsDto } from "./dto/CreateNeededGoodsDto";
import { UpdateNeededGoodsDto } from "./dto/UpdateNeededGoodsDto";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "src/utils/user.decorator";
import { UpdatePartnerEventDto } from "./dto/UpdatePartnerEventDto";
import { PartnerEventService } from "./partner-event.service";
import { CreatePartnerEventDto } from "./dto/CreatePartnerEventDto";

@ApiTags("partners")
@Controller("partners")
export class PartnersController {
  constructor(
    private readonly partnersService: PartnersService,
    private readonly partnerEventService: PartnerEventService,
  ) {}

  // GET /partners?city=example&type=example
  @ApiResponse({ type: GetAllPartnersResponse })
  @ApiQuery({ name: "city", required: false })
  @ApiQuery({ name: "types", required: false, example: "SHELTER,ORG" })
  @ApiQuery({ name: "name", required: false })
  @ApiQuery({ name: "street", required: false })
  @Get()
  async getAllPartners(
    @Res() res: Response,
    @Query("name") name?: string,
    @Query("city") city?: string,
    @Query("street") street?: string,
    @Query("types") typesRaw?: string,
  ) {
    const types = typesRaw
      ? (typesRaw.split(",").filter(t => t in PartnerType) as PartnerType[])
      : undefined;

    const result = await this.partnersService.findAll(
      name,
      city,
      street,
      types,
    );
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
  @UseGuards(AuthGuard)
  async createPartner(
    @Body() body: CreatePartnerDto,
    @User() user: PartnerAccount,
    @Res() res: Response,
  ) {
    const result = await this.partnersService.create(user, body);
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

  // DELETE /partners/:slug
  @Delete(":slug")
  async deletePartner(@Param("slug") slug: string, @Res() res: Response) {
    const result = await this.partnersService.delete(slug);
    return res.status(result.ok ? 200 : 500).json(result);
  }

  // GET /partners/profile/:slug
  @Get("profile/:slug")
  async getPartnerWithProfile(@Param("slug") slug: string) {
    return this.partnersService.findOneWithProfile(slug);
  }

  // GET /partners/:slug/needed-goods
  @Get(":slug/needed-goods")
  async getNeededGoodsForPartner(
    @Param("slug") slug: string,
    @Res() res: Response,
  ) {
    const result = await this.partnersService.findNeededGoodsForPartner(slug);
    return res.status(result.ok ? 200 : 500).json(result);
  }

  // POST /partners/:slug/needed-goods
  @Post(":slug/needed-goods")
  async createNeededGoodsForPartner(
    @Param("slug") slug: string,
    @Body() body: CreateNeededGoodsDto,
    @Res() res: Response,
  ) {
    const result = await this.partnersService.createNeededGoodsForPartner(
      slug,
      body,
    );
    return res.status(result.ok ? 201 : 500).json(result);
  }

  // PUT /partners/:slug/needed-goods/update/:goodUuid
  @Put(":slug/needed-goods/update/:goodUuid")
  async updateNeededGoodsForPartner(
    @Param("slug") slug: string,
    @Param("goodUuid") goodUuid: string,
    @Body() body: UpdateNeededGoodsDto,
    @Res() res: Response,
  ) {
    const result = await this.partnersService.updateNeededGoodsForPartner(
      slug,
      goodUuid,
      body,
    );
    return res.status(result.ok ? 200 : 500).json(result);
  }

  // DELETE /partners/:slug/needed-goods/delete/:goodUuid
  @Delete(":slug/needed-goods/delete/:goodUuid")
  async deleteNeededGoodsForPartner(
    @Param("slug") slug: string,
    @Param("goodUuid") goodUuid: string,
    @Res() res: Response,
  ) {
    const result = await this.partnersService.deleteNeededGoodsForPartner(
      slug,
      goodUuid,
    );
    return res.status(result.ok ? 200 : 500).json(result);
  }

  // GET /partners/:slug/events
  @Get(":slug/events")
  async getPartnerEvents(@Param("slug") slug: string, @Res() res: Response) {
    const result = await this.partnerEventService.findAllForPartner(slug);
    return res.status(result.ok ? 200 : 404).json(result);
  }

  // PATCH /partners/:slug/events/:uuid
  @Patch(":slug/events/:uuid")
  async updatePartnerEvent(
    @Param("slug") slug: string,
    @Param("uuid") uuid: string,
    @Body() dto: UpdatePartnerEventDto,
    @Res() res: Response,
  ) {
    const result = await this.partnerEventService.updateForPartner(
      slug,
      uuid,
      dto,
    );
    return res.status(result.ok ? 200 : 500).json(result);
  }

  // DELETE /partners/:slug/events/:uuid
  @Delete(":slug/events/:uuid")
  async deletePartnerEvent(
    @Param("slug") slug: string,
    @Param("uuid") uuid: string,
    @Res() res: Response,
  ) {
    const result = await this.partnerEventService.removeForPartner(slug, uuid);
    return res.status(result.ok ? 200 : 500).json(result);
  }

  // POST /partners/:slug/events
  @Post(":slug/events")
  async createPartnerEvent(
    @Param("slug") slug: string,
    @Body() dto: CreatePartnerEventDto,
    @Res() res: Response,
  ) {
    const result = await this.partnerEventService.createForPartner(slug, dto);
    return res.status(result.ok ? 201 : 500).json(result);
  }
}
