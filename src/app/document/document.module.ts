import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DocumentPage } from './document.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';


import { DocumentRoutingModule } from './document-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        DocumentRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [DocumentPage]
})
export class DocumentModule {}
