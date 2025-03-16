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
      let partners: Array<
        Partner & {
          profile?: { city?: string | null; street?: string | null } | null;
        }
      >;

      const filter: Prisma.PartnerWhereInput = {};

      const enumType = Object.values(PartnerType).includes(type as PartnerType)
        ? type
        : undefined;

      if (enumType) {
        filter.type = enumType;
      }

      let partnerProfileIds: number[] = [];

      if (city) {
        const cityResults = await this.prisma.partnerProfileTrgm.similarity({
          query: {
            city: {
              similarity: { text: city, order: "desc" },
              word_similarity: { text: city, threshold: { gt: 0.2 } },
            },
          },
        });
        partnerProfileIds = cityResults.map(
          (p: { partnerId: number }) => p.partnerId,
        );
      }

      if (street) {
        const streetResults = await this.prisma.partnerProfileTrgm.similarity({
          query: {
            street: {
              similarity: { text: street, order: "desc" },
              word_similarity: { text: street, threshold: { gt: 0.2 } },
            },
          },
        });
        const streetProfileIds = streetResults.map(
          (p: { partnerId: number }) => p.partnerId,
        );
        partnerProfileIds = partnerProfileIds.length
          ? partnerProfileIds.filter(id => streetProfileIds.includes(id))
          : streetProfileIds;
      }

      if (partnerProfileIds.length) {
        partners = await this.prisma.partner.findMany({
          where: { id: { in: partnerProfileIds }, ...filter },
          include: { profile: true },
        });
      } else {
        partners = await this.prisma.partner.findMany({
          where: filter,
          include: { profile: true },
        });
      }

      if (name || enumType) {
        partners = partners.filter(partner => {
          const matchName = name ? partner.name.includes(name) : true;
          const matchType = enumType ? partner.type === enumType : true;
          return matchName && matchType;
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
