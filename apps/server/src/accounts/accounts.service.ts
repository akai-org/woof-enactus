import { Injectable } from "@nestjs/common";
import { PartnerAccount } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { GenericResponse } from "src/types";

@Injectable()
export class AccountsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(username: string): Promise<GenericResponse<PartnerAccount>> {
    const foundUser = await this.prismaService.partnerAccount.findUnique({
      where: {
        username: username,
      },
    });

    if (foundUser) {
      const res: GenericResponse<PartnerAccount> = {
        ok: true,
        data: foundUser,
      };

      return res;
    } else {
      const res: GenericResponse<PartnerAccount> = {
        ok: false,
        message: "Account not found",
      };

      return res;
    }
  }
}
