---
date: 2021-02-22
published: false
description: 'Dándole una actualización merecida a mis archivos dot'
title: Actualizando mis archivos dot
url: actualizando-archivos-dot/
type: 'post'
---

Hola!

Hace casi un poco más de <a href="/usando-archivos-dot-para-aumentar-productividad/">4 años escribí</a> un artículo acerca de los archivos dot y su uso. Desde ese entonces los he actualizado bastante pero realmente he descuidado el repositorio. Mi última actualización fue cua dejé de usar bash y empecé a usar zsh con el framework <a href="https://ohmyz.sh/" target="_blank">oh my zsh</a>.

Hace poco encontré los archivos de <a href="https://github.com/driesvints" target="_blank">@driesvints</a> los cuales son mucho más completos de lo que pude haber imaginado los míos. Y también más completos de lo que necesito.

Así que los voy a actualizar y detallar las cosas que han cambiado.

<img src="https://source.unsplash.com/C7B-ExXpOIE/1600x900" />

## ¿Qué ha cambiado en estos 4 años?

El cambio más grande es la movida de Bash a ZSH. El cambio lo hice ya hace varios años después de leer muchas recomendaciones de la versatilidad de ZSH. Una vez que decidí hacer el cambio me di cuenta que hay muchos frameworks para ZSH. Los más populares son

- [Oh-My-ZSH](https://ohmyz.sh/)
- [Prezto](https://github.com/sorin-ionescu/prezto)

Recuerdo en su momento haber leído que Prezto era un poco más rápido que Oh-My-ZSH pero decidí irme por Oh-my-zsh porque este es un mundo que no conozco mucho y oh-my-zsh es el más popular, lo que implica una comunidad más grande y más posibilidad de solucionar algún problema si surge.

Y aunque estoy seguro que solo uso el 5% del potencial del framework y ZSH como shell, la verdad ha sido un cambio para mejor. Siento que mi productividad sí aumentó y la verdad oh-my-zsh tiene una cantidad ridícula de [plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins) y de [temas](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes).

### ¿Vale la pena el esfuerzo?

Yo diría que sí, yo soy creyente de que mientras más control y conocimiento tengas del sistema que usas, el trabajo se vuelve más fluido. Tener tus archivos dot te permiten controlar más tu ambiente de trabajo y ayuda que todo sea más armonioso. Cosas tan sencillas como que este es uno de mis alias

```bash
alias gti="git"
```

Porque 3 de cada 5 veces que voy a escribir `git` escrito `gti` y en lugar de insultar ahora ni lo noto porque el alias me lo corrige automáticamente.

Hay personas como Dries que llevan sus archivos dot más allá y los usan para instalar una computadora desde cero todo el tiempo, particularmente porque Dries tiende a instalar MacOS desde cero cada vez que hay una versión nueva, entonces suele formatear su computadora más seguido de lo que muchos lo hacen.

### ¿Cómo versionar mis archivos?

Probablemente haya más de dos caminos para esta pregunta, pero yo he encontrado dos. El que encontré primero y adopté hasta esta semana fue el de <a href="https://github.com/mathiasbynens" target="_blank">Mathias Bynens</a>, el cual creo que tiene uno de los archivos dot más grandes de internet, él mismo dice que no usa muchos. Este método consiste en un archivo llamado <a href="https://github.com/mathiasbynens/dotfiles/blob/main/bootstrap.sh" target="_blank">`bootstrap.sh`</a>, <a href="https://github.com/saulsolorzano/dotfiles/blob/main/bootstrap.sh" target="_blank">aquí</a> mi versión traducida por si acaso. Este archivo básicamente copia todos los archivos a la carpeta raíz `~`.

El segundo camino, que encontré hace unos días revisando los dotfiles de Dries es hacer un symlink entre tu `.zshrc` principal y el que está versionado. Igual usa un script de bash para correr todo pero encontré que generar todo con el symlink lo hace mucho más limpio.

Voy a usar una mezcla de los dos para actualizar mis archivos.

<div style="width:100%;height:0;padding-bottom:85%;position:relative;"><iframe src="https://giphy.com/embed/cPKWZB2aaB3rO" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cPKWZB2aaB3rO">via GIPHY</a></p>

La razón es porque a mi me gusta tener versionado mi .gitconfig también y este necesita vivir en la raíz `~`. Así que seguiré usando la idea de Mathias pero mucho más simplificada.

### .zshrc

El primer cambio y más importante es tener versionado mi archivo `.zshrc`. Cuando hice la primera versión de mis archivos dot, nunca pensé que podía actualizar mi archivo principal, en aquél momento `.bashrc`, pero leyendo el `.zshrc` de Dries, es lo más lógico. Me pasaba que siempre que instalaba mis archivos dot en una computadora nueva tenía que hacer mucha configuración después para que funcionara de manera correcta todo.

### ZSH_CUSTOM

Una de las cosas que permite oh-my-zsh es usar una carpeta, la que quieras, donde podrás tener todas tus cosas personalizadas, cosas como temas, plugins, aliases y en general todo lo que sea único para tu configuración. Nosotros usaremos nuestra propia carpeta `.dotfiles` para esta función.

### Aliases y funciones

Primero que nada.

#### ¿Qué es un alias?

Un alias es lo más cómodo para ahorrarte tiempo. Por ejemplo

```bash
alias sites="cd ~/Code"
```

Entonces no importa donde esté en mi sistema, si copio "sites" voy directamente la carpeta donde está todo mi código.

En mi versión original, cuando usaba bash, había creado otros archivos punto adicionales, `.aliases` y `.function`. Pero hay un par de problemas, el primero, como lo comenté arriba, es que mi `.aliases` actual y el que está versionado son muy diferentes y el segundo es que esta no es la manera recomendada de hacer las cosas con `oh-my-zsh`, ahí se recomienda un archivo `aliases.zsh`

Adicionalmente, muchos de mis aliases originales, vienen ya predefinidos con oh-my-zsh

```bash
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias ~="cd ~"
alias -- -="cd -"
```

Así que creé el archivo `aliases.zsh` y simplifiqué y ordené mis [aliases](https://github.com/saulsolorzano/dotfiles/blob/main/aliases.zsh)

Lo interesante de esto es que cualquier archivo en tu carpeta `ZSH_CUSTOM` se carga automáticamente. Yo tengo algunos aliases que son privados, son accesos rápidos por ssh a servidores, por razones obvias, no puedo tener estos versionados de manera pública, así que tengo otro archivo en un repositorio privado con esos alias.

#### Funciones

Adicionalmente con las funciones, estuve leyendo que la manera más recomendada es crear un plugin personalizado con tus funciones. Y crear un plugin de puras funciones es súper sencillo, hay que crear una carpeta `plugins` y ahí otra carpeta con el nombre de tu plugin, en mi caso `custom-functions` y ahí tu archivo `.zsh` con esta nomenclatura `{nombre-plugin}.plugins.zsh`, en mi caso queda `plugins/custom-functions/custom-functions.plugins.zsh`. Esto es una [colección de funciones](https://github.com/saulsolorzano/dotfiles/blob/main/plugins/custom-functions/custom-functions.plugin.zsh) que he recolectado que son súper útiles.

### Atándolo todo junto

El archivo `bootstrap.sh` es el que hace que todo funcione de manera correcta. Es un archivo sencillo

```bash
# Elimina el .zshrc de $HOME (si existe) y crea symlinks
# del .zshrc con el archivo en nuestros .dotfiles
rm -rf $HOME/.zshrc
ln -s $HOME/.dotfiles/.zshrc $HOME/.zshrc
```

Lo primero es apuntar nuestro `~/.zshrc` al de nuestra carpeta.
Después aprovecho e instalo el único plugin de oh-my-zsh que uso

```bash
git clone git@github.com:zsh-users/zsh-autosuggestions.git ~/.dotfiles/plugins/zsh-autosuggestions
```

Después viene la parte de los archivos de Git

```bash
rsync .gitconfig .gitignore -avh --no-perms ~;

# Especificamos a nuestro git el archivo global
git config --global core.excludesfile ~/.gitignore
```

Es importante tomar en cuenta que esta linea sustituye tus archivos actuales `.gitignore` y más importante el `.gitconfig` así que si lo haces con mi repositorio, estará la sección de user mal para ti.

Y por último hay otro archivo bash llamado `private.sh` que es lo último en ejecutarse

```bash
./private.sh
```

Donde clono mi lista de aliases privados que mencioné anteriormente y los muevo de carpeta

### Tema personalizado

Por último, como comenté anteriormente, una de las cosas buenas y atractivas de oh-my-zsh es la cantidad gigante de temas, incluso hay una opción de configuración para colocar el nombre del tema en "Random" y cada vez que cargues una ventana nueva tendrás un nuevo tema.

```bash
ZSH_THEME="random"
```

Yo intenté varios, creo que intenté unos 30 temas y de verdad ninguno me gustaba mucho, uno de los más populares que se llama [Powerlevel10k](https://github.com/romkatv/powerlevel10k) personalmente lo encuentro muy cargado, menos la versión Lean pero igual no me gustan todas las opciones que dan. Muchos te muestras cosas que no son tan útiles para mi.

Así que después de varios meses de probar diferentes temas, decidí hacer uno súper sencillo para mí, además me gusta agregarle iconos. Para que se vea bien hay que tener una tipografía que los soporte. Lo bueno es que casi todas las tipografías populares que son monospace tienen una versión en [nerdfont](https://www.nerdfonts.com/)
