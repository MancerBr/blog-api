import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { version } from '../../../package.json';

export const buildSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription(`It's example blog API`)
    .setVersion(version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
