import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { Response } from "express";

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(res: Response) {
    try {
      return this.prisma.partner.findMany();
    } catch {
      res.status(500).json({
        ok: false,
        message: "Internal server error!",
      });
    }
  }

  async findOne(uuid: string, res: Response) {
    try {
      return this.prisma.partner.findUnique({
        where: { uuid },
      });
    } catch {
      res.status(500).json({
        ok: false,
        message: "Internal server error!",
      });
    }
  }
}
