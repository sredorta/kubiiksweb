import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KiiAdminMenuComponent } from './routes/kii-admin-menu/kii-admin-menu.component';
import { KiiAdminStatsComponent } from './routes/kii-admin-stats/kii-admin-stats.component';
import { KiiAdminUsersComponent } from './routes/kii-admin-users/kii-admin-users.component';
import { KiiAdminPopupComponent } from './routes/kii-admin-popup/kii-admin-popup.component';
import { KiiAdminSettingsComponent } from './routes/kii-admin-settings/kii-admin-settings.component';
import { KiiAdminContentComponent } from './routes/kii-admin-content/kii-admin-content.component';
import { KiiAdminEmailComponent } from './routes/kii-admin-email/kii-admin-email.component';
import { KiiAdminDiskComponent } from './routes/kii-admin-disk/kii-admin-disk.component';
import { KiiAdminNotificationComponent } from './routes/kii-admin-notification/kii-admin-notification.component';
import { KiiAdminChatsComponent } from './routes/kii-admin-chats/kii-admin-chats.component';
import { RoleGuard } from '../main/guards/role.guard';


const routes: Routes = [
  { path: '',  component: KiiAdminMenuComponent },
  { path: 'menu',  component: KiiAdminMenuComponent, canActivate: [RoleGuard],data: {roles:["kubiiks","admin","content","email","notification","stats","users","chat","blog"]} },
  { path: 'settings',  component: KiiAdminSettingsComponent, canActivate: [RoleGuard],data: {roles:["kubiiks"]}},
  { path: 'content', component:KiiAdminContentComponent, canActivate: [RoleGuard],data: {roles:["blog","content","admin"]}},
  { path: 'emails', component:KiiAdminEmailComponent,canActivate: [RoleGuard],data: {roles:["email","admin"]}},
  { path: 'notifications', component: KiiAdminNotificationComponent,canActivate: [RoleGuard],data: {roles:["notification","admin"]}},
  { path: 'stats', component:KiiAdminStatsComponent, canActivate: [RoleGuard],data: {roles:["stats","admin"]}},
  { path: 'users', component:KiiAdminUsersComponent, canActivate: [RoleGuard],data: {roles:["users","admin"]}},
  { path: 'popup', component:KiiAdminPopupComponent, canActivate: [RoleGuard],data: {roles:["content","admin"]}},
  { path: 'disk', component:KiiAdminDiskComponent, canActivate: [RoleGuard],data: {roles:["admin"]}},
  { path: 'chats', component:KiiAdminChatsComponent, canActivate: [RoleGuard],data: {roles:["chat","admin"]}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KiiAdminRoutingModule { }
