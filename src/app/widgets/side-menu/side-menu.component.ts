import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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
  constructor(private router: Router) {
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

  ngOnInit() {
    this.onRouteChange();
  }

  closeMenu(content: string) {
    this.menu.setContentId(content);
    this.menu.closeMenu();
  }
  logOut() {
    this.sessionManagement.logout();
  }

  onRouteChange() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.includes('tab1')) {
          this.menu.setContentId('forRent');
          this.menu.closeMenu();
        } else if (event.urlAfterRedirects.includes('tab2')) {
          this.menu.setContentId('forSale-content');
          this.menu.closeMenu();
        } else if (event.urlAfterRedirects.includes('tab3')) {
          this.menu.setContentId('forShare');
          this.menu.closeMenu();
        } else if (event.urlAfterRedirects.includes('signup')) {
          this.menu.setContentId('signup');
          this.menu.closeMenu();
        } else if (event.urlAfterRedirects.includes('login')) {
          this.menu.setContentId('login');
          this.menu.closeMenu();
        } else if (event.urlAfterRedirects.includes('property')) {
          this.menu.setContentId('propertyPage');
          this.menu.closeMenu();
        }
      });
  }
  getMenuContent() {
    window.addEventListener('popstate', (event) => {
      if (window.location.pathname.includes('tab1')) {
        this.menu.setContentId('forRent');
        this.menu.openMenu();
      } else if (window.location.pathname.includes('tab2')) {
        this.menu.setContentId('forSale-content');
        this.menu.openMenu();
      } else if (window.location.pathname.includes('tab3')) {
        this.menu.setContentId('forShare');
        this.menu.openMenu();
      } else if (window.location.pathname.includes('signup')) {
        this.menu.setContentId('signup');
        this.menu.openMenu();
      } else if (window.location.pathname.includes('login')) {
        this.menu.setContentId('login');
        this.menu.openMenu();
      } else if (window.location.pathname.includes('property')) {
        this.menu.setContentId('propertyPage');
        this.menu.openMenu();
      }
    });
  }
}
