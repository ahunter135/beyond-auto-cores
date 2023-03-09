(function(){"use strict";function publishingController($scope,$q,mediaResource,contentResource,dictionaryResource,localizationService,languageResource,uSyncHub,uSyncPublishService,uSyncPublishingService,uSyncActionManager){function onSelected(server){vm.flags=uSyncActionManager.prepToggles(server,vm.flags,vm.entityType);vm.headings.description=uSyncActionManager.getDescription(vm.mode,vm.entityType,server.name);vm.server=server;startProcess();$scope.$broadcast("sync-server-selected",{server:server,flags:vm.flags})}function onPerformAction(){vm.process.view.show&&(vm.state.actionLoaded=!1);performAction(vm.process)}function onClose(){clean(vm.process)}function initComponent(){vm.showPickServer?[].push(uSyncPublishService.getServers(vm.mode).then(function(result){vm.servers=result.data;checkServers(vm.servers);vm.state.loading=!1})):(vm.headings.title="Checking "+vm.selectedServer.name+" server",vm.headings.description="Contacting "+vm.selectedServer.url+" to confirm status",uSyncPublishService.checkServer(vm.selectedServer.alias).then(function(result){vm.state.loading=!1;vm.state.loadmessage="";vm.selectedServer.status=result.data;result.data.enabled!=!0?(vm.state.hasError=!0,vm.simpleError='Server unreachable "'+result.data.status+'" '+result.data.message):onSelected(vm.selectedServer)}))}function checkServers(servers){var checks=[];servers.forEach(function(server){checks.push(uSyncPublishService.checkServer(server.alias).then(function(result){server.status=result.data}))});$q.all(checks).then(function(){$scope.$broadcast("usync-servers-checked",servers)})}function startProcess(){vm.process={id:uSyncActionManager.emptyGuid,actionAlias:"",server:vm.server.alias,mode:vm.mode,items:vm.items,steps:{stepIndex:0,pageNumber:0,handlerFolder:""},view:{show:!1,path:""},options:{primaryType:vm.entityType,removeOrphans:!1,includeFileHash:!1,includeSystemFileHash:!1,attributes:{},cultures:[]}};getAction(vm.process)}function getAction(process){vm.state.actionLoaded=!1;var request=makePublishRequest(process);uSyncPublishingService.getAction(request).then(function(result){vm.state.actionLoaded=!0;process.action=result.data;prepAction(process)})}function prepAction(process){if(process.action!==null){if(process.actionAlias=process.action.alias,hasView(process.action))return showView(process);hideView(process);performAction(process)}}function hasView(action){return action.view!==undefined&&action.view!==null&&action.view.length>0}function showView(process){process.view={show:!0,path:process.action.view,boxed:!process.action.unboxView};vm.state.valid=!0;vm.state.working=!1;vm.state.hideClose=!1;vm.showPickServer&&vm.hideWhenPicked&&(vm.showPickServer=!1,vm.headings={title:"Publish to "+vm.server.name,description:vm.server.url});return}function hideView(process){vm.state.working=!0;vm.state.hideClose=!0;process.view={show:!1,path:""}}function performAction(process){vm.showPickServer=!1;updateState(process);var request=makePublishRequest(process);uSyncPublishingService.performAction(request).then(function(result){var response=result.data;response.success?(process=updateProcess(process,response),response.processComplete?console.log("end ?"):response.actionComplete?getAction(process):performAction(process)):showError(response.error,request)},function(error){console.log(error);showError({title:"Server error",message:error.data},request)})}function updateState(process){vm.state.actionName=process.actionAlias;vm.state.stepIndex=process.steps.stepIndex;vm.state.pageNumber=process.steps.pageNumber;vm.state.folder=process.steps.handlerFolder}function makePublishRequest(process){return{id:process.id,server:process.server,mode:process.mode,items:process.items,actionAlias:process.actionAlias,stepIndex:process.steps.stepIndex,handlerFolder:process.steps.handlerFolder,pageNumber:process.steps.pageNumber,clientId:getClientId(),options:process.options}}function updateProcess(process,response){return process.id=response.id,process.actionAlias=response.nextAction,process.items=response.items,process.steps={stepIndex:response.stepIndex,pageNumber:response.nextPage,handlerFolder:response.nextFolder},hasActions(response)&&(vm.report=response.actions),response.progress!=null&&response.progress!=undefined&&(vm.progress.currentStepIndex=response.progress.currentStepIndex,vm.progress.currentStepName=response.progress.currentStepName,updateProgressSteps(response.progress.steps)),process}function hasActions(response){return response.actions!==undefined&&response.actions!==null&&response.actions.length>0}function updateProgressSteps(steps){if(_.isArray(steps)){vm.progress.steps.length!=steps.length&&(vm.progress.steps=steps);for(let n=0;n<steps.length;n++)(steps[n].icon!=vm.progress.steps[n].icon||steps[n].name!=vm.progress.steps[n].name||steps[n].status!=vm.progress.steps[n].status)&&(vm.progress.steps[n]=steps[n])}}function clean(process){process.id!==undefined&&process.id!==null&&process.id!=uSyncActionManager.emptyGuid&&uSyncPublishingService.clean(process.id,process.server).then(function(){})}function calcPercentage(update){return update!=null&&update!=undefined?update.count/update.total*100:0}function showError(error,request){vm.state.hideClose=!1;vm.state.valid=!1;vm.state.working=!1;vm.state.hasError=!0;vm.error=error;vm.errorTitle="Error during "+request.actionAlias}function initSignalRHub(){uSyncHub.initHub(function(hub){vm.hub=hub;vm.hub.on("update",function(update){vm.update=update;vm.update.blocks=update.message.split("||")});vm.hub.on("add",function(status){vm.status=status});vm.hub.on("publisher",function(message){vm.message=message;calcStep(vm.message)});vm.hub.start(function(){})})}function getClientId(){return $.connection!==undefined?$.connection.connectionId:""}var vm=this,events;vm.process={};vm.error={};vm.report=[];vm.actionButton={state:"init",name:"Send"};vm.showPickServer=!0;vm.servers=[];vm.selectedServer=null;vm.entityType="content";vm.onSelected=onSelected;events=[];events.push($scope.$on("usync-publish-performAction",function(){onPerformAction()}));events.push($scope.$on("usync-publish-close",function(){onClose()}));vm.$onInit=function(){vm.entityType=vm.items[0].entityType;vm.headings={title:"Select a server",description:vm.mode+" "+vm.entityType};var promises=[];vm.options.serverAlias!==undefined&&(vm.showPickServer=!1,promises.push(uSyncPublishService.getServer(vm.options.serverAlias).then(function(result){vm.selectedServer=result.data})));$q.all(promises).then(function(){vm.flags=uSyncActionManager.initFlags();vm.items[0].requiresFiles&&(vm.flags.includeFiles={toggle:!0,value:!0});initComponent()});localizationService.localize("usyncpublish_"+vm.mode+"Button").then(function(data){vm.actionButton.name=data});initSignalRHub()};$scope.$on("destroy",function(){for(var e in events)events[e]()});vm.progress={steps:[{icon:"icon-settings",name:"first-step",status:0},{icon:"icon-settings",name:"second-step",status:0},{icon:"icon-settings",name:"third-step",status:0}]};vm.calcPercentage=calcPercentage}var publishingComponent={templateUrl:Umbraco.Sys.ServerVariables.application.applicationPath+"App_Plugins/uSyncPublisher/components/uSyncPublishingAction.html",bindings:{mode:"<",single:"<",items:"=",options:"=",state:"=",actionButton:"=",headings:"=",isModal:"<",hideWhenPicked:"<"},controllerAs:"vm",controller:publishingController};angular.module("umbraco").component("usyncPublishingAction",publishingComponent)})()