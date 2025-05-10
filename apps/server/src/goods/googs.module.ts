import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { GoodsService } from "./goods.service";
import { GoodsController } from "./goods.controller";
import { PartnersModule } from "src/partners/partners.module";

@Module({
  imports: [PrismaModule, PartnersModule],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
