import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  UrlTree, CanActivate, ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { KiiMainUserService } from '../services/kii-main-user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private auth : KiiMainUserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const roles:string[] = next.data.roles as Array<string>;
      console.log("ROLE GUARD ROLES:",roles);
      return this.auth.getAuthUser().pipe(map(res => {
        console.log("GOT USER",res);
        let user = new User(res);
        for (let role of roles) {
          if (user.hasRole(role)) 
            return true;
        }
        return this.router.parseUrl('/');
    }));
  }
}
