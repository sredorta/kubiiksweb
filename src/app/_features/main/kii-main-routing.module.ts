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
    //pathMatch: 'full'
  },  
/*  {
    path: 'blog',
    loadChildren : () => import('./routes/blog/blog/blog.module').then(m => m.BlogModule), 
    pathMatch: 'full'
  }, 
  {
    path: 'contact',
    loadChildren : () => import('./routes/contact/contact/contact.module').then(m => m.ContactModule), 
    pathMatch: 'full'
  },
  //Lazy load auth module
  {
    path: 'auth',
    loadChildren : () => import('./_features/auth/kii-auth.module').then(m => m.KiiAuthModule), 
  },
  //Lazy load legal module
  {
    path: 'legal',
    loadChildren : () => import('./_features/legal/kii-legal.module').then(m => m.KiiLegalModule), 
  },*/


];

@NgModule({
  imports: [RouterModule.forChild(routes)],//, scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class KiiMainRoutingModule {
  constructor()
 {
     console.log("KII_MAIN_ROUTING_MODULE CONSTRUCTOR!!!");
 }

 }
