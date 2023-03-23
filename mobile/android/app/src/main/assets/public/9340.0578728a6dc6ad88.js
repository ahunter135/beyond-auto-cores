"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9340],{1253:(v,x,s)=>{s.d(x,{e:()=>f});var p=s(1737),_=s(4850),i=s(7221),m=s(7631),u=s(1102);let f=(()=>{class t{constructor(g){this.rest=g}lotItems(g,h){return this.rest.get({endpoint:`/lots/${g}/items`,params:h}).pipe((0,_.U)(c=>{const{data:a}=c.body;return a})).toPromise()}addCodeToLot(g){return this.rest.post("/lotitems",g).pipe((0,_.U)(h=>{const{data:c}=h.body;return c}),(0,i.K)(h=>(0,p._)(h))).toPromise()}removeCodeInLot(g){return this.rest.delete(`/lotitems/${g}`).pipe((0,_.U)(h=>{const{data:c}=h.body;return c}),(0,i.K)(h=>(0,p._)(h))).toPromise()}lotItemsFullness(g,h){return this.rest.get({endpoint:`/lotitems/${g}/fullness`,params:h}).pipe((0,_.U)(c=>{const{data:a}=c.body;return a})).toPromise()}}return t.\u0275fac=function(g){return new(g||t)(m.LFG(u.v))},t.\u0275prov=m.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},4190:(v,x,s)=>{s.d(x,{s:()=>b});var p=s(4850),_=s(7221),i=s(2868),m=s(591),u=s(1737),f=s(7631),t=s(1102);let b=(()=>{class g{constructor(c){this.rest=c,this.isLoadingMore=!1,this.selectLotStateSubject=new m.X(null)}get selectedLot(){return this.selectLotStateSubject.value}set setSelectedLot(c){this.selectLotStateSubject.next(c)}lots(c){return this.rest.get({endpoint:"/lots",params:c}).pipe((0,p.U)(a=>{const{data:P}=a.body;return P}),(0,_.K)(a=>(0,u._)(a))).toPromise()}inventory(c){return this.rest.get({endpoint:"/lots/inventory",params:c}).pipe((0,p.U)(a=>{const{data:P,pagination:M}=a.body;return{data:P,pagination:M}}),(0,_.K)(a=>(0,u._)(a))).toPromise()}inventorySummary(c){return this.rest.get({endpoint:"/lots/inventorysummary",params:c}).pipe((0,p.U)(a=>{const{data:P,pagination:M}=a.body;return{data:P,pagination:M}}),(0,_.K)(a=>(0,u._)(a))).toPromise()}nextInventory(c){return this.isLoadingMore=!0,this.rest.get({endpoint:c,server:"none"}).pipe((0,p.U)(a=>{const{data:P,pagination:M}=a.body;return{data:P,pagination:M}}),(0,i.b)(()=>this.isLoadingMore=!1),(0,_.K)(a=>(0,u._)(a))).toPromise()}addlot(c){return this.rest.post("/lots",c).pipe((0,p.U)(a=>{const{data:P}=a.body;return P}),(0,_.K)(a=>(0,u._)(a))).toPromise()}submitLot(c){return this.rest.post({endpoint:"/lots/submit",params:{lotId:c.lotId,businessName:c.businessName,email:c.email}},c.formData,!1,!0).pipe((0,p.U)(a=>{const{data:P}=a.body;return P}),(0,_.K)(a=>(0,u._)(a))).toPromise()}}return g.\u0275fac=function(c){return new(c||g)(f.LFG(t.v))},g.\u0275prov=f.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),g})()},9:(v,x,s)=>{s.d(x,{O:()=>p,q:()=>_});const p=i=>{const m=Math.round(i);return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}).format(m)},_=(i,m)=>parseFloat((m*(i/100)).toFixed(0))},9340:(v,x,s)=>{s.r(x),s.d(x,{LotListPageModule:()=>H});var p=s(6895),_=s(4719),i=s(2478),m=s(1065),u=s(5861),f=s(9),t=s(7631);let b=(()=>{class l{constructor(n){this.modalCtrl=n,this.fullness=100}ngOnInit(){}add(){return this.modalCtrl.dismiss({qty:this.qty,fullness:this.fullness,price:this.price},"add")}onPriceKeyDown(n){("e"===n.key||"."===n.key)&&n.preventDefault()}onInputPrice(n){this.fullness=100,this.fullPrice=0}onBlurPrice(n){this.fullPrice=n.target.value}onChangeFullness(){this.price=(0,f.q)(this.fullness,this.fullPrice)}cancel(){return this.modalCtrl.dismiss(null,"cancel")}}return l.\u0275fac=function(n){return new(n||l)(t.Y36(i.IN))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-add-fullness"]],decls:42,vars:5,consts:[[1,"lot-content"],["mode","ios"],["slot","start"],[1,"paragraph-text-14-bold"],["slot","end"],["color","light",3,"click"],["name","close-outline"],["position","stacked",1,"black-500","paragraph-text-14-bold"],["type","number","placeholder","Input quantity here",1,"lot-input",3,"ngModel","ngModelChange"],["placeholder","Input unit price","type","number",1,"lot-input",3,"ngModel","ngModelChange","keydown","ionBlur","ionInput"],[1,"ion-align-items-center","lot-range"],["mode","ios","min","0","max","100","step","10",3,"pin","ngModel","ngModelChange","ionChange"],["slot","start",1,"black-500"],["slot","end",1,"black-500"],[1,"modal-footer"],[1,"footer-button"],["color","dark",1,"ion-text-capitalize",3,"click"],[1,"add-lot-button",3,"click"],[1,"white"]],template:function(n,o){1&n&&(t.TgZ(0,"ion-content",0)(1,"ion-toolbar",1)(2,"ion-buttons",2)(3,"ion-text",3),t._uU(4,"Add Fullness"),t.qZA()(),t.TgZ(5,"ion-buttons",4)(6,"ion-button",5),t.NdJ("click",function(){return o.cancel()}),t._UZ(7,"ion-icon",6),t.qZA()()(),t.TgZ(8,"ion-grid")(9,"ion-row")(10,"ion-col")(11,"ion-label",7),t._uU(12,"Quantity"),t.qZA()()(),t.TgZ(13,"ion-row")(14,"ion-col")(15,"ion-input",8),t.NdJ("ngModelChange",function(r){return o.qty=r}),t.qZA()()(),t.TgZ(16,"ion-row")(17,"ion-col")(18,"ion-label",7),t._uU(19,"Item Price"),t.qZA()()(),t.TgZ(20,"ion-row")(21,"ion-col")(22,"ion-input",9),t.NdJ("ngModelChange",function(r){return o.price=r})("keydown",function(r){return o.onPriceKeyDown(r)})("ionBlur",function(r){return o.onBlurPrice(r)})("ionInput",function(r){return o.onInputPrice(r)}),t.qZA()()(),t.TgZ(23,"ion-row")(24,"ion-col")(25,"ion-label",7),t._uU(26,"Item Fullness %"),t.qZA()()(),t.TgZ(27,"ion-row")(28,"ion-col")(29,"div",10)(30,"ion-range",11),t.NdJ("ngModelChange",function(r){return o.fullness=r})("ionChange",function(){return o.onChangeFullness()}),t.TgZ(31,"ion-text",12),t._uU(32,"0"),t.qZA(),t.TgZ(33,"ion-text",13),t._uU(34,"100"),t.qZA()()()()()(),t.TgZ(35,"ion-footer",14)(36,"div",15)(37,"ion-button",16),t.NdJ("click",function(){return o.cancel()}),t._uU(38,"Cancel"),t.qZA(),t.TgZ(39,"ion-button",17),t.NdJ("click",function(){return o.add()}),t.TgZ(40,"ion-text",18),t._uU(41,"Add fullness"),t.qZA()()()()()),2&n&&(t.xp6(15),t.Q6J("ngModel",o.qty),t.xp6(7),t.Q6J("ngModel",o.price),t.xp6(8),t.Q6J("pin",!0)("ngModel",o.fullness),t.xp6(9),t.uIk("disabled",!o.price))},dependencies:[_.JJ,_.On,i.YG,i.Sm,i.wI,i.W2,i.fr,i.jY,i.gu,i.pK,i.Q$,i.I_,i.Nd,i.yW,i.sr,i.as,i.QI],styles:["ion-toolbar[_ngcontent-%COMP%]{--background: rgb(255, 255, 255);--color: rgb(0, 0, 0);padding:13px;border-bottom:1px solid #eff2f5}ion-input[_ngcontent-%COMP%]{--background: #fff;border-radius:12px;--padding-start: 10px;--padding-end: 10px;--color: #000}.lot-content[_ngcontent-%COMP%]::part(background){--background: #fff}.lot-input[_ngcontent-%COMP%]{--background: #f3f7f9}ion-item[_ngcontent-%COMP%]::part(native){border:0px}ion-label[_ngcontent-%COMP%]{padding-bottom:16px}.lot-range[_ngcontent-%COMP%]{display:flex;width:100%}ion-footer[_ngcontent-%COMP%]{position:relative;padding-top:48px}.footer-toolbar[_ngcontent-%COMP%]{position:relative}.footer-group-button[_ngcontent-%COMP%]{width:100%}.footer-button[_ngcontent-%COMP%]{position:absolute;top:15px;right:15px;bottom:5px;height:67px}.add-lot-button[_ngcontent-%COMP%]{--background: #000;text-transform:capitalize;height:40px}ion-range[_ngcontent-%COMP%]{padding-top:0!important}.modal-footer[_ngcontent-%COMP%]{border-top:1px solid #eff2f5}"]}),l})();var g=s(3710);function h(l,d){if(1&l){const n=t.EpF();t.TgZ(0,"div",17),t._UZ(1,"ion-img",18),t.TgZ(2,"ion-icon",19),t.NdJ("click",function(){t.CHM(n);const e=t.oxw();return t.KtG(e.onRemovePhotoGrade())}),t.qZA()()}if(2&l){const n=t.oxw();t.xp6(1),t.Q6J("src",n.currentPhoto.dataUrl)}}function c(l,d){if(1&l){const n=t.EpF();t.TgZ(0,"ion-button",20),t.NdJ("click",function(){t.CHM(n);const e=t.oxw();return t.KtG(e.uploadIdPhoto())}),t.TgZ(1,"div"),t._UZ(2,"ion-icon",21)(3,"br"),t.TgZ(4,"ion-text"),t._uU(5,"Add Photo"),t.qZA()()()}}let a=(()=>{class l{constructor(n,o){this.modalCtrl=n,this.photoService=o,this.businessName=""}ngOnInit(){}uploadIdPhoto(){var n=this;return(0,u.Z)(function*(){const o=yield n.photoService.promptPhoto();n.currentPhoto=o})()}onRemovePhotoGrade(){this.currentPhoto=null}cancel(){return this.modalCtrl.dismiss(null,"cancel")}submit(){return this.modalCtrl.dismiss({businessName:this.businessName,email:this.email,attachment:this.currentPhoto?this.photoService.dataURItoBlob(this.currentPhoto.dataUrl):""},"submit")}}return l.\u0275fac=function(n){return new(n||l)(t.Y36(i.IN),t.Y36(g.T))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-submit-lot"]],decls:38,vars:5,consts:[[1,"lot-content"],["mode","ios"],["slot","start"],[1,"paragraph-text-14-bold"],["slot","end"],["color","light",3,"click"],["name","close-outline"],["position","stacked",1,"black-500","paragraph-text-14-bold"],["placeholder","Input email here","type","email",1,"lot-input",3,"ngModel","ngModelChange"],["placeholder","Input bussiness name here",1,"lot-input",3,"ngModel","ngModelChange"],["class","current-photo-container",4,"ngIf"],["expand","block","color","dark","class","upload-button ion-margin-end",3,"click",4,"ngIf"],[1,"modal-footer"],[1,"footer-button"],["color","dark",1,"ion-text-capitalize",3,"click"],[1,"submit-lot-button",3,"click"],[1,"white"],[1,"current-photo-container"],[1,"id-photo","ion-margin-end",3,"src"],["name","trash","color","danger",1,"trash-icon",3,"click"],["expand","block","color","dark",1,"upload-button","ion-margin-end",3,"click"],["src","/assets/icon/add-photo.svg",1,"add-photo-icon"]],template:function(n,o){1&n&&(t.TgZ(0,"ion-content",0)(1,"ion-toolbar",1)(2,"ion-buttons",2)(3,"ion-text",3),t._uU(4,"Submit Lot"),t.qZA()(),t.TgZ(5,"ion-buttons",4)(6,"ion-button",5),t.NdJ("click",function(){return o.cancel()}),t._UZ(7,"ion-icon",6),t.qZA()()(),t.TgZ(8,"ion-grid")(9,"ion-row")(10,"ion-col")(11,"ion-label",7),t._uU(12,"Email"),t.qZA()()(),t.TgZ(13,"ion-row")(14,"ion-col")(15,"ion-input",8),t.NdJ("ngModelChange",function(r){return o.email=r}),t.qZA()()(),t.TgZ(16,"ion-row")(17,"ion-col")(18,"ion-label",7),t._uU(19,"Business Name"),t.qZA()()(),t.TgZ(20,"ion-row")(21,"ion-col")(22,"ion-input",9),t.NdJ("ngModelChange",function(r){return o.businessName=r}),t.qZA()()(),t.TgZ(23,"ion-row")(24,"ion-col")(25,"ion-label",7),t._uU(26,"Identification"),t.qZA()()(),t.TgZ(27,"ion-row")(28,"ion-col"),t.YNc(29,h,3,1,"div",10),t.YNc(30,c,6,0,"ion-button",11),t.qZA()()(),t.TgZ(31,"ion-footer",12)(32,"div",13)(33,"ion-button",14),t.NdJ("click",function(){return o.cancel()}),t._uU(34,"Cancel"),t.qZA(),t.TgZ(35,"ion-button",15),t.NdJ("click",function(){return o.submit()}),t.TgZ(36,"ion-text",16),t._uU(37,"Submit"),t.qZA()()()()()),2&n&&(t.xp6(15),t.Q6J("ngModel",o.email),t.xp6(7),t.Q6J("ngModel",o.businessName),t.xp6(7),t.Q6J("ngIf",o.currentPhoto),t.xp6(1),t.Q6J("ngIf",!o.currentPhoto),t.xp6(5),t.uIk("disabled",!o.email))},dependencies:[p.O5,_.JJ,_.On,i.YG,i.Sm,i.wI,i.W2,i.fr,i.jY,i.gu,i.Xz,i.pK,i.Q$,i.Nd,i.yW,i.sr,i.j9],styles:["ion-toolbar[_ngcontent-%COMP%]{--background: rgb(255, 255, 255);--color: rgb(0, 0, 0);padding:13px;border-bottom:1px solid #eff2f5}ion-input[_ngcontent-%COMP%]{--background: #fff;border-radius:12px;--padding-start: 10px;--padding-end: 10px;--color: #000}.lot-content[_ngcontent-%COMP%]::part(background){--background: #fff}.lot-input[_ngcontent-%COMP%]{--background: #f3f7f9}ion-item[_ngcontent-%COMP%]::part(native){border:0px}ion-label[_ngcontent-%COMP%]{padding-bottom:16px}.lot-range[_ngcontent-%COMP%]{display:flex;width:100%}ion-footer[_ngcontent-%COMP%]{position:relative;padding-top:48px}.footer-toolbar[_ngcontent-%COMP%]{position:relative}.footer-group-button[_ngcontent-%COMP%]{width:100%}.footer-button[_ngcontent-%COMP%]{position:absolute;top:15px;right:15px;bottom:5px;height:67px}.submit-lot-button[_ngcontent-%COMP%]{--background: #000;text-transform:capitalize;height:40px}.modal-footer[_ngcontent-%COMP%]{border-top:1px solid #eff2f5}.current-photo-container[_ngcontent-%COMP%]{position:relative}.trash-icon[_ngcontent-%COMP%]{position:absolute;top:2px;left:5px}.id-photo[_ngcontent-%COMP%]{width:104px;height:83px;object-fit:fit}.upload-button[_ngcontent-%COMP%]{width:104px;height:83px}"]}),l})();var P=s(4190),M=s(1253),I=s(1737),L=s(4850),Z=s(7221),A=s(1102);let F=(()=>{class l{constructor(n){this.rest=n}createItemFullness(n){return this.rest.post("/lotitemfullness",n).pipe((0,L.U)(o=>{const{data:e}=o.body;return e}),(0,Z.K)(o=>(0,I._)(o))).toPromise()}updateItemFullness(n){return this.rest.put("/lotitemfullness",n).pipe((0,L.U)(o=>{const{data:e}=o.body;return e}),(0,Z.K)(o=>(0,I._)(o))).toPromise()}removeItemFullness(n){return this.rest.delete(`/lotitemfullness/${n}`).pipe((0,L.U)(o=>{const{data:e}=o.body;return e}),(0,Z.K)(o=>(0,I._)(o))).toPromise()}}return l.\u0275fac=function(n){return new(n||l)(t.LFG(A.v))},l.\u0275prov=t.Yz7({token:l,factory:l.\u0275fac,providedIn:"root"}),l})();var k=s(5904),w=s(1687);function U(l,d){1&l&&(t.TgZ(0,"div"),t._UZ(1,"app-skeleton-list-loader"),t.qZA())}function S(l,d){if(1&l){const n=t.EpF();t.TgZ(0,"ion-icon",33),t.NdJ("click",function(){t.CHM(n);const e=t.oxw().$implicit,r=t.oxw(3);return t.KtG(r.updateQtyItemFullness(e,!0))}),t.qZA()}}function N(l,d){if(1&l){const n=t.EpF();t.TgZ(0,"ion-icon",34),t.NdJ("click",function(){t.CHM(n);const e=t.oxw().$implicit,r=t.oxw(3);return t.KtG(r.removeItemFullness(e.id))}),t.qZA()}}function E(l,d){if(1&l){const n=t.EpF();t.TgZ(0,"div",27)(1,"p",28),t._uU(2),t.qZA(),t.TgZ(3,"p",28),t._uU(4),t.qZA(),t.TgZ(5,"ion-icon",29),t.NdJ("click",function(){const r=t.CHM(n).$implicit,C=t.oxw(3);return t.KtG(C.updateQtyItemFullness(r,!1))}),t.qZA(),t.TgZ(6,"p",30),t._uU(7),t.qZA(),t.YNc(8,S,1,0,"ion-icon",31),t.YNc(9,N,1,0,"ion-icon",32),t.qZA()}if(2&l){const n=d.$implicit,o=t.oxw(3);t.xp6(2),t.hij("",n.fullnessPercentage||0,"%"),t.xp6(2),t.hij(" ",o.formatPrice(n.unitPrice||0)," "),t.xp6(3),t.hij("Qty: ",n.qty||0,""),t.xp6(1),t.Q6J("ngIf",!o.lot.isSubmitted),t.xp6(1),t.Q6J("ngIf",!o.lot.isSubmitted)}}function J(l,d){if(1&l){const n=t.EpF();t.TgZ(0,"ion-button",35),t.NdJ("click",function(){t.CHM(n);const e=t.oxw(3);return t.KtG(e.openModalFullness())}),t._uU(1,"Add New Fullness"),t.qZA()}}const D=function(){return{"object-fit":"cover"}},q=function(){return{"object-fit":"fill"}};function K(l,d){if(1&l&&(t.TgZ(0,"ion-accordion",11)(1,"ion-item",12)(2,"div",13),t._UZ(3,"img",14),t.TgZ(4,"div",15)(5,"p"),t._uU(6),t.qZA(),t.TgZ(7,"p",16),t._uU(8),t.qZA()()()(),t.TgZ(9,"div",17)(10,"div",18)(11,"div",19)(12,"p",20),t._uU(13,"% Full"),t.qZA(),t.TgZ(14,"p",20),t._uU(15,"Price"),t.qZA(),t._UZ(16,"p",21),t.TgZ(17,"p",22),t._uU(18,"Quantity"),t.qZA(),t._UZ(19,"p",23)(20,"p",24),t.qZA(),t.YNc(21,E,10,5,"div",25),t.YNc(22,J,2,0,"ion-button",26),t.qZA()()()),2&l){const n=d.$implicit,o=t.oxw(2);t.Q6J("value",n.id),t.xp6(3),t.Q6J("src",n.fileUrl||"/assets/cm-logo-home.svg",t.LSH)("ngStyle",n.fileUrl?t.DdM(8,D):t.DdM(9,q)),t.xp6(3),t.Oqu(n.converterName||"No Code"),t.xp6(2),t.AsE(" ",o.formatPrice(n.minUnitPrice||0)," - ",o.formatPrice(n.maxUnitPrice||0)," "),t.xp6(13),t.Q6J("ngForOf",o.lotItemsFullness),t.xp6(1),t.Q6J("ngIf",!o.lot.isSubmitted)}}function Q(l,d){if(1&l){const n=t.EpF();t.TgZ(0,"ion-accordion-group",9),t.NdJ("ionChange",function(e){t.CHM(n);const r=t.oxw();return t.KtG(r.accordionGroupChange(e))}),t.YNc(1,K,23,10,"ion-accordion",10),t.qZA()}if(2&l){const n=t.oxw();t.xp6(1),t.Q6J("ngForOf",n.lotItems)}}function B(l,d){if(1&l){const n=t.EpF();t.TgZ(0,"ion-button",44),t.NdJ("click",function(){t.CHM(n);const e=t.oxw(3);return t.KtG(e.submitLot())}),t._UZ(1,"ion-icon",45),t._uU(2," Submit "),t.qZA()}}function Y(l,d){if(1&l&&(t.TgZ(0,"div",40)(1,"ion-button",41),t._UZ(2,"ion-icon",42),t._uU(3," Add Code "),t.qZA(),t.YNc(4,B,3,0,"ion-button",43),t.qZA()),2&l){const n=t.oxw(2);t.xp6(4),t.Q6J("ngIf",n.canInvoice)}}function j(l,d){if(1&l&&(t.TgZ(0,"div",36)(1,"div",37)(2,"p",38),t._uU(3),t.qZA(),t.TgZ(4,"p"),t._uU(5),t.qZA(),t.TgZ(6,"p"),t._uU(7),t.qZA(),t.TgZ(8,"p"),t._uU(9),t.qZA()(),t.YNc(10,Y,5,1,"div",39),t.qZA()),2&l){const n=t.oxw();t.xp6(3),t.Oqu(n.lot.lotName||"No lot name"),t.xp6(2),t.hij("Quantity: ",n.lot.quantity||0,""),t.xp6(2),t.hij("Average: ",n.formatPrice(n.lot.average||0),""),t.xp6(2),t.hij("Total: ",n.formatPrice(n.lot.total||0),""),t.xp6(1),t.Q6J("ngIf",!n.lot.isSubmitted)}}function G(l,d){if(1&l){const n=t.EpF();t.TgZ(0,"ion-content",46)(1,"ion-toolbar",47)(2,"ion-buttons",1)(3,"ion-text",48),t._uU(4,"Add a Code"),t.qZA()(),t.TgZ(5,"ion-buttons",49)(6,"ion-button",50),t.NdJ("click",function(){t.CHM(n),t.oxw();const e=t.MAs(12);return t.KtG(e.dismiss())}),t._UZ(7,"ion-icon",51),t.qZA()()(),t.TgZ(8,"ion-grid")(9,"ion-row")(10,"ion-col")(11,"ion-label",52),t._uU(12,"Code"),t.qZA()()(),t.TgZ(13,"ion-row")(14,"ion-col")(15,"ion-input",53),t.NdJ("ngModelChange",function(e){t.CHM(n);const r=t.oxw();return t.KtG(r.codeName=e)}),t.qZA()()(),t.TgZ(16,"ion-row")(17,"ion-col")(18,"ion-label",52),t._uU(19,"Item Price"),t.qZA()()(),t.TgZ(20,"ion-row")(21,"ion-col")(22,"ion-input",54),t.NdJ("ngModelChange",function(e){t.CHM(n);const r=t.oxw();return t.KtG(r.price=e)})("keydown",function(e){t.CHM(n);const r=t.oxw();return t.KtG(r.onPriceKeyDown(e))})("ionBlur",function(e){t.CHM(n);const r=t.oxw();return t.KtG(r.onBlurPrice(e))})("ionInput",function(){t.CHM(n);const e=t.oxw();return t.KtG(e.onInputPrice())}),t.qZA()()(),t.TgZ(23,"ion-row")(24,"ion-col")(25,"ion-label",52),t._uU(26,"Item Fullness %"),t.qZA()()(),t.TgZ(27,"ion-row")(28,"ion-col")(29,"ion-range",55),t.NdJ("ngModelChange",function(e){t.CHM(n);const r=t.oxw();return t.KtG(r.fullness=e)})("ionChange",function(){t.CHM(n);const e=t.oxw();return t.KtG(e.onChangeFullness())}),t.TgZ(30,"ion-text",56),t._uU(31,"0"),t.qZA(),t.TgZ(32,"ion-text",57),t._uU(33,"100"),t.qZA()()()()(),t.TgZ(34,"ion-footer",58)(35,"div",59)(36,"ion-button",60),t.NdJ("click",function(){t.CHM(n),t.oxw();const e=t.MAs(12);return t.KtG(e.dismiss())}),t.TgZ(37,"ion-text",61),t._uU(38,"Cancel"),t.qZA()(),t.TgZ(39,"ion-button",62),t.NdJ("click",function(){t.CHM(n);const e=t.oxw();return t.KtG(e.addCode())}),t.TgZ(40,"ion-text",63),t._uU(41,"Add to Lot"),t.qZA()()()()()}if(2&l){const n=t.oxw();t.xp6(15),t.Q6J("ngModel",n.codeName),t.xp6(7),t.Q6J("ngModel",n.price),t.xp6(7),t.Q6J("ngModel",n.fullness),t.uIk("disabled",!n.price),t.xp6(10),t.uIk("disabled",!n.codeName||!n.price)}}const z=[{path:"",component:(()=>{class l{constructor(n,o,e,r,C,O,y,T,$){this.lotsService=n,this.lotItemsService=o,this.itemFullnessService=e,this.modalCtrl=r,this.loadingCtrl=C,this.alertCtrl=O,this.accountService=y,this.router=T,this.toastCtrl=$,this.lotItems=[],this.lotItemsFullness=[],this.lotItem2Fullness={},this.isLoading=!1,this.fullness=100,this.codeName="",this.isModalActive=!1}ngOnInit(){this.onLoad()}onLoad(){var n=this;return(0,u.Z)(function*(){n.canInvoice=n.accountService.currentUser.canInvoice,n.lot=n.lotsService.selectedLot,yield n.fetchLot(),yield n.fetchLotCodes(),n.lotItems.forEach(function(){var o=(0,u.Z)(function*(e){const r=yield n.lotItemsService.lotItemsFullness(e.id.toString(),{pageNumber:1,pageSize:66955359});n.lotItem2Fullness[e.id]=r});return function(e){return o.apply(this,arguments)}}())})()}fetchLot(n=!0){var o=this;return(0,u.Z)(function*(){o.isLoading=n;const e=yield o.lotsService.inventorySummary({pageNumber:1,pageSize:1,searchCategory:"lotId",searchQuery:o.lot.lotId||o.lot.id});o.lot=e.data[0],o.isLoading=!1})()}fetchLotCodes(){var n=this;return(0,u.Z)(function*(){n.isLoading=!0,n.lotItems=yield n.lotItemsService.lotItems(n.lot.lotId||n.lot.id,{pageNumber:1,pageSize:66955359}),n.isLoading=!1,console.log(n.lotItems)})()}openModalFullness(){var n=this;return(0,u.Z)(function*(){const o=yield n.modalCtrl.create({component:b,cssClass:"fullness-modal",animated:!1});n.isModalActive=!0,yield o.present();const{data:e,role:r}=yield o.onWillDismiss();if(n.isModalActive=!1,"add"===r){const C=yield n.loadingCtrl.create({message:"Adding to code ..."});C.present(),yield n.itemFullnessService.createItemFullness({fullnessPercentage:e.fullness,qty:e.qty,unitPrice:e.price,lotItemId:n.lotItemId}),n.lotItemsFullness=yield n.lotItemsService.lotItemsFullness(n.lotItemId,{pageNumber:1,pageSize:66955359}),n.fetchLot(),C.dismiss(),yield n.onLoad()}})()}accordionGroupChange(n){var o=this;return(0,u.Z)(function*(){const e=n,{detail:r}=e;r.value&&r.value in o.lotItem2Fullness?(o.lotItemId=r.value,o.lotItemsFullness=o.lotItem2Fullness[r.value]):r.value&&(o.lotItemId=r.value,o.lotItemsFullness=yield o.lotItemsService.lotItemsFullness(r.value,{pageNumber:1,pageSize:66955359}))})()}addCode(){var n=this;return(0,u.Z)(function*(){const o=yield n.loadingCtrl.create({message:"Adding to code ..."});o.present(),yield n.lotItemsService.addCodeToLot({lotId:n.lot.lotId||n.lot.id,converterName:n.codeName,originalPrice:n.price,fullnessPercentage:n.fullness}),yield n.fetchLot(),yield n.fetchLotCodes(),n.modalCtrl.dismiss(),o.dismiss()})()}removeItemFullness(n){var o=this;return(0,u.Z)(function*(){"confirm"===(yield o.presentConfirmationDelete())&&(yield o.itemFullnessService.removeItemFullness(n))&&(o.lotItemsFullness=o.lotItemsFullness.filter(C=>C.id!==n),o.lotItemsFullness.length||(o.fetchLot(),o.fetchLotCodes()))})()}updateQtyItemFullness(n,o){var e=this;return(0,u.Z)(function*(){const r=o?n.qty+1:n.qty-1;r<1?e.removeItemFullness(n.id):(n.qty=r,e.lotItemsFullness=e.lotItemsFullness.map(C=>C.id===n.id?n:C),yield e.itemFullnessService.updateItemFullness({id:n.id,fullnessPercentage:n.fullnessPercentage,lotItemId:n.lotItemId,unitPrice:n.unitPrice,qty:n.qty}),e.fetchLot(!1))})()}presentConfirmationDelete(){var n=this;return(0,u.Z)(function*(){const o=yield n.alertCtrl.create({header:"Are you sure you want to delete ?",cssClass:"confirmation-alert",buttons:[{text:"Cancel",role:"cancel"},{text:"Delete",role:"confirm"}]});yield o.present();const{role:e}=yield o.onDidDismiss();return e})()}submitLot(){var n=this;return(0,u.Z)(function*(){const o=yield n.modalCtrl.create({component:a,cssClass:"submit-lot-modal",animated:!1});yield o.present();const{data:e,role:r}=yield o.onWillDismiss();if("submit"===r){const C=yield n.loadingCtrl.create({message:"Submitting lot ..."});C.present();const O=new FormData;O.append("attachment",e.attachment),(yield n.lotsService.submitLot({lotId:n.lot.lotId||n.lot.id,businessName:e.businessName,email:e.email,formData:O}))&&((yield n.toastCtrl.create({message:"Successfully submitted lot.",duration:2e3,color:"success"})).present(),n.router.navigate(["/tabs/tabs/inventory"])),C.dismiss()}})()}onPriceKeyDown(n){("e"===n.key||"."===n.key)&&n.preventDefault()}onInputPrice(){this.fullness=100,this.fullPrice=0}onBlurPrice(n){this.fullPrice=n.target.value}onChangeFullness(){this.price=(0,f.q)(this.fullness,this.fullPrice)}reset(){this.fullness=100,this.codeName="",this.price=null,this.fullPrice=null}formatPrice(n){return(0,f.O)(n)}}return l.\u0275fac=function(n){return new(n||l)(t.Y36(P.s),t.Y36(M.e),t.Y36(F),t.Y36(i.IN),t.Y36(i.HT),t.Y36(i.Br),t.Y36(k.B),t.Y36(m.F0),t.Y36(i.yF))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-lot-list"]],decls:14,vars:5,consts:[["mode","ios"],["slot","start"],["mode","md"],[4,"ngIf"],["class","lot-items",3,"ionChange",4,"ngIf"],[1,"spacer"],["class","footer",4,"ngIf"],["trigger","lot-modal",3,"animated","didDismiss"],["modal",""],[1,"lot-items",3,"ionChange"],["class","lot-item",3,"value",4,"ngFor","ngForOf"],[1,"lot-item",3,"value"],["slot","header",1,"ion-no-padding","ion-no-margin","custom-carrot"],[1,"cont"],[1,"lot-img",3,"src","ngStyle"],[1,"header-text"],[1,"bold"],["slot","content",1,"outer"],[1,"content"],[1,"row"],[1,"flex","bold"],[1,"subtract"],[1,"qty","bold","center"],[1,"add"],[1,"trash"],["class","row dashed",4,"ngFor","ngForOf"],["class","bold","expand","block",3,"click",4,"ngIf"],[1,"row","dashed"],[1,"flex"],["src","./assets/icon/minus-qty.svg",1,"subtract",3,"click"],[1,"qty","bold"],["class","add","src","./assets/icon/add-qty.svg",3,"click",4,"ngIf"],["class","trash","name","trash","color","danger",3,"click",4,"ngIf"],["src","./assets/icon/add-qty.svg",1,"add",3,"click"],["name","trash","color","danger",1,"trash",3,"click"],["expand","block",1,"bold",3,"click"],[1,"footer"],[1,"f1"],[1,"lot-name"],["class","f2",4,"ngIf"],[1,"f2"],["color","dark","id","lot-modal",1,"add-code","ion-text-capitalize"],["slot","start","src","./assets/icon/add-code.svg"],["class","submit ion-text-capitalize","color","dark",3,"click",4,"ngIf"],["color","dark",1,"submit","ion-text-capitalize",3,"click"],["slot","start","name","checkmark"],[1,"lot-content"],["mode","ios",1,"add-code-toolbar"],[1,"paragraph-text-14-bold"],["slot","end"],["color","light",3,"click"],["name","close-outline"],["position","stacked",1,"black-500","paragraph-text-14-bold"],["placeholder","Input code name",1,"lot-input",3,"ngModel","ngModelChange"],["placeholder","Input unit price","type","number",1,"lot-input",3,"ngModel","ngModelChange","keydown","ionBlur","ionInput"],["mode","ios","pin","true","min","0","max","100","step","10",3,"ngModel","ngModelChange","ionChange"],["slot","start",1,"black-500"],["slot","end",1,"black-500"],[1,"modal-footer"],[1,"footer-button"],["color","dark",1,"ion-text-capitalize",3,"click"],[1,"paragraph-text-16-semibold"],[1,"add-lot-button",3,"click"],[1,"paragraph-text-16-semibold","white"]],template:function(n,o){1&n&&(t.TgZ(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-buttons",1),t._UZ(3,"ion-back-button",2),t.qZA(),t.TgZ(4,"ion-title"),t._uU(5),t.qZA()()(),t.TgZ(6,"ion-content"),t.YNc(7,U,2,0,"div",3),t.YNc(8,Q,2,1,"ion-accordion-group",4),t._UZ(9,"div",5),t.YNc(10,j,11,5,"div",6),t.TgZ(11,"ion-modal",7,8),t.NdJ("didDismiss",function(){return o.reset()}),t.YNc(13,G,42,5,"ng-template"),t.qZA()()),2&n&&(t.xp6(5),t.Oqu(o.lot.lotName),t.xp6(2),t.Q6J("ngIf",o.isLoading),t.xp6(1),t.Q6J("ngIf",!o.isLoading),t.xp6(2),t.Q6J("ngIf",!o.isModalActive),t.xp6(1),t.Q6J("animated",!1))},dependencies:[p.sg,p.O5,p.PC,_.JJ,_.On,i.We,i.eh,i.oU,i.YG,i.Sm,i.wI,i.W2,i.fr,i.jY,i.Gu,i.gu,i.pK,i.Ie,i.Q$,i.I_,i.Nd,i.yW,i.wd,i.sr,i.ki,i.as,i.QI,i.j9,i.cs,w.f],styles:["ion-title[_ngcontent-%COMP%]{text-transform:uppercase;font-size:18px}ion-range[_ngcontent-%COMP%]{padding-top:0}.new-fullness-button[_ngcontent-%COMP%]{--background: #000;--border-radius: 12px;height:46px;text-transform:capitalize}.lot-img[_ngcontent-%COMP%]{width:100px;height:100%}ion-input[_ngcontent-%COMP%]{--background: #fff;border-radius:12px;--padding-start: 10px;--padding-end: 10px;--color: #000}ion-modal[_ngcontent-%COMP%]{--height: 421px;--border-radius: 16px;--box-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--background: #fff;overflow:auto}ion-modal[_ngcontent-%COMP%]::part(backdrop){background:#000000;opacity:.5}.lot-content[_ngcontent-%COMP%]::part(background){--background: #fff}ion-modal[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background: rgb(255, 255, 255);--color: rgb(0, 0, 0)}.add-code-toolbar[_ngcontent-%COMP%]{padding:13px;border-bottom:1px solid #eff2f5}.lot-input[_ngcontent-%COMP%]{--background: #f3f7f9}ion-item[_ngcontent-%COMP%]::part(native){border:0px}ion-label[_ngcontent-%COMP%]{padding-bottom:16px}.lot-range[_ngcontent-%COMP%]{display:flex;width:100%}ion-modal[_ngcontent-%COMP%]::part(content){--width: 90%;max-width:512px;--border-radius: 6px}ion-footer[_ngcontent-%COMP%]{line-height:14px;position:relative}.footer-toolbar[_ngcontent-%COMP%]{position:relative}.footer-group-button[_ngcontent-%COMP%]{width:100%}.footer-button[_ngcontent-%COMP%]{position:absolute;top:15px;right:15px;bottom:5px;height:67px}.add-lot-button[_ngcontent-%COMP%]{--background: #000;text-transform:capitalize;height:40px}.border-dash-line[_ngcontent-%COMP%]{border-bottom:1px dashed}.modal-footer[_ngcontent-%COMP%]{border-top:1px solid #eff2f5}.col-fix-width[_ngcontent-%COMP%]{flex:auto!important;max-width:none!important;width:100px!important}.lot-items[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;margin:16px}.lot-item[_ngcontent-%COMP%]{border-radius:12px;box-shadow:0 4px 8px #ffffff29}.lot-item[_ngcontent-%COMP%]   .cont[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex:1;height:75px}.lot-item[_ngcontent-%COMP%]   .lot-img[_ngcontent-%COMP%]{width:120px;height:100%}.lot-item[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]{display:flex;flex-flow:column;justify-content:center;align-items:center;flex:1;margin:0 28px 0 16px}.lot-item[_ngcontent-%COMP%]   .header-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.lot-item[_ngcontent-%COMP%]   .outer[_ngcontent-%COMP%]{padding:16px}.lot-item[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px}.lot-item[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{display:flex;align-items:center}.lot-item[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .flex[_ngcontent-%COMP%]{flex:2}.lot-item[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .qty[_ngcontent-%COMP%]{width:60px;flex:3;text-align:center}.lot-item[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .subtract[_ngcontent-%COMP%]{width:18px}.lot-item[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .add[_ngcontent-%COMP%]{width:20px}.lot-item[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]   .trash[_ngcontent-%COMP%]{width:20px;margin:0 0 0 16px}.lot-item[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .dashed[_ngcontent-%COMP%]{border-bottom:1px dashed}.lot-item[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{--background: black;margin:16px}.lot-item[_ngcontent-%COMP%]   .bold[_ngcontent-%COMP%]{font-weight:700}.lot-item[_ngcontent-%COMP%]::part(header){background:linear-gradient(to left,white,white 55px,black 55px)}.lot-item[_ngcontent-%COMP%]::part(content){background-color:#fff;color:#000}.spacer[_ngcontent-%COMP%]{height:118px}.footer[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;background:#000;bottom:0;position:fixed;height:118px;width:100vw}.footer[_ngcontent-%COMP%]   .f1[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin:16px;font-size:12px}.footer[_ngcontent-%COMP%]   .f1[_ngcontent-%COMP%]   .lot-name[_ngcontent-%COMP%]{font-size:16px;font-weight:700;margin-bottom:8px}.footer[_ngcontent-%COMP%]   .f2[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:flex-end;flex:1;margin-right:16px}.footer[_ngcontent-%COMP%]   .f2[_ngcontent-%COMP%]   .add-code[_ngcontent-%COMP%]{font-weight:525;margin-right:6px}.footer[_ngcontent-%COMP%]   .f2[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]{font-weight:525}"]}),l})()}];let W=(()=>{class l{}return l.\u0275fac=function(n){return new(n||l)},l.\u0275mod=t.oAB({type:l}),l.\u0275inj=t.cJS({imports:[m.Bz.forChild(z),m.Bz]}),l})();var R=s(1075);let H=(()=>{class l{}return l.\u0275fac=function(n){return new(n||l)},l.\u0275mod=t.oAB({type:l}),l.\u0275inj=t.cJS({imports:[p.ez,_.u5,i.Pc,W,R.m]}),l})()},1075:(v,x,s)=>{s.d(x,{m:()=>u});var p=s(6895),_=s(4719),i=s(2478),m=s(7631);let u=(()=>{class f{}return f.\u0275fac=function(b){return new(b||f)},f.\u0275mod=m.oAB({type:f}),f.\u0275inj=m.cJS({imports:[p.ez,_.u5,i.Pc]}),f})()}}]);