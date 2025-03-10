import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("NestApplication");

  const isDev = process.env.NODE_ENV == "development";

  if (isDev) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("Woof Enactus API")
      .setVersion("1.0.0")
      .build();
    const documentFactory = () =>
      SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api", app, documentFactory, {
      jsonDocumentUrl: "api/json",
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: !isDev,
      enableDebugMessages: isDev,
    }),
  );

  const appPort = process.env.PORT ?? 3000;

  await app.listen(appPort, () => {
    logger.debug(`Listening on port ${appPort}`);
    if (isDev) {
      logger.debug(`Swagger is running under: http://localhost:${appPort}/api`);
    }
  });
}
void bootstrap();
