````
npm install
````
 Ejecutar la aplicacion 

````
npm run dev
````
Crear el archivo .env dentro del directorio Backend y completar los siguiente parametros:
````
DATABASE_URL
AUTH_URL
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

````
Ejemplo
/tasks/all/
````
##### byPK: Se envia un objeto con un apartado con nombre segun este nombrada la instancia en la base de datos

````
    {
        "pk_id_task": "UUID del incidente"
    }
````
Ejemplo
/incidents/byPK/pk_id_task
##### allByFk: Devuelve todos los objetos que estan relacionados por ID foranea, para ello se debe hacer una consulta con la siguiente url

````
{
    "field": "Nombre de la id foranea en la base de datos",
    "payload":"ID Foranea"
}
````
Ejemplo
/incidents/allByFk/fk_id_user/fk

## Para las operaciones Create, se debe enviar un objeto segun cual sea la instancia de la base de datos


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

## Para las operaciones delete o Update, se debe enviar un objeto con el pk ID del objeto a modificar o eliminar segun como este llamado en la base de datos
## Esto se tiene que enviar como parametro al costado de la url

##### Task : pk_id_task

##### Para eliminar el objeto, se debe enviar un json de la siguiente manera

/incidents/pk_id_task

##### Para actualizar algun apartado, segun como este estructurado la instancia en la base de datos, enviar un objeto con los apartados a modificar
##### Ejemplo

{
    "last_name_user":"Falcon",
    "first_name_user":"Jesus"
}