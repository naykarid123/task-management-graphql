import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

/**
 * Resolver de GraphQL para las operaciones sobre tareas.
 *
 * Expone las queries y mutations que permiten consultar, crear,
 * actualizar y eliminar tareas. Toda la logica de negocio se delega
 * al {@link TasksService}, manteniendo el resolver enfocado unicamente
 * en la capa de exposicion.
 */
@Resolver(() => Task)
export class TasksResolver {
  /**
   * @param {TasksService} tasksService - Servicio de tareas inyectado.
   */
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Query que devuelve todas las tareas registradas.
   *
   * @returns {Task[]} Listado de tareas.
   */
  @Query(() => [Task], {
    name: 'tasks',
    description: 'Devuelve todas las tareas.',
  })
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  /**
   * Query que devuelve una tarea por su identificador.
   *
   * @param {string} id - Identificador de la tarea.
   * @returns {Task} La tarea encontrada.
   */
  @Query(() => Task, {
    name: 'task',
    description: 'Devuelve una tarea por su id.',
  })
  findOne(@Args('id', { type: () => ID }) id: string): Task {
    return this.tasksService.findOne(id);
  }

  /**
   * Mutation que crea una nueva tarea.
   *
   * @param {CreateTaskInput} input - Datos de la tarea a crear.
   * @returns {Task} La tarea creada.
   */
  @Mutation(() => Task, { description: 'Crea una nueva tarea.' })
  createTask(@Args('input') input: CreateTaskInput): Task {
    return this.tasksService.create(input);
  }

  /**
   * Mutation que actualiza una tarea existente.
   *
   * @param {UpdateTaskInput} input - Datos a modificar (incluye el id).
   * @returns {Task} La tarea actualizada.
   */
  @Mutation(() => Task, { description: 'Actualiza una tarea existente.' })
  updateTask(@Args('input') input: UpdateTaskInput): Task {
    return this.tasksService.update(input);
  }

  /**
   * Mutation que elimina una tarea por su identificador.
   *
   * @param {string} id - Identificador de la tarea a eliminar.
   * @returns {Task} La tarea eliminada.
   */
  @Mutation(() => Task, { description: 'Elimina una tarea por su id.' })
  removeTask(@Args('id', { type: () => ID }) id: string): Task {
    return this.tasksService.remove(id);
  }
}
