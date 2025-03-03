import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.partner.findMany();
  }

  async findOne(uuid: string) {
    return this.prisma.partner.findUnique({
      where: { uuid },
    });
  }
}
