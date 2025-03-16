import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PartnerType } from "@prisma/client";
import type { GetAllPartnersResponse, GenericResponse } from "../types/index";
import { CreatePartnerDto } from "./dto/CreatePartnerDto";
import UpdatePartnerDto from "./dto/UpdatePartnerDto";
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
      // Create a partner with nested profile and working hours
      const newPartner = await this.prisma.partner.create({
        data: {
          name: body.name,
          type: body.type,
          //TODO latitude and logitude remain 0 for now;
          latitude: 0,
          logitude: 0,
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

      return { ok: true, data: newPartner };
    } catch (e: any) {
      return { ok: false, message: "Error creating partner", error: e.message };
    }
  }

  async update(uuid: string, updateDto: UpdatePartnerDto): Promise<GenericResponse> {
    try {
      const updatedPartner = await this.prisma.partner.update({
        where: { uuid },
        data: updateDto,
      });
      return { ok: true, data: updatedPartner };
    } catch (e: any) {
      return { ok: false, message: "Error updating partner", error: e.message };
    }
  }

  async delete(uuid: string): Promise<GenericResponse> {
    try {
      // Find the partner along with its profile
      const partner = await this.prisma.partner.findUnique({
        where: { uuid },
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
        where: { uuid },
      });
  
      return { ok: true, data: deletedPartner };
    } catch (e: any) {
      return { ok: false, message: "Error deleting partner", error: e.message };
    }
  }
  

  async findOneWithProfile(uuid: string): Promise<GenericResponse> {
    try {
      const partner = await this.prisma.partner.findUnique({
        where: { uuid },
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


  
