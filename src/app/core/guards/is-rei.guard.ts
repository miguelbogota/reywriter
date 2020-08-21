import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsReiGuard implements CanActivate {

  constructor(private auth: AuthService) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.stateChanges
      .pipe(
        switchMap((u: firebase.User) => {
          if (u) { return of(u.email === 'miguelbogota.rico@gmail.com' || u.email === 'reyupel22@gmail.com'); }
          return of(false);
        })
      );
  }

}
