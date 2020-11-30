---
author: "Saúl Solórzano"
categories: ["Utilidades"]
date: 2018-06-20
title: "Lista actualizada de plugins para Sublime Text que uso, temas y otra configuración"
slug: "/lista-actualizada-de-plugins-temas-configuracion-sublime-text/"
descripcion:  "Han pasado ya casi 4 años desde que hice la primera recopilación y muchas cosas han cambiado. Aquí va una lista actualizada de los plugins que uso ahora."
type: "post"
---

Han pasado ya casi 4 años desde que hice una [lista de plugins](http://saulsolorzano.com/lista-de-plugins-de-sublime-text-que-uso/) de sublime text que uso, desde ese momento algunas cosas han cambiado. Aquí va una lista actualizada de los plugins que uso ahora, así como también temas y otra configuración adicional.

# Plugins

### [A File Icon](https://github.com/ihodev/a-file-icon)
Este plugin no es de mucha utilidad para programar, pero sí ayuda a que tu sublime se vea más ordenado. Coloca el icono correspondiente a cada archivo basado en su extensión.


### [All Autocomplete](https://github.com/alienhard/SublimeAllAutocomplete)
Este plugin es súper útil, porque extiende el autocompletado automático de sublime para buscar en todos los archivos que están abiertos en ese momento, es muy útil cuando estoy trabajando en un `html` y un `scss` al mismo tiempo.

### [Babel](https://github.com/babel/babel-sublime)
Este plugin sirve si escribes React, ya que ayuda a sublime a reconocer la sintaxis usada por ese framework. Y en general cuando estás escribiendo ES6.

### [MarkdownEditing](https://github.com/SublimeText-Markdown/MarkdownEditing)
Plugin súper útil cuando estás escribiendo en `Markdown`. Da mejor estilo y formato del documento, los post de este blog los escribo en `markdown` así que la uso bastante.

### [PHP - Twig](https://github.com/Anomareh/PHP-Twig.tmbundle)
Para los que usen `twig` en sus desarrollos este plugin es imprescindible, ya que da Syntax Highlight para los archivos `.twig`.

### [Laravel Blade Highlighter](https://packagecontrol.io/packages/Laravel%20Blade%20Highlighter)
Igual que el anterior pero para `Blade` en lugar de `Twig`

# Temas
Por defecto sublime viene instalado con el tema Monokai, que es bastante bueno, pero a mi particularmente me gusta cambiar el tema que uso cada cierto tiempo para no aburrirme. Los más populares son bastantes buenos, en estos momentos tengo cuatro instalados que los voy rotando.

Los temas se instalan igual que los plugins, usando `Package Manager`.

### [Material Theme](https://github.com/equinusocio/material-theme)
Este tema creo que es uno de los más populares, a pesar de que su autor abandonó sublime y el desarrollo continuo del tema, probablemente alguien le haga fork y continue su vida así.

### [Boxy Theme](https://packagecontrol.io/packages/Boxy%20Theme)

### [DA UI](https://packagecontrol.io/packages/DA%20UI)

### [Theme - Hero](https://packagecontrol.io/packages/Theme%20-%20Hero)

# Tipografía
La tipografía es sumamente importante para los desarrolladores, una buena tipografía puede ayudar a programar más rápido. Mi consejo es ir a [Google Fonts](https://fonts.google.com/) y en el sidebar derecho solo dejar seleccionadas las "monospace" y descargar las que sean de tu agrado.

También recomiendo mucho una tipografía que se ha puesto de "moda" en el mundo de la programación, la `Fira Code` que pueden encontrar [aquí](https://github.com/tonsky/FiraCode).

Una de las mejores cosas que tiene es que soporta ligaturas, las ligaturas son cuando dos caracteres se unen para formar uno solo. Esto es especialmente util para nosotros como programadores ya usamos muchos simbolos en nuestro código, para saber de lo que hablo, después que la instalen escriban => para que vean como se convierte en una flecha completa, !== se convierte en un solo caracter. Es bastante cómoda de usar.

Para usarlas en sublime hay que instalarlas en el sistema de la computadora, cambia para Windows y Mac. Una vez instaladas debes ir a la configuración de sublime, buscar donde dice `font_face` y sustituir por el nombre de la fuente que acabamos de instalar. Importante colocar el nombre de la tipo completa, si usamos `Fira Code` debemos colocar `Fira Code` completo.


### Configuración final
Aquí está mi archivo de configuración de sublime completo para que vean como se ve:

```json
{
    "always_show_minimap_viewport": false,
    "auto_complete": "true",
    "bold_folder_labels": true,
    "color_scheme": "Packages/DA UI/DA Dark.tmTheme",
    "detect_indentation": true,
    "font_face": "Fira Code",
    "font_options":
    [
        "gray_antialias"
    ],
    "font_size": 16,
    "highlight_line": true,
    "highlight_modified_tabs": true,
    "ignored_packages":
    [
        "Markdown",
        "Vintage"
    ],
    "indent_guide_options":
    [
        "draw_normal",
        "draw_active"
    ],
    "line_padding_bottom": 5,
    "line_padding_top": 5,
    "overlay_scroll_bars": "enabled",
    "tab_size": 4,
    "theme": "DA.sublime-theme",
    "translate_tabs_to_spaces": false,
    "word_wrap": false
}
```

Cualquier pregunta no duden en escribirme por correo o twitter.

Gracias por leer.