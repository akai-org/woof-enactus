import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountsService } from "src/accounts/accounts.service";
import { GenericResponse, JwtPayload } from "src/types";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<GenericResponse<Record<string, string>>> {
    const account = (await this.accountsService.findOne(username)).data;
    if (!account || !bcrypt.compareSync(pass, account.password)) {
      throw new UnauthorizedException();
    }

    const authPayload: JwtPayload = {
      sub: account.uuid,
      username: account.username,
      type: "auth",
      exp: Date.now() + 900000, // Teraz + 15 minut
    };
    const authToken: string = await this.jwtService.signAsync(authPayload);

    const refreshPayload: JwtPayload = {
      sub: account.uuid,
      username: account.username,
      type: "refresh",
      exp: Date.now() + 604800000, // Teraz + 7 dni
    };
    const refreshToken: string =
      await this.jwtService.signAsync(refreshPayload);

    const res: GenericResponse<Record<string, string>> = {
      ok: true,
      data: {
        accessToken: authToken,
        refreshToken: refreshToken,
      },
    };

    return res;
  }

  async signUp(username: string, password: string): Promise<GenericResponse> {
    const userExists = (await this.accountsService.findOne(username)).ok;
    if (userExists) {
      const res: GenericResponse = {
        ok: false,
        message: "Account with that username already exists",
      };
      return res;
    }

    const hash: string = await bcrypt.hash(password, 10);

    const newAccount = await this.prismaService.partnerAccount.create({
      data: {
        username: username,
        password: hash,
      },
    });

    if (newAccount) {
      const res: GenericResponse = {
        ok: true,
      };
      return res;
    } else {
      const res: GenericResponse = {
        ok: false,
        message: "Failed to create account",
      };
      return res;
    }
  }

  async refresh(
    username: string,
  ): Promise<GenericResponse<Record<string, string>>> {
    const account = (await this.accountsService.findOne(username)).data;
    if (!account) {
      throw new UnauthorizedException();
    }

    const authPayload: JwtPayload = {
      sub: account.uuid,
      username: account.username,
      type: "auth",
      exp: Date.now() + 900000, // Teraz + 15 minut
    };
    const authToken: string = await this.jwtService.signAsync(authPayload);

    const res: GenericResponse<Record<string, string>> = {
      ok: true,
      data: {
        authToken: authToken,
      },
    };

    return res;
  }
}
