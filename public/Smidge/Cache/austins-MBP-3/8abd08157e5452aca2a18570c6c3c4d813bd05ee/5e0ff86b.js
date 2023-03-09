(function(){"use strict";function uSyncExporterService($http,$q){function isLicenced(){return $http.get(serviceRoot+"IsLicenced")}function getSettings(){return $http.get(serviceRoot+"GetSettings")}function getExporters(){return $http.get(serviceRoot+"GetExporters")}function getSyncItems(items){return $http.post(serviceRoot+"GetSyncItems",items)}function createExport(request){return $http.post(serviceRoot+"CreateExport",request)}function getExport(request){return downloadPost(serviceRoot+"GetExport",request)}function reportPack(request){return $http.post(serviceRoot+"ReportPack",request)}function importPack(request){return $http.post(serviceRoot+"ImportPack",request)}function downloadPost(httpPath,payload){return $http.post(httpPath,payload,{responseType:"arraybuffer"}).then(function(response){var octetStreamMime="application/octet-stream",success=!1,headers=response.headers(),filename=getFileName(headers),contentType=headers["content-type"]||octetStreamMime,saveBlob,urlCreator,link,event;try{let blob=new Blob([response.data],{type:contentType});if(navigator.msSaveBlob)navigator.msSaveBlob(blob,filename);else{if(saveBlob=navigator.webkitSaveBlob||navigator.mozSaveBlob||navigator.saveBlob,saveBlob===undefined)throw"Not supported";saveBlob(blob,filename)}success=!0}catch(ex){console.log("saveBlob method failed with the following exception:");console.log(ex)}if(!success&&(urlCreator=window.URL||window.webkitURL||window.mozURL||window.msURL,urlCreator)){if(link=document.createElement("a"),"download"in link)try{let blob=new Blob([response.data],{type:contentType}),url=urlCreator.createObjectURL(blob);link.setAttribute("href",url);link.setAttribute("download",filename);event=document.createEvent("MouseEvents");event.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,0,null);link.dispatchEvent(event);success=!0}catch(ex){console.log("Download link method with simulated click failed with the following exception:");console.log(ex)}if(!success)try{let blob=new Blob([response.data],{type:octetStreamMime}),url=urlCreator.createObjectURL(blob);window.location=url;success=!0}catch(ex){console.log("Download link method with window.location failed with the following exception:");console.log(ex)}}return success||window.open(httpPath,"_blank",""),$q.resolve()},function(response){return $q.reject({errorMsg:"An error occurred downloading the file",data:response.data,status:response.status})})}function getFileName(headers){var disposition=headers["content-disposition"],filenameRegex,matches;return disposition&&disposition.indexOf("attachment")!==-1&&(filenameRegex=/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,matches=filenameRegex.exec(disposition),matches!=null&&matches[1])?matches[1].replace(/['"]/g,""):"sync-pack.usync"}var serviceRoot=Umbraco.Sys.ServerVariables.uSync.exporterService;return{getSettings:getSettings,getExporters:getExporters,isLicenced:isLicenced,getSyncItems:getSyncItems,createExport:createExport,getExport:getExport,reportPack:reportPack,importPack:importPack}}angular.module("umbraco").factory("uSyncExporterService",uSyncExporterService)})()