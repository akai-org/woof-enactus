import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PartnersModule } from "./partners/partners.module";

@Module({
  imports: [PrismaModule, PartnersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
