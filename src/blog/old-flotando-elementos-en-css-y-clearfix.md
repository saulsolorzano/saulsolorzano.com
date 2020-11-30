---
title: "Flotando elementos en CSS y la magia de “Clearfix”"
date: 2018-10-14
draft: true
type: "post"
---
Este es un artículo que escribí hace 7 años ya, cuando la mejor manera de hacer un layout era con floats y clearfix, muchas cosas han cambiado desde entonces, sin embargo, quiero empezar a escribir más sobre CSS y también sobre cosas básicas de CSS y aún hay muchos sitios que usan floats para layout y aunque no se use para eso los floats tienen mucho uso aún, así como también es bueno saber que es el famosos clearfix si lo vemos en algún lado. El artículo lo dejé exactamente igual a como lo escribí en ese momento.

***

Este fue un tema que me costó bastante cuando estaba empezando y una vez que lo entiendes es tan fácil que hasta te sientes mal de haberlo dudado desde el principio.

Seguramente cuando están leyendo tutoriales y foros en internet se encuentran con que muchas personas les dicen “flota ese elemento y listo” o ustedes mismos flotan un elemento y la página parece que se “rompiera”, todo se mueve de lugar y uno se queda sin respuesta de cómo acomodarlo. También seguramente han visto más de una vez por ahí el “clearfix”, vamos a tratar de cubrir ambas cosas en este post dado que tienen mucha relación entre ellas, si se me olvida algo es porque seguramente no lo uso casi nunca entonces ni pendiente.

## ¿Qué es flotar?

Flotar es una propiedad de posicionamiento en CSS. Podemos ver ejemplo casi a diario en la web y en el diseño impreso, lo usamos en nuestros programas de procesamiento de texto como Word, se conoce como “envolver el texto” alrededor de la imagen.

![Ejemplo de texto que flota alrededor de una imagen](/uploads/print1.jpg)

Si no se usa esta propiedad el texto ignorará a la imagen y la “fluidez” del artículo se romperá. En diseño web se puede lograr el mismo efecto, usando esta propiedad:

![Ahora vemos un ejemplo de de cuando no flotamos la imagen](/uploads/web.jpg)

Si en nuestro CSS le colocamos la propiedad de float a un elemento el efecto será exactamente igual a cuando lo hacemos en Word o cualquiera de estos programas, los elementos flotados siguen formando parte de la fluidez del contenido, esto en referencia a los elementos de la página que son posicionados absoluta o relativamente, de esa manera se eliminando del flujo de contenido.

Para flotar un elemento simplemente colocamos esta propiedad:

```css
img {
    float: left;
}
```

Hay 4 posibles valores para esta propiedad. Left (Izquierda) y Right (Derecha) que flota los elementos a esas respectivas direcciones, none (ninguno) que es la propiedad que los elementos tienen por defecto y inherit (Heredar) que como ya sabemos lo que hace es heredar la propiedad de su elemento padre.

## ¿Para que usamos este elemento?
Bueno flotar elementos se usa mayormente para la maquetación, imagina que tienes esta estructura comúnmente usada:

![Diagramación web](/uploads/mockup.png)

Usaríamos los elementos flotados para hacer que la maquetación funcionara sin problemas, en vez de estar usando posicionamientos absolutos infinitos que realmente no funcionan bien.

## Usando el elemento Clear
El elemento CSS Clear o “despejar” va de la mano con el elemento de float, un elemento con la propiedad de clear no se moverá al lado derecho o izquierdo del elemento flotado sino que se posicionará debajo de este, ver el ejemplo:

![mockup-sinclear.png](/uploads/mockup-sinclear.png)

Probablemente en este punto es cuando empieces a golpearte contra la mesa y a usar “soluciones” como margin-top y position: absolute; y lanzas a pegar el valor del top para ver cómo queda, la solución realmente es bastante sencilla, simplemente al pie de página se le coloca el elemento de clear de esta manera:

```css
#footer {
    clear: both;
}
```

![mockup-conclear.png](/uploads/mockup-conclear.png)

La propiedad clear también tiene cuatro posibles valores. Both es el más usado, despejas el float que venga de cualquier dirección. Left (Izquierda) y Right (Derecha) son usados para despejar el flote solo de una dirección. None es el que traen todos los elementos por defecto.

Despejar usando a la derecha o izquierda es poco común pero se ve a veces.

## Elementos “sin” altura

Cuando el elemento padre no tiene ninguna especie de despejo y los elementos hijos están flotados los navegadores por defecto ponen el valor de height (Altura) en 0, esto es un problema muy común en los menús donde todos los elementos flotan y en las maquetaciones también pasa. Esto suele ser también bastante frustrante y de verdad al principio uno no lo nota, la única manera de notarlo es si el elemento padre tiene algún elemento visual que te haga ver el problema, como un color de fondo.

En este ejemplo que es la manera más común de hacer un menú ahora el truco simple de clear:both; no funciona, la única manera de arreglar esto es despejando el elemento después que los elementos flotados en el elemento padre pero antes que este cierre. Tranquilos a mí también me cuesta bastante entender esto. Por suerte para estos casos también hay una solución sencilla.

![noheight.png](/uploads/noheight.png)

Este menú tiene el siguiente código:

```html
<ul>
    <li><a href="#">Inicio</a></li>
    <li><a href="#">Nosotros</a></li>
    <li><a href="#">Servicios</a></li>
    <li><a href="#">Contácto</a></li>
</ul>
```

Y el CSS sería algo así:

```css
ul {
    list-style: none;
    background: blue;
}
ul li {
    float: left;
    margin: 10px;
}
```

Obviamente me estoy saltando todos los demás estilos, solo coloco lo importante para este tutorial. En este código el fondo azul no se verá.

Hay varias técnicas que se pueden usar aquí pero solo cubriré una ya que es la más eficiente de todas y es la única que yo utilizo, no tengo mucha experiencia con las demás. La empecé a usar hace mucho pero cuando salió el [HTML5 Boilerplate](https://html5boilerplate.com/) comenzé a usar el de ellos que es el más completo que he visto.

## El método simple de despejo

Este usa los seudo selectores `:after` y `:before` para despejar los floats y en vez de copiarla y pegarla con cada elemento recomiendo crear una clase llamada <kbd>clearfix</kbd> y usarla siempre que se quiera despejar un elemento, el código sería este:

```css
.clearfix:before, .clearfix:after {
    content: '';
    display: table;
}
.clearfix:after {
    clear: both;
}
```

Simplemente colóquenla en su hoja de estilo y se la colocan a los elementos que la necesiten, de esta manera:

```html
<ul class="clearfix">
    <li><a href="#">Inicio</a></li>
    <li><a href="#">Nosotros</a></li>
    <li><a href="#">Servicios</a></li>
    <li><a href="#">Contácto</a></li>
</ul>
```

Y listo, como si fuese magia el fondo se ve y no hay más problemas.

## Conclusión

Como hemos visto manejar bien el flote de elemento es necesario para tu desarrollo como diseñador web, pero siempre hay que estar muy pendiente siempre de cuando se usa dado que se puede dañar la maquetación si no se sabe lo que está haciendo, claro igual después puedes hacer crtl+z y nunca paso nada pero nunca está demás estar pendiente.

¡Si hay alguna duda nos vemos en los comentarios!

## Tags