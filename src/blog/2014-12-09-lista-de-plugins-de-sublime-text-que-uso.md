---
author: saul
categories:
- General
date: "2014-12-09T00:00:00Z"
descripcion:
- Sublime text es uno de los mejores editores de texto con los que se puede programar
  y razón por la cual es tan potente es su gran cantidad de plugins.
tags:
- flujo de trabajo
- plugins
- sublime
- utilidad
title: Lista de plugins de Sublime Text que uso
url: /lista-de-plugins-de-sublime-text-que-uso/
type: "post"
---

Sublime text es uno de los mejores editores de texto con los que se puede programar y razón por la cual es tan potente es su gran cantidad de plugins.

Hace unos días expliqué como usar los proyectos de Sublime, aquí colocaré los plugins que yo uso casi a diario, los plugins que tengas instalados dependen mucho de tu flujo de trabajo y que tecnología más usas.  

## Package Control

Antes de instalar algún plugin necesitamos primero *Package Control*. Esta herramienta nos sirve para instalar, desintalar, actualizar y en general controlar los plugins.

Los pasos para instalar están [aquí][1] cambian un poco si usas Sublime text 2 o 3. Las instrucciónes son bastante sencillas.

Una vez que tengamos esto podemos buscar cualquiera de los plugins de esta lista usando `command+shift+P` en OS X o `ctrl+shift+P` en windows que nos abre el menú &#8220;goto Anything&#8221; de Sublime, copiamos &#8220;install&#8221; y veremos la opción que dice `Packake Control: Install Package`

Si le damos click podemos copiar el nombre del paquete que estamos buscando y una vez lo encontremos le damos click y se descarga e instala, algunos requieren que reiniciemos sublime, otros no, yo tengo como costumbre cada vez que instalo algo reiniciar sublime para estar seguro igual.

Casi todos los plugins están en github pero se recomienda instalarlos por el *package control*

### 1. [AdvancedNewFile][2]

Este plugin nos sirve para crear archivos usando un comando del teclado. Cuando estamos trabajando en un proyecto nuevo normalmente creamos una buena cantidad de archivos, usando este plugin no perdemos tiempo creandolos con el mouse, simplemente copiamos `command+alt+N` en OS X o `ctrl+alt+N` en Windows y nos abre abajo una opción donde colocamos el nombre y extensión del archivo y listo.

Lo bueno es que nos abre relativo a nuestra carpeta raíz de proyecto entonces si quieres crear un nuevo script puedes copiar `js/nombre.js` y se creará en la carpeta correspondiente.

### 2. [Alignment][3]

Este plugin sirve para alinear multiples selectores. Es útil para alinear todas las variables en un bloque de código

### 3. [BracketHighlighter][4]

Muy util, cuando estamos viendo un bloque de código y nos paramos sobre un selector es de mucha ayuda ver de una vez el que lo acompaña.

### 4. [Color Hightligher][5]

Usado para `CSS`, como el nombre lo dice, nos coloca el color del código que tenemos en el css, entonces si tenemos `FFFFFF`, `rgb(255,255,255)` o `white` nos coloca el color blanco

### 5. [CSS Snippets][6]

Una colección de snippets muy util para trabajar con `CSS`.

### 6. [Emmet][7]

Emmet es uno de los plugins mas útiles que existe, no es exclusivo de Sublime, se puede usar en una gran cantidad de programas. Emmet nos permite mejorar nuestro flujo de trabajo en CSS y HTML de gran manera. En HTML nos permite usar abreviaciónes para expandir código. Es decir, podemos escribir
```html
header.header&gt;.logo&gt;a[src="img/logo.svg"]
```

y emmet generará el HTML correspondiente

```html
&lt;header class="header"&gt;
    &lt;div class="logo"&gt;&lt;a href="" src="img/logo.svg"&gt;&lt;/a&gt;&lt;/div&gt;
&lt;/header&gt;
```

### 7. [GitGutter][8]

Si trabajas con git (deberías) este plugin es muy util. Te indica cuando hay nuevas lineas, lineas eliminadas y modificadas.

### 8. [SideBarEnhancements][9]

El sidebar que trae Sublime por defecto es bastante pobre, tiene como 4 opciones solamente. Son este plugin tenemos muchas más opciones.

### 9. [TodoReview][10]

Extremadamente útil. Te permite crear una lista de pendiente en el mismo código. Puedes tener distintas listas, como `TODO`, `FIX`, `BUG` incluso puedes colocar las tuyas, puedo tener una lista llamada `SAUL`. Después con un simple comando el plugin revisa todos los archivos y nos generá la lista.

### 10. [DocBlockr][11]

Nos permite generar una documentación sencilla para nuestras funciones de JavaScript, PHP y otros lenguajes de programación.

 [1]: https://sublime.wbond.net/installation
 [2]: https://github.com/skuroda/Sublime-AdvancedNewFile
 [3]: http://wbond.net/sublime_packages/alignment
 [4]: https://github.com/facelessuser/BracketHighlighter
 [5]: https://github.com/Monnoroch/ColorHighlighter
 [6]: https://github.com/joshnh/CSS-Snippets
 [7]: http://emmet.io/
 [8]: https://github.com/jisaacks/GitGutter
 [9]: https://github.com/titoBouzout/SideBarEnhancements
 [10]: https://sublime.wbond.net/packages/TodoReview
 [11]: https://github.com/spadgos/sublime-jsdocs