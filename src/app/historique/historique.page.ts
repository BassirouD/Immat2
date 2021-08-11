import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertController, LoadingController, MenuController, ModalController} from "@ionic/angular";
import {DemandeService} from "../services/demande.service";
import {DemandeModel} from "../model/demande.model";
import { ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import * as $ from 'jquery';
import {PageDetailPage} from "../page-detail/page-detail.page";

@Component({
    selector: 'app-tab3',
    templateUrl: 'historique.page.html',
    styleUrls: ['historique.page.scss']
})
export class HistoriquePage implements OnInit{

    @Input() id: string;
    @Input() nom: string;
    @Input() marque: string;
    @Input() puissance: string;

    mode = 'list';
    demandeId = 0;
    demandes;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    someMethod() {
        this.trigger.openMenu();
    }

    constructor(private router: Router,
                private loadingCtrl: LoadingController,
                private menu: MenuController,
                private demandeService: DemandeService,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                ) {}

    ngOnInit() {
        this.onGetAllDemandes();
    }

    catSlideOpts = {
        freeMode: true,
        slidesPerView: 3.5,
        slidesOffsetBefore: 11,
        spaceBetween: 5
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

    onPaiement(demande: DemandeModel){
        this.router.navigateByUrl('/paiement/' + demande.id);
    }

    // currentDemande;
    onView(demande){
        // this.demandeService.getRessource(demande._links.self.href)
        //     .subscribe( data => {
        //         this.currentDemande = data;
        //         console.log(this.currentDemande);
        //     }, error => {
        //         console.log(error);
        //     });
        // let alert1 = await this.alertCtrl.create({
        //     header: 'Detail demande',
        //     cssClass: 'my-custom-class',
        //     inputs: [
        //         {
        //             name: 'nom',
        //             type: 'text',
        //             placeholder: 'Nom complet',
        //             value:demande.nom,
        //         },
        //         {
        //             name: 'marque',
        //             type: 'text',
        //             placeholder: 'Marque',
        //             value:demande.marque,
        //         },
        //         {
        //             type: 'text',
        //             placeholder: 'Telephone',
        //             value:demande.tel,
        //         },
        //         {
        //             type: 'text',
        //             placeholder: 'Email',
        //             value:demande.email,
        //         },
        //         {
        //             type: 'text',
        //             placeholder: 'Carosserie',
        //             value:demande.carosserie,
        //         },
        //         {
        //             type: 'text',
        //             placeholder: 'Telephone',
        //             value: demande.couleur
        //         }
        //     ],
        //     buttons: [
        //         {
        //             text: 'Retour',
        //             role: 'cancel'
        //         },
        //     ]
        // });
        // alert1.present();
        // this.demandeService.getRessource(demande._links.self.href)
        //     .subscribe( data => {
        //         this.currentDemande = data;
        //         this.mode = 'detail';
        //         const modal = this.modalCtrl.create({
        //             component: HistoriquePage,
        //             componentProps: {
        //                 dmdId: this.demandeId,
        //             }
        //         });
        //         modal.then();
        //     })
        this.router.navigateByUrl('/page-detail/' + demande.id);
        console.log(demande.id)
    }

    onGetAllDemandes(){
        let owner = 1
        return this.demandeService.getAllDemandes(owner)
            .subscribe(data => {
                this.demandes = data;
            }, error => {
                console.log(error);
            })
    }

    doRefresh(event) {
        console.log('Begin async operation');

        setTimeout(() => {
            this.onGetAllDemandes();
            console.log('Async operation has ended');
            event.target.complete();
        }, 1000);
    }

    currentModal = null;
    async onDeleteDemande(demande: DemandeModel){
        // let conf = confirm('Etes-vous sur de vouloir supprimer?');
        // if (!conf) return;
        // return this.demandeService.deleteRessource(demande._links.self.href)
        //     .subscribe( data => {
        //         this.onGetAllDemandes();
        //     });
        let alert1 = await this.alertCtrl.create({
            header: 'Etes-vous sur de vouloir supprimer??',
            buttons: [
                {
                    text: 'Retour',
                    role: 'cancel',
                    handler: () => {
                        console.log('Retour')
                    }
                },
                {
                    text: 'Oui',
                    handler: () => {
                        return this.demandeService.deleteDemande(demande)
                            .subscribe( data => {
                                this.onGetAllDemandes();
                            });
                    }
                }
            ]
        });
        alert1.present();
    }

    currentDemande;
    async openDetail(demande){
        // this.demandeService.getRessource(demande);
        // console.log(demande)

        // this.router.navigateByUrl('/page-detail/' + demande.id);
        // console.log(demande)


        this.demandeService.getDemande(demande.id)
            .subscribe(data => {
                this.currentDemande = data.data;
                // alert(JSON.stringify(data.data))
                this.mode = 'detail';
            }, error => {
                console.log(error);
            })
    }

    closeModal(){
        this.mode = 'list';
    }


}
