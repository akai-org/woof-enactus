import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePartnerEventDto } from "./dto/CreatePartnerEventDto";
import { UpdatePartnerEventDto } from "./dto/UpdatePartnerEventDto";

@Injectable()
export class PartnerEventService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePartnerEventDto) {
    return this.prisma.partnerEvent.create({ data });
  }

  findAll() {
    return this.prisma.partnerEvent.findMany();
  }

  findOne(id: number) {
    return this.prisma.partnerEvent.findUnique({ where: { id } });
  }

  update(id: number, data: UpdatePartnerEventDto) {
    return this.prisma.partnerEvent.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.partnerEvent.delete({ where: { id } });
  }
}
