import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TaskStatus } from '../enums/task-status.enum';

/**
 * Representa una tarea de un proyecto de desarrollo de software.
 *
 * Funciona a la vez como modelo de dominio y como tipo expuesto por
 * GraphQL, siguiendo el enfoque "code-first" mediante decoradores.
 */
@ObjectType({ description: 'Tarea de un proyecto de desarrollo de software.' })
export class Task {
  /**
   * Identificador unico de la tarea (UUID v4).
   */
  @Field(() => ID, { description: 'Identificador unico de la tarea.' })
  id: string;

  /**
   * Titulo breve y descriptivo de la tarea.
   */
  @Field({ description: 'Titulo de la tarea.' })
  title: string;

  /**
   * Descripcion detallada del trabajo a realizar.
   */
  @Field({ description: 'Descripcion detallada de la tarea.' })
  description: string;

  /**
   * Estado actual dentro del flujo de trabajo.
   */
  @Field(() => TaskStatus, { description: 'Estado actual de la tarea.' })
  status: TaskStatus;

  /**
   * Arreglo dinamico de etiquetas asociadas a la tarea.
   */
  @Field(() => [String], { description: 'Etiquetas asociadas a la tarea.' })
  tags: string[];

  /**
   * Fecha y hora de creacion de la tarea.
   */
  @Field(() => Date, { description: 'Fecha de creacion de la tarea.' })
  createdAt: Date;

  /**
   * Usuario responsable de ejecutar la tarea.
   */
  @Field({ description: 'Usuario asignado a la tarea.' })
  assignedUser: string;

  /**
   * Proyecto al que pertenece la tarea.
   */
  @Field({ description: 'Proyecto al que pertenece la tarea.' })
  project: string;
}