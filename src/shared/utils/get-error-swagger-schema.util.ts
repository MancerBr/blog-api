import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface IGetErrorSwaggerSchemaParams {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export const getErrorSwaggerSchema = (params: IGetErrorSwaggerSchemaParams) => {
  const error = {
    type: 'string',
    example: params.error,
  };

  return {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
        example: params.statusCode,
      },
      message: {
        type: Array.isArray(params.message) ? 'array' : 'string',
        example: params.message,
      },
      ...(params?.error ? { error } : {}),
    },
  } as SchemaObject & Partial<ReferenceObject>;
};
