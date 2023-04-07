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

    #### CRUD Usuario
      #### Registrar Usuario sin privilegios (Create)

        http://localhost:4000/registeruser
    
      #### Registar Usuario por Administrador (Create)

        http://localhost:4000/registerUserByRol/Administrador/Administrador

      #### JSON Body para registrar usuarios
        {
            "first_name_user":"Pedro1",
            "last_name_user":"Gonzales",
            "email_user":"pedro.gonzales192@example.com",
            "password_user":"1234"
        }

      #### Listar Usuarios (Read)

        http://localhost:4000/usersall
       

