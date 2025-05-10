import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateEventDto } from "./dto/CreateEventDto";
import { UpdateEventDto } from "./dto/UpdateEventDto";
import { GenericResponse } from "src/types";
import { PartnerEvent } from "@prisma/client";

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEventDto): Promise<GenericResponse<PartnerEvent>> {
    try {
      const created = await this.prisma.partnerEvent.create({ data });
      return { ok: true, data: created };
    } catch (e) {
      const error = e as Error;
      return {
        ok: false,
        message: "Failed to create new event",
        error: error.message,
      };
    }
  }

  async findAll(): Promise<GenericResponse<PartnerEvent[]>> {
    try {
      const events = await this.prisma.partnerEvent.findMany();
      return { ok: true, data: events };
    } catch (e) {
      const error = e as Error;
      return {
        ok: false,
        message: "Failed to fetch events",
        error: error.message,
      };
    }
  }

  async findOne(id: number): Promise<GenericResponse<PartnerEvent>> {
    try {
      const event = await this.prisma.partnerEvent.findUniqueOrThrow({
        where: { id },
      });
      return { ok: true, data: event };
    } catch (e) {
      const error = e as Error;
      return {
        ok: false,
        message: "Failed to fetch event",
        error: error.message,
      };
    }
  }

  async update(
    id: number,
    data: UpdateEventDto,
  ): Promise<GenericResponse<PartnerEvent>> {
    try {
      const updated = await this.prisma.partnerEvent.update({
        where: { id },
        data,
      });
      return { ok: true, data: updated };
    } catch (e) {
      const error = e as Error;
      return {
        ok: false,
        message: "Failed to update event",
        error: error.message,
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

  async findAllForPartner(
    slug: string,
  ): Promise<GenericResponse<PartnerEvent[]>> {
    try {
      const partner = await this.prisma.partner.findUnique({ where: { slug } });
      if (!partner) {
        return { ok: false, message: "Partner not found" };
      }
      const events = await this.prisma.partnerEvent.findMany({
        where: { partnerId: partner.id },
      });
      return { ok: true, data: events };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }
}
