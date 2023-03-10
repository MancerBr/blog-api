import { HttpStatus } from '@nestjs/common';

import { getErrorSwaggerSchema } from './get-error-swagger-schema.util';

export const getResourceNotFoundSchema = (message?: string) => {
  return getErrorSwaggerSchema({
    statusCode: HttpStatus.NOT_FOUND,
    message: message || 'Resource not found',
    error: 'Not Found',
  });
};
