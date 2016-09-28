angular.module('myApp', [])
.service('CEPService', CEPService)
.controller('MainCtrl', MainCtrl);

function MainCtrl ($scope, $q, CEPService) {

/**
Mostrando as 2 formas onde cada resposta é enviada diretamente ao $scope
e usando um Array externo que é populado a cada promise
e na depois de todas ocorrerem uso o finally para jogar o Array p/ o $scope
*/

  $scope.enderecos = [];
  var ceps = ['06608430', '80610905', '80510170'];

  $scope.error = false

  // habilitamos o estado de "carregando!";
  $scope.loading = true

  // Criamos uma promise com todas as promises de busca de cep
  $q.when(ceps.map(CEPService.find)).then(function(promises) {
    // esperamos todas elas serem resolvidas
    return $q.all(promises)
  }).then(function(enderecos) {
    // adicionamos um campo "completo" na resposta, com o endereço formatado
    return enderecos.map(function(e) {
      e.completo = [e.logradouro, e.bairro, e.localidade, e.uf].join(", ");
      return e;
    })
  }).then(function(enderecos) {
    // definimos os enderecos no escopo
    $scope.enderecos = enderecos
  }).catch(function() {
    // se der erro em algum lugar acima, cai aqui
    $scope.errorMessage = 'Deu merda: ' + err.toString()
  }).finally(function() {
    // removemos o estado de "carregando" =)
    $scope.loading = false
  });

}
MainCtrl['$inject'] = ['$scope', '$q', 'CEPService']

function CEPService ($http, $timeout) {
  const BASE_URL = 'https://viacep.com.br/ws/{cep}/json/'

  this.find = function (cep) {
    return $http.get(BASE_URL.replace('{cep}', cep)).then(function(res) {
      return res.data;
    }).then(function(data) {
      // só para simular delay
      return $timeout(function() {
        return data
      }, 2000);
    })
  };

}
CEPService['$inject'] = ['$http', '$timeout']
