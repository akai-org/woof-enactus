import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePartnerEventDto } from "./dto/CreatePartnerEventDto";
import { UpdatePartnerEventDto } from "./dto/UpdatePartnerEventDto";
import { GenericResponse } from "src/types";

function formatDateOnly(date: Date | null | undefined): string | null {
  return date ? date.toISOString().split("T")[0] : null;
}

@Injectable()
export class PartnerEventService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePartnerEventDto): Promise<GenericResponse> {
    try {
      const created = await this.prisma.partnerEvent.create({ data });
      return { ok: true, data: created };
    } catch (e) {
      return {
        ok: false,
        message: "error creating event",
        error: (e as Error).message,
      };
    }
  }

  async findAll(): Promise<GenericResponse> {
    try {
      const events = await this.prisma.partnerEvent.findMany();
      const formatted = events.map(e => ({
        ...e,
        eventDate: formatDateOnly(e.eventDate),
      }));
      return { ok: true, data: formatted };
    } catch (e) {
      return {
        ok: false,
        message: "error finding events",
        error: (e as Error).message,
      };
    }
  }

  async findOne(id: number): Promise<GenericResponse> {
    try {
      const event = await this.prisma.partnerEvent.findUnique({
        where: { id },
      });
      return {
        ok: true,
        data: event
          ? { ...event, eventDate: formatDateOnly(event.eventDate) }
          : null,
      };
    } catch (e) {
      return {
        ok: false,
        message: "error finding event",
        error: (e as Error).message,
      };
    }
  }

  async update(
    id: number,
    data: UpdatePartnerEventDto,
  ): Promise<GenericResponse> {
    try {
      const updated = await this.prisma.partnerEvent.update({
        where: { id },
        data,
      });
      return { ok: true, data: updated };
    } catch (e) {
      return {
        ok: false,
        message: "error updating event",
        error: (e as Error).message,
      };
    }
  }

  async remove(id: number): Promise<GenericResponse> {
    try {
      const deleted = await this.prisma.partnerEvent.delete({
        where: { id },
      });
      return { ok: true, data: deleted };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }

  async findAllForPartner(slug: string): Promise<GenericResponse> {
    try {
      const partner = await this.prisma.partner.findUnique({ where: { slug } });
      if (!partner) {
        return { ok: false, message: "Partner not found", data: null };
      }
      const events = await this.prisma.partnerEvent.findMany({
        where: { partnerId: partner.id },
      });

      const formatted = events.map(e => ({
        ...e,
        eventDate: formatDateOnly(e.eventDate),
      }));
      return { ok: true, data: formatted };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }

  async updateForPartner(
    slug: string,
    uuid: string,
    dto: UpdatePartnerEventDto,
  ): Promise<GenericResponse> {
    try {
      const partner = await this.prisma.partner.findUnique({ where: { slug } });
      if (!partner) {
        return { ok: false, message: "Partner not found", data: null };
      }

      const event = await this.prisma.partnerEvent.findUnique({
        where: { uuid },
      });
      if (!event || event.partnerId !== partner.id) {
        return {
          ok: false,
          message: "Event not found for this partner",
          data: null,
        };
      }

      const updated = await this.prisma.partnerEvent.update({
        where: { uuid },
        data: {
          ...dto,
          ...(dto.eventDate ? { eventDate: new Date(dto.eventDate) } : {}),
        },
      });

      return { ok: true, data: updated };
    } catch (e) {
      return {
        ok: false,
        message: "Error updating event",
        error: (e as Error).message,
      };
    }
  }

  async removeForPartner(slug: string, uuid: string): Promise<GenericResponse> {
    try {
      const partner = await this.prisma.partner.findUnique({ where: { slug } });
      if (!partner) {
        return { ok: false, message: "Partner not found", data: null };
      }
      const event = await this.prisma.partnerEvent.findUnique({
        where: { uuid },
      });
      if (!event || event.partnerId !== partner.id) {
        return {
          ok: false,
          message: "Event not found for this partner",
          data: null,
        };
      }

      const deleted = await this.prisma.partnerEvent.delete({
        where: { uuid },
      });
      return { ok: true, data: deleted };
    } catch (e) {
      return {
        ok: false,
        message: "Error deleting event",
        error: (e as Error).message,
      };
    }
  }

  async createForPartner(
    slug: string,
    dto: CreatePartnerEventDto,
  ): Promise<GenericResponse> {
    try {
      const partner = await this.prisma.partner.findUnique({ where: { slug } });
      if (!partner) {
        return { ok: false, message: "Partner not found", data: null };
      }

      const created = await this.prisma.partnerEvent.create({
        data: {
          ...dto,
          partnerId: partner.id,
          eventDate: new Date(dto.eventDate),
        },
      });

      return {
        ok: true,
        data: { ...created, eventDate: formatDateOnly(created.eventDate) },
      };
    } catch (e) {
      return {
        ok: false,
        message: "Error creating event",
        error: (e as Error).message,
      };
    }
  }
}
