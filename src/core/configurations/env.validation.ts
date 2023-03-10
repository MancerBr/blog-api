import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  POSTGRES_HOST;
  @IsNotEmpty()
  POSTGRES_PORT;
  @IsNotEmpty()
  POSTGRES_USER;
  @IsNotEmpty()
  POSTGRES_PASSWORD;
  @IsNotEmpty()
  POSTGRES_DB;
  @IsNotEmpty()
  JWT_SECRET;
  @IsNotEmpty()
  PORT;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
