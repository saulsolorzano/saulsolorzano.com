---
date: 2021-01-12
published: false
title: Instalando Theme Kit
slug: /instalando-theme-kit
description: "Configurando Gulp y Themekit para trabajar localmente con Shopify."
type: "post"
---

<span class="bg-blue-200 p-2">**Parte 2** de la serie de como trabajar con temas de Shopify localmente</span>

El principal foco de mi trabajo actual es Shopify. Cuando empecé en mi trabajo actual, mi primera responsabilidad fue programar el rediseño del [sitio principal de ecommerce](http://ankerstore.cl/), y además traspasarlo de <a href="https://jumpseller.com/" target="_blank">Jumpseller</a> a Shopify.

Cuando empecé a programar este nuevo sitio Shopify recomendaba usar <a href="https://shopify.github.io/slate/docs/about" target="_blank">Slate</a>, y a pesar de no ser una herramienta perfecta, hacía el trabajo local muy cómodo.

Shopify no permite tener el tema 100% local, necesita igual correr desde Shopify, pero Slate permitía lo más cercano, el problema es que terminando el tema Slate entró en modo de "Poco mantenimiento" diciendo que se tomarían 6 meses para evaluarlo, y recomendaban que si querías algo a largo plazo usaras [Themekit](https://shopify.github.io/themekit/), Slate realmente está construído encima de Themekit. El problema es que Themekit es muy diferente a Slate, themekit tiene varios comandos, pero los más importantes watch y deploy no hacen más que eso. Si querías todo el ambiente de desarrollo local tenías que hacerlo tu con Webpack, Gulp o Grunt.

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/10PcMWwtZSYk2k" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/aint-nobody-got-time-for-that-gif-10PcMWwtZSYk2k">via GIPHY</a></p>

Así que decidí seguir con Slate con la leve esperanza de que continuaran con el soporte, pero en enero de 2020 confirmaron que le iban a quitar el soporte al proyecto, matándolo básicamente.

Y a pesar de que decidí quedarme con Slate por un tiempo más, fue imposible a largo plazo. Había empezado a dar problemas con la conexión y algunos errores en el deploy. Así que después de pensarlo, con [José](https://github.com/josehollow24), el otro Front del equipo decidimos cambiarnos a Themekit.

#### Instalación

Lo primero que debes hacer es [instalar Themekit](https://shopify.github.io/themekit/#installation), Theme Kit está disponible para todas las versiones de sistemas operativos 

Las instrucciones son súper sencillas, si usas macOS, con correr esto tienes:

```bash
brew tap shopify/shopify
brew install themekit
```
De todas formas recomiendo revisar la documentación por si esto ha cambiado desde que se escribió este artículo.

### Config.yml

Theme kit usa un archivo llamado config.yml para tener la información de la tienda y el tema con el cual se está trabajando. Este archivo tiene la siguiente estructura:

```yaml
development:
  password: 16ef663594568325d64408ebcdeef528
  theme_id: "123"
  store: can-i-buy-a-feeling.myshopify.com
  proxy: http://localhost:3000
  ignore_files:
    - "*.gif"
    - "*.jpg"
    - config/settings_data.json
```

**Importante: Dado que este archivo tiene una clave de acceso a nuestro tema por API la decisión de versionarlo o no es algo que se tendrá que decidir como equipo**

#### ¿De donde saco esa clave?
Shopify da la opción de crear aplicaciones de uso privado. Para crear una debes ir a la ventana de Aplicaciones y debajo del listado de aplicaciones vas a ver un texto que es muy fácil de perder.

> ¿Estás trabajando con un desarrollador en la creación de tu tienda? Gestionar aplicaciones privadas

![crear-aplicaciones-privadas](../img/crear-aplicaciones.png)

Si es primera vez que se crea aplicaciones privadas en tu tienda, solo el dueño de la tienda tiene el permiso de crearlas. Esta pantalla se verá solo una vez por el tiempo de vida de la tienda.

![activar-aplicaciones](../img/activar-aplicaciones.png)





Cuando uno hace un `watch` o un `deploy` en Theme Kit tiene la siguiente estructura

```bash
theme watch --env=TEMA
theme deploy --env=TEMA
```
Y quería usar la misma estructura en gulp por comodidad y tranquilidad mental.

```bash
gulp watch --env=TEMA
gulp deploy --env=TEMA
```

### browserSync

Vamos a armar nuestro watcher y para esto necesitamos tener el browserSync configurado correctamente.

Este es uno de los paquetes más conocidos para evitar tener que refrescar el navegador a mano. Es súper cómodo cuando se está trabajando localmente poder guardar tu editor y que el navegador se actualice de maner automática y así poder ver los cambios que hiciste. A pesar de que podremos lograr que cuando salvemos nuestro editor el navegador se actualice, no será de manera instantanea. Esto es porque lo que realmente pasará con nuestro watch es que una vez se compilen nuestros recursos como el CSS y el JavaScript, se deben subir primero a Shopify y después deberemos refrescar el navegador para ver los cambios.

El otro problema es que Theme Kit no dispara ningún evento cuando se termina de subir un archivo, así que el único recurso que nos queda es tratar de llegar a un estimado.

Vamos a ver el archivo paso por paso y después lo veremos completo. Lo primero que debemos hacer es usar nuestra función declarada anteriormente para leer el `config.yml`.

```javascript
const config = readConfig();
```

Después leemos el argumento para saber que tema estamos hablando
```javascript
const shopifyTheme = argv.theme;
```

Y ahora entramos a la función del browserSync como tal, lo primero que vemos es el proxy, esto indica que estamos trabajando con una dirección remota, aquí usamos el nombre del tema/tienda que pasamos en nuestro parámetro para leer la URL del tema y el ID del tema. 

Otra cosa importante es el archivo que usamos para notificar con el Theme Kit.

```javascript
	browserSync.init({
		proxy: `https://${config[shopifyTheme].store}?preview_theme_id=${config[shopifyTheme].theme_id}`,
		files: '/var/tmp/theme_ready',
		// Certificados de SSL
		https: {
			key:  paths.ssl.key,
			cert: paths.ssl.cert
		},
		// nuestro estimado delay
		reloadDelay: config.delayTime,
		// Necesario para que Shopify no de problemas
		snippetOptions: {
			rule: {
				match: /<\/body>/i,
				fn: function(snippet, match) {
					return snippet + match;
				}
			}
		}
	});
	// Activando los watchers con nuestros assets
	gulp.watch(paths.styles.src, gulp.series(scssLint, scss));
	gulp.watch(paths.scripts.src, gulp.series(jsLint, js));

```

### SCSS a CSS

Esta es la parte más fácil y estándar, decidimos implementar un linter ya que somos dos personas modificando el código actualmente, con más en el camino pronto y tenemos tres tiendas ya de Shopify, así que mantener un mismo estándar de programación es bastante cómodo.

La primera función `scssLint()` es la que se encarga de eso, la segunda función `scss()` es la que compila el SCSS a CSS, notarán la función `touch()`

```javascript
// ESTILOS
function scssLint() {
	return gulp
		.src([paths.styles.src])
		.pipe(gulpStylelint({reporters: [{formatter: 'string', console: true}]}));
}
function scss() {
	return gulp.src(paths.styles.main)
		.pipe(sass(config.dev ? {outputStyle: 'compressed'} : ''))
		.pipe(postcss([autoprefixer()]))
		.pipe(touch())
		.pipe(gulp.dest('assets'));
}
```