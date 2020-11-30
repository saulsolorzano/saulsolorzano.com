---
title: "Aprendiendo Tag Manager"
date: 2018-09-05
draft: true
type: "post"
---

Desde hace unos meses empecé a trabajar en una nueva agencia, [Dive](http://dive.cl/). Hay muchas cosas que me gustan de mi nuevo trabajo, pero una de las que más me gusta es que tiene un equipo de medios y métricas. Medir el desempeño de un sitio web es súper importante pero muchas veces se deja de último y es algo que siempre me ha gustado, se usar modestamente Google Analytics pero hasta ahora no había tenido mucha experiencia en tag manager.

Siempre he tratado de advocar por el uso de los data en nuestra toma de decisiones a la hora de hacer un rediseño o meses después de un rediseño para medir el desempeño del mismo.

Gracias a uno de mis jefes, Alejandro Zahler, he podido aprender más de tag manager.

## ¿Que es Google Tag Manager?

Debo confesar que hace unos años cuando empecé a escuchar Tag Manager lo primero que dije fue "Ah? Pero si existe Analytics, para que crearon dos formas de hacer lo mismo?" Y la verdad esa impresión la tuve hasta hace no mucho.

La realidad es bastante diferente, tienen funciones en común pero se complementan de manera perfecta.

Una de las ventajas que tiene Tag Manager sobre analytics es que tradicionalmente para "tagear" o marcar un sitio con Analytics hay que crear los eventos directamente en el código. Si quieres medir cuando se le da click a un botón

```
ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
```

Lo cual no es el fin del mundo, pero para una persona que quiere usar Analytics y no sabe programar o no puede tocar el código de la página te hace dependiente del programador para hacer cualquier cambio.

Con Tag Manager se puede hacer un tageo sin tener que tocar el código. Aunque cabe destacar que igual si quieres marcar un sitio de esa manera con Tag manager se puede hacer.

Tiene muchas más funcionalidades, por ejemplo, con tag manager puedes insertar el pixel de FB, el Tag de Analytics, puedes modificar elementos del sitio, cambiar valores.

## Primeros pasos con Tag Manager
Lo primero que debemos hacer es ir a la página de [Tag Manager](https://tagmanager.google.com/) y si ya estamos logeados con nuestra cuenta de google vamos a ver un tablero vacío, le damos al botón de crear nueva cuenta que está arriba a la derecha. Una vez damos click nos preguntará información básica, debemos colocar el nombre de la cuenta y el país. Y después nos preguntará el nombre del contenedor ya que podemos tener muchos contenedores en cada cuenta y por último donde se usa el contenedor.

![Creando cuenta tag manager](/uploads/tag-manager-1.png)

Una vez llenamos todo, nos mostrará el código que debemos colocar en nuestro sitio con instrucciones de donde debe ir.

![Tag](/uploads/tag-manager-2.png)

Al principio cuesta un poco entender como funciona Tag Manager, pero después se vuelve bastante lógico. Vamos por parte, una vez que cerramos la ventana de nuestro código (y hemos insertado el código donde nos indican) veremos esto:

![Dashboard](/uploads/tag-manager-3.png)

En la parte superior vemos la información del contenedor que estamos y la opción de movernos a diferentes contenedores, cuentas. A la derecha vemos el ID del contenedor, después nos indica cuantos cambios hemos hecho, el botón de preview y por último el botón de submit.

En el menú de la izquierda vemos la opción de cambiarte entre los distintos workspaces, y abajo vemos el Overview o tablero que es donde nos encontramos en este momento, después los tags, triggers, variables y folders. Vamos a explicar que podemos hacer en cada una de estas pestañas.

## Enteniendo como funciona Tag Manager

### Tags
Aquí es donde estarán todos los tag, podemos crear cuantos tags queramos para cuantos propósitos queramos, además de todos los que provee Google hay posibilidad de agregar alguno personalizado o conectar con servicios de terceros que son muchos.

### Triggers

Aquí vamos a configurar todas las acciones que pueden disparar alguno de nuestros tags, cuando entramos vemos la misma interfaz que vemos en Tags cuando está vacía, si creamos uno nuevo nos da la opción de agregar un nombre y la configuración del mismo.

![Triggers](/uploads/tag-manager-16.png) 

Hay muchos tipos de triggers, desde el `page view` que es muy útil porque podemos configurarlo para que se dispare en páginas que cumplan ciertos criterios.

![Page view trigger](/uploads/tag-manager-17.png) 

También están los de clicks que se pueden configurar de manera muy similar al de `page views`

Si ninguno de los predeterminados nos acomoda podemos hacer scroll hasta el final de la lista y vamos a ver `Custom events`, este lo usaremos mucho cuando queremos hacer tags más avanzados que requieren funciones de `JavaScript`

### Variables
Los que programamos estamos familiarizados con el concepto de `variable`. Una variable es la forma de guardar un valor que utilizaremos muchas veces en nuestra aplicación. La utilidad se ve rápidamente, si colocamos un valor directamente en nuestra aplicación y lo repetimos 5 veces y después debemos cambiar este valor tendríamos que pasar por 5 lugares a cambiarlo; Si colocamos ese valor en una variable, solo debemos cambiarlo una vez.

En Tag Manager hay dos tipos de variables: las que están preconfiguradas y las definidas por el usuario. De las preconfiguradas podemos ver que hay 5 ya activas.

![Variables overview](/uploads/tag-manager-18.png) 

Estas las podemos ver cuando estamos configurando los triggers, nos dan información útil.

Debajo podemos ver las definidas por el usuario. Cuando le damos click para agregar una nueva podemos ver el panel familiar que se abre. Existen muchos tipos de variables que podemos definir pero una de las más usadas será `Data Layer Variable`. Más adelante hablaremos un poco más del [Data Layer](#data-layer)

### Folders

Las carpetas son para mantener ordenado nuestro contenedor, si se fijan, cada vez que creamos un tag, trigger o variable, al lado del campo donde agregamos el nombre del mismo podemos ver el ícono de carpeta, si le damos click nos mostrará las carpetas que existen y la opción de crear una nueva carpeta en caso de que queramos.

Si no hacemos esto cuando estemos creando el elemento no importa, podemos ir a la pestaña de carpetas y nos mostrará todas las carpetas que ya existen así como todos los elementos que no estén asignados a una carpeta.

Obviamente no es obligatorio hacer uso de las carpetas, pero ayuda mucho a mantener el orden.

***

## Creando nuestro primer Tag

Obviamente la creación de tags es lo más importante (**tag** manager), puedes crear una cantidad ilimitada y puedes usar clones de un tag para distintos propósitos, podemos tener un tag para medir los formularios y otro tag para los lightbox. Vamos a crear el más básico de todos, el tag básico de Analytics.

![Crear tag](/uploads/tag-manager-4.png)

Le damos click a Nuevo y nos abre un panel donde debemos completar la información del tag.

![Nuevo tag](/uploads/tag-manager-5.png)

#### Nombre del tag
El nombre del tag es muy importante, es bueno usar algún tipo de prefijo que nos ayude a ubicarnos después, capaz parece innecesario, pero incluso para un sitio relativamente chico podemos llegar a tener más de 10 tags, con el prefijo se ordenarán de manera más coherente. Nuestro tag se llamará `GA - Universal Tag`. El prefijo `GA` es porque es de Google Analytics.

Le damos click a la primera caja para agregar una configuración del tag. Se nos va a desplegar otro panel (todo es panel aquí) donde vamos a ver la lista de todos los tags disponibles, el primero es el de Universal Analytics, abajo los de AdWords, Optimize, más abajo aún los personalizados y por último vemos todos los que son de aplicaciones de terceros que están integradas.

![Universal Analytics](/uploads/tag-manager-5.png)

Vamos a seleccionar el primero, Google Analytics - Universal Analytics

![Seleccionar panel](/uploads/tag-manager-6.png)

Una vez seleccionado debemos llenar dos opciones, la primera es `Track Type`, si has usado Analytics anteriormente, sabes que este es el tipo de tracking por defecto y es el que nos da la información que estamos acostumbrados a leer en analytics, así que lo dejaremos así. La siguiente opción es la configuración del tag y fíjense que nos dice "Selecciona una variable de configuración...", en estos momentos no tenemos ninguna así que escogamos **New variable**.

![Configurando Tag Analytics](/uploads/tag-manager-7.png)

Se abrirá otro panel (obvio).

![Nueva variable](/uploads/tag-manager-8.png)

Vamos a colocar los siguientes datos: Como nombre `GAS - GA Hits Standard` y en Tracking ID debemos colocar el de Google Analytics, el clásico `UA-XXXXXXXX-X`

![Configuración variable](/uploads/tag-manager-9.png)

Salvamos y volveremos a la pantalla anterior

![Universal Analytics con variable](/uploads/tag-manager-10.png)

Vamos debemos configurar el trigger, la acción que va a provocar que se "dispare" nuestro tag. Cuando le damos click a trigger vamos a ver que hay uno solo configurado.

![Triggers](/uploads/tag-manager-11.png)

Pero ese es el que necesitamos, porque queremos que nuestro tag de analytics se cargue en todas las páginas, lo seleccionamos y nuestro tag debería quedar así:

![Tag listo](/uploads/tag-manager-12.png)

Ya tenemos todo listo así que le damos click arriba a la derecha a "Save" y vamos a ver nuestro tag.

![Lista de tags](/uploads/tag-manager-13.png)

Si vamos a nuestro tablero donde click a "Overview" en el menú de la izquierda vamos a ver todos nuestros cambios

![Dashboard](/uploads/tag-manager-14.png)

***

## ¡¡NO publiques aún!!

La parte más importante es verificar que nuestro tag ha sido **configurado correctamente**, para eso le vamos a dar click al botón **`Preview`** que se encuentra a la izquierda del botón *Submit*.

Una vez que le damos click, la página se refrescará y veremos un mensaje nuevo, indicándonos que el contenedor se encuentra en modo preview, ahora lo que debemos hacer es navegar hasta nuestro sitio web y vamos a ver que se abre un panel nuevo en la parte de abajo de nuestro sitio y si hicimos todo bien vamos a ver el tag que creamos indicándonos que `GA - Universal Tag` se ha cargado.

![Mirando éxito de tag manager](/uploads/tag-manager-15.png)

Si vamos a nuestra cuenta de Analytics vamos a ver que nos muestra información correctamente.

## Buenas prácticas


## Conclusiones
Así que si les interesa les recomiendo darse una vuelta por las certificaciones que da Google.



Para los que programamos se noshace familiar