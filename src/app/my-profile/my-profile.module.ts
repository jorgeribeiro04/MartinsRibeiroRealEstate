import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProfilePageRoutingModule } from './my-profile-routing.module';

import { MyProfilePage } from './my-profile.page';
import { SharedModule } from '../shared/shared.module';
import { PhoneListComponent } from '../widgets/phone-list/phone-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProfilePageRoutingModule,
    SharedModule,
  ],
  declarations: [MyProfilePage, PhoneListComponent],
})
export class MyProfilePageModule {}
