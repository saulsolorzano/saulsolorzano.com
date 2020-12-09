---
published: true
date: 2016-02-05
description: "Los mapas de sass fueron introducidos en la versión 3.3. No deben ser confundidos con los mapas de fuente que se usan para mapear tu css con tus archivos .scss o cualquier otro lenguaje que uses de preprocesador."
title: Trabajando con mapas de sass
type: "post"
---

Los mapas de sass fueron introducidos en la versión 3.3. No deben ser confundidos con los mapas de fuente que se usan para mapear tu css con tus archivos .scss o cualquier otro lenguaje que uses de preprocesador.

Si has usado algún lenguaje de programación como JavaSript, PHP o cualquier otro, lo más probable es que estés familiarizado con el concepto de arrays. Los mapas de sass usan la misma lógica, te permite agrupar llaves y valor dentro de un objeto. Una vez que tengas creado el mapa puedes hacer un loop por él para optener los valores que necesitas.

Un mapa sass se ve de la siguiente manera:

```scss

// Declaramos nuestro mapa
$mapa: (
    llave1: valor1,
    llave2: valor2,
    llave3: valor3,
    llave4: valor4
);

// podemos correr un loop para sacar los valores necesarios
@each $llave, $valor in $mapa {
    .elemento--#{$llave} {
        color: $valor;
    }
}

```

Uno de los usos más comunes que le doy a los mapas de sass es para una sección de redes sociales donde tienes los colores de por ejemplo 4 redes sociales.

```scss
// Declaramos nuestro mapa con los valores de las 4 redes que queremos usar
$redes: (
	twitter: #51aff8,
	facebook: #2956a3,
	linkedin: #0076b8,
	youtube: #ce1312
);
```

Ahora podemos usar un loop para crear clases y colocar los estilos correspondientes

```scss
@each $red, $color in $redes {
    .red--#{$red} {
        background: $color;
        &:hover {
            background: white;
            .red__nombre {
                color: $color;
            }
        }
    }
}
```

Como pueden ver usamos la [interpolación](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#interpolation_) `#{}` que se debe usar cuando quieres crear un nombre de selector o propiedad y después colocamos un color de fondo y cuando se le haga `hover` al elemento el nombre de la red se cambiará al color de la misma. Este código generará el siguiente css

```css
.red--twitter {
    background: #51aff8;
}
.red--twitter:hover {
    background: white;
}
.red--twitter:hover .red__nombre {
    color: #51aff8;
}

.red--facebook {
    background: #2956a3;
}
.red--facebook:hover {
    background: white;
}
.red--facebook:hover .red__nombre {
    color: #2956a3;
}

.red--linkedin {
    background: #0076b8;
}
.red--linkedin:hover {
    background: white;
}
.red--linkedin:hover .red__nombre {
    color: #0076b8;
}

.red--youtube {
    background: #ce1312;
}
.red--youtube:hover {
    background: white;
}
.red--youtube:hover .red__nombre {
    color: #ce1312;
}
```

Una cosa con la que debemos tener mucho cuidado con los mapas de sass y loops en general (como en todos los lenguajes) es que es fácil generar mucho código si no nos damos cuenda de lo que estamos haciendo. Por eso es bueno que mientras se aprenda a usar los mapas siempre se revise el `css` que se genera para poder estar seguros que no generamos demasiado código extra.

Si el día de mañana tenemos que agregar instagram a nuestro diseño simplemente lo agregamos a nuestro mapa y se crearán las clases correspondientes.

Importante tomar en cuenta la primera linea de nuestro `@each`

```scss
@each $red, $color in $redes
```

Expliquemosla por partes.

* `@each` es el operador de sass que nos permite hacer loop por los valores. Puede ser usado en otras situaciones aparte de los mapas de sass.
* `$red, $color` Estos son la llave y el valor de cada elemento de nuestro mapa. Por semántica coloqué "red" y "color" pero de verdad se puede colocar lo que uno quiera. `@each $hola, adios in $redes` funcionaría igual. Lo único que hay que tener en cuenta es que el que va de primero representa la llave y el segundo representa el valor.
* `$redes` Este es el nombre de nuestro mapa.



## Acceder a los datos
User un loop es probablemente la manera más popular de usar los mapas, pero no es la única. `SASS` entrega la función `map-get($mapa, $llave)` para poder acceder a los datos dentro de un mapa.

Supongamos que tenemos que usar el color de twitter en algún otro lado de nuestra página, pero sólo ese valor, la manera que lo haríamos sería la siguiente.

```scss
.twitter {
    color: map-get($redes, twitter);
}
```

Y este código generará

```css
.twitter {
    color: #51aff8;
}
```

Como podemos ver los mapas de sass nos hacen la vida más fácil cuando nos encontramos con datos que estaremos repitiendo frecuentemente.
