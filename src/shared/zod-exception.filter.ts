import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

const BAD_REQUEST_CODE = 400;

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const error = this.mapZodError(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(BAD_REQUEST_CODE).json({
      statusCode: BAD_REQUEST_CODE,
      message: exception.name,
      error,
    });
  }

  private mapZodError(error: ZodError) {
    return error.issues.map(({ path, message, code }) => ({
      path,
      message,
      code,
    }));
  }
}
