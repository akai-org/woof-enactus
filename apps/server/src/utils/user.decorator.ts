import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { PartnerAccount } from "@prisma/client";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PartnerAccount => {
    const request: any = ctx.switchToHttp().getRequest();
    return request.user as PartnerAccount;
  },
);
