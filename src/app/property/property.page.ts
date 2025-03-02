import { Component, OnInit, inject } from '@angular/core';
import { MenuManagement } from 'src/menu.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.page.html',
  styleUrls: ['./property.page.scss'],
  standalone: false,
})
export class PropertyPage implements OnInit {
  private contentId = 'propertyPage';
  private menuManagement = inject(MenuManagement);
  constructor() {}

  ngOnInit() {
    this.menuManagement.closeMenu();
  }

  getContentId() {
    return this.contentId;
  }

  ionViewDidEnter() {
    this.setContentId();
  }
  setContentId() {
    this.menuManagement.setContentId('propertyPage');
  }
}
