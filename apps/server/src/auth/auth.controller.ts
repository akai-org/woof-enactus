import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/SignInDto";
import { PartnerAccount } from "@prisma/client";
import { User } from "../utils/user.decorator";
import { RefreshGuard } from "./refresh.guard";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  signIn(@Body() body: SignInDto, @Res() response: Response) {
    return this.authService.signIn(body.username, body.password, response);
  }

  @Post("register")
  signUp(@Body() body: SignInDto) {
    return this.authService.signUp(body.username, body.password);
  }

  @Get("refresh")
  @UseGuards(RefreshGuard)
  refresh(@User() user: PartnerAccount) {
    return this.authService.refresh(user.username);
  }
}
