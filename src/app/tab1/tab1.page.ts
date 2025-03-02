import { Component, OnInit, inject } from '@angular/core';
import { FirebaseManagement } from 'src/firebase-management.service';
import { MenuManagement } from 'src/menu.service';
import { Properties } from 'src/properties.interface';
import { SessionManagement } from 'src/session-management.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  propertiesForRent: Properties[] | undefined;
  private availability = 'Rent';
  private menu = inject(MenuManagement);
  private contentId = 'forRent';
  private isLoggedIn: boolean = false;
  private sessionManagement = inject(SessionManagement);
  constructor(private firebaseManagement: FirebaseManagement) {
    this.sessionManagement.loginStatus.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    try {
      this.propertiesForRent = await this.firebaseManagement.getProperties(
        this.availability
      );
    } catch (error) {
      console.error(error);
    }
  }

  getContentId() {
    return this.contentId;
  }

  filteredString() {
    return `${this.propertiesForRent?.length} properties for Rent in Dublin`;
  }

  async printingFilters(filters: { [key: string]: string[] }) {
    this.propertiesForRent = await this.firebaseManagement.filterProperties(
      filters
    );
  }

  async resetContent() {
    this.propertiesForRent = await this.firebaseManagement.getProperties(
      this.availability
    );
  }
}
