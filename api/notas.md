https://thedogapi.com/   API EXTERNA

Your API key:
39ac7f77-4301-423d-9bfa-1e49f281bed0

UNICOS ENDPOINTS A USAR DE ESA API:
GET https://api.thedogapi.com/v1/breeds // trae todas las razas TODO
GET https://api.thedogapi.com/v1/breeds/search?q={raza_perro}  TRAE UNA RAZA

AGREGAR ESTO AL FINAL DE CADA ENDPOINT:
?api_key={YOUR_API_KEY}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

* BASE DE DATOS

 - entidades:
    . Raza {    
            ID *
            Nombre *
            Altura *
            Peso *
            Años de vida
        }

    . Temperamento {
            ID
            Nombre   //ej: docil, inteligente o sociable
        }

    . Relacion entre ambas: N:M
      una raza puede tener muchos temperamentos
      un temperamento puede corresponder a multiples razas


      OJO!! con las id de la Api y de nuestra BD, generar en nuestra BD otra id que no se superponga con la de la Api

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

* BACKEND

.Rutas de Express:

    - POST /dog:
        _Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
        _Crea una raza de perro en la base de datos



    -  GET /dogs:
        _Obtener un listado de las razas de perro
        _Debe devolver solo los datos necesarios para la ruta principal

    - GET /dogs?name="...":
        _Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
        _Si no existe ninguna raza de perro mostrar un mensaje adecuado

    - GET /dogs/{idRaza}:
        _Obtener el detalle de una raza de perro en particular
        _Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
        _Incluir los temperamentos asociados

    

    _ GET /temperament:
        _Obtener todos los temperamentos posibles
        _En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
* FRONTEND:(alguno de los ordenamientos o filtrados debe si o si realizarse desde el frontend.)

    - Pagina inicial: 
        deben armar una landing page con:
        . Alguna imagen de fondo representativa al proyecto
 
        . Botón para ingresar al home (Ruta principal)

     - Ruta principal: 
        . Área donde se verá el listado de razas de perros. Deberá mostrar su:
            Imagen
            Nombre
            Temperamento
        . Botones/Opciones para filtrar por por temperamento y por raza existente o agregada por nosotros
        . Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro, 
          por orden alfabético y por peso
        . Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas inicialmente en la página uno.
        . Input de búsqueda para encontrar razas de perros por nombre
        
        IMPORTANTE: Dentro de la Ruta Principal se deben mostrar tanto las razas de perros traidas desde la API como así también las de la base de datos.

    - Ruta de detalle de raza de perro:
        Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
        Altura
        Peso
        Años de vida

    - Ruta de creación de raza de perro:
        . Un formulario controlado con los siguientes campos:
            Nombre
            Altura (Diferenciar entre altura mínima y máxima) !!!ENVIAR AL BACK COMO STRING
            Peso (Diferenciar entre peso mínimo y máximo)      !!!ENVIAR AL BACK COMO STRING
            Años de vida                                       !!tb filtrar rango en el front

        . Posibilidad de seleccionar/agregar uno o más temperamentos
        . Botón/Opción para crear una nueva raza de perro

///////////////////////////////////////////////////////////////////////////////////////////////////////

Testing
 Al menos tener un componente del frontend con sus tests respectivos
 Al menos tener una ruta del backend con sus tests respectivos
 Al menos tener un modelo de la base de datos con sus tests respectivos