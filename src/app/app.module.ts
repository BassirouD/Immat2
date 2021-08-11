import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {Interceptor} from "./interceptor/interceptor";
import {HTTP} from "@ionic-native/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import {FileChooser} from "@ionic-native/file-chooser/ngx";
import {FilePath} from "@ionic-native/file-path/ngx";
import {Camera} from "@ionic-native/camera/ngx";



@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatInputModule,
    ],
    providers: [
        FileTransfer,
        // FileUploadOptions,
        FileTransferObject,
        File,
        FileChooser,
        FilePath,
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        InAppBrowser,
        {provide: ErrorHandler},
        Camera
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
