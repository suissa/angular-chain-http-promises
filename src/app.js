angular.module('myApp', [])
.service('CEPService', CEPService)
.controller('MainCtrl', MainCtrl);

function MainCtrl ($scope, $http, CEPService) {

  CEPService.find('06608430')
  .then((json) => {
    $scope.part1 = json.data; 
    
    return CEPService.find('80610905');
  })
  .then((json) => {
    $scope.part2 = json.data; 
    
    return CEPService.find('80510170');
  })
  .then((json) => {
    $scope.part3 = json.data; 
  });
}
MainCtrl['$inject'] = ['$scope', '$http', 'CEPService']

function CEPService ($http) {
  const BASE_URL = 'https://crossorigin.me/http://labs.edysegura.com/busca-por-cep/cep/endereco.php?cep='
  
  this.find = function (cep) {
    return $http.get(BASE_URL + cep)
  }
}
CEPService['$inject'] = ['$http']
