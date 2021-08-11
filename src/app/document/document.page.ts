import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadingController, MenuController} from "@ionic/angular";

@Component({
    selector: 'app-tab2',
    templateUrl: 'document.page.html',
    styleUrls: ['document.page.scss']
})
export class DocumentPage {

    constructor(private router: Router,
                private loadingCtrl: LoadingController,
                private menu: MenuController
                ) {}

    segmentChanged($event: any) {}

    activeSegment: FormControl = new FormControl('signer');
    segments: any[] = [
        { title: 'Signer', value: 'signer' },
        { title: 'Consulter', value: 'consulter' },
    ];

    signers: any[] = [
        {
            id: 1,
            name: 'First documentS',
            proprietaire: 'First propi'
        },
        {
            id: 2,
            name: 'Second documentS',
            proprietaire: 'Second propi'
        },
        {
            id: 3,
            name: 'Third documentS',
            proprietaire: 'Third propi'
        },
        {
            id: 4,
            name: 'First documentS',
            proprietaire: 'First propi'
        },
        {
            id: 5,
            name: 'Second documentS',
            proprietaire: 'Second propi'
        },
        {
            id: 6,
            name: 'Third documentS',
            proprietaire: 'Third propi'
        },
    ];

    consulters: any[] = [
        {
            id: 1,
            name: 'First documentC',
            proprietaire: 'First propi'
        },
        {
            id: 2,
            name: 'Second documentC',
            proprietaire: 'Second propi'
        },
        {
            id: 3,
            name: 'Third documentC',
            proprietaire: 'Third propi'
        },
        {
            id: 4,
            name: 'First documentC',
            proprietaire: 'First propi'
        },
        {
            id: 5,
            name: 'Second documentC',
            proprietaire: 'Second propi'
        },
        {
            id: 6,
            name: 'Third documentC',
            proprietaire: 'Third propi'
        },
    ];

    ngOnInit(): void {
        this.signers;
    }

    async goToSettings() {
        const loading = await this.loadingCtrl.create();
        await loading.present().then(() => {
            this.menu.close().then(() => {
                this.router.navigateByUrl('/parametre').then(async () => {
                    await loading.dismiss();
                });
            });
        });
    }



}
