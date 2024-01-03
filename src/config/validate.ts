import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export class Configuration {
  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  environment: string;

  @IsString()
  nashvilleGrpcEndpoint: string;

  @IsNumber()
  nashvilleGrpcPort: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(Configuration, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
