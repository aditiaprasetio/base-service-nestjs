import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status;
    let tmpData;
    if (exception) {
      if (exception.name === 'TimeoutError') {
        console.error('ERROR TIMEOUT', request.url);
        process.exit();
      } else if (
        exception.response &&
        (exception.response.status || exception.response.statusCode)
      ) {
        if (exception.response.status) {
          status = exception.response.status;
        } else {
          status = exception.response.statusCode;
        }
        let message;
        if (exception.message.message) {
          console.error(
            'ERROR FROM EXCEPTION (.message.message)',
            JSON.stringify(exception),
          );
          message = exception.message.message;
        } else {
          console.error(
            'ERROR FROM EXCEPTION (.message)',
            JSON.stringify(exception),
          );
          message = exception.message;
        }
        tmpData = {
          status,
          statusCode: status,
          name: exception.name,
          message,
          data: exception.response.data,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      } else if (exception.status || exception.statusCode) {
        console.error(
          'ERROR FROM EXCEPTION (WITH STATUS OR STATUSCODE)',
          JSON.stringify(exception),
        );
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        tmpData = {
          status: exception.statusCode || exception.status,
          statusCode: exception.statusCode || exception.status,
          name: exception.message,
          message: exception.message,
          data: exception.data,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      } else if (exception.sqlMessage) {
        console.error(
          'ERROR FROM EXCEPTION (DB_ERROR)',
          JSON.stringify(exception),
        );
        status = 400;
        tmpData = {
          status,
          statusCode: status,
          name: exception.name,
          message: exception.message,
          data: exception,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      } else {
        console.error(
          'ERROR FROM EXCEPTION (INTERNAL_SERVER_ERROR) - exception',
          JSON.stringify(exception),
        );
        console.error(
          'ERROR FROM EXCEPTION (INTERNAL_SERVER_ERROR) - response',
          JSON.stringify(response.data),
        );
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        tmpData = {
          status,
          statusCode: status,
          name: 'INTERNAL_SERVER_ERROR',
          message: 'INTERNAL_SERVER_ERROR',
          data: exception,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    response.status(status).json(tmpData);
  }
}
