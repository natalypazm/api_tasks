# API de Tareas con Express, TypeScript, Firestore y Firebase Functions

Esta API está diseñada para gestionar tareas de manera eficiente. Permite crear, leer, actualizar y eliminar tareas utilizando una combinación de Express.js, TypeScript, Firestore de Firebase y Firebase Functions.

## Requisitos

Asegúrate de tener las siguientes herramientas y recursos antes de utilizar esta API:

- Node.js y NPM (Node Package Manager)
- Firebase CLI instalada y configurada con tus credenciales de Firebase

## Configuración

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` en la raíz del proyecto para instalar las dependencias.
3. Configura las credenciales de Firebase siguiendo la documentación oficial de Firebase.
4. Configura las reglas de seguridad de Firestore para garantizar un acceso seguro a tus datos.

## Uso

Puedes utilizar esta API para realizar las siguientes operaciones:

- Crear una nueva tarea.
- Leer la lista de tareas existentes.
- Actualizar los detalles de una tarea.
- Eliminar una tarea.

### Ejemplo de Uso

- Para crear una nueva tarea, realiza una solicitud POST a `/api/tasks/create` con los datos de la tarea en el cuerpo de la solicitud.
- Para obtener la lista de tareas, realiza una solicitud GET a `/api/tasks`.
- Para actualizar los detalles de una tarea, realiza una solicitud PUT a `/api/tasks/:id` con los nuevos datos de la tarea.
- Para eliminar una tarea, realiza una solicitud DELETE a `/api/tasks/:id`.

## Despliegue

Para desplegar esta API en Firebase Functions, sigue estos pasos:

1. Configura y autentica tu proyecto Firebase.
2. Ejecuta `firebase deploy` en la raíz del proyecto para desplegar las funciones en Firebase.

## Autor
Nataly Paz
