# SSCatFacts

Bienvenidos al repositorio de mi prueba técnica de SSCatFacts para SSIndex. El repositorio contiene el código de la aplicación y las instrucciones para ejecutarlo, así como una explicación de las decisiones de diseño implementandas para resolver el problema.

## Requisitos

Se requiere tener instaladas las siguientes tecnologías que fueron utilizadas:

* Ruby on Rails
* ReactJS 
* PostgreSQL
* Docker y Docker Compose

## Ejecución y deploy local

Tras descargar el proyecto, dirigirse a la carpeta raíz del proyecto y ejecutar el comando

```
sudo docker compose up --build
```

Una vez que haya terminado la instalación y esté funcionando la base de datos, se deben hacer las migraciones de rails hacia postgresql:

```
sudo docker compose run backend rails db:create db:migrate
```

Finalmente, para desmontar el contenedor, se usa el comando:

```
sudo docker compose down --remove-orphans
```

## Testing

### Testing en Ruby on Rails

Tras ejecutar el contenedor y crear la base de datos, esta se debe preparar para realizar test, usando el comando:

```
sudo docker compose run backend rails db:prepare
```

Finalmente, para correr los test del backend, se ejecuta el comando:

```
sudo docker compose run backend rails test
```

### Testing en ReactJS

Teniendo el contenedor funcionando, se pueden ejecutar los test usando el comando:

```
sudo docker compose run frontend npm test
```

## Decisiones de diseño

### Diagrama de secuencia

El flujo de la aplicación consiste en la siguiente secuencia:

* La página web renderiza el contenido de la aplicación dependiendo del estado de usuario. Si existe una sesión activa (almacenada mediante cookie), se redirige desde la URL raíz hacia el path /index y se renderiza el contenido. En caso contrario, se redirige al path /login y se renderiza el formulario de login.
* En la pantalla de login, existe un formulario de inicio de sesión y un enlace hacia el path /register, que contiene un formulario con validaciones que recibe un nombre de usuario y una contraseña que debe repetirse para confirmación. Si el formulario se envía correctamente y el nombre de usuario ya existe, se recibe una respuesta JSON con un mensaje proveniendo del backend. En caso contrario, se redirige nuevamente a la pantalla /login.
* Si no se detecta sesión al momento de estar en el path /index, se redirigirá hacia la pantalla de login. Del mismo modo, si se encuentra en la pantalla de /login habiendo una sesión activa, se redirigirá hacia /index.
* El path /index consta de una componente Index.js que renderíza tres componentes hijas: FactsList.js, Likes.js y Popular.js. A su vez, todas las componentes están envueltas en un context AuthProvider.js que guarda la información de usuario.
* FactsList.js es la componente que se renderiza en el path /index/facts, y realiza una operación GET a la url de la API de CatFacts. La respuesta es desmenuzada en una lista de facts y una lista de enlaces a las siguientes y anteriores páginas. Cada fact es renderizado como una componente Fact.
* Fact.js es una componente que representa un fact. Se compone del texto y de un checkbox para poder hacer like. Una acción de like envía una petición POST, en la que se almacena una entrada con referencia a un fact (que crea un objeto fact si es que no existe en la base de datos) y a un usuario. Como respuesta, se actualiza la referencia del usuario y sus likes en el AuthProvider. Esto permite determinar en siguientes consultas qué facts ya han recibido likes.
* Likes.js es la componente renderiza en el path /index/likes el listado de facts a los que el usuario actual ha dado like. Esto puede obtenerse directamente del AuthProvider.
* Popular.js se renderiza en el path /index/popular, y realiza una petición GET a la API de esta aplicación, consultando por aquellos facts que tengan likes registrados y los ordena en orden descendente por cantidad de likes.

![sequence](<readme_files/Diagrama de flujo SSCatFacts.jpg>)

### Diagrama Entidad-Relación

Se optó por utilizar tres modelos en la base de datos, que permiten la realización de consultas y entregar respuestas en forma de JSON:

* User: Un usuario consiste de un nombre de usuario y su contraseña. Un usuario puede estar asociado a muchos Likes o ninguno.
* Fact: Un fact consiste de un fact_key, que lo identifica en el listado de la API de CatFacts, y un string que representa el contenido del fact. Un fact puede estar asociado a muchos likes o ninguno.
* Like: Un like consiste de una llave foránea en referencia al ID de un usuario, y una llave foránea en referencia al ID de un Fact.

![er](<readme_files/Diagrama ER SSCatFacts.jpg>)
