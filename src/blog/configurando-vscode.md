---
date: 2021-04-06
published: false
description: "Si eres desarrollador web, ya sea frontend o backend, es probable que pases bastante tiempo de tu día en la terminal. Si es así y aún no usas los dotfiles (archivos .punto en inglés) este artículo es para tí."
title: Configurando VSCode
url: configurando-vscode/
type: "post"
---
Cuando empecé a trabajar con VSCode estuve mucho tiempo sin usar [Prettier](https://prettier.io/), la razón principal es porque Prettier es un formateador de código **opinionado** y por mucho tiempo me reusé.

```json
{
    "editor.fontFamily": "Rec Mono Casual, Cascadia Mono, Source Code Pro, Monaco, 'Courier New', monospace",
    "editor.fontSize": 18,
    "editor.lineHeight": 35,
    "editor.letterSpacing": 1,
    "editor.fontWeight": "400",
    "editor.fontLigatures": true,
    "editor.tabSize": 4, // Controla el tamaño del tab
    "editor.insertSpaces": false, //Sí está en true se insertan espacios cuando se le da a tab
    "editor.linkedEditing": true,
    "editor.suggest.showSnippets": true,
    // Configuraciones extras
    "editor.minimap.enabled": false,
    // "editor.codeLens": false,
    "editor.renderControlCharacters": true, //Muestra caracteres "extaños" en el código
    "editor.renderIndentGuides": false, // Oculta guías de indentación
    "editor.renderLineHighlight": "none",
    "editor.renderWhitespace": "none",
    "editor.quickSuggestionsDelay": 0, // Mostrar las sugerencias de IntelliSense lo más rápido posible
    "explorer.openEditors.visible": 0, // Oculta la opción de "Open Editors/Editores abiertos" en el sidebar
    "editor.accessibilitySupport": "off",
    // Formateo de código
    "editor.formatOnPaste": false, // Autoformatear cuando se pega
    "editor.formatOnType": false,
    "editor.formatOnSave": false,
    "diffEditor.ignoreTrimWhitespace": false,
    "diffEditor.wordWrap": "off",
    "workbench.colorTheme": "Palenight Operator",
    "workbench.editor.enablePreviewFromQuickOpen": false, // Desactiva la opción de "preview" de archivos y los abre completamente.
    "workbench.editor.enablePreview": false,
    "workbench.activityBar.visible": false, // Elimina la barra lateral de la izquierda
    "workbench.startupEditor": "none",
    "workbench.iconTheme": "vscode-icons", // Íconos de vscode
    // Agregando una tipografía personalizada para la terminal
    "terminal.integrated.fontFamily": "FuraCode Nerd Font Mono",
    "terminal.integrated.fontSize": 15,
    "terminal.integrated.lineHeight": 1.5,
    "terminal.integrated.cursorBlinking": false,
    "terminal.integrated.cursorStyle": "line",
    // Tailwind
    "tailwindCSS.includeLanguages": {
        "*.php": "html"
    },
    "intelephense.stubs": [
        "wordpress"
    ],
    // Configuración de emmet
    // Agrega el comentario de emmet en la misma linea
    "emmet.preferences": {
        "filter.commentAfter": "<!-- /[#ID][.CLASS] -->"
    },
    "emmet.includeLanguages": {
        "liquid": "html",
        "blade.php": "html",
        "twig": "html"
    },
    "emmet.triggerExpansionOnTab": true, 
    "emmet.excludeLanguages": [
      "markdown"
    ],
    //Plugin de todohighlight
    "todohighlight.include": [
        "**/*.scss",
        "**/*.js",
        "**/*.liquid"
    ],
    "files.associations": {
        ".php_cs": "php",
        ".php_cs.dist": "php",
        "*.php": "php" // this is super important, otherwise intelephense will not auto-index your project.
    },
    "liveServer.settings.donotVerifyTags": true,
    //Eliminar carpetas de la búsqueda
    "search.exclude": {
        "**/bower_components": true,
        "**/build_local": true,
        "**/node_modules": true,
        "**/public/[abcdefghjklmnopqrstuvwxyz]*": true,
        "**/public/i[abcdefghijklmopqrstuvwxyz]*": true,
        "**/vendor/[abcdefghijkmnopqrstuvwxyz]*": true,
        "**/vendor/l[bcdefghijklmnopqrstuvwxyz]*": true,
        "storage/framework/views": true
    },
    // Excluye carpetas de editor
    "files.exclude": {
        "**/.idea": true,
        "**/.next": true,
    },
}
```
