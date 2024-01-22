# Evaluación final módulo 2

## Buscador de Series Anime

El ejercicio consiste en desarrollar un buscador de series anime a través de la API abierta de Jikan.
La maquetación del proyecto es sencilla, se basa en una entrada donde podemos buscar la serie que queremos, y tenemos dos secciones que mostrarán los resultados de las series y por otro lado el apartado de favoritos donde podremos añadir las series que más nos gusten.
Además cuenta con dos botones, un **RESET** principal que nos devolverá la página a su estado inicial (sin datos cargados, sólo la estructura inicial), y otro botón en el apartado de _Favoritos_ llamado **eliminar** que nos borrará todas las series que tengamos añadidas en este campo.

![versión mobile](/images/mobile.PNG)
![versión desktop](/images/desktop.PNG)

### Herramientas utilizadas 🛠️

Principalmente en este proyecto ponemos a prueba nuestra capacidad de trabajar con una API. En este caso la API utilizada ha sido:
[API Jikan](https://docs.api.jikan.moe/)

También se ha trabajado con SASS utilizando en gran aprte nomenclatura BEM. Para el diseño de la página se ha utilizado flexbox para poder adaptar la página a los diferentes formatos de dispositivos en los que se pueda visualizar.

> **NOTA**: Las medidas utilizadas para diferenciar los dispositivos son 320px para móvil, y a partir de 768px para tablet y desktop.

También se ha utilizado el Adalab Web Starter Kit que nos ha ofrecido todos los ficheros y carpetas necesarios para realizar el proyecto. Esta plantilla usa Vite para la ejecución de tareas.

### Pasos a seguir si queremos arrancar el proyecto desde nuestro VSC ⚙️

1. Descarga el proyecto.

- No recomendamos que clones este repo ya que no podrás añadir commits.

1. **Abre una terminal** en la carpeta raíz donde le hayas guardado.
1. **Instala las dependencias** locales ejecutando en la terminal el comando:

```
npm install
```

> **NOTA**: Esto generará una carpeta llamada node_modules y sólo hay que ejecutarlo una vez. En el momento que aparezca la carpeta ya no será necesario volver a ejecutarlo.

1. Una vez hemos instalado las dependencias, vamos a arrancar el proyecto. **_El proyecto hay que arrancarlo cada vez que te pongas a programar._** Para ello ejecuta el comando:

```
npm run dev
```

Este comando:

- **Abre una ventana del navegador y muestra la página web**, al igual que hace el plugin de VS Code Live Server (Go live).
- También **observa** todos los ficheros que hay dentro de la carpeta `src/`, para que cada vez que modifiques un fichero **refresca tu página en Chrome**.
- También **procesa los ficheros** HTML, SASS / CSS y JS. Por ejemplo:
  - Convierte los ficheros SASS en CSS.
  - Combina los diferentes ficheros de HTML y los agrupa en uno o varios ficheros HTML.

Después de ejecutar `npm run dev` ya puedes empezar a editar todos los ficheros que están dentro de la carpeta `src/` y programar cómodamente.

### Estructura de carpetas

La estructura de carpetas donde está la información tiene esta pinta:

```
js

src
 ├─ scss
 |  ├─ core
 |  ├─ layout
 └─ partials
    └─ //archivos html de las diferentes partes del proyecto//
```

> ¡Espero que el aporte os haya gustado!
