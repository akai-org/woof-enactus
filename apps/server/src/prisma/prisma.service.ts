import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger("PrismaService");

  async onModuleInit() {
    await this.$connect();
    this.logger.verbose("Database connected");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.verbose("Database disconnected");
  }
}
