(function(){"use strict";function dashboardController($timeout,$rootScope,notificationsService,navigationService,overlayService,uSyncPublishService,uSyncPublishServerManager){function saveSettings(){$rootScope.$broadcast("usync-publisher-settings-save")}function selectItem(item){vm.page.title=title;vm.page.description=item.description;item.name!=="Publisher"&&(vm.page.title+=" - "+item.name)}function syncSettings(){uSyncPublishServerManager.syncSettings(function(success){success||notificationsService.error("Sync fail","unable to sync settings")})}function getJson(){uSyncPublishService.getAllServers().then(function(result){var servers=result.data,options={view:Umbraco.Sys.ServerVariables.uSyncPublisher.pluginPath+"dashboard/serverjson.html",title:"Server config",content:JSON.stringify(servers,null,4),docslink:vm.docslink,disableBackdropClick:!0,disableEscKey:!0,hideSubmitButton:!0,submit:function(){overlayService.close()}};overlayService.confirm(options)})}var vm=this,title,description;vm.selectItem=selectItem;title="uSync Publisher";description="Push and pull content from other Umbraco installations";vm.page={title:title,description:description,version:Umbraco.Sys.ServerVariables.uSyncPublisher.dllVersion,navigation:[{name:"Publisher",alias:"publisher",icon:"icon-truck",description:description,view:Umbraco.Sys.ServerVariables.uSyncPublisher.pluginPath+"dashboard/default.html",active:!0},{name:"Advanced",description:"Default settings used as a base for all servers in config",alias:"settings",icon:"icon-settings",view:Umbraco.Sys.ServerVariables.uSyncPublisher.pluginPath+"dashboard/settings.html"},{name:"Cache",description:"Caching dependencies and exports make publishing faster",alias:"cache",icon:"icon-flash",view:Umbraco.Sys.ServerVariables.uSyncPublisher.pluginPath+"dashboard/cache.html"},{name:"Sync",description:"Quickly get this install in sync with another server",alias:"sync",icon:"icon-infinity",view:Umbraco.Sys.ServerVariables.uSyncPublisher.pluginPath+"dashboard/blank.html"}]};$timeout(function(){navigationService.syncTree({tree:"uSyncPublisher",path:"-1"})});vm.save=saveSettings;vm.sync=syncSettings;vm.getJson=getJson}angular.module("umbraco").controller("uSyncPublisherDashboardController",dashboardController)})()