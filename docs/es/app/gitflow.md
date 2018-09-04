# Flujo con GIT
<div class="lastUpdated">Última actualización {docsify-updated}</div>


## Descargar el proyecto

Puedes descargarte el proyecto desde su repositorio mediante git, aunque te recomiendo
realizar un fork y trabajar con este, en un proyecto colaborativo nunca deberíamos
trabajar sobre el repositorio principal.

Puedes encontrar más información del flujo de trabajo utilizado con GIT y buenas
prácticas en la sección de [GIT Flow](/es/app/gitflow).


Una vez que tengas el proyecto copiado en tu equipo, el primer paso será instalar

1. **Realiza un fork del repositorio principal.** Un fork es una copia del proyecto.
Realizar un fork de un repositorio nos permite hacer cambios sin afectar al proyecto
original. En un proyecto colaborativo, nunca deberíamos trabajar sobre el repositorio original.

2. **Clonar el fork en nuestro equipo.** Una vez realizado el fork, copia
la url y realiza un `git clone`.

3. **Añade el repositorio principal como remoto.** Para poder actualizar tu repositorio
cuando se producción cambios en el principal, deberás tenerlo como repositorio remoto.

```bash
git add remote .... dkn-USA
```

Esto añadirá la ruta del repositorio principal a los servidores remotos de tu proyecto,
a partir de ahora podrás actualizar tu repositorio haciendo un `fetch` y un `merge`.
Estos flujos de trabajo se explican de forma más extensa en el apartado de [Git Flow](/es/app/gitflow).
