---
author: saul
categories:
- Grunt
date: "2014-11-23T00:00:00Z"
descripcion: Una de las mejores funciones de Grunt es la habilidad de automatizar la creación
  de proyectos. En este tutorial explico como usar esta poderosa herramienta.
tags:
- automatización
- grunt
- herramientas
- javascript
- js
- template
title: 'Grunt: Usando templates para iniciar proyectos'
url: grunt-usando-templates-para-iniciar-proyectos/
type: "post"
---

En el <a href="http://www.saulsolorzano.com/grunt-el-corredor-de-tareas-en-javascript/" title="Grunt: El Corredor de Tareas en JavaScript" target="_blank">último post hablé de Grunt</a> y los primeros pasos que debemos tomar para empezar a usar esta poderosa herramienta en nuestros proyectos. Una de las mejores funciones de Grunt es la habilidad de automatizar la creación de proyectos. Nos copia nuestros archivos base y nos hace algunas preguntas que podemos configurar para llenar los datos de nuestro proyecto.  

## Instalación

Necesitamos instalar una utilidad global para poder usarla desde la terminal

<pre><code class="language-bash">npm install -g grunt-init
</code></pre>

De esta manera podremos usar `grunt-init` desde cualquier lado. Dado que es una instalación global probablemente de error, así que debemos correrlo como administrador usando `sudo`

## Templates

Los templates deben estar en una carpeta llamada `.grunt-init` *Importante el punto delante del nombre* en nuestro directorio raíz, es decir  
`~/.grunt-init/` en OS X y Linux y `%USERPROFILE%\.grunt-init\` en Windows

*Nota: A pesar de que no necesariamente los templates deben estar en esta carpeta, ya que realmente pueden estar en cualquier carpeta, es mucho más cómodo tenerlos ahí, si los decido colocar en la carpeta ~/Documents/templates/grunt debo copiar esa ruta cada vez que desee usar grunt-init*

Es importante usar un nombre que podamos recordar dado que el nombre de la carpeta donde se encuentre el tema es el que usaremos para correr el código. Si mi template se llama `tema` y esta creado en `~/.grunt-init/tema` debo correr

<pre><code class="language-bash">grunt-init tema
</code></pre>

Los temas pueden ser una colección completa de archivos o un solo archivo, por ejemplo, [uno de los templates mantenidos oficialmente][1] es sólo para crear el archivo Gruntfile, que como sabemos es necesario para correr grunt en cada proyecto.

## Estructura de un template

El template debe tener la siguiente estructura  
* `tema/template.js` Este es el archivo principal del template  
* `tema/rename.json` Para renombrar archivos según el template  
* `tema/root/` Los archivos que copiaremos al lugar donde queramos usar el template

Si copiamos este template en `~/.grunt-init` lo podemos usar simplemente `grunt-init tema`

### Archivo template.js

Ahora vamos a ver la estructura básica de un archivo `template.js`, las preguntas pueden cambiarse, así como las dependencias, pero cosas como `init.filesToCopy` y `init.copyAndProcess` que son necesarias, estos dos métodos se encargan de copiar los archivos que tenemos en la carpeta `root/` al directorio que los queremos usar.

```javascript
// Una descripción sencilla del proyecto (Opcional)
exports.description = 'Descripción de nuestro template.';

// Aquí comienza lo importante. No es necesario entender 100% que hace cada linea de código dado que como dije anteriormente, son iguales para cada proyecto
exports.template = function( grunt, init, done ) {

    // Aquí comenzamos el proceso de las preguntas
    init.process({}, [
        // Aquí podemos especificar cuantas preguntas queramos
        // estas preguntas se pueden usar para colocar estos
        // valores dentro de nuestro archivo, más de esto adelante.
        init.prompt('name'),
        init.prompt('title'),
        init.prompt('description', 'Descripción del proyecto'),
        init.prompt('homepage'),
        init.prompt('version'),
        init.prompt('licenses', 'MIT'),
        init.prompt('author_name', 'Saúl Solórzano'),
        init.prompt('author_email'),
        init.prompt('author_twitter', '@saulsolorzano'),
        init.prompt('author_url', 'http://saulsolorzano.com/')

    ], function(err, props){

        // Aquí copiamos los archivos

        var files = init.filesToCopy(props);
        // Esta es la función que agrega automáticamente la licencia especificada
        init.addLicenseFiles(files, props.licenses);

        init.copyAndProcess(files, props);
        // Aquí creamos el archivo *package.json*
        init.writePackageJSON('package.json', {
            // Usamos los valores definidos arriba
            name: props.name,
            version: props.version,
            description: props.description,
            author: {
                name: props.author_name,
                url: props.author_url
            },
            // Lista de dependencias que queremos usar
            devDependencies: {
                "grunt": "~0.4.2",
                "grunt-contrib-compass": "~0.7.0",
                "grunt-contrib-clean": "~0.4.0",
                "grunt-contrib-watch": "~0.5.3",
                "grunt-contrib-concat": "~0.3.0",
                "grunt-autoprefixer": "~0.6.4",
            }
        });

        done();

    });

};
```

### Preguntas

Como vemos algunas preguntas tienen dos parámetros. Veamos el ejemplo de Autor

```javascript
init.prompt('author_name', 'Saúl Solórzano'),
```

El primer valor `author_name` es la pregunta, la segunda es un valor que nosotros le podemos dar por defecto, igual nos va a hacer la pregunta pero como ya tiene una por defecto podemos no contestarla y el valor se llenará de todas maneras.

### rename.json

Supongamos que nos gusta llamar nuestro archivo de JS por el nombre del proyecto en lugar de un nombre genérico como `main.js` o `scripts.js` entonces en lugar de tener que renombrar ese archivo cada vez que creemos un proyecto podemos usar `rename.json` para lograr exactamente ese propósito.

```javascript
{
  "js/name_test.js": "js/&lbrace;%= name %&rbrace;_test.js",
}
```

De esta manera nuestro archivo tomaría el nombre del proyecto.

### root/

En esta carpeta están todos los archivos que queremos copiar, es importante destacar que los archivos dentro de esta carpeta se copiarán a la carpeta final que queremos usar, es decir, si la carpeta de nuestro proyecto es `proyecto/` los archivos se copiarán ahí, no a `proyecto/root`

Los archivos se copiarán con la misma estructura, incluyendo sub-carpetas. Como comenté anteriormente, podemos usar todas las variables, si es que así podemos llamarlas, que declaramos como preguntas dentro de nuestros archivos. Por ejemplo, para un tema de WordPress necesitamos tener un archivo `style.css` donde se define un bloque de comentarios que WordPress usa para tener información del mismo. Este bloque tiene la siguiente estructura

```javascript
/*!
Theme Name:
Description:
Author:
Author URI:
Version:
Tags:

License:
*/
```

Podemos usar los valores que declaramos aquí. Simplemente debemos usarlos dentro de `&lbrace;%= %}` De la siguiente manera

```css
/*!
Theme Name: &lbrace;%= title %&rbrace;
Description: &lbrace;%= description %&rbrace;
Author: &lbrace;%= author_name %&rbrace;
Author URI: &lbrace;%= author_url %&rbrace;
Version: &lbrace;%= version %&rbrace;

License:    &lbrace;%= licenses %&rbrace;
*/
```

Así podemos hacer con cualquier archivo, aquí está la cabecera del archivo `header.php`

```php
<?php
/**
 * Cabecera de la Página
 *
 * Nuestra todo el contenido hasta &lt;body&gt;
 *
 * @package     &lbrace;%= name %&rbrace;
 * @author      &lbrace;%= author_name %&rbrace; &lt;&lbrace;%= author_email %&rbrace;&gt;
 * @version     &lbrace;%= version %&rbrace;
 */
```

## Usando nuestro tema

Una vez que hayamos configurado todo simplemente debemos ir a la carpeta que queramos usarlo y correr `grunt-init` desde la terminal con el nombre de nuestro template. Si vamos con nuestro ejemplo de un template llamado `tema` debo escribir

```bash
grunt-init tema
```
![Grunt-Init](/uploads/grunt-init.gif)

Como vemos, incluso a las preguntas a las que no les tenemos una respuesta por defecto, grunt mira el ambiente donde se encuentra y trata de dar respuestas, la carpeta donde usé el comando se llama `templates-grunt` entonces nos da ambas respuestas de `name` y `title` basado en esta información.

## Conclusión

Usar los templates de `grunt` nos salva bastante tiempo cada vez que queremos comenzar un proyecto, grunt tiene algunos temas que soporta oficialmente pero todos tenemos una estructura de trabajo bastante estándar así que recomiendo mucho crear tu propio template para los diversos proyectos que hagas.

Cualquier duda me puedes preguntar en los comentarios.

 [1]: https://github.com/gruntjs/grunt-init-gruntfile