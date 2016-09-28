angular.module('myApp', [])
.service('CEPService', CEPService)
.controller('MainCtrl', MainCtrl);

function MainCtrl ($scope, $http, CEPService) {

/**
Mostrando as 2 formas onde cada resposta é enviada diretamente ao $scope
e usando um Array externo que é populado a cada promise
e na depois de todas ocorrerem uso o finally para jogar o Array p/ o $scope
*/

  var enderecos = []
  CEPService.find('06608430')
  .then((json) => {
    $scope.part1 = json.data; 
    enderecos.push(json.data);
    return CEPService.find('80610905');
  })
  .then((json) => {
    $scope.part2 = json.data; 
    enderecos.push(json.data);
    return CEPService.find('80510170');
  })
  .then((json) => {
    $scope.part3 = json.data; 
    enderecos.push(json.data);
  })
  .finally(() => {
    $scope.enderecos = enderecos;
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
