import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enums/task-status.enum';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

/**
 * Servicio encargado de la logica de negocio de las tareas.
 *
 * Mantiene un almacenamiento en memoria y expone las operaciones CRUD.
 * El logging transversal de cada operacion se delega al interceptor de
 * AOP (LoggingInterceptor); aqui solo se registran eventos de negocio
 * puntuales (creacion, actualizacion y eliminacion).
 */
@Injectable()
export class TasksService {
  /** Logger propio del servicio. */
  private readonly logger = new Logger(TasksService.name);

  /** Almacen en memoria de las tareas. */
  private readonly tasks: Task[] = [];

  /**
   * Devuelve todas las tareas registradas.
   *
   * @returns {Task[]} Listado completo de tareas.
   */
  findAll(): Task[] {
    return this.tasks;
  }

  /**
   * Busca una tarea por su identificador.
   *
   * @param {string} id - Identificador unico de la tarea.
   * @returns {Task} La tarea encontrada.
   * @throws {NotFoundException} Si no existe una tarea con ese identificador.
   */
  findOne(id: string): Task {
    const task = this.tasks.find((current) => current.id === id);

    if (!task) {
      throw new NotFoundException(`No se encontro la tarea con id "${id}".`);
    }

    return task;
  }

  /**
   * Crea una nueva tarea a partir de los datos de entrada.
   *
   * @param {CreateTaskInput} input - Datos de la tarea a crear.
   * @returns {Task} La tarea creada.
   */
  create(input: CreateTaskInput): Task {
    const task: Task = {
      id: uuidv4(),
      title: input.title,
      description: input.description,
      status: input.status ?? TaskStatus.BACKLOG,
      tags: input.tags ?? [],
      createdAt: new Date(),
      assignedUser: input.assignedUser,
      project: input.project,
    };

    this.tasks.push(task);
    this.logger.log(`Tarea creada con id "${task.id}".`);

    return task;
  }

  /**
   * Actualiza una tarea existente con los campos proporcionados.
   *
   * @param {UpdateTaskInput} input - Datos a modificar, incluyendo el id.
   * @returns {Task} La tarea actualizada.
   * @throws {NotFoundException} Si la tarea no existe.
   */
  update(input: UpdateTaskInput): Task {
    const task = this.findOne(input.id);

    const { id, ...changes } = input;
    Object.assign(task, changes);

    this.logger.log(`Tarea actualizada con id "${task.id}".`);

    return task;
  }

  /**
   * Elimina una tarea por su identificador.
   *
   * @param {string} id - Identificador de la tarea a eliminar.
   * @returns {Task} La tarea eliminada.
   * @throws {NotFoundException} Si la tarea no existe.
   */
  remove(id: string): Task {
    const task = this.findOne(id);
    const index = this.tasks.findIndex((current) => current.id === id);

    this.tasks.splice(index, 1);
    this.logger.log(`Tarea eliminada con id "${id}".`);

    return task;
  }
}
