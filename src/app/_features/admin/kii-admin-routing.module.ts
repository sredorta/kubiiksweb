import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KiiAdminMenuComponent } from './routes/kii-admin-menu/kii-admin-menu.component';
import { KiiAdminStatsComponent } from './routes/kii-admin-stats/kii-admin-stats.component';


const routes: Routes = [
  { path: '',  component: KiiAdminMenuComponent },
  { path: 'menu',  component: KiiAdminMenuComponent },
  { path: 'stats', component:KiiAdminStatsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KiiAdminRoutingModule { }
