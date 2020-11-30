---
author: saul
categories:
- productividad
date: "2016-01-03T00:00:00Z"
descripcion:
- Usando los archivos dot para aumentar la productividad
title: Usar archivos dot para aumentar productividad
url: usando-archivos-dot-para-aumentar-productividad/
type: "post"
---

Si eres desarrollador web, ya sea frontend o backend, es probable que pases bastante tiempo de tu día en la terminal. Si es así y aún no usas los dotfiles (archivos .punto en inglés) este artículo es para tí.

Los archivos, llamados así porque comienzan con un `.` se encuentran en el directorio raíz de un usuario. Si entras a tu directorio raíz y listas los archivos seguro vas a encontrar algunos

```bash
cd ~/
ls -la
```

Por ejemplo, si has usado `git` y lo has configurado correctamente encontrarás el archivo `.gitconfig` Es probable que encuentres el archivo `.bashrc` también, pero realmente puedes crear y organizar tus archivos `.dot` como más te guste.

La ventaja de los archivos dot es la eficiencia que generan. Asumamos, por ejemplo, que modificas el archivo hosts de tu computadora multiples veces al día para activar dominios virtuales, en lugar de tener que copiar en la terminar cada vez

```bash
sudo vim /etc/hosts
```

Puedes crear un `alias` que sea

```bash
alias hosts="sudo vim /etc/hosts"
```

Entonces podemos copiar `hosts` cuando entremos a la terminal y se abrirá automáticamente nuestro archivo hosts para editar lo que necesitemos.

## Buscando dirección
Lo más recomendado es darse un paseo por repositorios de archivos dots de desarrolladores de alto nivel que los mantienen regularmente. Aquí hay un par

* [http://sow.so/dotfiles](http://sow.so/dotfiles)
* [http://mths.be/dotfiles](http://mths.be/dotfiles)

Github tiene una recomendación completa [aquí](http://dotfiles.github.io/)

Estos archivos vienen con una estructura bastante común, es la que usé para ordenar mis archivos, sin embargo, me parece que tienen muchas cosas que al final nunca se usarán completamente, como cuando se usa un framework para programar. Mi recomendación es revisar cada repositorio y tomar lo mejor de cada uno y hacer tus propios archivos. Voy a tomar mis propios archivos para repasar un poco la estructura, casi todas mis funciones y alias son tomados de los archivos publicados arriba. [https://github.com/saulsolorzano/dotfiles](https://github.com/saulsolorzano/dotfiles)

## Tipo de archivos

### .bashrc / .bash_profile
Cada vez que abres la terminal estos son los archivos que se cargan. Entonces son los que usaremos para importar todos los demás archivos que crearemos.

En nuestro `.bash_profile` vamos a hacer el llamado de nuestros alias, funciones y el nuevo prompt modificado. Yo tengo dos archivos más, `.extra` y `.wp` que no los coloco públicamente dado que uno es alias de los servidores que usamos para trabajar y `.wp` son funciones de `wp-cli` que incluyen plugins pagos.

>Si no sabes que es [WP-CLI](http://wp-cli.org) y trabajas con Wordpress recomiendo mucho que lo instales, mejora mucho la productividad

```bash
for file in ~/.{bash_prompt,aliases,functions}; do
  [ -r "$file" ] && [ -f "$file" ] && source "$file";
done;
unset file;
```

Vamos a pasar ahora por cada archivo

### .aliases
Aquí van todos los alias que nos ayudan a escribir menos. Yo uso sublime text para programar entonces tengo un alias que abre los archivos directamente en sublime

```bash
alias subl="open -a 'Sublime Text'"
```
### .functions
Bastante parecido al archivo de `.aliases` la única diferencia es que las funciones, como en cualquier lenguaje de programación, aceptan argumentos.

Creo que la función más popular de todas es la usada para crear un directorio y entrar a el mismo en el mismo comando.

```bash
function mcd() {
    mkdir -p "$@" && cd "$@"
}
```

Entonces si quiero crear el directorio `proyecto` normalmente tendría que correr los comandos por separado

```bash
#manera tradicional
mkdir proyecto
cd proyecto
#con la nueva función
mcd proyecto
```

### .bash_prompt
Esta es una función bastante larga que básicamente nos permite cambiar el `prompt` de nuestra terminal. El prompt es lo que aparece de lado izquierdo cada vez que presionamos enter en la terminal.

Un prompt configurado es bastante util si trabajas regularmente con `git` ya que te indica el `branch` en el que estás, si tienes cambios sin haberlos versionado, es de bastante ayuda.

### .gitignore
Si siempre estás colocando los mismos archivos en tu .gitignore de cada proyecto, puedes configurar este global y olvidarte de ellos.

### .gitconfig
Archivo que todos deberíamos tener con nuestra configuración global. También hay alias de git. A pesar de que podemos colocar estos alias completamente en nuestro archivo de `.aliases` me gusta mantener los alias de git en su archivo correspondiente.

Aquí también hay unas funciones de git. Por ejemplo, para hacer push en lugar de copiar

```bash
git push origin master
```

Solo debo copiar

```bash
git p master
```
Y funciona sin ningún problema.

### .vimrc /.gvimrc
Si usas mucho `vim` estos archivos son solo lo más básico para configurar un poco la apariencia del mismo. Cosas como un colorscheme y algunas configuraciones de estilo.


### bootstrap.sh

Este archivo sirve para copiar nuestros archivos dot al directorio raíz.

***
Usar los archivos `.dot` puede aumentar mucho la productividad, aunque parezca poco muchas veces escribímos las mismas lineas una y otra vez durante el día y la idea es tratar de optimizar todo el tiempo posible. Es importante notar que los archivos dots son usados globalmente, es decir, los creas en tu carpeta raiz pero una vez que están dentro de tu sesión de bash los puedes usar en el directorio que quieras, no hay que hacer una configuración extra.