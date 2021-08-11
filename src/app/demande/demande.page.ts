import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DemandeService} from "../services/demande.service";
import {Router} from "@angular/router";
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-demande',
    templateUrl: './demande.page.html',
    styleUrls: ['./demande.page.scss'],
})
export class DemandePage implements OnInit {

    progress = 0.17;
    n = 1;
    demandeFormGroup: FormGroup;

    @ViewChild('file1') file1;
    @ViewChild('file2') file2;
    @ViewChild('file3') file3;
    @ViewChild('file4') file4;
    @ViewChild('file5') file5;
    ffile1:File;
    ffile2:File;
    ffile3:File;
    ffile4:File;
    ffile5:File;
    result: any;


    constructor(private alertCtrl: AlertController,
                private actionSheetCtrl: ActionSheetController,
                private formBuilder: FormBuilder,
                private demandeService: DemandeService,
                private router: Router,
                // @Inject(MAT_DIALOG_DATA) public donner: any, public dialogRef: MatDialogRef<AddDemandevehiculeComponent>) { this.isfile = false }

) { }


    segmentChanged($event: any) {}
    activeSegment: FormControl = new FormControl('neuf');
    // segments: any[] = [
    //     { title: 'Neuf', value: 'neuf' },
    //     { title: 'Cesssion', value: 'cession' },
    // ];


    ngOnInit() {
        this.demandeFormGroup = this.formBuilder.group({
            prenom: ['Bass', Validators.required],
            nom: ['Diallo', Validators.required],
            adresse: [''],
            telephone: ['7855252', Validators.required],
            sexe: ['Masculin', Validators.required],
            marque: ['Toyota'],
            puissance: ['P1'],
            energie: ['E1'],
            emissionco2: ['E1'],
            couleur: ['C1'],
            typevarianteversion: ['Type V', Validators.required],
            genrevehicule: ['GV1'],
            carosserie: ['C1'],
            longeur: ['L1'],
            largeur: ['l1'],
            placesdebout: ['PP1'],
            placesassises: ['P1'],
            numeroimmat: ['hh-55-ll'],
            typeusage: ['Type U', Validators.required],
            region: ['Dakar', Validators.required],
            poOwner: ['', Validators.required],
            status: ['', Validators.required],
            owner: ['', Validators.required],
            idLink: ['', Validators.required],
            typedemande: ['', Validators.required],
            codecession: [''],
            datemiseencirculation: [''],
        });
    }

    onSaveDemande(){
        let url = this.demandeService.host + '/demandevehicule/insert';
        // if (this.demandeFormGroup.invalid) return;
        // this.demandeService.saveDemande(this.demandeFormGroup.value);
        // alert('Success...!');
        // console.log(this.demandeFormGroup.value)
        // this.demandeService.createDemande(this.demandeFormGroup.value)
        //     .subscribe(data => {
        //        alert('Success saving ...!');
        //        this.router.navigateByUrl('/tabs/home');
        //     });

        //----------------------------------------------------------------
        // alert(this.segments[1].value);
        // if (this.demandeFormGroup.value.typedemande == 'neuf'){
        //     this.demandeFormGroup.value.typedemande = 'neuf';
        //     alert(this.demandeFormGroup.value.typedemande[0].value);
        // }
        //
        // if (this.demandeFormGroup.value.typedemande == 'cession'){
        //     this.demandeFormGroup.value.typedemande = 'cession';
        //     alert(this.demandeFormGroup.value.typedemande[1])
        // }

        this.demandeFormGroup.value.typedemande = this.activeSegment.value;

        this.demandeFormGroup.value.poOwner = 52
        this.demandeFormGroup.value.owner = 1
        // this.demandeFormGroup.value.status = this.donner
        this.demandeFormGroup.value.idLink = null
        this.demandeFormGroup.value.fileCin = this.ffile1
        this.demandeFormGroup.value.fileAssurance= this.ffile2
        this.demandeFormGroup.value.fileCertificatCirculation = this.ffile3
        this.demandeFormGroup.value.fileCertificatVente = this.ffile4;
        // this.demandeFormGroup.value.fileAttestationDic = this.ffile5
        // alert(this.demandeFormGroup.value.fileCin.patch);

        this.demandeFormGroup.value.status = 1;
        this.demandeService.createDemande(this.demandeFormGroup.value).subscribe(data => {
            this.result = data;
            this.presentAlert();
            this.router.navigateByUrl('/tabs/home');
            // alert('---------------: ' + JSON.stringify(this.demandeFormGroup.value))
        }, error => {
            this.presentAlert();
            // console.log(this.demandeFormGroup.value);
            // alert(this.demandeFormGroup.value.fileCin)
        });

    }

    async epresentAlert() {
        let alert = await this.alertCtrl.create({
            subHeader: "Erreur lors de l'envoi",
            buttons: ['Ok']
        });
        alert.present();
    }

    async presentAlert() {
        let alert = await this.alertCtrl.create({
            subHeader: 'Demande envoyée',
            // subTitle: '10% of battery remaining',
            buttons: ['Ok']
        });
        alert.present();
    }

    suivant(){
        if (this.progress <= 0.990){
            this.progress += .164;
            this.n += 1;
            // console.log('Porgress actuel', this.progress);
        }
    }

    precedent(){
        this.progress -= .164;
        this.n -= 1;
        // console.log('Porgress actuel', this.progress);
    }

    async onFinish(){
        let alert = await this.alertCtrl.create({
            header: "Vous y etes deja !",
            cssClass: 'secondary',
            inputs: [
                {
                    name: "region",
                    type: "text",
                    placeholder: "Region"
                }
            ],
            buttons: [
                {
                    text: "Soumettre votre demnde",
                    handler: (data) => {
                        // console.log('Success...!', data);
                    }
                }
            ]
        });
        alert.present();
        // const actionSheet = await this.actionSheetCtrl.create({
        //     header: "Vous y etes deja!",
        //     buttons: [
        //         {
        //             text: 'Soumettre la demande',
        //             handler: () => {
        //                 console.log('Success!!!');
        //             }
        //         }
        //     ]
        // });
        // await actionSheet.present();
    }


    addFile1(){
        this.file1.nativeElement.click();
    }
    addFilesAdded1(){
        this.ffile1 = this.file1.nativeElement.files[0];
        console.log(this.ffile1);
        const extention = this.ffile1.name.split('.')[1].toLowerCase();
        if( "pdf" != extention){
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

    addFile2(){
        this.file2.nativeElement.click();
    }
    addFilesAdded2(){
        this.ffile2 = this.file2.nativeElement.files[0];
        const extension = this.ffile2.name.split('.')[1].toLowerCase();
        if ("pdf" != extension){
            alert('Doit etre un pdf!!!');
            this.ffile2 = null;
            return;
        }
        if (this.ffile2.size > 3000000){
            alert('Taille authoriser depasser!!!');
            this.ffile2 = null;
            return;
        }
    }

    addFile3(){
        this.file3.nativeElement.click();
    }
    addFilesAdded3(){
        this.ffile3 = this.file3.nativeElement.files[0];
        const extension = this.ffile3.name.split('.')[1].toLowerCase();
        if ("pdf" != extension){
            alert('Doit etre un pdf!!!');
            this.ffile3 = null;
            return;
        }
        if (this.ffile3.size > 3000000){
            alert('Taille authoriser depasser!!!');
            this.ffile3 = null;
            return;
        }
    }

    addFile4(){
        this.file4.nativeElement.click();
    }
    addFilesAdded4(){
        this.ffile4 = this.file4.nativeElement.files[0];
        const extension = this.ffile4.name.split('.')[1].toLowerCase();
        if ("pdf" != extension){
            alert('Doit etre un pdf!!!');
            this.ffile4 = null;
            return;
        }
        if (this.ffile4.size > 3000000){
            alert('Taille authoriser depasser!!!');
            this.ffile4 = null;
            return;
        }
    }

    addFile5(){
        this.file5.nativeElement.click();
    }
    addFilesAdded5(){
        this.ffile5 = this.file5.nativeElement.files[0];
        const extension = this.ffile5.name.split('.')[1].toLowerCase();
        if ("pdf" != extension){
            alert('Doit etre un pdf!!!');
            this.ffile5 = null;
            return;
        }
        if (this.ffile5.size > 3000000){
            alert('Taille authoriser depasser!!!');
            this.ffile5 = null;
            return;
        }
    }
    // onFileSelect(event) {
    //     if (event.target.files.length > 0) {
    //         const file = event.target.files[0];
    //         this.demandeFormGroup.get('profile').setValue(file);
    //     }
    // }
}
