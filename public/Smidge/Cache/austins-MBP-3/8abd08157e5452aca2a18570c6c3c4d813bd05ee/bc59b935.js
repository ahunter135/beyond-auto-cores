(function(){"use strict";function overlayController($scope){function isComplete(){return vm.state.isComplete}function moveToNext(){$scope.$broadcast("usync-publish-performAction")}function init(){$scope.model.disableSubmitButton=!0}var vm=this,model,evts;$scope.model.moveToNext=moveToNext;$scope.model.isComplete=isComplete;model=$scope.model;vm.mode=model.mode;vm.isSingle=!0;vm.options=$scope.model.options;vm.items=vm.options.items;vm.server=model.server;vm.headings={};vm.stepArgs={stepAlias:"",target:"",options:"",clientId:""};vm.state={complete:!1,loading:!0,hideClose:!0,valid:!1,working:!1,hasError:!1,error:""};vm.actionButton={state:"init",name:"Send"};evts=[];evts.push($scope.$watch("vm.state",function(state){state!==undefined&&(state.complete?($scope.model.closeButtonLabel="Done",$scope.model.hideSubmitButton=!0):$scope.model.hideSubmitButton=state.working?!0:!1,$scope.model.disableSubmitButton=!state.valid)},!0));evts.push($scope.$watch("vm.headings",function(headings){headings!==undefined&&(headings.title!==undefined&&($scope.model.title=headings.title),headings.description!==undefined&&($scope.model.subtitle=headings.description))},!0));$scope.$on("$destroy",function(){for(var x in evts)evts[x]()});init()}angular.module("umbraco").controller("uSyncPublishOverlayController",overlayController)})()