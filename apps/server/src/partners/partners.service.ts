import { Injectable } from "@nestjs/common";
import type { GetAllPartnersResponse, GenericResponse } from "../types/index";
import CreatePartnerDto from "./dto/CreatePartnerDto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    name?: string,
    city?: string,
    street?: string,
    type?: string,
  ): Promise<GetAllPartnersResponse> {
    try {
      let partners;
      console.log(this.prisma);
      console.log(this.prisma.partner);

      if (name || city || street || type) {
        partners = await this.prisma.partner.similarity({
          query: {
            ...(name && {
              name: {
                similarity: { text: name, order: "desc" },
                word_similarity: { text: name, threshold: { gt: 0.2 } },
              },
            }),
            ...(city && {
              city: {
                similarity: { text: city, order: "desc" },
                word_similarity: { text: city, threshold: { gt: 0.2 } },
              },
            }),
            ...(street && {
              street: {
                similarity: { text: street, order: "desc" },
                word_similarity: { text: street, threshold: { gt: 0.2 } },
              },
            }),
            ...(type && {
              type: {
                similarity: { text: type, order: "desc" },
                word_similarity: { text: type, threshold: { gt: 0.2 } },
              },
            }),
          },
        });
      } else {
        partners = await this.prisma.partner.findMany();
      }

      return { ok: true, data: partners };
    } catch (e: any) {
      return {
        ok: false,
        message: "Internal server error",
        error: e.message,
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
