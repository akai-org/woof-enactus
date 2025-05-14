import { Module } from "@nestjs/common";
import { PartnersService } from "./partners.service";
import { PartnersController } from "./partners.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [PartnersController],
  providers: [PartnersService],
  exports: [PartnersService],
})
export class PartnersModule {}
