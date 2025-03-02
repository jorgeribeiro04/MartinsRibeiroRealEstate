import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { PropertyPageRoutingModule } from './property-routing.module';

import { PropertyPage } from './property.page';
import { SharedModule } from '../shared/shared.module';
import { PropertyDetailsComponent } from '../widgets/property-details/property-details.component';
import { MortgageCalculatorComponent } from '../widgets/mortgage-calculator/mortgage-calculator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    PropertyPage,
    PropertyDetailsComponent,
    MortgageCalculatorComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PropertyPageModule {}
