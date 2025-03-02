import { Component, inject, OnInit } from '@angular/core';
import { FirebaseManagement } from 'src/firebase-management.service';
import { MenuManagement } from 'src/menu.service';
import { User } from 'src/user.interface';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  private menu = inject(MenuManagement);
  private contentId = 'forShare';
  private firebaseManagement = inject(FirebaseManagement);
  private user: User | undefined;
  constructor() {}

  ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    try {
      this.user = await this.firebaseManagement.findUserByUsername(
        'jorgeguanhaes@gmail.com'
      );
    } catch (error) {
      console.error(error);
    }
  }

  getContentId() {
    return this.contentId;
  }

  filteredString() {
    return `0 properties to Share in Dublin`;
  }
}
