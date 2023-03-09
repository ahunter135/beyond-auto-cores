(function(){"use strict";function detailController($scope,$q,eventsService,uSyncPublishService){function close(){$scope.model.close&&$scope.model.close()}function checkServers(servers){var checks=[];servers.forEach(function(server){checks.push(uSyncPublishService.checkServer(server.alias).then(function(result){server.status=result.data}))});$q.all(checks).then(function(){$scope.$broadcast("usync-servers-checked",servers);vm.servers.length===1&&(vm.hideServerBox=!0)})}function onServerSelected(server){vm.loaded=!1;$scope.model.server=server;vm.server=server;vm.item.itemType==="IContent"?uSyncPublishService.getContentChanges([vm.entity.udi],server.alias).then(function(result){result.data.length>0?(vm.item=result.data[0].action,$scope.model.item=vm.item,vm.loaded=!0):vm.missing=!0}):vm.item.itemType==="IMedia"&&uSyncPublishService.getMediaChanges([vm.entity.udi],server.alias).then(function(result){result.data.length>0?(vm.item=result.data[0].action,$scope.model.item=vm.item,vm.loaded=!0):vm.missing=!0})}var vm=this;vm.item=$scope.model.item;vm.server=$scope.model.server;vm.viewFirst=$scope.model.viewFirst;vm.showServers=$scope.model.showServers??!1;vm.hideServerBox=!1;vm.entity=$scope.model.entity;vm.loaded=!vm.showServers;vm.missing=!1;vm.servers=[];vm.selectNavigationItem=function(item){eventsService.emit("usync-publisher-detail.tab.change",item)};vm.page={navigation:[{name:"Detail",alias:"changes",icon:"icon-bulleted-list",view:Umbraco.Sys.ServerVariables.application.applicationPath+"App_Plugins/uSyncPublisher/dialogs/detail.changes.html",active:!0}]};(vm.item.itemType=="IContent"||vm.item.itemType=="IMedia")&&(vm.page.navigation.push({name:"View",alias:"view",icon:"icon-display",view:Umbraco.Sys.ServerVariables.application.applicationPath+"App_Plugins/uSyncPublisher/dialogs/detail.view.html"}),vm.viewFirst&&(vm.page.navigation[0].active=!1,vm.page.navigation[1].active=!0,eventsService.emit("usync-publisher-detail.tab.change",vm.page.navigation[1])));vm.close=close;vm.onSelected=onServerSelected;vm.$onInit=function(){vm.showServers&&uSyncPublishService.getServers(vm.mode).then(function(result){vm.servers=result.data;checkServers(vm.servers)})}}angular.module("umbraco").controller("uSyncPublisherDetailController",detailController)})()