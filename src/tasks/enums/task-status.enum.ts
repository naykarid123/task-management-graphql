import { registerEnumType } from '@nestjs/graphql';

/**
 * Estados posibles del ciclo de vida de una tarea dentro de un proyecto.
 *
 * @enum {string}
 */
export enum TaskStatus {
  /** Tarea registrada pero aun no planificada. */
  BACKLOG = 'BACKLOG',
  /** Tarea planificada y lista para comenzar. */
  TO_DO = 'TO_DO',
  /** Tarea en desarrollo. */
  IN_PROGRESS = 'IN_PROGRESS',
  /** Tarea finalizada. */
  DONE = 'DONE',
}

/**
 * Registra el enum {@link TaskStatus} en el esquema de GraphQL
 * para poder utilizarlo como tipo en queries y mutations.
 */
registerEnumType(TaskStatus, {
  name: 'TaskStatus',
  description:
    'Estados posibles de una tarea (Backlog, To Do, In Progress, Done).',
});