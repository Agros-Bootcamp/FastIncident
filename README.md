# FastIncident
Fastincident es un proyecto que se enfoca en la gestión de usuarios, tareas e incidentes. Utiliza tecnologías como Node.js para el backend y React para el frontend. Además, se integrará con una plataforma de blockchain para permitir pagos a los integrantes cada vez que completen una tarea asimismo quitarles tokens cada vez que surja una incidencia. El objetivo principal de Fastincident es mejorar la eficiencia en la gestión de proyectos y proporcionar una plataforma segura y transparente para la gestión de pagos.

Además, es importante mencionar que Fastincident es un proyecto diseñado para aprender y desarrollar habilidades en el desarrollo fullstack y en la implementación de tecnologías blockchain en aplicaciones web. A través de este proyecto, se busca comprender y aplicar los conceptos fundamentales de ambas tecnologías, incluyendo la creación de API RESTful, la integración de librerías de blockchain, el manejo de bases de datos, y la implementación de interfaces de usuario intuitivas y responsivas. Con este proyecto, se espera desarrollar habilidades prácticas que sean útiles en futuros proyectos de desarrollo web.

El proyecto esta dividido en dos partes el Backend y el Frontend, para poder desplegar tu proyecto en tu entorno local sigue los siguientes pasos.

## Backend
1. Estar dentro del directorio Backend e instalar las dependencias con el siguiente comando:
````
npm install
````
2. Crear el archivo .env dentro del directorio Backend y completar los siguiente parametros:
````
PORT=4000
ACCESS_TOKEN=8eDg8FGviibFrNPKQ5m29l4lVEDIdAyq
REFRESH_TOKEN=jvd9knTYn9WXjD2oDqpr1lV2oR1UkX9o
PG_PASSWORD=admin(admin es el password)
````
3. Dentro del archivo server.js existe la siguiente función descomentar las dos sentencias, esto para crear por defecto los dos roles:
```
const main = async () => {
    try {
        await sqlDB.authenticate()
        await sqlDB.sync({force:false})
        // const roles = ['Integrante', 'Administrador']
        // roles.map(async (rol)=>create_default_roles(rol))
        app.listen(4000)
        console.log('Start')
    } catch (error) {
        console.log(error)
    }
}
```
4. Ejecutar la aplicacion 

````
npm run dev
````

5. Levantar el proyecto con el siguiente comando: (Volver a comentar las sentencias del paso 3 antede de ejecutar el comando):
````
npm run dev
````
6. Una vez que despliegas el proyecto en tu entorno local te mostraremos los endpoints para consumir la API:

    ### CRUD para Usuario
      #### Registrar Usuario sin privilegios (Create)

        http://localhost:4000/registeruser

      ##### JSON Body para registrar usuarios
        {
            "first_name_user":"Pedro1",
            "last_name_user":"Gonzales",
            "email_user":"pedro.gonzales192@example.com",
            "password_user":"1234"
        }


      #### Registrar Usuario por Administrador (Create): La API contiene un validador de autenticidad para que el usuario pueda loguearse y asi saber si posee el rol de administrador, para eso primero tenemos que loguearnos.

      ##### Iniciar sesión
        http://localhost:4000/login #Iniciar sesion

      ##### JSON Body para iniciar sesión
        {    
            "email_user":"pedro.gonzales1@example.com",
            "password_user":"1234"
        }

      ##### Tenemos que copiar el accessToken de la respuesta que contendra el siguiente formato (El siguiente fragmento json es solo referencial)
        {
            "accessToken": "eyJhbGciOiJIUzI",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ"
        }

      ##### Pegamos el accessToken dentro del Bearer Token para Postman apartado Authorization para Thunder Client apartado Auth, recordar tambien que el ultimo parametro de la URI es para escoger el rol que tendra el usuario que queremos registrar para el ejemplo usamos el rol Administrador

        http://localhost:4000/registerUserByRol/Administrador/Administrador
      
      ##### JSON Body para registrar administrador
        {
            "first_name_user":"Pedro 27",
            "last_name_user":"Gonzales 28",
            "email_user":"pedro.gonzales28@example.com",
            "password_user":"1234"
        }

      #### Listar Usuarios (Read):

        http://localhost:4000/usersall
       
      #### Actualizar Usuarios (Update): Recordar que se le pasa el pk_id_user como parametro dentro de la URI para poder actualizar un usuario en específico.

        http://localhost:4000/updateuser/0a8775b2-718e-4299-95cd-0ddb09f86f1c

      ##### JSON Body para actualizar usuario
        {
            "first_name_user":"Pedro Actualizado",
            "last_name_user":"Gonzales Actualizado",
            "email_user":"pedro.gonzales.actualizado@example.com",
            "password_user":"1234"
        }
      
      #### Eliminar Usuario (Delete): Recordar que se le pasa el pk_id_user como parametro dentro de la URI para poder eliminar un usuario en específico.

        http://localhost:4000/deleteuser/4936ad2b-01c3-4203-a6cf-554476e6753d
    
    ### CRUD para Rol
      #### Registrar un Rol adicional (Create)

        http://localhost:4000/registerrol

      ##### JSON Body para registrar rol
        {
            "title_rol_user": "Integrante",
            "description_rol_user": "Rol con los privilegios restringidos"
        }

      #### Listar Roles Existentes (Read):

        http://localhost:4000/rolsall
       
      #### Actualizar Rol (Update): Recordar que se le pasa el pk_id_rol como parametro dentro de la URI para poder actualizar un rol en específico.

        http://localhost:4000/updaterol/988dc7d8-8147-47cc-a3d4-d857bb1967bd

      ##### JSON Body para actualizar el rol
        
        {
            "title_rol_user": "Nuevo Rol Actualizado",
            "description_rol_user": "Descripcion del nuevo rol"
        }
      
      #### Eliminar Rol (Delete): Recordar que se le pasa el pk_id_rol como parametro dentro de la URI para poder eliminar un rol en específico.

        http://localhost:4000/deleterol/7efef41a-3ceb-4b19-8ccf-79b048bbff27

    ### CRUD para Tarea
      Para las operaciones es necesario validar el accesToken de inicio de sesión, entonces pegamos el accessToken dentro del Bearer Token, para Postman apartado Authorization, para Thunder Client apartado Auth y ya con esto validamos el ingreso:

      #### Crear una Tarea (Create)

        http://localhost:4000/createTask

      ##### JSON Body para crear tarea
        {
            "title_task": "Tarea 3",
            "description_task": "Descripcion de la Tarea 3",
            "start_date_task": "2023-04-01 10:00:00.00",
            "end_date_task": "2023-04-01 10:00:00.00",
            "development_HH": 3,
            "reward_task": 10,
            "limit_incidents": 2
        }

      #### Listar Tareas por usuario (Read): Recordar que se le pasa el pk_id_user como parametro dentro de la URI para poder listar las tareas relacionadas a un usuario en especifico.

        http://localhost:4000/tasks/d578914c-b9b9-497f-8d9e-3dd62355c0e8
       
      #### Actualizar Rol (Update): Recordar que se le pasa el pk_id_task como parametro dentro de la URI para poder actualizar una tarea en específico.

        http://localhost:4000/updaterol/988dc7d8-8147-47cc-a3d4-d857bb1967bd

      ##### JSON Body para actualizar la tarea
        
        {
            "title_rol_user": "Nuevo Rol Actualizado",
            "description_rol_user": "Descripcion del nuevo rol"
        }
      
      #### Eliminar Tarea (Delete): Recordar que se le pasa el pk_id_task como parametro dentro de la URI para poder eliminar una tarea en especifico en específico.

        http://localhost:4000/tasks/fd05b90e-6bb0-4b6e-9386-c6a1c523ec35

    ### CRUD para Tipos de Incidencia
      Para las operaciones es necesario validar el accesToken de inicio de sesión, entonces pegamos el accessToken dentro del Bearer Token, para Postman apartado Authorization, para Thunder Client apartado Auth y ya con esto validamos el ingreso:

      #### Crear un Tipo de Incidente (Create)

        http://localhost:4000/registertypeincident

      ##### JSON Body para crear Tipo de Incidente
        {
            "title_type_incident":"Bug 2",
            "description_type_incident":"Incidencia ocacionado por un bug 2",
            "penalty_incident": 2,
            "returned_tokens": 1
        }
      #### Listar Tipos de Incidente (Read): 

        http://localhost:4000/typeincidentsall
       
      #### Actualizar Tipos de Incidente (Update): Recordar que se le pasa el pk_id_type_incident como parametro dentro de la URI para poder actualizar una tipo de incidente en específico.

        http://localhost:4000/updatetypeincident/85e22b99-90fa-4ad6-8a6d-70b5d96bb70a

      ##### JSON Body para actualizar el tipo de incidente
        
        {
            "title_type_incident":"Bug Actulizado",
            "description_type_incident":"Incidencia ocacionado por un bug",
            "penalty_incident": 4,
            "returned_tokens": 1
        }
      
      #### Eliminar Tipo de Incidente (Delete): Recordar que se le pasa el pk_id_task como parametro dentro de la URI para poder eliminar un tipo de incidente en especifico en específico.

        http://localhost:4000/deletetypeincident/85e22b99-90fa-4ad6-8a6d-70b5d96bb70a

    ### CRUD para Incidencia
      Para las operaciones es necesario validar el accesToken de inicio de sesión, entonces pegamos el accessToken dentro del Bearer Token, para Postman apartado Authorization, para Thunder Client apartado Auth y ya con esto validamos el ingreso:

      #### Crear Incidente (Create)

        http://localhost:4000/registerIncident

      ##### JSON Body para crear Incidente

        {
            "title_incident": "Incidencia de prueba 2",
            "description_incident": "Esta es una incidencia de prueba 2",
            "start_date_incident": "2023-04-01 10:00:00.00",
            "end_date_incident": "2023-04-02 12:00:00.00",
            "status_incident": 1,
            "fk_id_task": "67570953-f3db-4777-977a-0379db7927cf",
            "fk_id_type_incident": "6ea54739-847d-48a9-92fa-d122e1473252"
        }

      #### Listar los Incidentes (Read): 

        http://localhost:4000/incidentsall
        
      #### Actualizar Incidente (Update): Recordar que se le pasa el pk_id_incident como parametro dentro de la URI para poder actualizar un incidente en específico.

        http://localhost:4000/updateincident/5d6a9d3c-ec45-4f18-974d-a95eebd5eaae

      ##### JSON Body para actualizar el tipo de incidente
          
        {
            "title_incident": "Incidencia de prueba",
            "description_incident": "Esta es una incidencia de prueba",
            "status_incident": "Pendiente"
        }
        
      #### Eliminar Incidente (Delete): Recordar que se le pasa el pk_id_incident como parametro dentro de la URI para poder eliminar un incidente en especifico en específico.

        http://localhost:4000/deletetypeincident/85e22b99-90fa-4ad6-8a6d-70b5d96bb70a

7. Para poder obtener las notificaciones de inactividad del usuario usamos el siguiente endpoint:
````
http://localhost:4000/inactivityusersall
````
  * Mostrara un response en formato json de la siguiente manera con todos los usuarios que tiene igual o más de 5 días de inactividad:
  ````
  [
    {
        "pk_id_user": "5550c43a-6498-4e13-9638-10a331a76380",
        "first_name_user": "Pedro1",
        "last_name_user": "Gonzales",
        "email_user": "pedro.gonzales1@example.com",
        "password_user": "$2b$10$8w4grAEjkPiDgcBGNJdOJeMz8GE.Gi6gePVsZG6HPQd.NY6obXofy",
        "last_date_login": "2023-04-03T01:48:21.318Z",
        "balance_token": 0,
        "createdAt": "2023-04-07T01:48:21.319Z",
        "updatedAt": "2023-04-07T01:48:21.319Z",
        "fk_id_rol_user": "ec6e2283-588b-455c-a8fb-4bc18d52fa1d",
        "days_inactivity": 5
    }
  ]
  ````
// hook prueba 2
