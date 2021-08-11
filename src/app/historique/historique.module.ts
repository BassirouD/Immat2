import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoriquePage } from './historique.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MatMenuModule} from '@angular/material/menu';
import { HistoriqueRoutingModule } from './historique-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from "@angular/material/input";
@NgModule({
  imports: [
    MatInputModule,
    MatIconModule,
    IonicModule,
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: HistoriquePage }]),
    HistoriqueRoutingModule,
  ],
  declarations: [HistoriquePage]
})
export class HistoriqueModule {}
