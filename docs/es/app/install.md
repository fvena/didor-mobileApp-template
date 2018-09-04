# Inicio
<div class="lastUpdated">Última actualización {docsify-updated}</div>

## Requisitos previos
Para poder desarrollar la aplicación necesitas tener instalado y configurado las
siguientes herramientas:

* [Node](https://nodejs.org/es/)
* [Yarn](https://yarnpkg.com/es-ES/docs/install)
* [Cordova](https://cordova.apache.org/docs/en/latest/guide/cli/index.html)
* [Didor-docs](https://github.com/fvena/didor-docs)
* [Ionic](https://ionicframework.com/getting-started)
* [Commitizen](https://github.com/commitizen/cz-cli)
* [Conventional-changelog-cli](https://www.npmjs.com/package/conventional-changelog-cli)


## Comandos

```[bash]
# Instalación
$ yarn install              # Instala las dependecias del proyecto
$ yarn run cordova-build    # Nos aseguramos que podemos generar una aplicación
$ cordova prepare           # Prepara los recursos que cordova necesita


# Desarrollo
$ yarn run cordova-serve    # Navegador (http://localhost:8080)
$ cordova run ios           # En otra pestaña
$ cordova run android       # En otra pestaña


# Generar aplicación
$ yarn run release          # Actualiza la versión y el changelog del proyecto
$ yarn run cordova-build    # Compila el proyecto
$ cordova build browser     # Genera la aplicación para el navegador (platforms/browser/www)
$ cordova build ios         # Genera la aplicación para ios
$ cordova build android     # Genera la aplicación para android


# Herramientas
$ yarn run commit           # Git commit message convention
$ yarn run docs             # Show custom documentation
$ yarn run lint             # Lint and fixes files
$ yarn run test:unit        # Run your init tests
$ yarn run test:e2e         # Run your end-to-end tests
$ ionic cordova resources   # Genera los iconos y la pantalla de inicio personalizada
```
