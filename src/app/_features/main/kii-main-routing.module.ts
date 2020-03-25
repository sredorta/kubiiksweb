import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KiiHomeComponent } from './components/kii-home/kii-home.component';
import { KiiAppComponent } from './components/kii-app/kii-app.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: KiiHomeComponent,
  },  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],//, scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class KiiMainRoutingModule {
  constructor()
 {
 }

 }
