import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UixModule } from "src/@uix/angular/core";

import { AboutPage } from './about.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    UixModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutPage
      }
    ])
  ],
  declarations: [AboutPage]
})
export class AboutPageModule { }
