import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

/**
 * Datos de entrada requeridos para crear una nueva tarea.
 *
 * Las validaciones se aplican de forma automatica mediante el
 * ValidationPipe global configurado en el arranque de la aplicacion.
 */
@InputType({ description: 'Datos para crear una tarea.' })
export class CreateTaskInput {
  /** Titulo de la tarea. */
  @Field({ description: 'Titulo de la tarea.' })
  @IsString()
  @IsNotEmpty()
  title: string;

  /** Descripcion detallada de la tarea. */
  @Field({ description: 'Descripcion de la tarea.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Estado inicial de la tarea. Si no se especifica, se asignara BACKLOG.
   */
  @Field(() => TaskStatus, {
    nullable: true,
    description: 'Estado inicial de la tarea. Por defecto BACKLOG.',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  /** Etiquetas iniciales de la tarea. */
  @Field(() => [String], {
    nullable: true,
    description: 'Etiquetas iniciales. Por defecto un arreglo vacio.',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  /** Usuario asignado a la tarea. */
  @Field({ description: 'Usuario asignado a la tarea.' })
  @IsString()
  @IsNotEmpty()
  assignedUser: string;

  /** Proyecto al que pertenece la tarea. */
  @Field({ description: 'Proyecto al que pertenece la tarea.' })
  @IsString()
  @IsNotEmpty()
  project: string;
}