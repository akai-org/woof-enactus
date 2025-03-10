import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PartnerType } from "@prisma/client";
import type { GetAllPartnersResponse } from "../types/index";

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(city?: string, type?: string): Promise<GetAllPartnersResponse> {
    try {
      const filter: any = {};

      if (city) {
        filter.city = city;
      }

      if (type) {
        const enumType = Object.values(PartnerType).includes(
          type as PartnerType,
        )
          ? (type as PartnerType)
          : undefined;

        if (!enumType) {
          return {
            ok: false,
            message: "Invalid partner type",
            data: undefined,
          };
        }
        filter.type = enumType;
      }

      const data = await this.prisma.partner.findMany({ where: filter });

      return { ok: true, data };
    } catch (e: any) {
      return {
        ok: false,
        message: "Internal server error",
        error: e.message,
        data: undefined,
      };
    }
  }
}
