import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandePageRoutingModule } from './demande-routing.module';

import { DemandePage } from './demande.page';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from "@angular/material/select";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DemandePageRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule
    ],
  declarations: [DemandePage]
})
export class DemandePageModule {}
