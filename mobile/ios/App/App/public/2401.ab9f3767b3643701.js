"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2401],{2401:(A,c,t)=>{t.r(c),t.d(c,{ChangePasswordPageModule:()=>y});var g=t(6895),n=t(4719),r=t(2478),m=t(1065),P=t(5861),p=t(1252),o=t(7631),w=t(5904);function h(a,d){1&a&&(o.TgZ(0,"small"),o._uU(1," Please enter old password. "),o.qZA())}function f(a,d){1&a&&(o.TgZ(0,"small"),o._uU(1," Please enter new password. "),o.qZA())}function Z(a,d){1&a&&(o.TgZ(0,"small"),o._uU(1," Please enter confirm password. "),o.qZA())}function C(a,d){1&a&&(o.TgZ(0,"small"),o._uU(1," Password mismatch."),o.qZA())}const v=[{path:"",component:(()=>{class a{constructor(s,e,i,l){this.formBuilder=s,this.accountService=e,this.loadingCtrl=i,this.toastCtrl=l}get passwordMatchError(){return this.changePasswordForm.getError("mismatch")&&this.changePasswordForm.get("confirm")?.touched}ngOnInit(){this.changePasswordForm=this.formBuilder.group({old:["",[n.kI.required]],password:["",[n.kI.required]],confirm:["",[n.kI.required]]},{validators:p.d.matchValidator("password","confirm")})}save(){var s=this;return(0,P.Z)(function*(){if(s.changePasswordForm.valid){const e=s.accountService.currentUser.id,{password:i,old:l}=s.changePasswordForm.value,u=yield s.loadingCtrl.create({message:"Updating password ..."}),F=yield s.toastCtrl.create({message:"Successfully update password.",duration:2e3,color:"success"});u.present(),(yield s.accountService.updatePassword({id:e,oldPassword:l,newPassword:i,confirmPassword:i}))&&F.present(),u.dismiss()}})()}}return a.\u0275fac=function(s){return new(s||a)(o.Y36(n.qu),o.Y36(w.B),o.Y36(r.HT),o.Y36(r.yF))},a.\u0275cmp=o.Xpm({type:a,selectors:[["app-change-password"]],decls:32,vars:5,consts:[["mode","ios"],["slot","start"],["mode","md"],[1,"ion-padding-vertical",3,"formGroup"],["position","floating"],["formControlName","old","type","password"],[1,"ion-padding-bottom","ion-margin-bottom"],["color","danger"],[4,"ngIf"],["formControlName","password","type","password"],["formControlName","confirm","type","password"],["expand","block","color","dark",1,"ion-margin",3,"click"]],template:function(s,e){1&s&&(o.TgZ(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-buttons",1),o._UZ(3,"ion-back-button",2),o.qZA(),o.TgZ(4,"ion-title"),o._uU(5,"Change Password"),o.qZA()()(),o.TgZ(6,"ion-content")(7,"form",3)(8,"ion-item")(9,"ion-label",4),o._uU(10,"Old Password"),o.qZA(),o._UZ(11,"ion-input",5),o.qZA(),o.TgZ(12,"div",6)(13,"ion-text",7),o.YNc(14,h,2,0,"small",8),o.qZA()(),o.TgZ(15,"ion-item")(16,"ion-label",4),o._uU(17,"New Password"),o.qZA(),o._UZ(18,"ion-input",9),o.qZA(),o.TgZ(19,"div",6)(20,"ion-text",7),o.YNc(21,f,2,0,"small",8),o.qZA()(),o.TgZ(22,"ion-item")(23,"ion-label",4),o._uU(24,"Confirm New Password"),o.qZA(),o._UZ(25,"ion-input",10),o.qZA(),o.TgZ(26,"div",6)(27,"ion-text",7),o.YNc(28,Z,2,0,"small",8),o.YNc(29,C,2,0,"small",8),o.qZA()(),o.TgZ(30,"ion-button",11),o.NdJ("click",function(){return e.save()}),o._uU(31,"Save"),o.qZA()()()),2&s&&(o.xp6(7),o.Q6J("formGroup",e.changePasswordForm),o.xp6(7),o.Q6J("ngIf",!e.changePasswordForm.get("old").valid&&(e.changePasswordForm.get("old").dirty||e.changePasswordForm.get("old").touched)),o.xp6(7),o.Q6J("ngIf",!e.changePasswordForm.get("password").valid&&(e.changePasswordForm.get("password").dirty||e.changePasswordForm.get("password").touched)),o.xp6(7),o.Q6J("ngIf",!e.passwordMatchError&&!e.changePasswordForm.get("confirm").valid&&(e.changePasswordForm.get("confirm").dirty||e.changePasswordForm.get("confirm").touched)),o.xp6(1),o.Q6J("ngIf",e.passwordMatchError))},dependencies:[g.O5,n._Y,n.JJ,n.JL,r.oU,r.YG,r.Sm,r.W2,r.Gu,r.pK,r.Ie,r.Q$,r.yW,r.wd,r.sr,r.j9,r.cs,n.sg,n.u],styles:["ion-title[_ngcontent-%COMP%]{text-transform:uppercase;font-size:18px}"]}),a})()}];let T=(()=>{class a{}return a.\u0275fac=function(s){return new(s||a)},a.\u0275mod=o.oAB({type:a}),a.\u0275inj=o.cJS({imports:[m.Bz.forChild(v),m.Bz]}),a})(),y=(()=>{class a{}return a.\u0275fac=function(s){return new(s||a)},a.\u0275mod=o.oAB({type:a}),a.\u0275inj=o.cJS({imports:[g.ez,n.u5,r.Pc,n.UX,T]}),a})()}}]);