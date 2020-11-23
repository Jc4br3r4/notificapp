import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const whitelist = ['http://localhost:4200'];
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
        // callback(null, true);
      }
    },
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
