(function(){"use strict";function cacheController(overlayService,notificationsService,uSyncCacheService,uSyncSettingManager){function getStatus(set){uSyncCacheService.getStatus(set).then(function(result){vm.status=result.data;vm.enabled=checkEnabled(vm.status)})}function checkEnabled(status){return status.enabled}function showSettings(enabled){var settings={uSync:{Complete:{Caching:{Enabled:enabled}}}};uSyncSettingManager.showAppSettings("usyncpublish_cacheSettings","usyncpublish_cacheSettingIntro",JSON.stringify(settings,null,2))}function confirmRebuild(message){var overlay={view:Umbraco.Sys.ServerVariables.uSyncPublisher.pluginPath+"overlay/cacheOverlay.html",title:"Rebuild uSync caches",subtitle:"Refresh the uSync publisher caches for greater syncing speed",content:message,disableBackdropClick:!0,disableEscKey:!0,submitButtonLabel:"Rebuild",closeButtonLabel:"Close",submit:function(model){model.isRebuilt?(overlayService.close(),getStatus(vm.set)):model.rebuild!=null&&model.rebuild()},close:function(){overlayService.close();getStatus(vm.set)}};overlayService.open(overlay)}function rebuild(){confirmRebuild("")}var vm=this;vm.set="publisher";vm.enabled=!1;vm.showSettings=showSettings;vm.cacheButtonState="init";vm.rebuild=rebuild;getStatus(vm.set)}angular.module("umbraco").controller("uSyncCacheController",cacheController)})()