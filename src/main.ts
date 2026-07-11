import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

/**
 * Punto de entrada de la aplicacion.
 *
 * Inicializa el servidor NestJS, registra el pipe de validacion y el
 * filtro global de excepciones (concerns transversales) y levanta el
 * endpoint de GraphQL.
 *
 * @returns {Promise<void>} Promesa que se resuelve cuando el servidor
 * queda escuchando peticiones.
 */
async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Validacion automatica de los DTO de entrada.
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  // Manejo centralizado de excepciones.
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`Servidor iniciado en http://localhost:${port}/graphql`);
}

bootstrap();
