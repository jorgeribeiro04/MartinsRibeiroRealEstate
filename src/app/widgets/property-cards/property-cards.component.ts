import { Component, OnInit, input, inject } from '@angular/core';
import { MenuManagement } from 'src/menu.service';
import { Properties } from 'src/properties.interface';

@Component({
  selector: 'app-property-cards',
  templateUrl: './property-cards.component.html',
  styleUrls: ['./property-cards.component.scss'],
  standalone: false,
})
export class PropertyCardsComponent implements OnInit {
  private menu = inject(MenuManagement);
  constructor() {}
  properties = input.required<Properties[] | undefined>();
  ngOnInit() {}

  setContentId() {
    this.menu.setContentId('propertyPage');
    this.menu.closeMenu();
  }
}
