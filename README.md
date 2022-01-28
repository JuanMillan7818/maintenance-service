<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Es un marco progresivo de <a href="http://nodejs.org" target="_blank">Node.js</a> para crear aplicaciones del lado del servidor eficientes y escalables.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Backend para un sistema de ordenes de servicio, la API esta construida como Nestjs y esta deplegada en
la plataforma de Heroku.

## Despligue en Heroku
El servicio esta desplegado en Heroku, el cual es una plataforma como servicio de computación en la Nube que soporta distintos lenguajes de programación. 

Enlace de la [API](https://maintenanceservices.herokuapp.com/).

[Documentacion en swagger](https://maintenanceservices.herokuapp.com/api/)

> x-api-key=68cd68e26f21228ca03na188ameV


# Despligue local
## Proteccion de los Endpoints
Los endpoints esta protegidos bajo la cabacera 
> x-api-key

> La variable de entorno se llama API_KEY el cual debe establecer en el .env

El valor de esta propiedad se debe establecer en el archivo **.env** donde se almacenan todas las variables de entorno.

## Base de datos
Si se desea correr la aplicacion localmente se debe asegurar que existe una base de datos llamada:

> maintenance_service

Ademas puede configurar la informacion que se le proporciona a la base de datos **Postgres** como nombre de usuario, nombre de base de datos y contraseña.

### Ruta del archivo de configuracion para **Postgres**:
    .
    ├── src                             # Archivos fuente
      ├── config-orm                    # Carpeta
        ├── config-orm.service.ts       # Configuracion de db

## Codigo rapido para crear la base de datos
En el siguiente directorio se encuentra un archivo .sh que contiene una instruccion para crear la base de datos de forma rapida.
> src/util/initial-db


## Imagen Docker 
### Mediante docker
```
  docker build . -t services/api
  docker run -it services/api
```
### Mediante docker-compose
```
  sudo docker-compose up --build -V
  sudo docker-compose up dev
```

## Instalacion

```bash
$ npm install
```

## Ejecutar el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Licencias de Nest

Nest esta sobre la licencia [MIT licensed](LICENSE).
