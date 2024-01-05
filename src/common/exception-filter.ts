import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  LoggerService,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      const e = exception.getResponse() as { message: string | string[] };
      this.logger.error(`with code: ${status} `, e);

      response.status(status).send(e.message);
    } else {
      this.logger.error(exception);
      response.status(500).send({ message: 'Internal server error' });
    }
  }
}
