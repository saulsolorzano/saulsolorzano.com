---
date: 2021-01-29
updated: 2021-01-31
published: true
title: Usando Gulp para desarrollo local con Shopify
slug: /desarrollo-local-shopify-con-themekit-gulp
description: "Explicación de como configurar Gulp y nuestro Gulpfile para que funcione correctamente con Theme Kit."
type: "post"
---

<div class="bg-gray-100 w-10/12 m-auto border series-index">
	<span class="font-bold m-0 py-1 px-5 block text-blue-700">Desarrollo de temas con Shopify</span>
	<span class="block m-0 py-1 px-5 border-t border-gray-300 font-bold"><a href="/recomendaciones-trabajo-con-shopify">1. Recomendaciones para trabajar con temas de Shopify</a></span>
	<span class="block m-0 py-1 px-5 border-t border-gray-300 font-bold"><a href="/instalando-theme-kit">2. Instalando Theme Kit</a></span>
	<span class="block m-0 py-1 px-5 border-t border-gray-300 font-bold"><a href="/creando-certificado-seguridad-local">3. Creando certificado de seguridad local</a></span>
	<span class="block m-0 py-1 px-5 border-t border-gray-300 font-bold"><a href="/desarrollo-local-shopify-con-themekit-gulp" class="current">4. Usando Gulp para desarrollo local con Shopify</a></span>
</div>

**TDLR**: Si quieres trabajar localmente con tu tema de Shopify, debes tener instalado [Theme Kit](/instalando-theme-kit) y Gulp usando el [Gulpfile](#gulpfile) que se encuentra más abajo
***

Cuando se está trabajando con desarrollo local de un tema de Shopify, lo más recomendado es trabajar con Theme Kit, el problema es que Theme Kit es bastante básico en su comportamiento. Así que, adicionalmente a las cosas más normales en Gulp como SCSS y JavaScript, debemos hacer unos pasos extras para que funcione bien con nuestra tienda de Shopify.

La lista de tareas se ve así:

- [ ] Compilación de SCSS a CSS
- [ ] Compilación de JavaScript y soporte de ES6+ con Babel
- [ ] Manejar ambientes de desarrollo (Temas y tiendas)
- [ ] Manejo de dependencias con Webpack
- [ ] Watch con BrowserSync y Shopify

## GULP


![artem-beliaikin-JsB3j_d4Fnk-unsplash.jpg](../img/artem-beliaikin-JsB3j_d4Fnk-unsplash.jpg)
<span class="text-sm text-center block mt-4">Photo by <a href="https://unsplash.com/@belart84?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Artem Beliaikin</a> on <a href="https://unsplash.com/s/photos/plastic-cup?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

Lo más probable es que alguna vez hayas usado Gulp, pero capaz nunca te haya tocado configurarlo desde cero o crear un Gulpfile, si es así, la idea de este artículo es explicarte los pasos que se tomaron, dado que lo más probable es que tengas que modificarlo para reflejar tu ambiente de desarrollo.

#### ¿Por qué usar Gulp y no Webpack?
Creo que es justo decir que webpack es la opción más popular entre los dos, debido a que muchos frameworks usan webpack, y aunque muchas veces son intercambiables, la verdad es que son herramientas diferentes. Webpack es un "empaquetador (bundler)" cuya principal función es trabajar con JavaScript, todo se hace con JavaScript, en cambio Gulp es un corredor de tareas que expone una API bastante sencilla para trabajar. 

Cpmo no estamos trabajando con un framework de JavaScript, usar Gulp tiene mucho más sentido.

Primero, vamos a ver el Gulpfile completo para los que solo les interese eso y debajo emplico todo más detallado.

##### [Gulpfile](#gulpfile)

```javascript
const gulp      = require('gulp'),
 path           = require('path'),
 os             = require('os'),
 sass           = require('gulp-sass'),
 postcss        = require('gulp-postcss'),
 uglify         = require('gulp-uglify'),
 autoprefixer   = require('autoprefixer'),
 t2             = require('through2'),
 browserify     = require('browserify'),
 source         = require('vinyl-source-stream'),
 babelify       = require('babelify'),
 buffer         = require('vinyl-buffer'),
 browserSync    = require('browser-sync').create(),
 YAML           = require('yaml'),
 fs             = require('fs'),
 gulpStylelint  = require('gulp-stylelint'),
 eslint         = require('gulp-eslint'),
 glob           = require('glob'),
 es             = require('event-stream'),
 rename         = require('gulp-rename'),
 argv           = require('minimist')(process.argv.slice(2));

sass.compiler   = require('node-sass');

const config = {
	dev:       true,
	delayTime: 1200
};
const paths = {
    'ssl': {
        cert: path.resolve(os.homedir(), '.localhost_ssl/server.crt'),
        key:  path.resolve(os.homedir(), '.localhost_ssl/server.key')
	},
	'styles': {
		src:  './styles/**/**/*.scss',
		main: './styles/theme.scss'
	},
	'scripts': {
		src:       './scripts/**/*.js',
		templates: './scripts/templates/*.js'
	}
};

function setProductionEnvironment(cb) {
	config.dev = !config.dev;
	cb();
}

/**
 * Función que asegura que el archivo se actualice
 * con fecha para que Themekit lo agare
 */
const touch = () => t2.obj( function( file, enc, cb ) {
	if ( file.stat ) {
		file.stat.atime = file.stat.mtime = file.stat.ctime = new Date();
	}
	cb( null, file );
});

/**
 * Función que nos sirve para leer el archivo de configuración
 * de Shopify que necesitamos para ThemeKit
 */
function readConfig() {
	const file = fs.readFileSync('./config.yml', 'utf8');
	return YAML.parse(file);
}

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
// JAVASCRIPT
function jsLint() {
	return gulp
		.src(
			[paths.scripts.templates]
		)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}

function js(done) {
	glob(paths.scripts.templates, function(err, files) {
		if (err) {
			done(err);
		};

		var tasks = files.map(function(entry) {
			return browserify({
				entries: [entry]
			})
			.transform(babelify.configure({
				presets: ['@babel/preset-env']
			}))
			.bundle()
			.pipe(source(entry))
			// Aquí sólo compilamos los templates
			// y le colocamos el prefijo
			// .template. para mejor targetearlos
			// con el liquid
			.pipe(rename({
				dirname: '',
				prefix:  'template.',
				extname: '.js'
			}))
			.pipe(buffer())
			.pipe(eslint())
			.pipe(uglify())
			.pipe(touch())
			.pipe(gulp.dest('assets'))
			.pipe(browserSync.stream({once: true}));
		});

		es.merge(tasks).on('end', done);

	});
	done();
}

function watch() {
	const config = readConfig();
	const shopifyTheme = argv.env;
	browserSync.init({
		proxy: `https://${config[shopifyTheme].store}?preview_theme_id=${config[shopifyTheme].theme_id}`,
		files: '/var/tmp/theme_ready',
		https: {
			key:  paths.ssl.key,
			cert: paths.ssl.cert
		},
		reloadDelay:    config.delayTime,
		snippetOptions: {
			rule: {
				match: /<\/body>/i,
				fn:    function(snippet, match) {
					return snippet + match;
				}
			}
		}
	});
	gulp.watch(paths.styles.src, gulp.series(scssLint, scss));
	gulp.watch(paths.scripts.src, gulp.series(jsLint, js));
}


exports.watch = gulp.series(jsLint, js, scssLint, scss, watch);
exports.production = gulp.series(setProductionEnvironment, scssLint, scss, jsLint, js);
```

Aprovecho también de dejar acá el comando de `npm install` con todos los paquetes que se necesitan.

```bash
npm install --save-dev gulp node-sass gulp-sass gulp-postcss gulp-uglify stylelint stylelint-scss gulp-stylelint gulp-eslint gulp-rename autoprefixer through2 browserify vinyl-source-stream babelify vinyl-buffer browser-sync yaml glob event-stream minimist @babel/core @babel/preset-env
```

Como podemos ver usamos bastantes paquetes y hay algunos que solo los uso para que Theme Kit funcione de manera correcta con el Watch.

## Antes de empezar
Este gulpfile asume ciertas cosas, las dos son modificables fácilmente.
- Que usarás las carpetas `styles` y `scripts`, en caso de que no sea así, modificar las rutas en `paths`
- Que usarás linters, y si es así, espera los archivos de configuración, sino dará error. En caso de que no quieras usar ningún linter en la terminal porque lo usas en el editor puedes eliminar esas funciones.

## Un poco de orden con variables

Después de declarar todos los paquetes, vamos a ver dos variables `config` donde definimos nuestro ambiente por defecto como `dev` y definimos un `delayTime: 1200` que usaremos más adelante en el browserSync.

Después vemos `paths`, que son simplemente las rutas de todos los archivos que necesitaremos. La única que debería parecer rara es la sección de los SSL, esta es la ruta donde los [certificados de seguridad](/creando-certificado-seguridad-local) son creados.



### Haciendo las paces con Theme Kit

Vamos a enfocarnos primero en las cosas que necesitamos para trabajar bien con Theme Kit, ya que el resto es bastante estandar si alguna vez has configurado un proyecto de Gulp.

Cuando mi compañero [José](https://github.com/josehollow24) creó la primera versión de este Gulpfile, uno de los problemas que tuvo es el problema de sincronización entre los watchers y el `theme watch` de Theme Kit para subir los archivos a Shopify. Después de buscar bastante, resulta que el problema es cómo funcionan los watchers, cuando corren, estos no actualizan la fecha de modificación del archivo, por lo menos no como uno pensaría, y el watcher de Theme Kit usa esa fecha para saber si el archivo a cambiado o no, así que lo primero que debemos hacer es implementar esta función

```javascript
/**
 * Función que asegura que el archivo se actualice
 * con fecha para que Themekit lo agare
 */
const touch = () => t2.obj( function( file, enc, cb ) {
	if ( file.stat ) {
		file.stat.atime = file.stat.mtime = file.stat.ctime = new Date();
	}
	cb( null, file );
});

```

Básicamente, esta fuerza el tiempo de actualización del archivo para que Theme Kit lo detecte

#### Ambiente de desarrollo

Ya expliqué con [detalle anteriormente](/instalando-theme-kit) cómo funciona el archivo `config.yml` dentro del contexto de Theme Kit. Dado que tenemos que hacer un browsersync remoto, necesitamos saber la dirección para el proxy, para esto usaremos un parser de Yaml

```javascript
/**
 * Función que nos sirve para leer el archivo de configuración
 * de Shopify que necesitamos para ThemeKit
 */
function readConfig() {
	const file = fs.readFileSync('./config.yml', 'utf8');
	return YAML.parse(file);
}
```

Adicionalmente a esto usamos el paquete <a href="https://www.npmjs.com/package/minimist" target="_blank">minimist</a> para leer mejor los parámetros del comando.

Cuando uno hace un `watch` o un `deploy` en Theme Kit tiene la siguiente estructura

```bash
theme watch --env=[Ambiente]
theme deploy --env=[Ambiente]
```
Lo ideal es usar la misma estructura en Gulp por comodidad y tranquilidad mental.

```bash
gulp watch --env=[Ambiente]
gulp deploy --env=[Ambiente]
```

Así que haciendo uso de minimalist para leer ese `--env=[Ambiente]` podremos hacer referencia al contenido de nuestro `config.yml`

### browserSync

Vamos a armar nuestro watcher y para esto necesitamos tener el browserSync configurado correctamente.

Este es uno de los paquetes más conocidos para evitar tener que refrescar el navegador a mano. Es súper cómodo cuando se está trabajando localmente poder guardar en tu editor y que el navegador se actualice de manera automática, pudiendo así ver los cambios que hiciste.

Lamentablemente, no podremos lograr ese efecto de manera automática, esto es porque lo que realmente pasará con nuestro watch es que una vez se compilen nuestros recursos como el CSS y el JavaScript, se deben subir primero a Shopify y después deberemos refrescar el navegador para ver los cambios. Aquí es donde usamos el `delayTime` que había comentado anteriormente.

El otro problema es que Theme Kit no dispara ningún evento cuando se termina de subir un archivo, así que el único recurso que nos queda es tratar de llegar a un estimado, así llegue a los 1200, pero esto debe ser adaptado, si tienes una computadora más lenta, probablemente sería buena idea incrementarlo, posiblemente en una versión futura lo deje como un parámetro que se pase por el comando, algo como:

```bash
gulp watch --env=[ambiente] --delay=1200
```

Vamos a ver la función paso por paso y después la armamos completamente. Lo primero que debemos hacer es usar nuestra función declarada anteriormente para leer el `config.yml`.

```javascript
const config = readConfig();
```

Después leemos el argumento para saber que ambiente usaremos
```javascript
const shopifyTheme = argv.env;
```

Y ahora entramos a la función del browserSync como tal, lo primero que vemos es el proxy, esto indica que estamos trabajando con una dirección remota, aquí usamos el nombre del ambiente que pasamos en nuestro parámetro para leer la URL del tema y el ID del tema. 

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

Esta es la parte más fácil y estándar. Adicionalmente, la compilación de SCSS a CSS, decidimos implementar un linter, porque actualmente somos dos personas actualmente modificando el código, con más en el camino pronto y tenemos tres tiendas ya de Shopify, así que mantener un mismo estándar de programación es bastante cómodo.

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

### JavaScript

Al igual que con el SCSS, se implementó un linter para JavaScript usando ESlint, es la primera función y después tenemos la función que se encarga de transpilar el JavaScript.

```javascript
// JAVASCRIPT
function jsLint() {
	return gulp
		.src(
			[paths.scripts.templates]
		)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}

function js(done) {
	glob(paths.scripts.templates, function(err, files) {
		if (err) {
			done(err);
		};

		var tasks = files.map(function(entry) {
			return browserify({
				entries: [entry]
			})
			.transform(babelify.configure({
				presets: ['@babel/preset-env']
			}))
			.bundle()
			.pipe(source(entry))
			// Aquí sólo compilamos los templates
			// y le colocamos el prefijo
			// .template. para mejor targetearlos
			// con el liquid
			.pipe(rename({
				dirname: '',
				prefix:  'template.',
				extname: '.js'
			}))
			.pipe(buffer())
			.pipe(eslint())
			.pipe(uglify())
			.pipe(touch())
			.pipe(gulp.dest('assets'))
			.pipe(browserSync.stream({once: true}));
		});

		es.merge(tasks).on('end', done);

	});
	done();
}
```

### Siguientes pasos
En estos momentos, debemos tener dos ventanas abiertas de la terminal:

```bash
# Primera ventana
theme watch --env=[Ambiente] --notify=/var/tmp/theme_ready
```

```bash
# Segunda ventana
gulp watch --env=[Ambiente]
```

Para que todo funcione, estoy trabajando en un paquete para que todo sea más fácil y poder integrar de mejor manera. Cuando lo tenga listo seguro escribiré un artículo también y lo publicaré. Por los momentos, tenemos varios meses trabajando así sin ningún problema. Cualquier sugerencia es más que bienvenida.

***

Con esto deberíamos tener un ambiente de trabajo local con Shopify. Cualquier duda, como siempre, me pueden escribir un email. Gracias por leer.
