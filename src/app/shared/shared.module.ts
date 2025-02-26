import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../widgets/header/header.component';
import { PropertyCardsComponent } from '../widgets/property-cards/property-cards.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SideMenuComponent } from '../widgets/side-menu/side-menu.component';
import { TabsComponent } from '../widgets/tabs/tabs.component';
import { RouterLink } from '@angular/router';
import { FilterComponent } from '../widgets/filter/filter.component';
import { ModalComponent } from '../widgets/modal/modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PropertyCardsComponent,
    SideMenuComponent,
    TabsComponent,
    FilterComponent,
    ModalComponent,
  ],
  imports: [CommonModule, IonicModule, RouterLink],
  exports: [
    HeaderComponent,
    PropertyCardsComponent,
    SideMenuComponent,
    TabsComponent,
    FilterComponent,
    ModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
