---
title: "Data Layer"
date: 2018-09-21
draft: true
type: "post"
---
Esta será una explicación sencilla y breve del data layer (capa de datos en español)  y el `dataLayer` que siempre se escucha cuando se habla de Google Tag Manager.

Cuando estamos [empezando](https://medium.com/@saulsolorzano/primeros-pasos-en-google-tag-manager-una-gu%C3%ADa-de-principiantes-e5161a3add62) a aprender a usar Google Tag Manager vemos este concepto por todos lados y puede llegar a confundir mucho. ¿Es algo que solo deben ver los programadores? ¿Debo saber como funciona? Trataré de explicar las dos partes de la ecuación

El Data Layer, en su concepto más sencillo y como su nombre lo indica es una capa a la cual le "pasamos" datos de nuestra aplicación, sitio web o lo que estemos midiendo, puede ser transacciones en nuestro ecommerce, veces que alguien le dio click a un botón, cualquier tipo de dato que queramos medir.

Estos datos después pasan del Data Layer a **Google Tag Manager**. Para que un Data Layer tenga éxito debe tener dos componentes.

## Planificación

La primera parte fundamental para la implementación del Data Layer, y en general de neustra estrategia de medición es una buena planificación, la cual nos ayuda a mantenernos organizados.

Debemos responder las siguientes preguntas: ¿Que datos queremos medir? ¿En que interacción puedo medir esos datos? Y la más importante de todo ¿Porque quiero medir estos datos? ¿Para qué me servirá esta información?

Después de saber que queremos medir debemos decidir la estructura con la cual enviaremos los datos, cual será el nombre de nuestras variables, porque estas variables después se usarán en el código.


## Código
El Data Layer se programa en `JavaScript`, la ventaja de usarlo es que no tenemos nuestras variables regadas por todo nuestro código sino que tenemos todo lo más ordenado posible. El `dataLayer` es un `Array` de JavaScript donde haremos <kbd>push</kbd> de nuestros datos.

### Estructura del `dataLayer`

```javascript
dataLayer = [];
```

Por ejemplo si queremos enviar el evento cuando alguien le da click al un botón para abrir un lightbox el código quedaría de la siguiente manera:

```javascript
dataLayer.push({
    'event': 'lightbox',
    'eventCategory': 'Lightbox',
    'eventAction': 'abrir_contacto',
    'eventLabel': 'top'
});
```

Todos los datos que estamos pasando deben estar definidos de antemano en nuestro paso de **Planificación**, de esta manera la implementación es lo más eficiente posible.

El `dayaLayer` lo usaremos siempre que queramos enviar datos de nuestro sitio hacia Tag Manager

En los siguientes artículos empezaré a hacer más uso del `dataLayer` para medición del sitio.