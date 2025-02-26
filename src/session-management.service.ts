import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserProfile } from './userProfile.interface';
import { Router } from '@angular/router';
import { MenuManagement } from './menu.service';

@Injectable({ providedIn: 'root' })
export class SessionManagement {
  private _currentUser = new BehaviorSubject<any>(null);
  currentUser = this._currentUser.asObservable();

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  loginStatus = this._isLoggedIn.asObservable();

  private menu = inject(MenuManagement);

  constructor(private storage: Storage, private router: Router) {
    this.initializeStorage().then(() => {
      this.checkLoginStatus();
    });
  }

  async initializeStorage() {
    try {
      await this.storage.create();
    } catch (error) {
      console.log(error);
    }
  }

  checkLoginStatus() {
    from(this.storage.get('isLoggedIn'))
      .pipe(
        switchMap((isLoggedIn) => {
          if (isLoggedIn === true || isLoggedIn === 'true') {
            return from(this.storage.get('user')).pipe(
              tap((user: UserProfile) => {
                this._currentUser.next(user);
              })
            );
          } else {
            return of(null);
          }
        })
      )
      .subscribe(() => {
        this._isLoggedIn.next(this._currentUser.value !== null);
      });
  }

  async createSession(user: UserProfile) {
    await this.storage.set('user', user);
    await this.storage.set('isLoggedIn', true);
    this._currentUser.next(user);
    this._isLoggedIn.next(true);
    this.router.navigate(['/tabs/tab1']);
  }

  async loadSession() {
    const user = await this.storage.get('user');
    if (user) {
      this._currentUser.next(user);
    } else {
      this._currentUser.next(null);
    }
  }

  async isLoggedIn() {
    const user = await this.storage.get('user');
    if (user) {
      this._currentUser.next(user);
      return true;
    }
    return false;
  }

  async logout() {
    await this.storage.remove('user');
    this._currentUser.next(null);
    this._isLoggedIn.next(false);
    this.menu.closeMenu();
    this.router.navigate(['/tabs/tab1']);
  }
}
