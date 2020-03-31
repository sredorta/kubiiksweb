import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { KiiMainUserService } from '../services/kii-main-user.service';
import { KiiTranslateService } from '../../translate/services/kii-translate.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisteredGuard implements CanActivate {
  
  constructor(private auth : KiiMainUserService,private router:Router, private trans: KiiTranslateService) {
    console.log("REGISTERED GUARD CONSTRUCTOR")
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.auth.getAuthUser().pipe(map(res => {
        console.log("GOT USER",res);
        let user = new User(res);
        if (!user.exists()) {
          return this.router.parseUrl('/');
        } else
        return true;
     }));
  }
}
