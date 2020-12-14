import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Handler  } from 'aws-lambda';
import serverless from 'aws-serverless-express';
import express from 'express';
import { Server } from 'http';
import { AppModule } from './app.module';
import {Logger} from "@nestjs/common";

export async function bootstrap() {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  const corsOptions = {
    origin: true,
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, company, titi-token',
  };

  app.enableCors(corsOptions)

  await app.init();
  return serverless.createServer(expressApp);
}

let cachedServer: Server;

export const handler: Handler  = (event: any, context: Context) => {
  const {
    requestContext: { connectionId, routeKey },
  } = event;

  if (routeKey === "$connect") {
    Logger.log('$connect')
    Logger.log(connectionId)
  }

  if (routeKey === "$disconnect") {
    Logger.log('$disconnect')
  }

  if (routeKey === "$default") {
    Logger.log('$default')
  }

  if (!cachedServer) {
    bootstrap().then((server) => {
      cachedServer = server;
      return serverless.proxy(server, event, context);
    });
  } else {
    return serverless.proxy(cachedServer, event, context);
  }


};

