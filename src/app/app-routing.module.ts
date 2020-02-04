import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { KiiHomeComponent } from './_features/main/components/kii-home/kii-home.component';
import { KiiAppComponent } from './_features/main/components/kii-app/kii-app.component';


let routes: Routes = [
  {path:'', redirectTo: 'home',pathMatch:'full'},
  { path: 'home', component: KiiHomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{initialNavigation:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
