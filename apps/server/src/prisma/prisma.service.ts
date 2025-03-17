import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { withPgTrgm } from "prisma-extension-pg-trgm";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger("PrismaService");
  private prisma = new PrismaClient().$extends(
    withPgTrgm({
      logQueries: process.env.NODE_ENV == "development",
    }),
  );

  async onModuleInit() {
    await this.prisma.$connect();
    this.logger.verbose("Database connected");
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
    this.logger.verbose("Database disconnected");
  }

  get partnerTrgm() {
    return this.prisma.partner;
  }
  get partnerProfileTrgm() {
    return this.prisma.partnerProfile;
  }
}
