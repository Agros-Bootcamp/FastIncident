# FastIncident

Fastincident es un proyecto que se enfoca en la gestión de usuarios, tareas e incidentes. Utiliza tecnologías como Node.js para el backend y React para el frontend. Además, se integrará con una plataforma de blockchain para permitir pagos a los integrantes cada vez que completen una tarea asimismo quitarles tokens cada vez que surja una incidencia. El objetivo principal de Fastincident es mejorar la eficiencia en la gestión de proyectos y proporcionar una plataforma segura y transparente para la gestión de pagos.

Además, es importante mencionar que Fastincident es un proyecto diseñado para aprender y desarrollar habilidades en el desarrollo fullstack y en la implementación de tecnologías blockchain en aplicaciones web. A través de este proyecto, se busca comprender y aplicar los conceptos fundamentales de ambas tecnologías, incluyendo la creación de API RESTful, la integración de librerías de blockchain, el manejo de bases de datos, y la implementación de interfaces de usuario intuitivas y responsivas. Con este proyecto, se espera desarrollar habilidades prácticas que sean útiles en futuros proyectos de desarrollo web.

El proyecto esta dividido en dos partes el Backend y el Frontend, para poder desplegar tu proyecto en tu entorno local sigue los siguientes pasos.

## Backend
1. Estar dentro del directorio Backend e intalar las dependencias con el siguiente comando:
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
        // const roles = ['integrante', 'administrador']
        // roles.map(async (rol)=>create_default_roles(rol))
        app.listen(4000)
        console.log('works')
    } catch (error) {
        console.log(error)
    }
}
```
3. Ejecutar la aplicacion 

-> Comando

4. Levantar el proyecto con el comando(Volver a comentar las sentencias del paso 2):
````
npm start
````
5. Una vez que despliegas tu proyecto en tu entorno local te mostraremos los endpoints para consumir la API:

    ### CRUD Usuario
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