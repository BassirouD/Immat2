import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditComptePageRoutingModule } from './edit-compte-routing.module';

import { EditComptePage } from './edit-compte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditComptePageRoutingModule
  ],
  declarations: [EditComptePage]
})
export class EditComptePageModule {}
