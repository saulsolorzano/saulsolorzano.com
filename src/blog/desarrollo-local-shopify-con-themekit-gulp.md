---
date: 2021-01-12
published: false
title: Usando Gulp para desarrollo local con Shopify
slug: /desarrollo-local-shopify-con-themekit-gulp
description: "Configurando Gulp y Themekit para trabajar localmente con Shopify."
type: "post"
---

El principal foco de mi trabajo actual es Shopify. Cuando empecé en mi trabajo actual, mi primera responsabilidad fue programar el rediseño del [sitio principal de ecommerce](http://ankerstore.cl/), y además traspasarlo de <a href="https://jumpseller.com/" target="_blank">Jumpseller</a> a Shopify.

Cuando empecé a programar este nuevo sitio Shopify recomendaba usar <a href="https://shopify.github.io/slate/docs/about" target="_blank">Slate</a>, y a pesar de no ser una herramienta perfecta, hacía el trabajo local muy cómodo.

Shopify no permite tener el tema 100% local, necesita igual correr desde Shopify, pero Slate permitía lo más cercano, el problema es que terminando el tema Slate entró en modo de "Poco mantenimiento" diciendo que se tomarían 6 meses para evaluarlo, y recomendaban que si querías algo a largo plazo usaras [Themekit](https://shopify.github.io/themekit/), Slate realmente está construído encima de Themekit. El problema es que Themekit es muy diferente a Slate, themekit tiene varios comandos, pero los más importantes watch y deploy no hacen más que eso. Si querías todo el ambiente de desarrollo local tenías que hacerlo tu con Webpack, Gulp o Grunt.

<div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/10PcMWwtZSYk2k" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/aint-nobody-got-time-for-that-gif-10PcMWwtZSYk2k">via GIPHY</a></p>

Así que decidí seguir con Slate con la leve esperanza de que continuaran con el soporte, pero en enero de 2020 confirmaron que le iban a quitar el soporte al proyecto, matándolo básicamente.

Y a pesar de que decidí quedarme con Slate por un tiempo más, fue imposible a largo plazo. Había empezado a dar problemas con la conexión y algunos errores en el deploy. Así que después de pensarlo, con [José](https://github.com/josehollow24), el otro Front del equipo decidimos cambiarnos a Themekit.

Había varias cosas que Slate permitía que habían la experiencia de Shopify bastante cómoda.

- Compilación de SCSS a CSS
- Compilación de JavaScript y soporte de ES6+ con Babel
- Manejar ambientes de desarrollo (Temas y tiendas)
- Manejo de dependencias con Webpack
- Watch y Deploy

Así que tendría que replicar todo y junto con Themekit, la experiencia sería lo más parecido posible.

## Themekit
Lo primero que debes hacer es [instalar Themekit](https://shopify.github.io/themekit/#installation)

Las instrucciones son súper sencillas, si usas macOS, con correr esto tienes

```bash
brew tap shopify/shopify
brew install themekit
```
De todas formas recomiendo revisar la documentación por si esto ha cambiado desde que se escribió este artículo.

## GULP


![artem-beliaikin-JsB3j_d4Fnk-unsplash.jpg](../img/artem-beliaikin-JsB3j_d4Fnk-unsplash.jpg)
<span class="text-sm">Photo by <a href="https://unsplash.com/@belart84?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Artem Beliaikin</a> on <a href="https://unsplash.com/s/photos/plastic-cup?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

Si aún no has usado GULP, es un corredor de tareas. Yo solía usar [mucho](https://www.saulsolorzano.com/grunt-el-corredor-de-tareas-en-javascript/) [Grunt](https://www.saulsolorzano.com/grunt-usando-templates-para-iniciar-proyectos/) que era muy pópular en esa época pero la verdad Gulp ganó la batalla, es más rápido que Grunt y se ha mantenido muy actualizado.

El primer problema que tuve con Gulp es que tenía mucho tiempo sin usarlo, y nunca había usado la versión 4 de Gulp, la mayoría de tutoriales que encontré usaban la sintaxis de la versión 3 así que me costó un poco hacerlo funcionar correctamente todo.

Decidí usar Gulp para lograr esta tarea.

Tomó varios meses en llegar al Gulpfile final que estamos usando ahora. Así que en lugar de contar toda la historia, veamos el resultado final y explicaré paso a paso que se hace.

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
 browserSync    = require('browser-sync').create()
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
	const shopifyTheme = argv.theme;
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

Como podemos ver usamos bastantes paquetes y hay algunos que solo los uso para que Themekit funcione de manera correcta con el Watch.

Vamos por áres primero

### Haciendo las paces con Themekit



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