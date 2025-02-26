import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuManagement } from 'src/menu.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: false,
})
export class TabsComponent implements OnInit {
  constructor(private router: Router) {}
  private menu = inject(MenuManagement);
  ngOnInit() {}

  goToTab(path: string) {
    this.menu.closeMenu();
    if (path === 'rent') {
      this.menu.setContentId('forRent');
      this.router.navigate(['/tabs/tab1']);
    } else if (path === 'sale') {
      this.menu.setContentId('forSale');
      this.router.navigate(['/tabs/tab2']);
    } else {
      this.menu.setContentId('forShare');
      this.router.navigate(['/tabs/tab3']);
    }
  }
}
