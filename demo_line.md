

1. Creamos la estructura del proyecto
----------------------------------------

```
 mkdir front2
 cd front2
 yo angular
```


2. Analicemos la estructura de archivos generada
--------------------------------------------------
- app: archivos de la aplicación
	- .htaccess
	- robots.txt
	- index.html
	- components: dependencias (gestionado por bower)
	- script: nuestros js
		- controllers: controladores
		- app.js: módulo principal y enrutador
	- styles: archivos compass
	- views: partials HTML
	- 404, 
	- favicon

- node_modules: módulos de node requeridos para la compilación

- test: archivos para definición de pruebas

- component.json: dependencias gestionadas por bower

- Gruntfile.js: configuración de las tareas de compilación. QUIEN USA GRUNT?

- karma.conf.js: Configuración de la ejecución de pruebas unitarias

- karma-e2e.conf.js: Configuración de las pruebas end to end

- package.json: descripción del proyecto (por si lo subimos a bower)



3. Resolvemos algunos problemas con la configuración por defecto
-------------------------------------------------------------------
- Subir timeout de chrome en los archivos de configuración de karma (solo para Windows)
- borrar main.css
- borrar el comentario <!-- build:css styles/main.css --> en index.html


4. Compilamos el proyecto
---------------------------

```
    grunt
```


*Que ha pasado?*


- genera la carpeta dist
- usemin: busca referencias a js y css sin optimizar y las reemplaza por las optimizadas
- compilar coffee -> js
- compilar compass -> css
- imagemin
- cssmin
- concatenar js y uglify
- requirejs
- añade el número de revisión


*Qué hay en la carpeta dist?.* Además de los archivos de app

- index.htm: ha cambiado las referencias a los estilos y scripspor sus versiones minimizadas y compactadas

- scripts: ha generado uno un solo archivo con todo, minimizado y con el número de versión

- styles: ha generado uno un solo archivo con todo, minimizado y con el número de versión


5. Levantamos el servidor de pruebas
--------------------------------------

```
    grunt server
```

modificamos main controller (le añadimos un nuevo elemento al array) y vemos como se actualiza el navegador mediante livereload


6. Creamos una nueva página que accede a un backend
-----------------------------------------------------

1. El backend ya lo tenemos creado, en nuestro caso con http://deployd.com/

2. Creamos un nuevo route: incluye el controlador, la vista, la ruta en app.js y el test del controller

```
    yo angular:route animeFrontend

```

3. Creamos un nuevo servicio: incluye el servicio y su test

```
    yo angular:service animeFrontendSvc

```

4. Escribimos el service

```javascript
	angular.module('front2App')
	  .factory('animeFrontendSvc', function ($resource) {
	    return $resource('http://localhost\\:2403/animefrontend');
	  });
```



5. Añadimos la dependencia con el módulo ngResource en app.js

```javascript
	angular.module('front2App', ['ngResource'])
```


6. Escribimos el controller

```javascript
	angular.module('front2App')
	  .controller('AnimeFrontendCtrl', function ($scope, animeFrontendSvc) {
	    $scope.animes = animeFrontendSvc.query();
	  });
```


7. Escribimos la vista

```html
<input type="text" ng-model="search" style="margin-bottom:30px"
	class="search-query pull-right" placeholder="Search">
<div class="row" ng-repeat="anime in animes | filter:search" 
	class="clearfloat" style="margin-bottom: 30px">
	<div class="span6">
		<h1>{{anime.title}}</h1>
		<dl class="dl-horizontal">
			<dt>Año</dt><dd>{{anime.year}}</dd>
			<dt>Director</dt><dd>{{anime.director}}</dd>
			<dt>Estudio</dt><dd>{{anime.estudio}}</dd>
		</dl>
	</div>
	<div class="span6">
		<img class="screenshot" src="http://localhost:2403/images/{{anime.images[0]}}">
	</div>
</div>

```

8. Añadimos a index.html el toolbar

```html
    <div class="navbar navbar-inverse">
      <div class="navbar-inner">
        <div class="container" style="width: auto;">
            <ul class="nav">
              <li><a href="#">Home</a></li>
              <li><a href="#/animeFrontend">Anime frontend list</a></li>
              <li><a href="#/animeFrontend/new">new Anime</a></li>
            </ul>

        </div>
      </div>
    </div>

```

7. Probamos la app 
-------------------

```
	grunt server
```


8. Vamos a crear un test e2e
----------------------------


Añadimos a karma-e2e.conf.js

```javascript
proxies = {
	'/web': 'http://localhost:9000'
};
```


Y creamos la carpeta e2e y animeFrontend.js

```javascript
'use strict';

describe('Controller: AnimeFrontendCtrl end to end', function () {

  it('load the anime list', function() {
    browser().navigateTo('/web/#/animeFrontend');
    expect(repeater('.row').count()).toEqual(2);
  });


});

```

Ejecutamos las pruebas mediante 

```
	karma start karma-e2e.conf.js
```
