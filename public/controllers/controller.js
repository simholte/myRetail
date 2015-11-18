var myApp = angular.module('myApp', ['ui.bootstrap', 'ngResource']);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http, $timeout) {


var refresh = function() {
  $http.get('/int-api').success(function(response) {
    console.log("I got the data I requested");
      response.forEach(function(product){
         product.imageUrl += '?_ts=' + product._id;
      });
    $scope.productlist = response;
    $scope.totalItems = $scope.productlist.length;
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
  });
};

refresh();

  $scope.paginate = function(value) {
    var begin, end, index;
    begin = ($scope.currentPage - 1) * $scope.numPerPage;
    end = begin + $scope.numPerPage;
    index = $scope.productlist.indexOf(value);
    return (begin <= index && index < end);
  };

  $scope.addProducts = function(count) {
    console.log(count);
    $http.post('/int-api/' + count).success(function(response) {
        console.log("Added " + count + " products");
    });
    refresh();
  };

    $scope.clear = function() {
        console.log("Clearing DB");
        $http.delete('/int-api').success(function(response){
           console.log("Cleared DB");
        });
      refresh();
    };

    $scope.add = function(title, desc, price, url) {
        $scope.desc = '';
        $scope.price = '';
        $scope.title = '';
        $http.put('/int-api/addProduct/' + title + '/title/' + desc + '/desc/' + price + '/price').success(function(response){
         console.log("Added new product");
      });
        refresh();
    };

}]);