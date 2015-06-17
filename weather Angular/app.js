//Angular.js app definition
var app = angular.module('weather',[ ]);



//Configura el APP para CORS requests
app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});



//Factory
app.factory('WeatherMap',['$http', '$q', function($http, $q) {
    var URL   = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=San%20Jose,cr&mode=json&units=metric&cnt=6' ;
	
    //Metodos publicos que retorna el factory
   
		
      /*
      * Returna TODAS las funciones disponibles del factory
      */
	  return {
      getAll : function(){
		var defer1 = $q.defer();
          $http({
            method:'GET', 
            url:URL,
            dataType: 'jsonp',
            headers: {'Content-Type': 'application/json'}
          }).
              success(function(data, status, headers, config){
                  defer1.resolve(data);
              }).
              error(function(data, status, headers, config){
                  defer1.reject(data);
              });

          return defer1.promise;
      },
	  	  getWeatherForCity:function(city){
			  var defer2 = $q.defer();
		  $http({
            method:'GET', 
            url:"http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+",cr&mode=json&units=metric&cnt=6",
            dataType: 'jsonp',
            headers: {'Content-Type': 'application/json'}
          }).
              success(function(data, status, headers, config){
                  defer2.resolve(data);
              }).
              error(function(data, status, headers, config){
                  defer2.reject(data);
              });

          return defer2.promise;
		  
	  }
	  
	}


}]);


//Controller
app.controller('WeatherCtrl', ['$scope', 'WeatherMap', function($scope, WeatherMap){
    
	$scope.cities = [
    {name:'San Jose', guid:'San Jose'},
    {name:'Heredia', guid:'Heredia'},
    {name:'Cartago', guid:'Cartago'},
	{name:'Alajuela',guid:'Alajuela'},
    {name:'Guanacaste', guid:'Guanacaste'},
    {name:'Puntarenas', guid:'Puntarenas'},
	{name:'Limon',guid:'Limon'}
];

    //Carga los datos del factory
    WeatherMap.getAll().then( function(data){

        $scope.weather = data.list;
		$scope.city = data.city.name;

    });
	$scope.weatherByCity = function(ciudad){
		  WeatherMap.getWeatherForCity(ciudad).then(function(dataT){
			 $scope.weather = dataT.list;
			 $scope.city = ciudad;
		  });
	}
    
    
}]);