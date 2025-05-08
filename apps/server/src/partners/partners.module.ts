import { Module } from "@nestjs/common";
import { PartnersService } from "./partners.service";
import { PartnersController } from "./partners.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { PartnerEventController } from "./partner-event.controller";
import { PartnerEventService } from "./partner-event.service";

@Module({
  imports: [PrismaModule],
  controllers: [PartnersController, PartnerEventController],
  providers: [PartnersService, PartnerEventService],
})
export class PartnersModule {}
