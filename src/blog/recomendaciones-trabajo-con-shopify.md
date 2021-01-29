---
date: 2021-01-26
published: true
title: Recomendaciones para trabajar con temas de Shopify
slug: /recomendaciones-trabajo-con-shopify
description: "Shopify cada vez es más relevante en el mundo del e-commerce, es una herramienta muy poderosa, acá te doy algunas recomendaciones antes de empezar a trabajar que, con suerte, te harán la vida más fácil"
type: "post"
---

<div class="bg-gray-50 w-10/12 m-auto series-index">
	<span class="font-bold m-0 py-2 px-5 block text-blue-700">Desarrollo de temas con Shopify</span>
	<span class="block m-0 py-1 px-5 border-t border-gray-200 font-bold"><a href="/recomendaciones-trabajo-con-shopify" class="current">1. Recomendaciones para trabajar con temas de Shopify</a></span>
	<span class="block m-0 py-1 px-5 border-t border-gray-200 font-bold"><a href="/instalando-theme-kit">2. Instalando Theme Kit</a></span>
	<span class="block m-0 py-1 px-5 border-t border-gray-200 font-bold"><a href="/creando-certificado-seguridad-local">3. Creando certificado de seguridad local</a></span>
	<span class="block m-0 py-1 px-5 border-t border-gray-200 font-bold"><a href="/desarrollo-local-shopify-con-themekit-gulp">4. Usando Gulp para desarrollo local con Shopify</a></span>
</div>

Shopify cada vez se hace más relevante en el mercado actual. En el último Black Friday/Cyber Monday Shopify procesó un total de 5.1 Billones de dólares en ventas, en Chile y el resto de Latinoamérica está un poco más retrasada su adopción pero está avanzando a pasos agigantados. Eso por esto que cada vez es más relevante para nosotros como programadores tener buen base del trabajo en Shopify. Tengo ya un poco más de dos años trabajando activamente con Shopify, casi todos los días toco código de [alguna](https://ankerstore.cl/) de [nuestras]((https://instantstore.cl/)) [tiendas](https://conairstore.cl/).

La idea de esta mini serie es ayudar con el desarrollo, es decir, creación y desarrollo continuo de trabajo con temas de Shopify. Cuando empecé a escribir este artículo estaba enfocado sólamente en la configuración del Gulp pero decidí separarlo en varias partes por dos motivos, primero porque el artículo ya estaba siendo muy largo y por otro lado porque me permitía dar un poco más de contexto en otras áreas, como este que sirve de intruducción.

Lo primero que debemos saber es que es realmente imposible trabajar 100% local con Shopify, ya que nunca se puede "instalar" Shopify localmente. Esto es muy diferente a trabajar con otras herramientas como Laravel, Wordpress o algún framework de JavaScript. Acá dejo algunos consejos antes de tocar código.

## 1. Usar Theme Kit

La manera más cómoda de trabajar con Shopify es usando <a href="https://shopify.github.io/themekit/" target="_blank">Theme Kit</a>. Esto te permitirá tener tu tema local y versionado con github y al mismo tiempo sincronizado con los servidores de Shopify.

Shopify solía mantener una herramienta construída encima de Theme Kit llamada Slate, pero empezando el 2020 decidieron descontinuarla porque se querían "enfocar" en otras prioridades. 

La ventaja que tenía Slate es que tenía un ambiente completo de desarrollo. Con linters, watchers y todo incluído. Una vez que Slate fue descontinuado, tuve que crear toda la funcionalidad, bueno casi toda, usando Gulp.

## 2. Crea una cuenta en Shopify Partners
<a href="https://www.shopify.com/partners" target="_blank">Shopify partners</a> es un programa que ofrece Shopify para agencias y desarrolladores freelance para crear temas y aplicaciones. Una de las ventajas que ofrece es que te permite crear tiendas gratis ilimitadas.

Hay tres maneras de trabajar con un tema de Shopify:

#### Trabajar con el tema en vivo
Debería ser obvio porque es una mala idea, si haces algún cambio se va a ver directamente reflejado a todos los usuarios de tu sitio.

#### Trabajar con un tema duplicado en la tienda principal
Esta es realmente la más cómoda pero no la más flexible, es la más cómoda porque tienes todos los productos, menús de navegación y tema ya configurado, solo debes duplicar el tema que está en vivo y podrás trabajar con este. 

![duplicar-tema](../img/duplicar-tema.png)

¿Porqué digo que no es la opción más flexible? Porque si necesitas cambiar templates, precios de productos o cualquier otra cosa que no sea del tema, sino de Shopify como tal, no podrás porque eso afectará al sitio que esta en vivo.

#### Crearse una cuenta en Shopify Partners y crear tiendas de prueba.

La mejor opción, pero a que toma un poco más de tiempo, es crearse una cuenta en [Shopify Partners](https://www.shopify.com/partners)

¿Porqué Shopify Partners y no una tienda nueva normal? Porque la tiendas reales tienen un máximo de 14 días de pruebas antes de que tengas que pagarla, cuando creas una tienda con Shopify Partners tienes la opción de hacer una tienda solo de prueba que tendrá todas las opciones de una tienda Avanzada y no tiene límite de tiempo.

## 3. Configura tu tienda nueva como la anterior
Tristemente no existe una opción de "exportar tienda" o algo parecido. Hay cosas que sí puedes exportar, lo más cómodo es la habilidad de exportar los productos, pero hay ciertas cosas que no se pueden exportar como los menús de navegación. Un consejo que daría es exportar el archivo `settings_data.json` del tema que está en producción. No se exportarán las imágenes del tema ni los menús de navegación pero tendrás la tienda lo más parecido que se puede hacer.

## 4. URL de Shopify
Este es un detalle chico pero importante. Supongamos que el dominio asociado con nuestra tienda es **supertienda.com**, para Shopify, la URL siempre es versión **.myshopify.com**, esta se usa para Theme Kit por ejemplo.

## 5. Familiarizarte con la documentación de Liquid
Liquid es usado en varios ambientes de desarrollo fue originalmente creado <a href="https://shopify.github.io/liquid/" target="_blank">por Shopify</a>, escrito en Ruby para potenciar los temas de Shopify. Todos los templates son `.liquid`. La documentación es bastante completa.

Es importante siempre buscar la documentación de Shopify porque hay un par de versiones de liquid ligeramente diferentes a las usadas en Shopify.

## 6. Conocer la estructura de los temas de Shopify
Los temas de shopify tienen una estructura de carpetas bastante definida y da muy poco espacio para modificarla.

La estructura básica es esta:

```bash
├── assets
│   ├── application.js
│   └── application.scss.liquid
├── config
│   ├── settings_data.json
│   └── settings_schema.json
├── config.yml
├── snippets
│   └── snippet.liquid
├── sections
│   └── section.liquid
├── layout
│   └── theme.liquid
├── locales
│   └── es.default.json
└── templates
    ├── template.liquid
```
Muchas personas podrían decir, buenísimo, voy a crear la carpeta `css` y `scripts` dentro de assets para tener todo más ordenado pero Shopify ignorará esas carpetas completamente, incluyendo las archivos dentro de ellas. 

Shopify ignora cualquier carpeta y archivo que no siga esta estructura, lo bueno es que igual puedes tener las carpetas que quieras para tus archivos de desarrollo.

Por ejemplo esta es la estructura de uno de los temas que tenemos en desarrollo continuo. Está la clásica carpeta de `node_modules`, adicionalmente `styles` y `scripts` y estas carpetas se ignoran completamente si hacemos un deploy o se modifican con el watcher. Bastante cómodo realmente

```bash
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── assets
├── config
├── config.yml
├── gulpfile.js
├── layout
├── locales
├── node_modules
├── package-lock.json
├── package.json
├── scripts
├── sections
├── snippets
├── styles
├── templates
├── todo.md
└── tools
```

## 7. Revisar los temas de Shopify
En la misma nota, en lugar de empezar completamente desde cero, recomiendo mucho descargar los temas que tiene Shopify por defecto y capaz instalar en una tienda algunos de los que son gratuitos e inspeccionarlos. Adicionalmente a la documentación de Shopify que es bastante completa, revisar los temas nos permite ver la lógica de una tienda funcional.

En la siguiente parte veremos como [instalar Theme kit](/instalando-theme-kit) con más detalle