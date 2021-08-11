import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DemandeService} from "../services/demande.service";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
    selector: 'app-paiement',
    templateUrl: './paiement.page.html',
    styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {

    mode = 'normal';
    demandeId: any;
    demandeFormGroup: FormGroup;
    payeur: FormGroup;


    constructor(private activatedRoute: ActivatedRoute,
                private alertCtrl: AlertController,
                private modalCtrl: ModalController,
                private formBuilder: FormBuilder,
                private router: Router,
                private demandeService: DemandeService,
                private iab: InAppBrowser
    ) {
        this.demandeId = activatedRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        this.demandeService.getDemande(this.demandeId)
            .subscribe( demande => {
                this.demandeFormGroup = this.formBuilder.group({
                    id: [demande.data.id],
                    nom: [demande.data.nom, Validators.required],
                    prenom: [demande.data.prenom, Validators.required],
                    // region: [demande.data.region, Validators.required],
                    numeroimmat: [demande.data.numeroimmat, Validators.required],
                    montant: ['1000', Validators.required]
                });
            })
    }

    catSlideOpts = {
        slidesPerView:0.7,
        spaceBetween: 10,
        slidesOffsetBefore: 11,
        freeMode: true
    };

    onCartePaiement(){
        this.mode = 'viewCarte';
        console.log(this.mode);
        let modal = this.modalCtrl.create({
            component: PaiementPage
        });
        modal.then();
    }

    onPaypalPaiement(){
        this.mode = 'viewPaypal';
        console.log(this.mode);
        let modal = this.modalCtrl.create({
            component: PaiementPage
        });
        modal.then();
    }

    onOrbusPaiement(){
        this.mode = 'viewOrbus';
        console.log(this.mode);
        let modal = this.modalCtrl.create({
            component: PaiementPage
        });
        modal.then();
    }

    openOrbusPaiment(){
        // const browser = this.iab.create('https://ionicframework.com/');
        const opWind = window.open('https://www.orbuspaiement.com/')
        // browser.executeScript();

        // browser.insertCSS(...);
        // browser.on('loadstop').subscribe(event => {
        //     browser.insertCSS({ code: "body{color: red;" });
        // });
        // browser.close();
    }

    openPaypalPaiment(){
        const opWind = window.open('https://www.paypal.com/fr/webapps/mpp/home')
    }

    openVisaPaiment(){
        const opWind = window.open('https://africa.visa.com/pay-with-visa/find-a-card/credit-cards.html')
    }

    payer(){
        this.payeur = this.formBuilder.group({
            idFacture: [this.demandeFormGroup.value.id],
            nomPayeur: [this.demandeFormGroup.value.nom],
            prenomPayeur: [this.demandeFormGroup.value.prenom],
            // region: [demande.data.region, Validators.required],
            montantFacture: ['1000'],
            usernamePayeur: [localStorage.getItem('username')]
        });
        //alert("okkkkkkkkkkk"+JSON.stringify(this.payeur.value));

        this.demandeService.payer(this.payeur.value).subscribe(data=>{
          // alert("okkkkkkkkkkk"+JSON.stringify(data['data']));
           const url=data['data'];
            const opWind1= window.open(url);
            //open('https://africa.visa.com/pay-with-visa/find-a-card/credit-cards.html')
            //open('data.data');
        })
    }

}
