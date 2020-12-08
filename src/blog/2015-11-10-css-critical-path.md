---
author: saul
categories:
- css
- desempeño
date: "2015-11-10T00:00:00Z"
published: true
descripcion:
- Como utilizar el "Critical PATH" para mejorar el desempeño de tu sitio web
meta_description: Como utilizar el "Critical PATH" para mejorar el desempeño de tu
  sitio web
title: Que es el Critical Path y como ayuda al desempeño de tu sitio web
url: css-critical-path/
type: "post"
---

Uno de los problemas mas grandes que enfrenta la web en estos momentos es que nuestros sitios web se han vuelto cada vez más pesados. Hay muchas maneras de prevenir esto, minimizando nuestros recursos, optimizando imágenes y lograr que los recursos lleguen al navegador de una mejor manera. Una de las técnicas para lograr eso es colocar nuestro CSS en lo que se conoce como el "critical path" o "Camino Crítico" como se traduciría.

Aunque muy pocas veces lo vemos de esta manera el CSS sigue siendo un recurso externo que el navegador tiene que descargar antes de empezar a "pintar" nuestro sitio web. Y aunque el CSS debería de estar minimizado y lo más optimizado posible sigue siendo un recurso que boquea la carga. La manera de contrarestar esto es colocar el css "crítico" dentro del html directamente. Pero no todo el CSS, sólo el del primer pantallazo, es decir, lo que el usuario ve apenas entra a la página web.

El resto del css lo debemos cargar después, pero no con un simple `<link>` sino no estamos haciendo nada. Una manera de cargarlo es usando un script desarrollado por [Filament Group](https://github.com/filamentgroup/loadCSS) que hace la carga de la hoja de estilo de manera asincronica.

Entonces podemos colocar lo crítico de nuestro CSS en la cabecera de nuestro web y utilizar el script para cargar la hoja

Aquí está el script minimizado


```javascript
function loadCSS(e,t,n,o){"use strict";function r(){for(var e,t=0;t<l.length;t++)l[t].href&&l[t].href.indexOf(i.href)>-1&&(e=!0);e?i.media=n||"all":setTimeout(r)}var i=window.document.createElement("link"),d=t||window.document.getElementsByTagName("script")[0],l=window.document.styleSheets;return i.rel="stylesheet",i.href=e,i.media="only x",o&&(i.onload=o),d.parentNode.insertBefore(i,d),r(),i}
		loadCSS( "{{site.url}}css/main.css" );
```

Debemos pegar el script completo también en nuestro código, sino estámos anulando el propósito. Como podemos ver al finál hace el llamado de la hoja de estilo, esta hoja de estilo demás está decir debe estar minimizada.

## Como determino que css va en mi cabecera?

La misma gente de Filament group hizo una herramienta muy util que la podemos encontrar como un [módulo de Node](https://github.com/filamentgroup/criticalcss) o como una [tarea de Grunt](https://github.com/filamentgroup/grunt-criticalcss)

Yo decidí irme por la tarea de Grunt, así la puedo integrar en mi [flujo de trabajo](http://saulsolorzano.com/grunt-el-corredor-de-tareas-en-javascript/)

Una de las opciones que podemos colocar dentro de nuestra tarea es la resolución del monitor contra la cual la tarea nos entregará nuestro CSS, una buena idea es visitar primero nuestro Google Analytics y revisar cual es la resolución más visitada de nuestro sitio y colocar esa aquí. La tarea nos va a generar un archivo con el CSS que debemos colocar dentro de nuestro header.

Dado que esto es técnología nueva siempre es bueno tenerle un ojo puesto al repositorio del script por si cambia, y recordar que si hacemos cambios de css debemos actualizar el css que tenemos en duro.