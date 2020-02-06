import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { KiiHomeComponent } from './_features/main/components/kii-home/kii-home.component';
import { KiiAppComponent } from './_features/main/components/kii-app/kii-app.component';
import { SidenavComponent } from './routes/sidenav/sidenav.component';


let routes: Routes = [
  {path:'', redirectTo: 'home',pathMatch:'full'},
  { 
    path: 'home', 
    component: KiiHomeComponent
  },
  { 
    path: 'sidenav', 
    loadChildren: () => import('./routes/sidenav/sidenav.module').then(m => m.SidenavModule), 
  },
  { 
    path: 'blog', 
    loadChildren: () => import('./routes/blog/blog.module').then(m => m.BlogModule), 
  },
  //Lazy load legal module
  {
      path: 'legal',
      loadChildren : () => import('./_features/legal/kii-legal.module').then(m => m.KiiLegalModule), 
  },
  //Lazy load auth module
  {
    path: 'auth',
    loadChildren : () => import('./_features/auth/kii-auth.module').then(m => m.KiiAuthModule), 
  },    
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{initialNavigation:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
