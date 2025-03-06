import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Woof Enactus API")
    .setVersion("1.0.0")
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, documentFactory, {
    jsonDocumentUrl: "api/json",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      enableDebugMessages: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
