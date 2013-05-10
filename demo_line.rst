





1. yo angular (tarda bastante)




2. La estructura de archivos generada



- app: archivos de la aplicación
	- .htaccess
	- robots.txt
	- index.html
	- components: dependencias (gestionado por bower) QUIEN USA BOWER?
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



3. Resolver algunos problemas con la configuración por defecto
	- Cambiar timeout de chrome (karmaconf) 
	- borrar main.css
	- borrar el comentario <!-- build:css styles/main.css --> en index.html




ejecutar grunt



Que ha pasado?



- genera la carpeta dist
- usemin: busca referencias a js y css sin optimizar y las reemplaza por las optimizadas
- compilar coffee -> js
- compilar compass -> css
- imagemin
- cssmin
- concatenar js y uglify
- requirejs
- añade el número de revisión




Qué hay en la carpeta dist?




index.htm: ha cambiado las referencias a los estilos y scripspor sus versiones minimizadas y compactadas




scripts: ha generado uno un solo archivo con todo, minimizado y con el número de versión




styles: ha generado uno un solo archivo con todo, minimizado y con el número de versión





4. grunt server


modificamos main controller y vemos como se actualiza solo



------------------
Explicamos el backend
------------------



5. Creamos un nuevo route: incluye el controlador, la vista y la ruta 

yo angular:route animeFrontend

yo angular:service animeFrontendSvc




modificamos el service con

	angular.module('front2App')
	  .factory('animeFrontendSvc', function ($resource) {
	    return $resource('http://localhost\\:2403/animefrontend');
	  });




Añadimos la dependencia a app.js

	, ['ngResource']




modificamos el controller con

	angular.module('front2App')
	  .controller('AnimeFrontendCtrl', function ($scope, animeFrontendSvc) {
	    $scope.animes = animeFrontendSvc.query();
	  });



Modificamos la vista con

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



Añadimos a index.html el toolbar

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



6. Probamos la app 



7. Probamos grunt test y vemos que falla. Explicamos el mock de $httpBackend



8. Arreglamos el test de animeFrontend

  var httpMock;
  beforeEach(inject(function ($httpBackend) {
    httpMock = $httpBackend;
    $httpBackend.expectGET('http://localhost:2403/animefrontend').
      respond([{ title: "title1" },{ title: "title2"}]);    
  }));

  y 

  it('should request the anime list', function () {
    httpMock.flush();
    expect(scope.animes.length).toBe(2);
  });



9. Vamos a crear un test e2e


Añadimos a karma-e2e.conf.js

proxies = {
	'/web': 'http://localhost:9000'
};


Y creamos la carpeta e2e y animeFrontend.js

'use strict';

describe('Controller: AnimeFrontendCtrl end to end', function () {

  it('load the anime list', function() {
    browser().navigateTo('/web/#/animeFrontend');
    expect(repeater('.row').count()).toEqual(2);
  });


});

