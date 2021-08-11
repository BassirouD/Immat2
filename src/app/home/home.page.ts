import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, MenuController, ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {DemandeService} from "../services/demande.service";
import {PageDetailPage} from "../page-detail/page-detail.page";
import {DemandeModel} from "../model/demande.model";
// import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-tab1',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{

    demandes;
    statut: any;
    mode = 'normal';
    total: number = 0;
    // dataSource: MatTableDataSource<DemandeModel>;

    constructor(private router: Router,
                private loadingCtrl: LoadingController,
                private menu: MenuController,
                private demandeService: DemandeService,
                private modalCtrl: ModalController,
                private alertCtrl: AlertController
                ) {}

    ngOnInit() {
        this.onGetAllDemandes();
        this.onGetEncoursDemande();
        this.onGetValideesDemande();
        this.onGetRejeterDemande();
    }

    async goToSettings() {
        const loading = await this.loadingCtrl.create();
        await loading.present().then(() => {
            this.menu.close().then(() => {
                this.router.navigateByUrl('/parametre').then(async () =>{
                    await loading.dismiss();
                });
            });
        });
    }

    catSlideOpts = {
        slidesPerView:0.7,
        spaceBetween: 0,
        slidesOffsetBefore: 0,
        freeMode: true,
        loop: false,
        centeredSlides: false,
    };

    goToDemande(){
        this.router.navigateByUrl('/demande');
    }

    cours: any = 0;
    onGetEncoursDemande(){
        let owner = 1; //localStorage.getItem('id');
        return this.demandeService.getTotalDemande(owner)
            .subscribe(data => {
                this.cours = data['data'];
                this.total += this.cours;
                // if (data['data'] > this.cours){
                //     this.cours = data['data'];
                //     this.total += this.cours;
                // }if (data['data'] < this.cours){
                //     this.cours = data['data'];
                //     this.total -= this.cours;
                // }if (data['data'] == this.cours){
                //     this.cours = data['data'];
                // }
            });
    }

    valide: any = 0;
    onGetValideesDemande(){
        let owner = 1; //localStorage.getItem('id');
        return this.demandeService.getValideesDemande(owner)
            .subscribe(data => {
                this.valide = data['data'];
                this.total += this.valide;
            });
    }

    rejet: any = 0;
    onGetRejeterDemande(){
        let owner = 1; //localStorage.getItem('id');
        return this.demandeService.getRejetDemande(owner)
            .subscribe(data => {
                this.rejet = data['data'];
                this.total += this.rejet;
            });
    }

    // onGetTotal(){
    //     let owner = 1;
    //     let rejet1:number;
    //     let valide1:number;
    //     let cours1:number;
    //     let totql:number;
    //     this.demandeService.getValideesDemande(owner)
    //         .subscribe(data => {
    //             rejet1 = data['data'];
    //             console.log('reject',rejet1)
    //         });
    //
    //     this.demandeService.getValideesDemande(owner)
    //         .subscribe(data => {
    //             valide1 = data['data'];
    //             console.log('vqlide',valide1)
    //         });
    //     this.demandeService.getTotalDemande(owner)
    //         .subscribe(data => {
    //             cours1 = data['data'];
    //             console.log('cour',cours1)
    //
    //         });
    //     // let c = rejet1+valide1+cours1;
    //     // console.log('ccccccccccccccccccccccccccccc' + c)
    //     setTimeout(() =>{
    //         let b = rejet1+valide1+cours1;
    //         console.log('bbbbbbbbbbbbbbbbbbbbbbbbbb' + b)
    //     }, 5000);
    //
    //     console.log('toootallll',totql)
    // }

    onGetAllDemandes(){
        let owner = 1; //localStorage.getItem('id');
        this.demandeService.getAllDemandes(owner).subscribe(data => {
            this.demandes = data;
            // if (this.demandes.status){
            //
            // }
        })
            // .subscribe(data => {
            //     this.demandes = data;
            // }, error => {
            //     console.log(error);
            // })
    }

    doRefresh(event) {
        setTimeout(() => {
            this.total = 0;
            this.onGetAllDemandes();
            this.onGetEncoursDemande();
            this.onGetValideesDemande();
            this.onGetRejeterDemande();
            event.target.complete();
        }, 2000);
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

    async epresentAlert() {
        let alert = await this.alertCtrl.create({
            subHeader: "Demande supprimée!",
            buttons: ['Ok']
        });
        alert.present();
    }

    async onDeleteDemande(demande: DemandeModel){
        // let conf = confirm('Etes-vous sur de vouloir supprimer?');
        // if (!conf) return;
        // return this.demandeService.deleteRessource(demande._links.self.href)
        //     .subscribe( data => {
        //         this.onGetAllDemandes();
        //     });
        let alert1 = await this.alertCtrl.create({
            subHeader: 'Etes-vous sur de vouloir supprimer??',
            buttons: [
                {
                    text: 'Retour',
                    role: 'cancel',
                    // handler: () => {
                    //     console.log('Retour')
                    // }
                },
                {
                    text: 'Oui',
                    handler: () => {
                        return this.demandeService.deleteDemande(demande)
                            .subscribe( data => {
                                this.epresentAlert();
                                this.onGetAllDemandes();
                            });
                    }
                }
            ]
        });
        alert1.present();
    }

    closeModal(){
        this.mode = 'normal';
    }

    onPaiement(demande: DemandeModel){
        this.router.navigateByUrl('/paiement/' + demande.id);
    }

}
