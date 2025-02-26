import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuManagement {
  private _currentContent = new BehaviorSubject<string>('');
  currentContent = this._currentContent.asObservable();

  private isOpen = false;
  constructor(private menuCtrl: MenuController, private router: Router) {}

  openMenu() {
    if (!this.isOpen) {
      this.menuCtrl.open(this.getContent());
      this.isOpen = true;
    } else {
      this.menuCtrl.close();
      this.isOpen = false;
    }
  }

  setContentId(id: string): void {
    this._currentContent.next(id);
  }

  getContent(): string {
    let content: string = '';
    this.currentContent.subscribe((contentId) => {
      content = contentId;
    });
    return content;
  }

  closeMenu() {
    if (this.isOpen) {
      this.menuCtrl.close();
      this.isOpen = false;
    }
  }
}
