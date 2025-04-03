import { Injectable } from "@nestjs/common";
import type { GetAllPartnersResponse, GenericResponse } from "../types/index";
import { CreatePartnerDto } from "./dto/CreatePartnerDto";
import UpdatePartnerDto from "./dto/UpdatePartnerDto";
import { PrismaService } from "../prisma/prisma.service";
import { Partner, PartnerType, Prisma } from "@prisma/client";
import slugify from 'slugify';

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
      let partnerIdsFromProfile: number[] | null = null;
      let partnerIdsFromName: number[] | null = null;

      if (city || street) {
        const similarityQueryProfile: any = {};

        if (city) {
          similarityQueryProfile.city = {
            similarity: { text: city, threshold: { gt: 0.5 } },
          };
        }

        if (street) {
          similarityQueryProfile.street = {
            similarity: { text: street, threshold: { gt: 0.5 } },
          };
        }

        const profileResults = await (
          this.prisma.partnerProfileTrgm as any
        ).similarity({
          query: similarityQueryProfile,
        });

        partnerIdsFromProfile = profileResults.map(
          (p: { partnerId: number }) => p.partnerId,
        );

        if (partnerIdsFromProfile && !partnerIdsFromProfile.length) {
          return { ok: true, data: [] };
        }
      }

      if (name) {
        const nameResults = await (this.prisma.partnerTrgm as any).similarity({
          query: {
            name: {
              similarity: { text: name, threshold: { gt: 0.5 } },
            },
          },
          orderBySimilarity: {
            name: { text: name, sort: "desc" },
          },
        });

        partnerIdsFromName = nameResults.map((p: { id: number }) => p.id);

        if (partnerIdsFromName && !partnerIdsFromName.length) {
          return { ok: true, data: [] };
        }
      }

      const combinedPartnerIds =
        partnerIdsFromProfile && partnerIdsFromName
          ? partnerIdsFromProfile.filter(id => partnerIdsFromName!.includes(id))
          : (partnerIdsFromProfile ?? partnerIdsFromName);

      const filter: Prisma.PartnerWhereInput = {
        ...(type && Object.values(PartnerType).includes(type) ? { type } : {}),
        ...(combinedPartnerIds ? { id: { in: combinedPartnerIds } } : {}),
      };

      const partners = await this.prisma.partner.findMany({
        where: filter,
        include: { profile: true },
      });

      return {
        ok: true,
        data: partners,
      };
    } catch (e) {
      return {
        ok: false,
        message: "Internal server error",
        error: (e as Error).message,
        data: undefined,
      };
    }
  }

  async findOne(slug: string): Promise<GenericResponse> {
    try {
      const partner = await this.prisma.partner.findUnique({
        where: { slug },
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
      // Create a partner with nested profile and working hours
      const newPartner = await this.prisma.partner.create({
        data: {
          name: body.name,
          type: body.type,
          //TODO latitude and logitude remain 0 for now;
          latitude: 0,
          longitude: 0,
          slug: `temp-${Date.now()}`, // temporary unique value
          profile: {
            create: {
              description: body.description,
              getToInfo: body.getToInfo,
              city: body.city,
              street: body.street,
              postal: body.postal,
              phone: body.phone,
              website: body.website,
              animals: body.animals,
              visitHours: body.visitHours,
              openHours: {
                create: {
                  monday: body.monday,
                  tuesday: body.tuesday,
                  wednesday: body.wednesday,
                  thursday: body.thursday,
                  friday: body.friday,
                  saturday: body.saturday,
                  sunday: body.sunday,
                },
              },
            },
          },
        },
      });

      const generatedSlug = `${slugify(newPartner.name, { lower: true })}-${newPartner.id}`;

      const partnerWithSlug = await this.prisma.partner.update({
        where: { id: newPartner.id },
        data: { slug: generatedSlug },
      });

      return { ok: true, data: partnerWithSlug };
    } catch (e: any) {
      const error = e as Error;
      return {
        ok: false,
        message: "Error creating partner",
        error: error.message,
      };
    }
  }

  async update(
    slug: string,
    updateDto: UpdatePartnerDto,
  ): Promise<GenericResponse> {
    try {
      let updatedPartner = await this.prisma.partner.update({
        where: { slug },
        data: updateDto,
      });

      // If the name is being updated, recalculate the slug.
      if (updateDto.name) {
        const newSlug = `${slugify(updateDto.name, { lower: true })}-${updatedPartner.id}`;
        updatedPartner = await this.prisma.partner.update({
          where: { id: updatedPartner.id },
          data: { slug: newSlug },
        });
      }

      return { ok: true, data: updatedPartner };
    } catch (e: any) {
      return { ok: false, message: "Error updating partner", error: e.message };
    }
  }

  async delete(slug: string): Promise<GenericResponse> {
    try {
      // Find the partner along with its profile
      const partner = await this.prisma.partner.findUnique({
        where: { slug },
        include: { profile: true },
      });

      if (!partner) {
        return { ok: false, message: "Partner not found", data: undefined };
      }

      // If a profile exists, first delete its associated working hours,
      // then delete the profile.
      if (partner.profile) {
        await this.prisma.workingHours.deleteMany({
          where: { profileId: partner.profile.id },
        });
        await this.prisma.partnerProfile.delete({
          where: { partnerId: partner.id },
        });
      }

      // Now delete the partner record.
      const deletedPartner = await this.prisma.partner.delete({
        where: { slug },
      });

      return { ok: true, data: deletedPartner };
    } catch (e: any) {
      return { ok: false, message: "Error deleting partner", error: e.message };
    }
  }

  async findOneWithProfile(slug: string): Promise<GenericResponse> {
    try {
      const partner = await this.prisma.partner.findUnique({
        where: { slug },
        include: {
          profile: {
            include: {
              openHours: true,
            },
          },
        },
      });

      if (!partner) {
        return { ok: false, message: "Partner not found", data: undefined };
      }

      return { ok: true, data: partner };
    } catch (e: any) {
      return { ok: false, message: "Internal server error", error: e.message };
    }
  }
}
