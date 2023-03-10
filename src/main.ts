import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from '@core/exception-filters';
import { buildSwagger } from '@core/configurations';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const isDevelop = configService.get('NODE_ENV') === 'development';

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.setGlobalPrefix('api');

  if (isDevelop) {
    buildSwagger(app);
  }

  const PORT = port || 3000;

  await app.listen(PORT);
  logger.log(`App has been started on ${PORT} port`);
}
bootstrap();
