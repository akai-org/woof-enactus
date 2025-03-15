import { Injectable } from "@nestjs/common";
import type { GetAllPartnersResponse, GenericResponse } from "../types/index";
import CreatePartnerDto from "./dto/CreatePartnerDto";
import { PrismaService } from "../prisma/prisma.service";
import { Partner, PartnerType, Prisma } from "@prisma/client";

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    name?: string,
    city?: string,
    street?: string,
    type?: PartnerType,
  ): Promise<GetAllPartnersResponse> {
    try {
      let partners: Partner[];

      const filter: Prisma.PartnerWhereInput = {};

      if (city && filter.profile) {
        filter.profile.city = city;
      }

      const enumType = Object.values(PartnerType).includes(type as PartnerType)
        ? type
        : undefined;

      if (enumType) {
        filter.type = enumType;
      }

      if (name || street) {
        partners = await this.prisma.partnerTrgm.similarity({
          query: {
            ...(name && {
              name: {
                similarity: { text: name, order: "desc" },
                word_similarity: { text: name, threshold: { gt: 0.2 } },
              },
            }),
            ...(street && {
              street: {
                similarity: { text: street, order: "desc" },
                word_similarity: { text: street, threshold: { gt: 0.2 } },
              },
            }),
          },
        });
      } else {
        partners = await this.prisma.partner.findMany({
          where: filter,
        });
      }
      return {
        ok: true,
        data: partners,
      };
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
      const error = e as Error;
      return {
        ok: false,
        message: "Internal server error",
        error: error.message,
      };
    }
  }

  async create(body: CreatePartnerDto): Promise<GenericResponse> {
    try {
      const newPartner = await this.prisma.partner.create({ data: body });

      return { ok: true, data: newPartner };
    } catch (e: any) {
      const error = e as Error;
      return {
        ok: false,
        message: "Error creating partner",
        error: error.message,
      };
    }
  }
}
