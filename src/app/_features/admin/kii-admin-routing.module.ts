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


const routes: Routes = [
  { path: '',  component: KiiAdminMenuComponent },
  { path: 'menu',  component: KiiAdminMenuComponent },
  { path: 'settings',  component: KiiAdminSettingsComponent },
  { path: 'content', component:KiiAdminContentComponent},
  { path: 'emails', component:KiiAdminEmailComponent},
  { path: 'notifications', component: KiiAdminNotificationComponent},
  { path: 'stats', component:KiiAdminStatsComponent},
  { path: 'users', component:KiiAdminUsersComponent},
  { path: 'popup', component:KiiAdminPopupComponent},
  { path: 'disk', component:KiiAdminDiskComponent},
  { path: 'chats', component:KiiAdminChatsComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KiiAdminRoutingModule { }
