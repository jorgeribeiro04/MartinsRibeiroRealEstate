import { Component, OnInit, inject } from '@angular/core';
import { FirebaseManagement } from 'src/firebase-management.service';
import { MenuManagement } from 'src/menu.service';
import { Properties } from 'src/properties.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  propertiesForSale: Properties[] | undefined;
  private menu = inject(MenuManagement);
  private availability = 'Sale';
  private contentId = 'forSale-content';
  constructor(private firebaseManagement: FirebaseManagement) {}

  ngOnInit() {
    this.fetchData();
  }

  async fetchData() {
    try {
      this.propertiesForSale = await this.firebaseManagement.getProperties(
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
    return `${this.propertiesForSale?.length} properties for Sale in Dublin`;
  }
}
