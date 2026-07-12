import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTaskInput } from './create-task.input';

/**
 * Datos de entrada para actualizar una tarea existente.
 *
 * Hereda todos los campos de {@link CreateTaskInput} como opcionales
 * (mediante PartialType) y anade el identificador de la tarea a modificar.
 */
@InputType({ description: 'Datos para actualizar una tarea.' })
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  /** Identificador de la tarea a actualizar. */
  @Field(() => ID, { description: 'Identificador de la tarea a actualizar.' })
  @IsString()
  @IsNotEmpty()
  id: string;
}