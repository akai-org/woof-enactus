import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PartnerAccount } from "@prisma/client";
import { Request } from "express";
import type { JwtPayload } from "../types";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const jwtPayload = this.jwtService.decode<JwtPayload>(token);
      if (jwtPayload.type != "auth") {
        throw new Error("Invalid token type");
      }

      if (jwtPayload.exp < Date.now()) {
        throw new Error("Token expired");
      }
      const payload: Omit<PartnerAccount, "password"> =
        await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

      request["user"] = payload;
    } catch (e) {
      throw new UnauthorizedException((e as Error).message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
