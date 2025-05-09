import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PartnersModule } from "./partners/partners.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { AccountsModule } from "./accounts/accounts.module";
import { EventsModule } from "./events/events.module";
import { GoodsModule } from "./goods/googs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    PartnersModule,
    AuthModule,
    AccountsModule,
    EventsModule,
    GoodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
