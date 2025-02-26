import { Component, OnInit, signal, inject } from '@angular/core';
import { FirebaseManagement } from 'src/firebase-management.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: false,
})
export class SignUpComponent implements OnInit {
  username = signal<string>('');
  password = signal<string>('');
  private validPassword = signal<boolean>(true);
  private passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/;
  private firebaseManagement = inject(FirebaseManagement);
  passwordMessage = '';

  constructor() {}

  ngOnInit() {
    this.validPassword.set(true);
  }

  getValidPassword() {
    return this.validPassword();
  }

  onSubmit() {
    this.validPassword.set(this.passwordPattern.test(this.password()));
    if (this.validPassword()) {
      this.firebaseManagement.createProfile(this.username(), this.password());
    } else {
      this.validPassword.set(false);
    }
  }
}
