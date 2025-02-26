import { Component, inject, OnInit, signal } from '@angular/core';
import { FirebaseManagement } from 'src/firebase-management.service';
import { MenuManagement } from 'src/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  private firebaseManagement = inject(FirebaseManagement);
  private passwordVisible = false;
  private contentId = 'loginContent';
  private menu = inject(MenuManagement);
  username = signal<string>('');
  password = signal<string>('');
  constructor() {}

  ngOnInit() {}

  viewPassword() {
    if (!this.passwordVisible) {
      document.getElementById('password-input')?.setAttribute('type', 'text');
      document
        .getElementById('view-password-icon')
        ?.setAttribute('name', 'eye');
      this.passwordVisible = true;
    } else {
      document
        .getElementById('password-input')
        ?.setAttribute('type', 'password');
      document
        .getElementById('view-password-icon')
        ?.setAttribute('name', 'eye-off');
      this.passwordVisible = false;
    }
  }

  ionViewWillEnter() {
    this.menu.closeMenu();
    this.menu.setContentId(this.contentId);
  }

  onSubmit() {
    this.firebaseManagement.loginWithEmailPassword(
      this.username(),
      this.password()
    );
  }

  closeMenu(content: string) {
    this.menu.setContentId(content);
    this.menu.closeMenu();
  }
}
