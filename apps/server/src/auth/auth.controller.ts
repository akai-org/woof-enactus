import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/SignInDto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body.username, body.password);
  }

  @Post("register")
  signUp(@Body() body: SignInDto) {
    return this.authService.signUp(body.username, body.password);
  }
}
