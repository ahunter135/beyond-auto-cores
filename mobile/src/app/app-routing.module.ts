import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'generics',
    loadChildren: () => import('./generics/generics.module').then( m => m.GenericsPageModule)
  },
  {
    path: 'lot-list',
    loadChildren: () => import('./lot-list/lot-list.module').then( m => m.LotListPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'generic-view',
    loadChildren: () => import('./generic-view/generic-view.module').then( m => m.GenericViewPageModule)
  },
  {
    path: 'margin',
    loadChildren: () => import('./margin/margin.module').then( m => m.MarginPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'notification-view',
    loadChildren: () => import('./notification-view/notification-view.module').then( m => m.NotificationViewPageModule)
  },
  {
    path: 'photo-grade-view',
    loadChildren: () => import('./photo-grade-view/photo-grade-view.module').then( m => m.PhotoGradeViewPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
