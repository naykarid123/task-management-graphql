# Sistema de Gestión de Tareas — API GraphQL (NestJS)

API GraphQL para la gestión de tareas de proyectos de desarrollo de software.
Permite **crear, consultar, editar y eliminar** tareas, aplicando **Programación
Orientada a Aspectos (AOP)**, **Clean Code**, documentación con **JSDoc** y
**GitFlow** en el control de versiones.

---

## Tecnologías

- **NestJS 10** — framework de servidor.
- **GraphQL (code-first)** con Apollo Server.
- **AOP** mediante interceptores y filtros de NestJS.
- **class-validator** para validación de entradas.
- Almacenamiento **en memoria** (no requiere base de datos).

---

## Modelo de datos: `Task`

| Campo          | Tipo                                    | Descripción                         |
| -------------- | --------------------------------------- | ----------------------------------- |
| `id`           | `ID`                                    | Identificador único (UUID v4).      |
| `title`        | `String`                                | Título de la tarea.                 |
| `description`  | `String`                                | Descripción detallada.              |
| `status`       | `TaskStatus` (BACKLOG, TODO, IN_PROGRESS, DONE) | Estado actual.             |
| `tags`         | `[String]`                              | Arreglo dinámico de etiquetas.      |
| `createdAt`    | `Date`                                  | Fecha de creación.                  |
| `assignedUser` | `String`                                | Usuario asignado.                   |
| `project`      | `String`                                | Proyecto al que pertenece la tarea. |

---

## Requisitos previos

- Node.js 18 o superior.
- npm 9 o superior.

---

## Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Crear el archivo de variables de entorno a partir de la plantilla
cp .env.example .env

# 3. Levantar el servidor en modo desarrollo
npm run start:dev
```

El servidor queda disponible en: **http://localhost:3000/graphql**
(el playground de GraphQL se abre en esa misma URL desde el navegador).

---

## Ejemplos de operaciones GraphQL

### Crear una tarea

```graphql
mutation {
  createTask(
    input: {
      title: "Configurar CI/CD"
      description: "Pipeline de integración continua con GitHub Actions"
      assignedUser: "ana.dev"
      project: "Plataforma Web"
      tags: ["devops", "urgente"]
      status: TODO
    }
  ) {
    id
    title
    status
    tags
    createdAt
  }
}
```

### Consultar todas las tareas

```graphql
query {
  tasks {
    id
    title
    status
    assignedUser
    project
  }
}
```

### Consultar una tarea por id

```graphql
query {
  task(id: "PEGAR_UUID_AQUI") {
    id
    title
    description
    status
  }
}
```

### Editar una tarea (estado, tags, usuario, etc.)

```graphql
mutation {
  updateTask(
    input: {
      id: "PEGAR_UUID_AQUI"
      status: IN_PROGRESS
      tags: ["devops", "en-curso"]
      assignedUser: "carlos.dev"
    }
  ) {
    id
    status
    tags
    assignedUser
  }
}
```

### Eliminar una tarea

```graphql
mutation {
  removeTask(id: "PEGAR_UUID_AQUI") {
    id
    title
  }
}
```

---

## Estructura del proyecto

```
src/
├── main.ts                     # Arranque: pipes y filtros globales
├── app.module.ts               # Módulo raíz + registro global del aspecto AOP
├── schema.gql                  # Esquema generado (ignorado por git)
├── common/                     # Concerns transversales (AOP)
│   ├── interceptors/
│   │   └── logging.interceptor.ts   # Aspecto de logging de resolvers
│   └── filters/
│       └── all-exceptions.filter.ts # Manejo centralizado de errores
└── tasks/
    ├── tasks.module.ts
    ├── tasks.resolver.ts       # Queries y mutations (capa de exposición)
    ├── tasks.service.ts        # Lógica de negocio (CRUD)
    ├── entities/
    │   └── task.entity.ts      # Modelo + tipo GraphQL
    ├── enums/
    │   └── task-status.enum.ts
    └── dto/
        ├── create-task.input.ts
        └── update-task.input.ts
```

---

## Cómo se cumple cada criterio de evaluación

- **Requerimientos del enunciado:** CRUD completo (queries `tasks`, `task` y
  mutations `createTask`, `updateTask`, `removeTask`) sobre una entidad `Task`
  con todos los campos exigidos.
- **AOP:** el `LoggingInterceptor` y el `AllExceptionsFilter` separan los
  concerns transversales (logging y manejo de errores) de la lógica de negocio.
  El interceptor se registra de forma **global** en `app.module.ts` mediante
  `APP_INTERCEPTOR`, por lo que envuelve automáticamente **todos** los resolvers
  sin ensuciar su código.
- **JSDoc:** todas las clases, métodos y propiedades están documentados con
  bloques JSDoc (`@param`, `@returns`, `@throws`, `@enum`).
- **Logs:** el interceptor registra inicio, fin y tiempo de ejecución de cada
  operación; el servicio registra eventos de negocio; el filtro registra errores.
- **GitFlow:** el historial usa ramas `main`, `develop` y `feature/*`
  (ver sección de commits del repositorio).
- **.gitignore:** `node_modules`, `.env` y `schema.gql` están excluidos.
