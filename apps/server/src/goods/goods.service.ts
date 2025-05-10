import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GenericResponse } from "../types";
import { Partner } from "@prisma/client";
import { UpdateNeededGoodsDto } from "./dto/UpdateNeededGoodsDto";
import { CreateNeededGoodsDto } from "./dto/CreateNeededGoodsDto";
import { PartnersService } from "src/partners/partners.service";

@Injectable()
export class GoodsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly partners: PartnersService,
  ) {}

  async findNeededGoodsForPartner(slug: string): Promise<GenericResponse> {
    try {
      const partnerResult = await this.partners.findOne(slug);
      if (!partnerResult.ok || !partnerResult.data) {
        return { ok: false, message: "Partner not found", data: undefined };
      }

      const partner = partnerResult.data as Partner;

      const [goods, meta] = await Promise.all([
        this.prisma.neededGoods.findMany({
          where: { partnerId: partner.id },
        }),
        this.prisma.neededGoodsMeta.findUnique({
          where: { partnerId: partner.id },
        }),
      ]);

      return {
        ok: true,
        data: {
          note: meta?.note ?? null,
          goods,
        },
      };
    } catch (e: any) {
      return {
        ok: false,
        message: "Error retrieving needed goods",
        error: (e as Error).message,
      };
    }
  }

  async createNeededGoodsForPartner(
    slug: string,
    body: CreateNeededGoodsDto,
  ): Promise<GenericResponse> {
    try {
      const partnerResult = await this.partners.findOne(slug);
      if (!partnerResult.ok || !partnerResult.data) {
        return { ok: false, message: "Partner not found", data: undefined };
      }

      const partner = partnerResult.data as Partner;

      const newGood = await this.prisma.neededGoods.create({
        data: {
          name: body.name,
          amountCurrent: body.amountCurrent,
          amountMax: body.amountMax,
          amountUnit: body.amountUnit,
          state: body.state,
          stateInfo: body.stateInfo,
          partnerId: partner.id,
        },
      });

      if (body.note) {
        await this.prisma.neededGoodsMeta.upsert({
          where: { partnerId: partner.id },
          update: { note: body.note },
          create: {
            partnerId: partner.id,
            note: body.note,
          },
        });
      }

      return { ok: true, data: newGood };
    } catch (e: any) {
      return {
        ok: false,
        message: "Error creating needed goods",
        error: (e as Error).message,
      };
    }
  }

  async updateNeededGoodsForPartner(
    slug: string,
    goodUuid: string,
    updateDto: UpdateNeededGoodsDto,
  ): Promise<GenericResponse> {
    try {
      const partnerResult = await this.partners.findOne(slug);
      if (!partnerResult.ok || !partnerResult.data) {
        return { ok: false, message: "Partner not found", data: undefined };
      }
      const partner = partnerResult.data as Partner;
      // Ensure the needed goods record belongs to the partner
      const good = await this.prisma.neededGoods.findUnique({
        where: { uuid: goodUuid },
      });
      if (!good || good.partnerId !== partner.id) {
        return {
          ok: false,
          message: "Needed goods not found for this partner",
          data: undefined,
        };
      }
      // Update needed goods (do not allow updating partnerId)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { partnerId, ...dataToUpdate } = updateDto;
      const updatedGood = await this.prisma.neededGoods.update({
        where: { uuid: goodUuid },
        data: dataToUpdate,
      });
      return { ok: true, data: updatedGood };
    } catch (e: any) {
      return {
        ok: false,
        message: "Error updating needed goods",
        error: (e as Error).message,
      };
    }
  }

  async deleteNeededGoodsForPartner(
    slug: string,
    goodUuid: string,
  ): Promise<GenericResponse> {
    try {
      const partnerResult = await this.partners.findOne(slug);
      if (!partnerResult.ok || !partnerResult.data) {
        return { ok: false, message: "Partner not found", data: undefined };
      }
      const partner = partnerResult.data as Partner;
      // Ensure the needed goods record belongs to the partner
      const good = await this.prisma.neededGoods.findUnique({
        where: { uuid: goodUuid },
      });
      if (!good || good.partnerId !== partner.id) {
        return {
          ok: false,
          message: "Needed goods not found for this partner",
          data: undefined,
        };
      }
      const deletedGood = await this.prisma.neededGoods.delete({
        where: { uuid: goodUuid },
      });
      return { ok: true, data: deletedGood };
    } catch (e: any) {
      return {
        ok: false,
        message: "Error deleting needed goods",
        error: (e as Error).message,
      };
    }
  }
}
