import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/**
 * Interceptor de logging que implementa el aspecto transversal (AOP)
 * de registro de la ejecucion de los resolvers de GraphQL.
 *
 * Envuelve cada operacion (query o mutation) y registra:
 *  - El inicio de la operacion junto con sus argumentos.
 *  - La finalizacion exitosa y el tiempo total de ejecucion.
 *  - Cualquier error producido durante la ejecucion.
 *
 * Al centralizar este comportamiento se evita duplicar codigo de logging
 * en cada resolver o servicio, separando asi el concern transversal de
 * la logica de negocio (principio fundamental de la AOP).
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  /** Logger dedicado al aspecto de logging de GraphQL. */
  private readonly logger = new Logger('GraphQL');

  /**
   * Intercepta la ejecucion de un resolver para registrar su ciclo de vida.
   *
   * @param {ExecutionContext} context - Contexto de ejecucion de NestJS.
   * @param {CallHandler} next - Manejador que continua la cadena de ejecucion.
   * @returns {Observable<unknown>} Flujo con el resultado de la operacion.
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();
    const args = gqlContext.getArgs();

    const operationType: string = info.parentType?.name ?? 'Unknown';
    const fieldName: string = info.fieldName;
    const start = Date.now();

    this.logger.log(
      `-> ${operationType}.${fieldName} iniciada | args: ${JSON.stringify(args)}`,
    );

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - start;
        this.logger.log(
          `OK ${operationType}.${fieldName} completada en ${elapsed} ms`,
        );
      }),
      catchError((error: Error) => {
        const elapsed = Date.now() - start;
        this.logger.error(
          `ERR ${operationType}.${fieldName} fallo en ${elapsed} ms | ${error.message}`,
        );
        return throwError(() => error);
      }),
    );
  }
}