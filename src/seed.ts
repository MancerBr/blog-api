import { NestFactory } from '@nestjs/core';

import { SeedModule } from './modules/seed/seed.module';
import { SeedService } from './modules/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(SeedModule);
  const seedService = app.get(SeedService);
  await seedService.run();
  await app.close();
}
bootstrap();
