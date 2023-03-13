(function(){"use strict";function dialogManager($rootScope,$timeout,entityResource,editorService,navigationService){function getLocalItem(options){return options.action!==undefined&&options.action.metaData!==undefined&&options.action.metaData!==null?JSON.parse(options.action.metaData._syncLocalItem):options.items[0]}function openPublisherSettingsPushDialog(options,cb){console.log(options);openConfigDialog("Push",options.entity.id,cb)}function openPublisherSettingsPullDialog(options,cb){openConfigDialog("Pull",options.entity.id,cb)}function openPublisherPushItemDialog(options,cb){openSyncDialog("Push settings","publisherDialog",options,cb,"settingsPush")}function openPublisherPullItemDialog(options,cb){openSyncDialog("Pull settings","publisherDialog",options,cb,"settingsPull")}function openPublisherPushContent(options,cb){openSyncDialog("Publish Content","publisherDialog",options,cb,"push")}function openPublisherPullContent(options,cb){openSyncDialog("Pull Content","publisherDialog",options,cb,"pull")}function openPublisherPushMedia(options,cb){openSyncDialog("Publish Media","publisherDialog",options,cb,"push")}function openPublisherPullMedia(options,cb){openSyncDialog("Pull Media","publisherDialog",options,cb,"pull")}function openPublisherPushFileDialog(options,cb){openSyncDialog("Push Files","publisherDialog",options,cb,"filePush")}function openPublisherPullFileDialog(options,cb){openSyncDialog("Pull Files","publisherDialog",options,cb,"filePull")}function openConfigDialog(mode,server,callback){var options={hideItems:!0,serverAlias:server,items:[{udi:"umb://document-type/"+emptyGuid,name:"ContentType"},{udi:"umb://data-type/"+emptyGuid,name:"DataType"},{udi:"umb://media-type/"+emptyGuid,name:"MediaType"}]};openDialog("Deploy Settings","publisherDialog",options,callback,"config"+mode)}function openSyncDialog(dialogTitle,dialogView,options,cb,mode,size="small"){if(options.entity!==undefined&&(options.items=[options.entity]),options.items.length===1){var localItem=getLocalItem(options),dialogOptions=Object.assign({},options);dialogOptions.items=[localItem];openDialog(dialogTitle,dialogView,dialogOptions,cb,mode,size)}else openDialog(dialogTitle,dialogView,options,cb,mode,size)}function openDialog(dialogTitle,dialogView,options,cb,mode,size){editorService.open({options:options,mode:mode,single:options.items.length===1,title:dialogTitle,size:size,view:Umbraco.Sys.ServerVariables.uSyncPublisher.pluginPath+"dialogs/"+dialogView+".html",submit:function(){editorService.close();navigationService.hideNavigation();cb!==undefined&&cb(!0)},close:function(){editorService.close();navigationService.hideNavigation();cb!==undefined&&cb(!1)}})}function openNewServerDialog(entity,cb,url=""){editorService.open({view:Umbraco.Sys.ServerVariables.uSyncPublisher.pluginPath+"dialogs/addServer.html",title:"Add Server",size:"small",url:url,placeholder:url.length==0?"Server name":"name for this server",submit:function(model){editorService.close();navigationService.hideNavigation();openServerDialog(model.alias,cb)},close:function(){editorService.close();navigationService.hideNavigation();cb!==undefined&&cb(!1)}})}function openServerDialog(alias,cb){editorService.open({serverAlias:alias,title:"Server View",view:Umbraco.Sys.ServerVariables.uSyncPublisher.pluginPath+"backoffice/uSyncPublisher/server.html",submit:function(){$rootScope.$broadcast("usync-publisher-settings-reload");navigationService.hideNavigation();editorService.close();cb!==undefined&&cb(!0)},close:function(){$rootScope.$broadcast("usync-publisher-settings-reload");navigationService.hideNavigation();editorService.close();cb!==undefined&&cb(!1)}})}function openCompareMedia(options,cb){entityResource.getById(options.entity.id,"Media").then(function(entity){openCompare(entity,"IMedia",cb)})}function openCompareContent(options,cb){entityResource.getById(options.entity.id,"Document").then(function(entity){openCompare(entity,"IContent",cb)})}function openCompare(entity,type,cb){editorService.open({title:"Compare remote",view:Umbraco.Sys.ServerVariables.uSyncPublisher.pluginPath+"dialogs/detail.html",entity:entity,viewFirst:!0,item:{itemType:type},showServers:!0,close:function(){editorService.close();navigationService.hideNavigation();cb!==undefined&&cb(!1)}})}var emptyGuid="00000000-0000-0000-0000-000000000000";return{openPublisherPushContent:openPublisherPushContent,openPublisherPullContent:openPublisherPullContent,openPublisherPushMedia:openPublisherPushMedia,openPublisherPullMedia:openPublisherPullMedia,openPublisherPushItemDialog:openPublisherPushItemDialog,openPublisherPullItemDialog:openPublisherPullItemDialog,openPublisherPushFileDialog:openPublisherPushFileDialog,openPublisherPullFileDialog:openPublisherPullFileDialog,openConfigDialog:openConfigDialog,openSyncDialog:openSyncDialog,openServerDialog:openServerDialog,openNewServerDialog:openNewServerDialog,openCompareContent:openCompareContent,openCompareMedia:openCompareMedia,openPublisherSettingsPushDialog:openPublisherSettingsPushDialog,openPublisherSettingsPullDialog:openPublisherSettingsPullDialog}}angular.module("umbraco").factory("uSyncPublishDialogManager",dialogManager)})()