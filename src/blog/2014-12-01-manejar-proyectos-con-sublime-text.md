---
author: saul
categories:
- Utilidades
date: "2014-12-01T00:00:00Z"
descripcion:
- En este tutorial vemos como usar manejar proyectos usando Sublime, una función poco
  utilizada pero increíblemente útil.
tags:
- productividad
- proyectos
- sublime
title: Manejar proyectos con Sublime Text
url: /manejar-proyectos-con-sublime-text/
type: "post"
---

Sublime es uno de los mejores editores de texto para programar, es uno de los más usados por toda la comunidad y la razón es que es extremadamente personalizable, una de las que considero más útiles es la habilidad de crear Proyectos de sublime.  

## ¿Qué es un proyecto?

Un proyecto de sublime en definición es lo mismo que un proyecto para nosotros, si estoy trabajando en una página web para una Librería el proyecto de sublime sería la carpeta de la página web.

## Cómo crear

Para crear un proyecto simplemente abrimos la carpeta de nuestro proyecto en sublime y seleccionamos en el menú superior &#8220;Proyecto -> Salvar proyecto como..&#8221; donde nos va a abrir la ventana tradicional para salvar. Importante aquí, navegar hasta la carpeta de nuestro proyecto en caso de que la ventana haya abierto en otro lado y una vez que estemos en la carpeta de nuestro proyecto le damos a salvar, la razón es por que donde salvemos el proyecto considerará como la raíz del mismo.

Una vez que hayamos salvado vamos a ver dos archivos nuevos en nuestra carpeta. `libreria.sublime-project` `libreria.sublime-workspace`

## Ventajas

Los proyectos, para mi, tienen dos grandes ventajas, la primera es la habilidad de cambiar entre proyectos desde la misma interfaz de Sublime y la segunda es la habilidad de seleccionar que carpetas estamos viendo en un momento específico.

### Cambiar entre proyectos

Una vez que hayamos salvado nuestro proyecto podemos cambiar entre ellos con la combinación de teclas `Ctrl+Command+P` en OS X o `Ctrl+Alt+P` en Windows esto nos permite estar trabajando en un proyecto y cambiar a otro de manera rápida, o un caso más frecuente sería que estás trabajando en el código de una página y quieres hacer algo específico y sabes que ya lo hiciste anteriormente, simplemente abres una ventana nueva de Sublime (`Command+Shift+N` o `Ctrl+shift+N`) y seguido buscamos el proyecto que necesitamos y listo, no perdimos tiempo buscando la carpeta en Finder o Windows y arrastrándola a Sublime.

### Ocultar carpetas y archivos

Esta habilidad es mucho más util que la anterior, una vez hayamos creado nuestro proyecto y abrimos de nuevo el menú de &#8220;Proyecto&#8221; vamos a ver la opción de &#8220;Editar proyecto&#8221; disponible, si le damos click vamos a ver un archivo con opciones. Si alguna vez has editado alguna opción de sublime vas a reconocer la sintaxis, como casi todo en sublime, es un archivo `JSON` de opciones.

Este archivo debe tener la siguiente estructura

```javascript
{
    "folders":
    [
        {
            "follow_symlinks": true,
            "path": "."
        }
    ]
}
```

Supongamos que nuestro sitio de librería es una página de WordPress y la raíz de nuestro proyecto es la de WordPress, cuando abrimos el proyecto en sublime vemos la siguiente estructura:

<img src="{{site.baseurl}}/uploads/ColorSnapper_and__Users_saulsolorzano_Code_personal_saulsolorzano.png" title="Usando Sublime para manejar proyectos" alt="Usando Sublime para manejar proyectos" class="aligncenter wp-image-1416" />

Pero lo que realmente nos interesa es trabajar dentro del tema, una posibilidad sería salvar el proyecto directamente en el tema pero si queremos también trabajar en algún plugin tendríamos que tener dos proyectos de sublime para el mismo sitio. Si queremos ver sólo nuestro tema nos vamos a la opción de `path` y copiamos la ruta relativa al proyecto, en nuestro caso sería

```javascript
{
    "folders":
    [
        {
            "follow_symlinks": true,
            "path": "./wp-content/themes/libreria"
        }
    ]
}

```

Una vez que copiamos esto y salvamos vamos a ver que sublime &#8220;oculta&#8221; todas las carpetas que no sean directamente nuestro tema. Pero aquí no acaba la magia de los proyectos aún, supongamos que una vez dentro de nuestro tema de WordPress, en el que estamos trabajando, tenemos la siguiente estructura de archivos:

<img src="{{site.baseurl}}/uploads/Users_saulsolorzano_Desktop_libreria.png" title="Proyectos de Grunt para trabajar más eficientemente" alt="Proyectos de Grunt para trabajar más eficientemente" class="aligncenter wp-image-1417" />

De aquí no nos interesa ver la carpeta `bower_components`, `node_modules` y `css`, esta última porque si estamos trabajando en `SASS` no nos interesa por los momentos ver el `css`. Así como también `.sass-cache` que no vemos aquí porque es una carpeta oculta. Estas carpetas son increíblemente molestas si estamos usando la opción de Sublime para abrir archivos que es `Command+P` en OS X o Ctrl+P en Windows. Si no ocultamos estas carpetas y voy a buscar por ejemplo un archivo `JS` aparte de los que están en mi carpeta `js/` voy a ver los cientos que deben de haber entre las carpetas `bower_components` y `node_modules`. Podemos usar la opción `folder_exclude_patterns` como un array para colocar todos los nombres ahí, nuestro archivo quedaría así.
```javascript
{
    "folders":
    [
        {
            "follow_symlinks": true,
            "path": "./wp-content/themes/libreria",
            "folder_exclude_patterns": ["css", ".sass-cache", "node_modules", "bower_components"]
        }
    ]
}
```

Una vez que coloquemos esto y salvamos el archivo vamos a ver que las carpetas desaparecen de nuestra barra lateral, y si buscamos archivos con `command+p` solo aparecen los de las carpetas que si vemos.

La última opción es `file_exclude_patterns` que como se pueden imaginar, es lo mismo de `folder_exclude_patterns` pero para archivos, por ejemplo, aquí podemos ocultar los archivos minimizados de `javascript`, el archivo `Gruntfile.js`, el `.htaccess` y otros archivos que no necesitamos ver mientras estamos trabajando. Así va el archivo
```javascript
{
    "folders":
    [
        {
            "follow_symlinks": true,
            "path": "./wp-content/themes/libreria",
            "folder_exclude_patterns": ["css", ".sass-cache", "node_modules", "bower_components"],
            "file_exclude_patterns":
            [
                ".htaccess",
                "*-min.js",
                "Gruntfile.js"
            ]
        }
    ]
}
```

Y eso es todo. Se pueden agregar tantas carpetas como queramos, si por ejemplo queremos agregar aquí también nuestro plugin simplemente hacemos esto
```javascript
{
    "folders":
    [
        {
            "follow_symlinks": true,
            "path": "./wp-content/themes/libreria",
            "folder_exclude_patterns": ["css", ".sass-cache", "node_modules", "bower_components"],
            "file_exclude_patterns":
            [
                ".htaccess",
                "*-min.js",
                "Gruntfile.js"
            ]
        },
        {
            "path": ".wp-content/plugins/nuestro-plugin"
        }
    ]
}
```

### Conclusión

Como pueden ver, trabajar con proyectos en Sublime puede ser increíblemente util y eficiente. Además de estas opciones que coloco, hay algunas adicionales que pueden ver en la [documentación](https://www.sublimetext.com/docs/3/projects.html) pero las que resalto aquí son las que he usado y me han ayudado enormemente.