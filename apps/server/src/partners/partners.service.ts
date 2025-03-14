import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PartnerType } from "@prisma/client";
import type { GetAllPartnersResponse, GenericResponse } from "../types/index";
import CreatePartnerDto from "./dto/CreatePartnerDto";
import { Prisma } from "@prisma/client";

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    city?: string,
    type?: PartnerType,
  ): Promise<GetAllPartnersResponse> {
    try {
      const filter: Prisma.PartnerWhereInput = {};

      if (city && filter.profile) {
        filter.profile.city = city;
      }

      if (type) {
        const enumType = Object.values(PartnerType).includes(type)
          ? type
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
    } catch (e) {
      const error = e as Error;
      return {
        ok: false,
        message: "Internal server error",
        error: error.message,
        data: undefined,
      };
    }
  }

  async findOne(uuid: string): Promise<GenericResponse> {
    try {
      const partner = await this.prisma.partner.findUnique({
        where: { uuid },
      });

      if (!partner) {
        return { ok: false, message: "Partner not found", data: undefined };
      }

      return { ok: true, data: partner };
    } catch (e: any) {
      return { ok: false, message: "Internal server error", error: e.message };
    }
  }

  async create(body: CreatePartnerDto): Promise<GenericResponse> {
    try {
      const newPartner = await this.prisma.partner.create({ data: body });

      return { ok: true, data: newPartner };
    } catch (e: any) {
      return { ok: false, message: "Error creating partner", error: e.message };
    }
  }
}
