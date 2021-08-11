import { HttpClient } from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ActionSheetController, AlertController, LoadingController, MenuController} from "@ionic/angular";
import {DemandeService} from "../services/demande.service";
// import {Camera} from "@ionic-native/camera/ngx";
import {AuthentificationService} from "../services/authentification.service";
import {UserService} from "../services/user.service";
import {J} from "@angular/cdk/keycodes";

@Component({
    selector: 'app-compte',
    templateUrl: './compte.page.html',
    styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {

    @ViewChild('file1') file1;
    ffile1:File;

    categories = [];
    highlights = [];
    featured = [];
    mode = 'normal';
    monNom: any = null;
    monTel: any = null;
    monMail: any = null;
    monService: any = null;
    maFonction: any = null;

    constructor(private router: Router, private loadingCtrl: LoadingController, private menu: MenuController, private alertCtrl: AlertController, private demandeService: DemandeService, private http: HttpClient, private actionSheetController: ActionSheetController, private authService: AuthentificationService, private userService: UserService,
                ) { }

    ngOnInit() {
        // this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json').subscribe((res: any) => {
        //     this.categories = res.categories;
        //     this.highlights = res.highlights;
        //     this.featured = res.featured;
        // });
        this.onGetUser();
    }

    catSlideOpts = {
        slidesPerView:0.7,
        spaceBetween: 1,
        slidesOffsetBefore: 1,
        freeMode: true
    };

    // onGetUsers(){
    //     return this.demandeService.getUser()
    //         .subscribe(data => {
    //             this.user = data;
    //         }, error => {
    //             console.log(error);
    //         })
    // }


    // info = this.user.nom + " " + this.user.prenom;

    userT: any;
    onGetUser(){
        let id = 1; //localStorage.getItem('id');
        this.userService.getUser(id)
            .subscribe(data =>{
                this.userT = data;
                this.monNom = data['nom'];
                this.monTel = data['tel'];
                this.monMail = data['mail'];
                this.monService = data['service'];
                this.maFonction = data['fonction'];
            });
    }

    user =
        {
            nom: this.monNom,
            mail: this.monMail,
            tel: this.monTel,
            service: this.monService,
            fonction: this.maFonction,
        };

    logout() {
        this.router.navigateByUrl('/');
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

    async onEdit(user){
        let alert1 = await this.alertCtrl.create({
            header: 'Modifier votre compte',
            cssClass: 'my-custom-class',
            inputs: [
                {
                    name: 'nom',
                    type: 'text',
                    placeholder: 'Nom complet',
                    value: this.monNom,
                },
                {
                    name: 'mail',
                    type: 'email',
                    placeholder: 'Mail',
                    value: this.monMail,
                },
                {
                    name: 'tel',
                    type: 'text',
                    placeholder: 'Telephone',
                    value: this.monTel,
                },
                {
                    name: 'service',
                    type: 'text',
                    placeholder: 'Service',
                    value: this.monService
                },
                {
                    name: 'fonction',
                    type: 'text',
                    placeholder: 'Fonction',
                    value: this.maFonction
                },
            ],
            buttons: [
                {
                    text: 'Retour',
                    role: 'cancel'
                },
                {
                    text: 'Enregister',
                    handler: (users) => {
                        // console.log(users.nom);
                        this.onUpdateUser(users);
                        this.presentAlert();
                    }
                },
            ]
        });
        alert1.present();
    }

    async presentAlert() {
        let alert = await this.alertCtrl.create({
            subHeader: 'Informations enregistées',
            buttons: ['Ok']
        });
        alert.present();
    }

    onUpdateUser(user){
        this.userService.updateUser(user)
            .subscribe( data => {
                // alert('Successfully....!'+ JSON.stringify(data));
                setTimeout(()=>{
                    this.onGetUser();
                }, 100)
            }, error => {
                alert(JSON.stringify(error));
            })
    }

    async onEditProfile(){
        let alert1 = await this.alertCtrl.create({
            header: 'Modifier le profil',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel'
                },
                {
                    text: 'Modifier',
                    handler: () => {
                        this.mode = 'changeProfil';
                    }
                }
            ]
        });
        alert1.present();
    }

    async onChangeProfile(){
        const actionSheet = await this.actionSheetController.create({
            buttons: [
                {
                    text: 'Prendre une photo',
                    handler: () => {
                        console.log('Ma camera...!');
                        this.openCamera();
                    }
                },
                {
                    text: 'Choisir une photo',
                    handler: () => {
                        this.addFile1();
                    }
                },
                { text: 'Cancel', role: 'cancel' }
            ]
        });

        await actionSheet.present();
    }

    addFile1(){
        this.file1.nativeElement.click();
    }
    addFilesAdded1(){
        this.ffile1 = this.file1.nativeElement.files[0];
        const extention = this.ffile1.name.split('.')[1].toLowerCase();
        if( "png" != extention){
            alert('Doit etre un pdf!!!');
            this.ffile1 = null;
            return;
        }
        if (this.ffile1.size > 3000000){
            alert('Taille authoriser depasser!!!');
            this.ffile1 = null;
            return;
        }
    }

    openCamera(){
        this.menu.toggle('camera');
    }

    ionViewDidEnter() {
        this.menu.enable(true, 'camera');
    }

    ionViewDidLeave() {
        this.menu.enable(false, 'camera');
    }

    onRetour(){
        this.mode = 'normal';
    }

    onLogout(){
        // this.router.navigateByUrl('/test');
        this.authService.logOut();
        this.router.navigateByUrl('/');
    }

}
