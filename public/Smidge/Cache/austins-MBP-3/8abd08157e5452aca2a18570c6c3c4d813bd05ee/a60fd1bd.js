(function(){"use strict";function sideBySideController($scope,$sce){function close(){$scope.model.close&&$scope.model.close()}var vm=this;vm.source=$sce.trustAsResourceUrl($scope.model.source);vm.target=$sce.trustAsResourceUrl($scope.model.target);vm.close=close}angular.module("umbraco").controller("uSyncSideBySideController",sideBySideController)})()