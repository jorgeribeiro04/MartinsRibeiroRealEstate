import { Component, OnInit, input, inject } from '@angular/core';
import { MenuManagement } from 'src/menu.service';
import { SessionManagement } from 'src/session-management.service';
import { UserProfile } from 'src/userProfile.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  contentId = input.required<string>();
  private sessionManagement = inject(SessionManagement);
  userProfile: UserProfile | undefined;
  isLoggedIn: boolean = false;
  profilePicture: string = '';
  constructor() {
    this.sessionManagement.currentUser.subscribe((user) => {
      this.userProfile = user;
    });
    this.sessionManagement.loginStatus.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  private menu = inject(MenuManagement);

  ngOnInit() {
    this.menu.setContentId(this.contentId());
  }

  ionViewDidEnter() {
    this.menu.setContentId(this.contentId());
  }

  openMenu() {
    this.menu.openMenu();
  }
}
