import { HttpStatus } from '@nestjs/common';

import { getErrorSwaggerSchema } from './get-error-swagger-schema.util';

export const getUnauthorizedErrorSchema = () => {
  return getErrorSwaggerSchema({
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Unauthorized',
  });
};
