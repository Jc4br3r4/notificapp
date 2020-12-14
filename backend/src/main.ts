import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {WsAdapter} from "@nestjs/platform-ws";

async function bootstrap() {

  const corsOptions = {
    origin: true,
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  // app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3000);
}
bootstrap();
