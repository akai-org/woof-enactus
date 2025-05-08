import { ApiTags } from "@nestjs/swagger";
import { GoodsService } from "./goods.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { CreateNeededGoodsDto } from "./dto/CreateNeededGoodsDto";
import { UpdateNeededGoodsDto } from "./dto/UpdateNeededGoodsDto";
import { Response } from "express";

@ApiTags("partners")
@Controller("goods")
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  // GET /partners/:slug/goods
  @Get(":slug/goods")
  async getNeededGoodsForPartner(
    @Param("slug") slug: string,
    @Res() res: Response,
  ) {
    const result = await this.goodsService.findNeededGoodsForPartner(slug);
    return res.status(result.ok ? 200 : 500).json(result);
  }

  // POST /partners/:slug/goods
  @Post(":slug/goods")
  async createNeededGoodsForPartner(
    @Param("slug") slug: string,
    @Body() body: CreateNeededGoodsDto,
    @Res() res: Response,
  ) {
    const result = await this.goodsService.createNeededGoodsForPartner(
      slug,
      body,
    );
    return res.status(result.ok ? 201 : 500).json(result);
  }

  // PUT /partners/:slug/goods/:goodUuid
  @Put(":slug/goods/:goodUuid")
  async updateNeededGoodsForPartner(
    @Param("slug") slug: string,
    @Param("goodUuid") goodUuid: string,
    @Body() body: UpdateNeededGoodsDto,
    @Res() res: Response,
  ) {
    const result = await this.goodsService.updateNeededGoodsForPartner(
      slug,
      goodUuid,
      body,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.status(result.ok ? 200 : 500).json(result);
  }

  // DELETE /partners/:slug/goods/:goodUuid
  @Delete(":slug/goods/:goodUuid")
  async deleteNeededGoodsForPartner(
    @Param("slug") slug: string,
    @Param("goodUuid") goodUuid: string,
    @Res() res: Response,
  ) {
    const result = await this.goodsService.deleteNeededGoodsForPartner(
      slug,
      goodUuid,
    );
    return res.status(result.ok ? 200 : 500).json(result);
  }
}
