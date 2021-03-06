import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { AppUser } from '../models/app-user';
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login(providerName: string) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    if(!providerName) this.afAuth.auth.signInAnonymously();
    else {
      let provider = this.getProvider(providerName);
      this.afAuth.auth.signInWithRedirect(provider);
    }
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap(user => {
        if(user) {
          return this.userService.get(user.uid);
        } else {
          return of(null);
        }
      }));
  }

  private getProvider(providerName: string) {
    switch(providerName)
    {
      case "facebook": 
        return new firebase.auth.FacebookAuthProvider();

      case "google": 
        return new firebase.auth.GoogleAuthProvider();

      default: return new firebase.auth.FacebookAuthProvider();
    }
  }
}
