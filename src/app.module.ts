import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { join } from 'path';
import { TasksModule } from './tasks/tasks.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

/**
 * Modulo raiz de la aplicacion.
 *
 * Configura el modulo de GraphQL con enfoque "code-first" (el esquema
 * se genera automaticamente a partir de los decoradores) y registra de
 * forma global el {@link LoggingInterceptor}, que constituye el aspecto
 * transversal (AOP) encargado de registrar la ejecucion de los resolvers.
 */
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    TasksModule,
  ],
  providers: [
    {
      // Registro global del aspecto de logging mediante inyeccion de dependencias.
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
