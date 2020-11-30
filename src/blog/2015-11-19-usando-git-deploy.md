---
author: Saúl Solórzano
categories:
- Git
date: "2015-11-19T00:00:00Z"
descripcion:
- Como usar git para hacer deploy de nuestro sitio a producción de manera instantanea.
meta_description: Como usar git para hacer deploy de nuestro sitio a producción de
  manera instantanea.
title: Usando git para hacer deploy de nuestro código
url: usando-git-deploy/
type: "post"
---

Aunque existen servicios para hacer deploy automático de nuestro código a los servidores, como por ejemplo [deploybot](http://deploybot.com) estos servicios suelen ser pagos y si tienes solo pocos proyectos es realmente innecesario.

En lugar de hacer subir los archivos usando `FTP` o haciendo `git clone` directamente en el servidor, que es fastidioso porque implica que cada vez que hagas un `commit` tienes que estar logeado en el servidor para poder hacer pull.

Si tenemos acceso por `SSH` a nuestro servidor una manera cómoda como podemos hacer deploy es usando los hooks de git. Ya hablé [anteriormente](http://www.reactor.cl/usando-git-hooks-y-wp-cli-para-sincronizar-bases-de-datos-de-wordpress/) de la comodidad de usar los hooks.

Lo primero que tenemos que hacer es crear una carpeta en nuestro servidor donde guardaremos los repositorios. Yo creé la carpeta `/repos/` en `/var/repos/`

Dentro de esta carpeta crearemos repositorios vacios a los cuales les podremos hacer push desde nuestro servidor local. Para tener un orden es bueno crear cada repositorio dentro de su propia carpeta.

```bash
cd /var/repos/
mkdir proyecto.git
```
Una vez creado ejecutamos el comando `git init --bare` estando dentro de la carpeta que acabamos de crear

Nos va a crear una repositorio vacio, por eso pasamos la bandera `--bare`.

A este repositorio le haremos push. Ahora debemos crear un script que se encagará de mover nuestros archivos luego que hagamos nuestro push. Lo primero que debemos hacer es entrar a la carpeta `hooks`.
La carpeta está llena de **Hooks** que corren cuando ciertas cosas pasan. El que vamos a utilizar es `post-receive` que como su nombre lo indica en inglés es el que se ejecuta luego de recibir el push, si no está creado el archivo lo creamos.

```bash
touch post-receive
chmod +x post-receive
```
La última linea es para cambiarle hacer el archivo ejecutable. Lo siguiente que debemos hacer es abrir el archivo y copiar nuestro código

```bash
#!/bin/bash
git --work-tree=/ruta/a/donde/quieres/que/tu/codigo/se/copie --git-dir=/var/repos/proyecto.git checkout -f
```

Entonces esté código se ejecutará cada vez que se reciba y acepte un push. El script tomará nuestro código y lo moverá a donde le indiquemos.

## Localhost

Ahora en nuestro localhost debemos agregar la ruta remota de nuestro repositorio para poder hacerle push. Lo hacemos ejecutando el mismo código que usamos para bitbucket o github.

```bash
git remote add dev ssh://usuario@servidor/var/repos/proyecto.git
```

Le coloqué como nombre remoto "dev" pero podemos llamarlo como querramos, yo normalmente le pongo el nombre del servidor para que se me sea más fácil de recordar.

Si usas un puerto para acceder por `SSH` lo puedes colocar de la siguiente manera

```bash
git remote add dev ssh://usuario@servidor:PUERTO/var/repos/proyecto.git
```

Ahora puedes hacer `git push dev master` y hará push al servidor y moverá el código. Esto funciona mucho más eficiente si tienes configuradas tus llaves públicas en el servidor para que puedas logearte sin tener que colocar la clave.

## Cambio de branch

Ahora supongamos que el branch `master` es el que dejas para el código que ya está listo para producción, como debería de ser. Trabajas en otro branch y una vez que el códgo está listo te cambias a master y haces el `merge`. Si es así y el servidor al que estás haciendo push es un servidor de desarrollo mezclarías tu flujo de trabajo haciendo siempre merge de código que no está listo para producción. La manera más sencilla de esto es cambiar el branch con el cual hacemos push. Supongaos que trabajamos con el branch `develop` y una vez que esté listo nos vemos a master.

Esto lo hacemos en nuestro servidor. Debemos ir a la carpeta de nuestro repositorio que creamos anteriormente

```bash
cd /var/repos/proyecto.git/
git symbolic-ref HEAD refs/heads/develop
```
Ahora desde nuestro repositorio normal podemos hacer

```bash
git push dev develop
```
Y ahora se hace nuestro push del trabajo que tenemos en el branch `develop`.

## Limpiando un poco

Muchas veces tenemos en nuestro repositorio archivos que son solo de desarrollo. Por ejemplo, yo uso `sass` que es un pre-procesador de css entonces tengo siempre una carpeta **scss** en mi repositorio donde están todos mis archivos `.scss` pero esta carpeta es innecesaria en producción. Ya que nuestro hook lo que está ejecutando esta corriendo en bash podemos escribir los comandos normales que usamos para eliminar carpetas archivos.

Podríamos copiarla siguiente linea:

```bash
rm -r /ruta/a/donde/quieres/que/tu/codigo/se/copie/scss/
```

Debajo de nuestro script. Entonces junto todo quedaría así:

```bash
#!/bin/bash
git --work-tree=/ruta/a/donde/quieres/que/tu/codigo/se/copie --git-dir=/var/repos/proyecto.git checkout -f
rm -r /ruta/a/donde/quieres/que/tu/codigo/se/copie/scss/
```
Así podemos copiar cuantos archivos o carpetas quedamos y una vez que se haga la copia de archivos se eliminan los que no son necesarios.

Capaz haya una manera más elegante de hacer esto pero así me ha funcionado hasta el momento.