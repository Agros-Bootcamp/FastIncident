````
npm install
````
 Ejecutar la aplicacion 

````
npm run dev
````
Crear el archivo .env dentro del directorio Backend y completar los siguiente parametros:
````
NAME_ADMIN=Administrador
NAME_MEMBER=Integrante
TYPE1=Bajo
TYPE2=Medio
TYPE3=Alto
PG_PASSWORD=admin(admin es el password)
````


# Database Service

Este microservicio centraliza todas las operaciones CRUD para cada instancia de nuestra base de datos

# La URL

La url se compone de la siguiente manera

'/(Instancia a operar)/(tipo de accion)/'

Las instancias disponibles a operar son las siguientes:

##### tasks: Tareas
##### users: Usuarios
##### rol: Rol de Usuarios
##### typeIncidents: Tipo de incidentes
##### incidents: Incidentes de las Tareas
##### refresh: Tokens de refresco en la base de datos

### Tipo de accion

Los tipos de accion solo estan disponibles para los metodos GET

##### all: Devuelve todos los objetos
##### byField: Devuelve un objeto segun un apartado personalizado, si quiero consultar segun su nombre, en field especifico como se encuentra el nombre en la base de datos, y en payload, la data a consultar

````
{
    "field":"first_name_user",
    "payload":"Dario"
}
````

````
{
    "field": "Apartado a consultar",
    "payload":"Data a consultar"
}
````
##### byPK: Se envia un objeto con un apartado con nombre segun este nombrada la instancia en la base de datos

````
    {
        "pk_id_user": "UUID del usuario"
    }
````
##### allByFk: Devuelve todos los objetos que estan relacionados por ID foranea, para ello se debe enviar un objeto de la siguiente manera:

````
{
    "field": "Nombre de la id foranea en la base de datos",
    "payload":"ID Foranea"
}
````
Ejemplo
````
{
    "field": "fk_id_user",
    "payload":"UUID User"
}
````

## Para las operaciones Create, se debe enviar un objeto segun cual sea la instancia de la base de datos

#### JSON Body para crear tarea

        {
            "title_task": "Tarea 3",
            "description_task": "Descripcion de la Tarea 3",
            "start_date_task": "2023-04-01 10:00:00.00",
            "end_date_task": "2023-04-01 10:00:00.00",
            "development_HH": 3,
            "reward_task": 10,
            "limit_incidents": 2
        }

##### JSON Body para crear usuarios
        {
            "first_name_user":"Pedro1",
            "last_name_user":"Gonzales",
            "email_user":"pedro.gonzales192@example.com",
            "password_user":"1234",
            "fk_id_rol_user":"PK_ID_ROL_USER"
        }

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

##### JSON Body para crear tipo de Incidente

        {
            "title_type_incident": "Tipo de incidente",
            "description_type_incident": "Es un tipo de incidente",
            "penalty_incident": "10",
            "returned_tokens": "12"
        }

##### JSON Body para crear roles

        {
            "title_rol_user": "Rol,
            "description_rol_user": "Es un rol"
        }

## Para las operaciones delete o Update, se debe enviar un objeto con el pk ID del objeto a modificar o eliminar segun como este llamado en la base de datos

##### users : pk_id_user
##### rol : pk_id_rol_user
##### tasks : pk_id_task
##### Incident : pk_id_incident
##### typeIncident : pk_id_type_incident
##### refreshtToken : id

##### Para eliminar el objeto, se debe enviar un json de la siguiente manera

{
    "pk_id_user": "PKID
}

##### Para actualizar algun apartado, segun como este estructurado la instancia en la base de datos, enviar un objeto con los apartados a modificar junto con la PK.

##### Ejemplo

{
    "pk_id_user": "PKID",
    "last_name_user":"Falcon",
    "first_name_user":"Jesus"
}