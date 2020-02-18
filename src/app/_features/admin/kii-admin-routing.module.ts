import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KiiAdminMenuComponent } from './routes/kii-admin-menu/kii-admin-menu.component';
import { KiiAdminStatsComponent } from './routes/kii-admin-stats/kii-admin-stats.component';
import { KiiAdminUsersComponent } from './routes/kii-admin-users/kii-admin-users.component';
import { KiiAdminPopupComponent } from './routes/kii-admin-popup/kii-admin-popup.component';
import { KiiAdminSettingsComponent } from './routes/kii-admin-settings/kii-admin-settings.component';
import { KiiAdminContentComponent } from './routes/kii-admin-content/kii-admin-content.component';


const routes: Routes = [
  { path: '',  component: KiiAdminMenuComponent },
  { path: 'menu',  component: KiiAdminMenuComponent },
  { path: 'settings',  component: KiiAdminSettingsComponent },
  { path: 'stats', component:KiiAdminStatsComponent},
  { path: 'users', component:KiiAdminUsersComponent},
  { path: 'popup', component:KiiAdminPopupComponent},
  { path: 'content', component:KiiAdminContentComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KiiAdminRoutingModule { }
