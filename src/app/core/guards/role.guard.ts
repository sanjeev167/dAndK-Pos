import { Injectable, Inject } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { IAuthService } from "../interfaces/auth.interface";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(@Inject('AuthService') private auth: IAuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const required = route.data['roles'] as string[];
    return required.every(r => this.auth.hasRole(r));
  }
}
