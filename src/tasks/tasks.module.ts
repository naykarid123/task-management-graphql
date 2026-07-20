import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';

/**
 * Modulo que agrupa el resolver y el servicio de tareas,
 * encapsulando toda la funcionalidad relacionada con la gestion
 * de tareas de proyectos.
 */
@Module({
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
