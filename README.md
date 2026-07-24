# SSCatFacts

Bienvenidos al repositorio de mi prueba técnica de SSCatFacts para SSIndex. El repositorio contiene el código de la aplicación y las instrucciones para ejecutarlo.

## Requisitos

Se requiere tener instaladas las siguientes tecnologías que fueron utilizadas:

* Ruby on Rails
* ReactJS + Tailwind CSS
* PostgreSQL
* Docker y Docker Compose

## Ejecución y deploy local

Tras descargar el proyecto, dirigirse a la carpeta raíz del proyecto y ejecutar el comando

```
sudo docker compose up --build
```

Una vez que haya terminado la instalación y esté funcionando la base de datos, se deben hacer las migraciones de rails hacia postgresql:

```
sudo docker compose run backend rails db:create
sudo docker compose run backend rails db:migrate
```

Finalmente, para desmontar el contenedor, se usa el comando:

```
sudo docker compose down --remove-orphans
```
## Diagrama de secuencia

![sequence](<readme_files/Diagrama de flujo SSCatFacts.jpg>)

## Diagrama Entidad-Relación

![er](<readme_files/Diagrama ER SSCatFacts.jpg>)
