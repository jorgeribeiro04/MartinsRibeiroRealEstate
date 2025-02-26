import { Component, OnInit, inject } from '@angular/core';
import { MenuManagement } from 'src/menu.service';
import { SessionManagement } from 'src/session-management.service';
import { UserProfile } from 'src/userProfile.interface';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: false,
})
export class SideMenuComponent implements OnInit {
  private sessionManagement = inject(SessionManagement);
  userProfile: UserProfile | undefined;
  menu = inject(MenuManagement);
  contentId: string = '';
  isLoggedIn: boolean = false;
  constructor() {
    this.sessionManagement.currentUser.subscribe((user) => {
      this.userProfile = user;
    });
    this.sessionManagement.loginStatus.subscribe((login) => {
      this.isLoggedIn = login;
    });
    this.menu.currentContent.subscribe((content) => {
      this.contentId = content;
    });
  }

  ngOnInit() {}

  closeMenu(content: string) {
    this.menu.setContentId(content);
    this.menu.closeMenu();
  }
  logOut() {
    this.sessionManagement.logout();
  }
}
