import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionPageRoutingModule } from './action-routing.module';

import { ActionPage } from './action.page';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from '../widgets/login/login.component';
import { SignUpComponent } from '../widgets/sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionPageRoutingModule,
    SharedModule,
  ],
  declarations: [ActionPage, LoginComponent, SignUpComponent],
})
export class ActionPageModule {}
