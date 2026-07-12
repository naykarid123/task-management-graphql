import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

/**
 * Filtro global de excepciones que centraliza el manejo de errores
 * de la API GraphQL. Representa el concern transversal de manejo de
 * errores implementado mediante AOP.
 *
 * Registra cada excepcion en el log y la vuelve a propagar para que
 * la capa de GraphQL la formatee dentro de la respuesta.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  /** Logger dedicado al manejo de excepciones. */
  private readonly logger = new Logger('ExceptionFilter');

  /**
   * Procesa cualquier excepcion no controlada de la aplicacion.
   *
   * @param {unknown} exception - Excepcion capturada.
   * @param {ArgumentsHost} _host - Contexto de ejecucion de la peticion.
   * @returns {unknown} La excepcion propagada para su formateo por GraphQL.
   */
  catch(exception: unknown, _host: ArgumentsHost): unknown {
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Error interno del servidor.';

    this.logger.error(`Excepcion capturada: ${message}`);

    return exception;
  }
}