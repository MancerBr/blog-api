import { HttpStatus } from '@nestjs/common';

import { getErrorSwaggerSchema } from './get-error-swagger-schema.util';

export const getForbiddenResourceSchema = () => {
  return getErrorSwaggerSchema({
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Forbidden resource',
    error: 'Forbidden',
  });
};
