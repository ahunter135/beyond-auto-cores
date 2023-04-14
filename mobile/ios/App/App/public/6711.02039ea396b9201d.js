"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6711],{6711:(C,f,i)=>{i.r(f),i.d(f,{GenericsPageModule:()=>I});var g=i(6895),p=i(4719),a=i(2478),u=i(1065),l=i(5861),s=i(5196),e=i(7631),m=i(3493),P=i(9e3),_=i(1687);const M=["search"];function x(o,c){1&o&&(e.TgZ(0,"div"),e._UZ(1,"app-skeleton-list-loader"),e.qZA())}function v(o,c){1&o&&e._UZ(0,"app-generic-code-card",12),2&o&&e.Q6J("code",c.$implicit)}function b(o,c){if(1&o&&e.YNc(0,v,1,1,"ng-template",11),2&o){const t=e.oxw();e.Q6J("ngForOf",t.dataCodes.data)}}const O=[{path:"",component:(()=>{class o{constructor(t){this.codesService=t,this.searchCode="",this.dataCodes={data:[],pagination:null},this.isLoading=!1}ngOnInit(){var t=this;return(0,l.Z)(function*(){t.isLoading=!0,t.dataCodes=yield t.codesService.codes({pageSize:66955359,pageNumber:1,isCustom:!1,isAdmin:!0,notIncludePGItem:!1}),t.isLoading=!1})()}onSearch(t){var n=this;return(0,l.Z)(function*(){const r=t,{value:d}=r.detail;n.isLoading=!0,n.dataCodes=yield n.codesService.codes({searchCategory:"converterName",searchQuery:d,pageNumber:1,pageSize:66955359,isCustom:!1,isAdmin:!0,notIncludePGItem:!1}),n.isLoading=!1,console.log(n.dataCodes)})()}hideKeyboard(t){var n=this;return(0,l.Z)(function*(){s.N1.hide(),(yield n.searchInput.getInputElement()).blur()})()}onIonInfinite(t){var n=this;return(0,l.Z)(function*(){if(!n.searchCode){const r=n.dataCodes.pagination.nextPageLink;if(n.isLoading=!0,console.log(r),r&&!n.codesService.isLoadingMore){const{data:d,pagination:h}=yield n.codesService.nextCodes(r,{searchCategory:"converterName",isCustom:!1,isAdmin:!0,notIncludePGItem:!1});console.log(h),n.dataCodes={data:[...n.dataCodes.data,...d],pagination:h},n.codesService.isLoadingMore=!1}n.isLoading=!1}setTimeout(()=>{t.target.complete()},500)})()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(m.a))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-generics"]],viewQuery:function(t,n){if(1&t&&e.Gf(M,5),2&t){let r;e.iGM(r=e.CRH())&&(n.searchInput=r.first)}},decls:17,vars:3,consts:[["mode","ios"],["slot","start"],["mode","md"],[1,"ion-padding",2,"position","relative"],[1,"clear-btn-wrapper"],["name","close-outline",1,"clear-btn",3,"click"],["placeholder","Search Generics...","debounce","500","enterkeyhint","Search",3,"ngModel","ngModelChange","ionChange","keyup.enter"],["search",""],[1,"ion-padding-end"],[4,"ngIf"],["threshold","50%",3,"ionInfinite"],["ngFor","",3,"ngForOf"],[3,"code"]],template:function(t,n){1&t&&(e.TgZ(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-buttons",1),e._UZ(3,"ion-back-button",2),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"View Generics"),e.qZA()()(),e.TgZ(6,"ion-content")(7,"div",3)(8,"div",4)(9,"ion-icon",5),e.NdJ("click",function(){return n.searchCode=""}),e.qZA()(),e.TgZ(10,"ion-input",6,7),e.NdJ("ngModelChange",function(d){return n.searchCode=d})("ionChange",function(d){return n.onSearch(d)})("keyup.enter",function(d){return n.hideKeyboard(d)}),e.qZA()(),e.TgZ(12,"div",8),e.YNc(13,x,2,0,"div",9),e.YNc(14,b,1,1,null,9),e.TgZ(15,"ion-infinite-scroll",10),e.NdJ("ionInfinite",function(d){return n.onIonInfinite(d)}),e._UZ(16,"ion-infinite-scroll-content"),e.qZA()()()),2&t&&(e.xp6(10),e.Q6J("ngModel",n.searchCode),e.xp6(3),e.Q6J("ngIf",n.isLoading&&!n.dataCodes.data),e.xp6(1),e.Q6J("ngIf",n.dataCodes.data))},dependencies:[g.sg,g.O5,p.JJ,p.On,a.oU,a.Sm,a.W2,a.Gu,a.gu,a.ju,a.MB,a.pK,a.wd,a.sr,a.j9,a.cs,P.O,_.f],styles:[".view-generics-button[_ngcontent-%COMP%]{--background: #000;--border-radius: 12px;height:46px}.find-text-container[_ngcontent-%COMP%]{position:relative}.vertical-center[_ngcontent-%COMP%]{margin:0;position:absolute;top:50%;transform:translateY(-50%)}ion-input[_ngcontent-%COMP%]{--background: #fff;border-radius:12px;--padding-start: 16px;--padding-end: 16px;--padding-top: 15px;--padding-bottom: 15px;--color: #000;height:46px;font-size:18px}ion-modal[_ngcontent-%COMP%]{--height: 520px;--border-radius: 16px;--box-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--background: #fff;overflow:auto;align-items:flex-start;padding-top:2.5rem}ion-modal[_ngcontent-%COMP%]::part(backdrop){background:#000000;opacity:.5}.lot-content[_ngcontent-%COMP%]::part(background){--background: #fff}ion-modal[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background: rgb(255, 255, 255);--color: rgb(0, 0, 0)}.modal-toolbar[_ngcontent-%COMP%]{padding:13px;border-bottom:1px solid #eff2f5}.lot-input[_ngcontent-%COMP%]{--background: #f3f7f9}ion-item[_ngcontent-%COMP%]::part(native){border:0px}ion-label[_ngcontent-%COMP%]{padding-bottom:16px}.lot-range[_ngcontent-%COMP%]{display:flex;width:100%}ion-modal[_ngcontent-%COMP%]::part(content){--width: 90%;max-width:512px;--border-radius: 6px}ion-footer[_ngcontent-%COMP%]{position:relative;padding-top:48px;padding-bottom:32px}.footer-toolbar[_ngcontent-%COMP%]{position:relative}.footer-group-button[_ngcontent-%COMP%]{width:100%}.footer-button[_ngcontent-%COMP%]{position:absolute;top:15px;right:15px;bottom:5px}.add-lot-button[_ngcontent-%COMP%]{--background: #000;text-transform:capitalize;height:40px}.lot-select[_ngcontent-%COMP%]{background-color:#f3f7f9;padding:10px;border-radius:12px}ion-card[_ngcontent-%COMP%]{margin:15px}.modal-footer[_ngcontent-%COMP%]{border-top:1px solid #eff2f5}ion-range[_ngcontent-%COMP%]{padding-top:0}ion-title[_ngcontent-%COMP%]{text-transform:uppercase;font-size:18px}.clear-btn[_ngcontent-%COMP%]{color:var(--ion-background-color);font-size:32px;z-index:10}.clear-btn-wrapper[_ngcontent-%COMP%]{position:absolute;display:flex;height:46px;right:26px;width:32px;flex-direction:column;justify-content:center;z-index:10}"]}),o})()}];let G=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[u.Bz.forChild(O),u.Bz]}),o})();var y=i(1075);let I=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[g.ez,p.u5,a.Pc,G,y.m]}),o})()},1075:(C,f,i)=>{i.d(f,{m:()=>l});var g=i(6895),p=i(4719),a=i(2478),u=i(7631);let l=(()=>{class s{}return s.\u0275fac=function(m){return new(m||s)},s.\u0275mod=u.oAB({type:s}),s.\u0275inj=u.cJS({imports:[g.ez,p.u5,a.Pc]}),s})()}}]);