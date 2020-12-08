---
date: 2018-05-17
published: true
title: Configurando ambiente de desarrollo para Mac sin MAMP
slug: /configurando-ambiente-de-desarrollo-para-mac-sin-mamp/
---

## Configuración del ambiente de desarrollo web para mac sin usar MAMP.
Guía sencilla de cómo instalar un ambiente de desarrollo en MAC sin tener que usar algún servicio externo.

<div class="mb-10 text-base bg-gray-100 p-2 leading-relaxed">
    Este post fue publicado originalmente el <strong>21 de Septiembre de 2014</strong>, hace ya casi 4 años, mucho ha cambiado desde ese momento, así que ha sido actualizado para reflejar esos cambios. Trataré de actualizarlo regularmente. Última actualización <strong>14 de Mayo de 2018</strong>
</div>

Hace unas semanas decidí formatear mi computadora (iMac) dado que ya estaba muy cargada y se estaba estaba colocando muy lenta. Cuando me la compré nunca antes había tenido una Mac así que no estaba configurada de la mejor manera posible, una de las primeras cosas que hice fue instalar MAMP, la ventaja de MAMP es que no tienes que hacer nada de configuración, en un solo paquete trae PHP, MySQL así como PhpMyAdmin para poder administrar las bases de datos y te tiene el ambiente de desarrollo por separado, deja las herramientas del sistema sin tocar.  

Pero igual para configurar el ambiente como a mi me gusta, con hosts virtuales tenía que configurar archivos de sistema, además de esta manera puedo tener siempre mi ambiente de desarrollo activo sin depender de una aplicación. Pero creo que la razón por la cual decidí hacerlo es que muchas herramientas funcionan más fácilmente, yo uso mucho `wp-cli` para WordPress y configurarlo con MAMP es muy laborioso muchas veces, homebrew también me dio problema una vez, porque siempre buscaban las copias del sistema entonces tenía que vivir cambiando el PATH de mis directorios. Así que cuando formatee decidí probar y usar los de sistema, aquí la explicación de como lo hice.

Mac trae por defecto instalado `PHP` y aunque ya no trae `MySQL` instalado es *súper fácil* instalarlo.

### Aclaratoria

**Si no te sientes cómodo modificando archivos de sistema y apenas estás aprendiendo te recomiendo usar [MAMP][1].**

### Preparación

Antes de comenzar vamos a necesitar un par de aplicaciones, la primera es un editor de texto, yo subo para programar *Sublime Text* que es un excelente editor de texto y funciona a la perfección para lo que vamos a necesitar, sin embargo se puede usar VIM o nano o realmente cualquier otro programa de edición de texto que se use para programar. También vamos a necesitar la Terminal, recomiendo no usar la terminal.app que trae el sistema, en lugar instalar [iterm2][2] que es mucho más completo.

## PHP

Vamos a comenzar con PHP. Como dije arriba, ya una versión de PHP viene instalada en el sistema por defecto. Podemos revisar que efectivamente esté instalada corriendo el siguiente código para ver donde se encuentra

```bash
which php
```

Y para confirmar que versión tenemos instalada usamos

```bash
php --version
```

Casi siempre la versión que viene instalada es una versión más antigua a la actual, pero funciona igual perfectamente. Después copiamos el archivo php.ini que trae por defecto el sistema.

```bash
sudo cp /etc/php.ini.default /etc/php.ini
```

Aquí puedes configurar cosas de PHP, como por ejemplo, aumentar la memoria que trae por defecto.

## Apache

Apache también viene instalado con el sistema, la raiz de nuestro servidor local está por defecto en la siguiente dirección:

```bash
/Library/WebServer/
```

La raiz se puede modificar si quieres, más adelante también explico como se hace en caso de que quieras hacerlo. Los tres comandos de Apache que necesitas saber son

###### Iniciar Apache

```bash
sudo apachectl start
```

###### Reiniciar Apache

```bash
sudo apachectl restart
```

###### Detener apache

```bash
sudo apachectl stop
```

Si iniciamos apache y entramos desde nuestro navegador a `http://localhost` deberíamos ver *It works!* o *Funciona* dependiendo del idioma del sistema.

Debemos hacer algunas configuraciones extras de Apache, debemos editar este archivo, yo uso Sublime para editar estos archivos

```bash
/private/etc/apache2/httpd.conf
```

Y ahí buscamos la linea

```bash
LoadModule php7_module       libexec/apache2/libphp7.so
```

Y le quitamos el # que tiene delante para descomentarla. Con esto ya tenemos PHP corriendo.

## Cambiando la ruta de nuestra carpeta base
Como mencioné anteriormente, la carpeta por defecto de apache es `/Library/WebServer/` pero a mi no me gusta usar esa carpeta, prefiero tener una carpeta dentro de mi `~/` de usuario, casi siempre la llamo `Code`. Vamos a cambiar esta carpeta y modificar un par de cosas para que funcione sin problema.

En nuestro archivo `httpd.conf` que modificamos anteriormente, buscamos `DocumentRoot` y vamos a encontrar esto

```bash
DocumentRoot "/Library/WebServer"
<Directory "/Library/WebServer">
    ....
</Directory>
```
Aquí debemos modificar esas dos lineas para actualizar nuestra ruta

```bash
DocumentRoot "/NUEVARUTA"
<Directory "/NUEVARUTA">
```

Después debemos modificar el usuario y grupo por defecto que usamos para correr httpd, es posible que sean diferentes en tu sistema pero yo veo lo siguiente.
```bash
User _www
Group _www
```

Si dejamos esto tendrémos problema de permisos al tratar de correr nuestro código, pueden crear un usuario y un grupo dedicado pero yo coloco mi usuario y el grupo al que pertenezco `staff`

Así que quedan así

```bash
User saulsolorzano
Group staff
```

Una vez que hacemos esto debemos reiniciar nuestro servicio corriendo 

```bash
sudo apachectl restart
```


## Homebrew

Homebrew es una herramienta excelente que nos ayuda a instalar muchas cosas con unos simples comandos, como lo dice la misma página web es **El gestor de paquetes para OS X que faltaba**

Para instalarlo copia el siguiente código en la terminal

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Esta linea instala homebrew, dependiendo de tu conexión puede tardar un poco , una vez que termine corre `Brew Doctor` para verificar que todo esté bien, si es así te dirá

```bash
$ brew doctor
Your system is ready to brew.
```

## MySQL

Ahora que ya tenemos homebrew instalar MySQL es tan simple como copiar

```bash
brew install mysql
```

Y empezará a instalar MySQL, una vez que termine verificamos con

```bash
mysql --version
```

Ahora algunos comandos de MySQL que necesitas:

###### Iniciar MySQL, este es el comando que debes usar cada vez que quieras usar MySQL, sino te dará error.

```bash
mysql.server start
```

###### Reiniciar MySQL

```bash
mysql.server restart
```

###### Detener MySQL

```bash
mysql.server stop
```

Como vemos son los mismos que usamos en PHP, así que no hay perdida. Ahora vamos a configurar algunas cosas, MySQL no trae clave por defecto pero es recomendado colocarle una clave. Cambiando *CLAVE* por la clave que deseas colocar

```bash
cd /usr/local/share/mysql
mysqladmin -u root password 'CLAVE'
```

Por último vamos a mover el archivo mysql.sock dado que algunos programas esperan encontrarlo en /var y no está ahí por defecto, entre ellos wp-cli. Primero creamos la carpeta

```bash
sudo mkdir /var/mysql
```

Y después copiamos el archivo

```bash
sudo ln -s /tmp/mysql.sock /var/mysql/mysql.sock
```

## Administrar la Base de datos

Usando homebrew se puede instalar PHPMyAdmin para administrar la base de datos, sin embargo recomiendo fuertemente descargar [Sequel Pro][3], es un administrador para Mac de base de datos y es, por mucho, la mejor aplicación para el trabajo. Ademas tiene la habilidad de conectarse a base de datos remotas lo que lo hace una herramienta muy poderosa. Como es el que uso y no tengo instalado PHPMyAdmin no daré las instrucciones.

## Conclusión

Eso es todo lo que necesitamos para tener un ambiente de desarrollo local sin la necesidad de instalar MAMP, ya tengo varias semanas usándolo y no he tenido ningún problema, si, es un poco más de trabajo que instalar MAMP pero tampoco es mucho.

 [1]: http://www.mamp.info/en/
 [2]: http://iterm2.com/
 [3]: http://www.sequelpro.com/
