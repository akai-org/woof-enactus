import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { withPgTrgm } from "prisma-extension-pg-trgm";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger("PrismaService");
  private prisma = new PrismaClient().$extends(
    withPgTrgm({ logQueries: true }),
  );

  async onModuleInit() {
    await this.prisma.$connect();
    this.logger.verbose("Database connected");
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
    this.logger.verbose("Database disconnected");
  }

  get partner() {
    return this.prisma.partner;
  }
}
