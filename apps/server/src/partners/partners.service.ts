import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Response } from "express";
import CreatePartnerDto from "./dto/CreatePartnerDto";
import type { GenericResponse, GetAllPartnersResponse } from "../types/index";

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(res: Response): Promise<GetAllPartnersResponse> {
    try {
      const data = await this.prisma.partner.findMany();
      res.status(200);
      const response: GetAllPartnersResponse = {
        ok: true,
        data,
      };
      return response;
    } catch (e: unknown) {
      res.status(500);
      const response: GetAllPartnersResponse = {
        ok: false,
        message: "Internal server error",
        error:
          process.env.NODE_ENV == "development"
            ? (e as Error).message
            : undefined,
        data: undefined,
      };
      return response;
    }
  }

  async findOne(uuid: string, res: Response) {
    try {
      return await this.prisma.partner.findUnique({
        where: { uuid },
      });
    } catch {
      res.status(500).json({
        ok: false,
        message: "Internal server error!",
      });
    }
  }

  create(body: CreatePartnerDto, res: Response) {
    // TODO: na razie testowo, chciałem zobaczyć czy typowanie i walidacja działa
    const resData: GenericResponse = {
      ok: true,
    };
    return res.status(200).json(resData);
  }
}
